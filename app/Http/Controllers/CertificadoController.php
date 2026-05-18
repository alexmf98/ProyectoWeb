<?php

namespace App\Http\Controllers;

use App\Models\Certificado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CertificadoController extends Controller
{
    public function store(Request $request){
        $validate = $request->validate([
            'certificado'=>'required',
            'fecha_certificado'=>'required',
            'proyecto_imagen_id'=>'exists:proyecto_imagenes,id',
        ]);

        if($request->hasFile('certificado')){
            $path = Storage::disk('public')->put('certificados/', $request->file('certificado'));
            $validate['certificado']= basename($path);
        }

        Certificado::create($validate);

        return redirect()->back();
    }   
}
