<?php

namespace App\Http\Controllers;

use App\Models\Proyecto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EdicionController extends Controller
{
    public function index(){

        $proyecto = Proyecto::where('categoria', '!=', 'personal')->get();

        return Inertia::render('EdicionPagina',[
            'proyecto'=>$proyecto,
        ]);
    }

    public function mostrarImagen(){

        $imagen = Proyecto::where('show_home', true)
                    ->take(3)
                    ->get()
                    ->map(function($dato){
                        return [
                            'nombre'=>$dato->nombre,
                            'localizacion'=>$dato->localizacion,
                            'imagen'=> $dato->categoria === 'adecuacion' ?
                                Storage::url('proyectos/adecuacion/'. $dato->imagen) 
                                
                                : Storage::url('proyectos/restauracion/'. $dato->imagen),
                        ];
                    });

        return Inertia::render('Home',[
            'imagen'=>$imagen,
        ]);
    }

    public function show_imagen(Request $request, Proyecto $proyecto){

        $validate = $request->validate([
            'show_home'=>'required',
        ]);

        $proyecto->update([
            'show_home'=>$validate['show_home'],
        ]);

    }
}
