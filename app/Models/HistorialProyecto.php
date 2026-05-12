<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HistorialProyecto extends Model
{
    protected $fillable = [
        'proyecto_id',
        'user_id',
    ];

    public function proyecto(){
        return $this->belongsTo(Proyecto::class);
    }
}
