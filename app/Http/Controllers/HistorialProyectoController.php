<?php

namespace App\Http\Controllers;

use App\Models\HistorialProyecto;
use App\Models\Proyecto;
use App\Models\ProyectoImagen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HistorialProyectoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $historial = HistorialProyecto::where('user_id', '=', Auth::user()->id)->get();

        //Usar la relacion con proyecto para sacar el nombre coste imagenes

        // $historial = HistorialProyecto::with('proyecto')->get();
        $historial = HistorialProyecto::with('proyecto')->get()->map(function($dato){
            return[
                'id'=>$dato->id,
                'proyecto'=>[
                    'id'=> $dato->proyecto->id,
                    'nombre'=>$dato->proyecto->nombre,
                    'coste'=>$dato->proyecto->coste,
                    'localizacion'=>$dato->proyecto->localizacion,
                    'imagen'=>Storage::url('proyectos/' . $dato->proyecto->imagen),
                ]
            ];
        });
        
        return Inertia::render('HistorialProyec',[
            'historial'=>$historial,

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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(HistorialProyecto $historialProyecto)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HistorialProyecto $historialProyecto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HistorialProyecto $historialProyecto)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HistorialProyecto $historialProyecto)
    {
        //
    }
}
