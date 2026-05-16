<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FacturacionProyecto extends Model
{
    protected $fillable = [
        'fecha_facturacion',
        'factura',
        'proyecto_id',
    ];

    public function proyecto(){
        return $this->belongsTo(Proyecto::class);
    }
}
