<?php

namespace App\Http\Controllers;

use App\Models\FacturacionMaquinaria;
use App\Models\HistorialMaquinaria;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class FacturacionMaquinariaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        Gate::authorize('view', User::class);
        
        $fecha_inicio = $request->input('fecha_inicio');
        $fecha_fin = $request->input('fecha_fin');

        $query = HistorialMaquinaria::query();

        if($fecha_inicio && $fecha_fin){
            $query->where('fecha_inicio', '<=' , $fecha_fin)
                    ->where('fecha_fin','>=', $fecha_inicio);
        }


        $historial = $query->with(['maquinaria','user'])
                                        ->where('is_cancelled', false)
                                        ->get()
                                        ->map(function($dato){
                                            return[
                                                'id' => $dato->maquinaria_id,
                                                'coste'=>$dato->coste,
                                                'fecha_inicio'=>Carbon::parse($dato->fecha_inicio)->format('d/m/Y'),
                                                'fecha_fin'=>Carbon::parse($dato->fecha_fin)->format('d/m/Y'),
                                                'maquinaria'=>[
                                                    'id'=>$dato->maquinaria->id,
                                                    'nombre'=>$dato->maquinaria->nombre,
                                                ],
                                                'user'=>[
                                                    'name'=>$dato->user->name,
                                                    'apellido'=>$dato->user->apellido,
                                                ]
                                            ];
                                        });

        return Inertia::render('FacturaMaquina',[
            'historial'=>$historial,
        ]);
    }

}
