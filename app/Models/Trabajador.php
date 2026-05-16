<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trabajador extends Model
{
    protected $table = "trabajador";

    protected $fillable = [
        'fecha_nomina',
        'nomina',
        'proyecto_id',
        'user_id',
    ];

    public function proyecto(){
        return $this->belongsTo(Proyecto::class);
    }
}
