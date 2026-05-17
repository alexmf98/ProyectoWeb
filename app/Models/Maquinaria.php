<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Maquinaria extends Model
{
    protected $fillable = [
        'nombre',
        'precio',
        'stock',
        'caracteristicas',
        'imagen',
        'categoria_id',
    ];
    
    public function alquileres(){
        return $this->hasMany(HistorialMaquinaria::class);
    }

    public function categoria(){
        return $this->belongsTo(Categoria::class);
    }
}
