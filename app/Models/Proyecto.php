<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proyecto extends Model
{
    protected $fillable = [
        'nombre',
        'coste',
        'localizacion',
        'categoria',
        'imagen',
    ];

    public function historialProyectos(){
        return $this->hasMany(HistorialProyecto::class);
    }

    public function imagenes(){
        return $this->hasMany(ProyectoImagen::class);
    }
}
