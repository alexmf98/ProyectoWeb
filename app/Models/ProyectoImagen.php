<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProyectoImagen extends Model
{
    protected $table = "proyecto_imagenes";

    protected $fillable = [
        'imagen',
        'proyecto_id',
        'descripcion',
    ];

    public function proyecto(){
        return $this->belongsTo(Proyecto::class);
    }

    public function certificados(){
        return $this->hasMany(Certificado::class);
    }
}
