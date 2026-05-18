<?php

namespace App\Http\Controllers;

use App\Models\FacturacionProyecto;
use App\Models\Proyecto;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FacturacionProyectoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $proyectos = Proyecto::whereDoesntHave('facturas')->get();

        $fecha_inicio = $request->input('fecha_inicio');
        $fecha_fin = $request->input('fecha_fin');


        $query = FacturacionProyecto::query();

        if($fecha_inicio && $fecha_fin){
            $query->whereBetween('fecha_facturacion', [$fecha_inicio, $fecha_fin]);
        }

        $facturacion = $query->with('proyecto')->get()->map(function($dato){
            return[
                'id'=> $dato->id,
                'fecha_facturacion' => Carbon::parse($dato->fecha_facturacion)->format('d/m/Y'),
                'factura'=>Storage::url('facturacionProyecto/' . $dato->factura),
                'proyecto_id'=>[
                    'id' => $dato->proyecto->id,
                    'nombre' => $dato->proyecto->nombre,
                ]
            ];
        });
       
        return Inertia::render('FacturaProyecto',[
            'proyectos'=>$proyectos,
            'facturacion'=>$facturacion,
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
            'fecha_facturacion'=>'required',
            'factura'=>'required',
            'proyecto_id'=>'exists:proyectos,id',
        ]);
        
        if($request->hasFile('factura')){
            $path = Storage::disk('public')->put('facturacionProyecto/', $request->file('factura'));
            $validate['factura'] = basename($path);
            
        }

      
        FacturacionProyecto::create($validate);

    }

    /**
     * Display the specified resource.
     */
    public function show(FacturacionProyecto $facturacionProyecto)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FacturacionProyecto $facturacionProyecto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FacturacionProyecto $facturacionProyecto)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FacturacionProyecto $facturacionProyecto)
    {
        //
    }
}
