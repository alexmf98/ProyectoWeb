<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\HistorialMaquinaria;
use App\Models\Maquinaria;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MaquinariaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        // $maquinas = Maquinaria::all()->map(function($dato){
        //     return [
        //         'id' => $dato->id,
        //         'nombre' => $dato->nombre,
        //         'caracteristicas' => $dato->caracteristicas,
        //         'imagen' => Storage::url('maquinaria/' . $dato->imagen),
        //     ];
        // });

        $maquinas = Maquinaria::query();

        if ($buscar = $request->query('nombre')) {
            $maquinas->whereLike('nombre', "%$buscar%", false);
        }

        $maquinas = $maquinas->where('show_maquina', true)->get()->map(function ($dato) {
            return [
                'id' => $dato->id,
                'nombre' => $dato->nombre,
                'caracteristicas' => $dato->caracteristicas,
                'imagen' => Storage::url('maquinaria/' . $dato->imagen),
            ];
        });

        return Inertia::render('Alquileres', [
            'maquinas' => $maquinas,
        ]);
    }

    public function añadirMaquinaria(){
        
        Gate::authorize('view', User::class);

        $categoria = Categoria::where('is_active', true)->get();
        $c = Categoria::all();

        return Inertia::render('MaquinariaAdmin',[
            'Categoria'=>$categoria,
            'cat'=>$c,
        ]);
    
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
            'precio'=>'required',
            'stock'=>'required',
            'caracteristicas'=>'required',
            'imagen'=>'nullable',
            'categoria_id'=>"exists:categorias,id",
        ]);


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

        Gate::authorize('view', User::class);

        $categorias = Categoria::all();
        return Inertia::render('EditarMaquina',[
            'maquina'=>$maquinaria,
            'categorias' =>$categorias, 
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Maquinaria $maquinaria)
    {
        $validate = $request->validate([
            'nombre' => 'required',
            'categoria_id'=>'required',
            'precio' => 'required',
            'stock'=>'required',
            'caracteristicas'=>'required',
            'imagen' => 'nullable|mimes:jpg,png,jpeg',
        ]);

    
        if($request->hasFile('imagen')){
            
            // borrar imagen antigua
            Storage::disk('public')->delete('maquinaria/' . $maquinaria->imagen);
    
            // guardar nueva
            $path = Storage::disk('public')->put('maquinaria', $request->file('imagen'));
    
            $validate['imagen'] = basename($path);
        }

        $maquinaria->update($validate);
    
        return redirect()->route('alquiler');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Maquinaria $maquinaria)
    {
        //
    }

    public function ocultar(){

        Gate::authorize('view', User::class);

        $maquinas = Maquinaria::all()->map(function ($dato) {
            return [
                'id' => $dato->id,
                'show_maquina'=>$dato->show_maquina,
                'nombre' => $dato->nombre,
                'caracteristicas' => $dato->caracteristicas,
                'imagen' => Storage::url('maquinaria/' . $dato->imagen),
            ];
        });

        return Inertia::render('OcultarMaquinariaAdm',[
            'maquinas'=>$maquinas,
        ]);
    }

    public function updateocultar(Request $request, Maquinaria $maquinaria){
        $validate = $request->validate([
            'show_maquina'=>'required',
        ]);

        $maquinaria->update($validate);

        return redirect()->back();
    }
}
