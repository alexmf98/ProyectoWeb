<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certificado extends Model
{
    protected $fillable = [
        'certificado',
        'fecha_certificado',
        'proyecto_imagen_id',
    ];

    public function proyectoImagen(){
        return $this->belongsTo(ProyectoImagen::class);
    }
}
