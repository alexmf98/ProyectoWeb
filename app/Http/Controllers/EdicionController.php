<?php

namespace App\Http\Controllers;

use App\Models\EmpresaColaboradora;
use App\Models\Proyecto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EdicionController extends Controller
{
    public function index(){

        $proyecto = Proyecto::where('categoria', '!=', 'personal')->get();

        $empresaColaboradora = EmpresaColaboradora::all()->map(function($dato){
            return[
                'id'=>$dato->id,
                'imagen'=>Storage::url('colaboradoras/' . $dato->imagen),
            ];
        });

        return Inertia::render('EdicionPagina',[
            'proyecto'=>$proyecto,
            'empresa'=>$empresaColaboradora,
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

        $empresaColaboradora = EmpresaColaboradora::all()->map(function($dato){
            return[
                'id'=>$dato->id,
                'imagen'=>Storage::url('colaboradoras/' . $dato->imagen),
            ];
        });

        return Inertia::render('Home',[
            'imagen'=>$imagen,
            'empresa'=>$empresaColaboradora,
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

    public function empresa(Request $request){
        $validate = $request->validate([
            'imagen'=>'required',
        ]);

        if($request->hasFile('imagen')){
            $path = Storage::disk('public')->put('colaboradoras/', $request->file('imagen'));
            $validate['imagen'] = basename($path);  
        }

        EmpresaColaboradora::create($validate);

        return redirect()->back();
    }

    public function eliminar(EmpresaColaboradora $empresa){
        Storage::delete('colaboradoras/'. $empresa->imagen);

        $empresa->delete();

        return redirect()->back();
    }
}
