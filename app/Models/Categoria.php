<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    protected $fillable = [
        'categoria',
        'is_active'
    ];


    public function maquinarias(){
        return $this->hasMany(Maquinaria::class);
    }
}
