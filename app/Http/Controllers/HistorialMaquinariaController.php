<?php

namespace App\Http\Controllers;

use App\Models\HistorialMaquinaria;
use App\Models\Maquinaria;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HistorialMaquinariaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $historial = HistorialMaquinaria::with('maquinaria')->where('user_id', Auth::user()->id)->get()->map(function($h) {
            return [
                'id' => $h->id,
                'maquina_id' => $h->maquinaria_id,
                'fecha_inicio' => $h->fecha_inicio,
                'fecha_fin' => $h->fecha_fin,
                'coste' => $h->coste,
                'is_cancelled' => $h->is_cancelled,
                'maquinaria' => [
                    'nombre' => $h->maquinaria->nombre,
                    'imagen' => $h->maquinaria->imagen ? Storage::url('maquinaria/' 
                                                        . $h->maquinaria->imagen) : null,
                ],
            ];
        });
        
        return Inertia::render('HistorialMaquinariaUser', [
            'historial' => $historial,
            
        ]);
    }

    public function alquileres(){
        
        Gate::authorize('view', User::class);
        
        $alquileres = HistorialMaquinaria::with('maquinaria', 'user')->get();

        return Inertia::render('MaquinariaAlquiladaAdm',[
            'alquileres'=>$alquileres,
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

        /**
         * Comprobar que en la fecha inicio no se pueda alquilar si ya no hay stock ese dia
         * Comprobar solapamiento de fecha si el stock = 1
         */

        $maquina = Maquinaria::findOrFail($request->input('maquinaria_id'));

        $fecha_inicio = Carbon::parse($request->input('fecha_inicio'));
        $fecha_fin = Carbon::parse($request->input('fecha_fin'));

        $diferencia = $fecha_inicio->diffInDays($fecha_fin);

        if($diferencia == 0){
            $coste = $maquina->precio;    
        }else{

            $coste = $diferencia * $maquina->precio;
        }


        $validated = $request->validate([
            'fecha_inicio'=>'required',
            'fecha_fin'=>'required',
            'numero_tarjeta'=>'required',
            'cvv'=>'required',
            'pin'=>'required',
            'user_id'=>'exists:users,id',
            'maquinaria_id'=>'exists:maquinarias,id',
            
        ]);

        $validated['coste'] = $coste;
        $validated['is_cancelled'] = false;

        HistorialMaquinaria::create($validated);

        return redirect()->route('alquiler');
    }

    /**
     * Display the specified resource.
     */
    public function show(HistorialMaquinaria $historialMaquinaria)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HistorialMaquinaria $historialMaquinaria)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HistorialMaquinaria $historialMaquinaria)
    {
        $validated = $request->validate([
            'is_cancelled' =>'required',
        ]);

        $historialMaquinaria->update($validated);

        return redirect()->route('historialMaquinaria');
    }
    public function updateAdmin(Request $request, HistorialMaquinaria $historialMaquinaria){
        
        $request->validate([
            'is_cancelled'=>'required',
        ]);

        $historialMaquinaria->update([
            'is_cancelled'=>$request->is_cancelled,
        ]);

    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HistorialMaquinaria $historialMaquinaria)
    {
        //
    }
}
