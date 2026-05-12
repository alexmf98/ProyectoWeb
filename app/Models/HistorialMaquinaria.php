<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HistorialMaquinaria extends Model
{
    protected $fillable = [
        'fecha_inicio',
        'fecha_fin',
        'coste',
        'numero_tarjeta',
        'cvv',
        'pin',
        'user_id',
        'maquinaria_id',
        'is_cancelled',
    ];

    public function maquinaria(){
        return $this->belongsTo(Maquinaria::class);
    }

    // public function usuario(){
    //     return $this->belongsTo(User::class, 'user_id', 'id');
    // }
    public function user(){
        return $this->belongsTo(User::class);
    }
}
