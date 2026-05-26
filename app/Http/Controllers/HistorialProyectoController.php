<?php

namespace App\Http\Controllers;

use App\Models\HistorialProyecto;
use App\Models\Proyecto;
use App\Models\ProyectoImagen;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HistorialProyectoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        Gate::authorize('view', HistorialProyecto::class);

        Gate::authorize('view', HistorialProyecto::class);

    $historial = HistorialProyecto::with('proyecto')
        ->where('user_id', Auth::user()->id) 
        ->get()
        ->map(function($dato){
            return[
                'id' => $dato->id,
                'proyecto' => [
                    'id'          => $dato->proyecto->id,
                    'nombre'      => $dato->proyecto->nombre,
                    'coste'       => $dato->proyecto->coste,
                    'localizacion'=> $dato->proyecto->localizacion,
                    'imagen'      => Storage::url('proyectos/' . $dato->proyecto->imagen),
                ]
            ];
        });
        
        return Inertia::render('HistorialProyec',[
            'historial'=>$historial,

        ]);
    }
    
}
