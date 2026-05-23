<?php

namespace App\Http\Controllers;

use App\Models\Proyecto;
use App\Models\Trabajador;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TrabajadorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $proyectos = Proyecto::all();
        $trabajador = User::where('role', 'trabajador')->get();
        $nominas = Trabajador::with('user')->get()->map(function($dato){
            return[
                'id' => $dato->id,
                'fecha_nomina' => $dato->fecha_nomina,
                'nomina' => Storage::url($dato->nomina),
                'user_id'=>$dato->user_id,
                'proyecto_id'=>$dato->proyecto_id,
                'nombre' => $dato->user->name,
                'apellido' => $dato->user->apellido,
            ];
        });

        return Inertia::render('TrabajadorAdmin',[
            'proyectos'=>$proyectos,
            'trabajador'=>$trabajador,
            'nominas' => $nominas,
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
            'fecha_nomina'=>'required',
            'nomina'=>'required',
            'proyecto_id'=>'required|exists:proyectos,id',
            'user_id'=>'required|exists:users,id',
        ]);
        
        if($request->hasFile('nomina')){
            $path = Storage::disk('public')->put('nominas', $request->file('nomina'));
            $validate['nomina'] = $path;
        }

        Trabajador::create($validate);
    }

    /**
     * Display the specified resource.
     */
    public function show(Trabajador $trabajador)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Trabajador $trabajador)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Trabajador $trabajador)
    {
        $validate = $request->validate([
            'fecha_nomina'=>'required',
            'proyecto_id'=>'required|exists:proyectos,id',
            'user_id'=>'required|exists:users,id',
            'nomina'=>'nullable|mimes:pdf',
        ]);


        if($request->hasFile('nomina')){

            Storage::disk('public')->delete($trabajador->nomina);
            
            $path = Storage::disk('public')->put('nominas', $request->file('nomina'));
            $validate['nomina'] = $path;
        }

        $trabajador->update($validate);
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Trabajador $trabajador)
    {
        Storage::disk('public')->delete($trabajador->nomina);

        $trabajador->delete();
    }

    public function nomina(Request $request){

        $fecha_inicio = $request->input('fecha_inicio');
        $fecha_fin = $request->input('fecha_fin');

        $query = Trabajador::where('user_id', Auth::user()->id);

        if($fecha_inicio && $fecha_fin ){
            $query->whereBetween('fecha_nomina', [$fecha_inicio, $fecha_fin]);
        }

        $nomina = $query->get()
                        ->map(function($dato){
            return[
                'fecha_nomina'=>Carbon::parse($dato->fecha_nomina)->format('d/m/Y'),
                'nomina'=>Storage::url($dato->nomina),
            ];
        });


        return Inertia::render('NominaTrabajador',[
            'nomina'=>$nomina,
        ]);
    }

    public function proyectos(){

        // $proyectos = Trabajador::where('user_id', Auth::user()->id)->get();
        $proyectos = Trabajador::with('proyecto')->get()->map(function($dato){
            return[
                'proyecto'=>[
                    'nombre'=>$dato->proyecto->nombre,
                ]
            ];
        });

        return Inertia::render('ProyectoTrabaja',[
            'proyectos'=>$proyectos
        ]);
    }
}
