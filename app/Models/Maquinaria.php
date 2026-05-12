<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Maquinaria extends Model
{
    protected $fillable = [
        'nombre',
        'categoria',
        'precio',
        'stock',
        'caracteristicas',
        'imagen',
    ];
    
    public function alquileres(){
        return $this->hasMany(HistorialMaquinaria::class);
    }
}
