<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('historial_maquinarias', function (Blueprint $table) {
            $table->id();
            $table->date('fecha_inicio');
            $table->date('fecha_fin');
            $table->decimal('coste');
            $table->string('numero_tarjeta');
            $table->string('cvv');
            $table->string('pin');
            $table->boolean('is_cancelled');
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('maquinaria_id')->constrained('maquinarias');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('historial_maquinarias');
    }
};
