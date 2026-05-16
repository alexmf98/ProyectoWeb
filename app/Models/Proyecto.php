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
        'show_home',
    ];

    public function historialProyectos(){
        return $this->hasMany(HistorialProyecto::class);
    }

    public function imagenes(){
        return $this->hasMany(ProyectoImagen::class);
    }

    public function facturas(){
        return $this->hasMany(FacturacionProyecto::class);
    }

    // public function trabajadores(){
    //     return $this->hasMany(Trabajador::class);
    // }
}
