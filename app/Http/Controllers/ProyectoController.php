<?php

namespace App\Http\Controllers;

use App\Models\HistorialProyecto;
use App\Models\Proyecto;
use App\Models\ProyectoImagen;
use App\Models\ProyectoSolicitado;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProyectoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $usuarios = User::where('role', '=', 'usuario')->get();

        $proyecto_personal = ProyectoSolicitado::with('user')->where('estado', '=', 'aceptado')->get();

        return Inertia::render('ProyectoAdmin',[
            'usuarios'=>$usuarios,
            'usuario_aceptado' => $proyecto_personal,
        ]);
    }

    public function indexAdm(){
        $proyecto = Proyecto::all();

        return Inertia::render('ProyectoPersonalAdm',[
            'proyectos'=>$proyecto,
        ]);
    }

    public function subirImagenes(Request $request, Proyecto $proyecto){

        $request->validate([
            'imagenes' => 'required|array',
            'imagenes.*' => 'image|mimes:jpg,png,jpeg',
        ]);
    
        foreach ($request->file('imagenes') as $imagen) {
            $path = $imagen->store('proyectos', 'public');
            ProyectoImagen::create([
                'proyecto_id' => $proyecto->id,
                'imagen' => $path,
            ]);
        }
    
        return redirect()->back();
    }

    public function verImagenes(Proyecto $proyecto){

        $imagenes = $proyecto->imagenes->map(function($img){
            return [
                'id' => $img->id,
                'url' => Storage::url($img->imagen),
            ];
        });

        return Inertia::render('ImagenesProyecto', [
            'proyecto' => $proyecto,
            'imagenes' => $imagenes,
        ]);
    }

    public function eliminarImagen(ProyectoImagen $proyectoImagen){
        Storage::disk('public')->delete($proyectoImagen->imagen);
        $proyectoImagen->delete();
    
        return redirect()->back();
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

        $user_id = $request->user_id;
        if($user_id){
            $validated = $request->validate([
                'nombre'=>'required',
                'coste'=>'required',
                'localizacion'=>'required',
                'categoria'=>'required',
                'imagen'=>'nullable',
                'user_id'=>'exists:users,id',
            ]);

            if($request->hasFile('imagen')){
                $path = Storage::disk('public')->put('proyectos/', $request->file('imagen'));
                $validated['imagen'] = basename($path);
            }
            
           $id_proyecto = Proyecto::create($validated);

           HistorialProyecto::create([
                'proyecto_id'=>$id_proyecto->id,
                'user_id'=>$validated['user_id'],
           ]);

           $actualizar_estado = ProyectoSolicitado::where('user_id', '=', $validated['user_id'])
                                                    ->where('estado', '=' ,'aceptado')
                                                    ->first();

           $actualizar_estado->update([
            'estado'=>'realizado',
           ]);
            
        }else{
            $validated = $request->validate([
                'nombre'=>'required',
                'coste'=>'required',
                'localizacion'=>'required',
                'categoria'=>'required',
                'imagen'=>'nullable',
            ]);

            if($request->hasFile('imagen')){
                if($validated['categoria'] === 'adecuacion'){

                    $path = Storage::disk('public')->put('proyectos/adecuacion', $request->file('imagen'));
                    $validated['imagen'] = basename($path);
                }else{
                    $path = Storage::disk('public')->put('proyectos/restauracion', $request->file('imagen'));
                    $validated['imagen'] = basename($path);
                    
                }
            }


            Proyecto::create($validated);
        }
    }

    public function proyecto(){
        
        $adecuacion = Proyecto::where('categoria', '=', 'adecuacion')->get()->map(function($dato){
            return [
                'nombre'=>$dato->nombre,
                'coste'=>$dato->coste,
                'localizacion'=>$dato->localizacion,
                'imagen'=>Storage::url('/proyectos/adecuacion/'.$dato->imagen),
            ];
        });

        $restauracion = Proyecto::where('categoria', '=', 'restauracion')->get()->map(function($dato){
            return [
                'nombre'=>$dato->nombre,
                'coste'=>$dato->coste,
                'localizacion'=>$dato->localizacion,
                'imagen'=>Storage::url('/proyectos/restauracion/'.$dato->imagen),
            ];
        });
        
        return Inertia::render('Proyectos',[
            'adecuacion'=>$adecuacion,
            'restauracion'=>$restauracion,
        ]);
    }

    public function proyectoAdecuacion(){

        $adecuacion = Proyecto::where('categoria', '=', 'adecuacion')->get()->map(function($dato){
            return [
                'nombre'=>$dato->nombre,
                'coste'=>$dato->coste,
                'localizacion'=>$dato->localizacion,
                'imagen'=>Storage::url('/proyectos/adecuacion/'.$dato->imagen),
            ];
        });

        return Inertia::render('Adecuacion',[
            'adecuacion'=>$adecuacion,
        ]);
    }

    public function proyectoRestauracion(){

        $restauracion = Proyecto::where('categoria', '=', 'restauracion')->get()->map(function($dato){
            return [
                'nombre'=>$dato->nombre,
                'coste'=>$dato->coste,
                'localizacion'=>$dato->localizacion,
                'imagen'=>Storage::url('/proyectos/restauracion/'.$dato->imagen),
            ];
        });

        return Inertia::render('Restauracion',[
            'restauracion'=>$restauracion,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Proyecto $proyecto)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Proyecto $proyecto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Proyecto $proyecto)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Proyecto $proyecto)
    {
        //
    }
}
