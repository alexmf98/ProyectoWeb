<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProyectoSolicitado extends Model
{
    protected $fillable = [
        'email',
        'tipo',
        'presupuesto',
        'estado',
        'user_id',
        'proyecto_id',
    ];

    protected $appends = ['presupuesto_url'];

    public function getPresupuestoUrlAttribute()
    {
        if($this->presupuesto){
            return asset('storage/presupuestos/' . $this->presupuesto);
        }
        return null;
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
