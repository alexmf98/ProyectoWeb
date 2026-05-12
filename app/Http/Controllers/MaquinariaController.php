<?php

namespace App\Http\Controllers;

use App\Models\HistorialMaquinaria;
use App\Models\Maquinaria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MaquinariaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $maquinas = Maquinaria::all()->map(function($dato){
            return [
                'id' => $dato->id,
                'nombre' => $dato->nombre,
                'caracteristicas' => $dato->caracteristicas,
                'imagen' => Storage::url('maquinaria/' . $dato->imagen),
            ];
        });

        return Inertia::render('Alquileres',[
            'maquinas'=> $maquinas,
        ]);
    }

    public function añadirMaquinaria(){

        // $categoria = Maquinaria::all()->where('categoria_active', '=', true)->get();

        return Inertia::render('MaquinariaAdmin');
    
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'nombre'=>'required',
            'categoria'=>'required',
            'precio'=>'required',
            'stock'=>'required',
            'caracteristicas'=>'required',
            'imagen'=>'nullable',
        ]);

        // dd($validate);

        if($request->hasFile('imagen')){
            $path = Storage::disk('public')->put('maquinaria/', $request->file('imagen'));

            $validate['imagen'] = basename($path);
        }

        Maquinaria::create($validate);

        return redirect()->route('añadirMaquina');
    }

    /**
     * Display the specified resource.
     */
    // public function show(Maquinaria $maquinaria)
    // {

    //     if($maquinaria->stock <= $maquinaria->alquileres()->count()){

    //     }
        
    //     //Esto es para que trabajes con fecha actual no pasada
    //     $ver = $maquinaria->alquileres()->where('fecha_fin', '>', now())->get();


    //     return Inertia::render('Informacion',[
    //         'maquina'=>$maquinaria,
    //         'imagen' =>Storage::url('maquinaria/' . $maquinaria->imagen),
    //         'alquileres'=>$ver,
    //     ]);
    // }

    public function show(Maquinaria $maquinaria)
{
    //->where('fecha_fin', '>=', now()->startOfDay())
    $alquileres = $maquinaria->alquileres()
        ->where('fecha_fin', '>=', now())
        ->where('is_cancelled', '=', false)
        ->get(['fecha_inicio', 'fecha_fin']);

    return Inertia::render('Informacion', [
        'maquina'   => $maquinaria,
        'imagen'    => Storage::url('maquinaria/' . $maquinaria->imagen),
        'alquileres'=> $alquileres,
        'stock'     => $maquinaria->stock,   // <-- añadir esto
    ]);
}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Maquinaria $maquinaria)
    {
        //
    }

    public function detalleMaquina(Maquinaria $maquinaria){
        return Inertia::render('EditarMaquina',[
            'maquina'=>$maquinaria,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Maquinaria $maquinaria)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Maquinaria $maquinaria)
    {
        //
    }
}
