<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FacturacionMaquinaria extends Model
{
    protected $fillable = [
        'fecha_facturacion',
        'factura',
        'maquinaria_id',
    ];

    public function historial_maquinaria(){
        return $this->belongsTo(HistorialMaquinaria::class);
    }
}
