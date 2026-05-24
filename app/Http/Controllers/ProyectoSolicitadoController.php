<?php

namespace App\Http\Controllers;

use App\Models\HistorialProyecto;
use App\Models\ProyectoSolicitado;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProyectoSolicitadoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        // $pSolicitado = ProyectoSolicitado::where('user_id', '=', Auth::user()->id)->get();
        $pSolicitado = ProyectoSolicitado::where('user_id', '=', Auth::user()->id)->get()->map(function($dato){
            return [
                'id' => $dato->id,
                'email' =>$dato->email,
                'tipo' =>$dato->tipo,
                'estado'=>$dato->estado,
                'presupuesto'=>$dato->presupuesto_url,
            ];
        });

        

        return Inertia::render('ProyectoSolicitadoUser',[
            'proyecto'=>$pSolicitado,
            
        ]);
        
    }

    public function indexAdmin(){
        
        Gate::authorize('view', User::class);
        
        // $pSolicitado = ProyectoSolicitado::with('user')->get();
        $pSolicitado = ProyectoSolicitado::with('user')->get()->map(function($dato){
            return [
                'id' => $dato->id,
                'email' => $dato->email,
                'tipo' => $dato->tipo,
                'estado' => $dato->estado,
                'proyecto_id' => $dato->proyecto_id,
                'presupuesto_url' => $dato->presupuesto_url,
                'user' => $dato->user,
            ];
        });
        $proyecto_personal = ProyectoSolicitado::with('user')->where('estado', '=', 'aceptado')->get();

        // $proyectos_personales = HistorialProyecto::with('proyecto')
        //                     ->get()
        //                     ->map(function($dato){
        //                         return [
        //                             'id' => $dato->proyecto->id,
        //                             'nombre' => $dato->proyecto->nombre,
        //                             'user_id' => $dato->user_id,
        //                         ];
        //                     });

        return Inertia::render('ProyectoSolicitadoAdm',[
            'proyectoSolicitado' => $pSolicitado,
            'usuario_aceptado' => $proyecto_personal,
            // 'proyectos'=>$proyectos_personales,
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

        $validated = $request->validate([
            'email'=>'required',
            'tipo'=>'required',
            'user_id'=>'exists:users,id',
        ]);

        $validated['estado'] = 'pendiente';

        ProyectoSolicitado::create($validated);

        return redirect()->route('contactenos');
    }

    /**
     * Display the specified resource.
     */
    public function show(ProyectoSolicitado $proyectoSolicitado)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProyectoSolicitado $proyectoSolicitado)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProyectoSolicitado $proyectoSolicitado)
    {
        
        $validate = $request->validate([
            'presupuesto'=>'nullable',
            'estado'=>'required',
        ]);

        if($request->hasFile('presupuesto')){
            $path = Storage::disk('public')->put('presupuestos/', $request->file('presupuesto'));

            $validate['presupuesto'] = basename($path);
        }
        
        $proyectoSolicitado->update($validate);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProyectoSolicitado $proyectoSolicitado)
    {
        //
    }
}
