<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InformacionEmpresa extends Model
{
    protected $fillable = [
        'descripcion',
        'telefono',
        'email',
        'localizacion',
    ];
}
