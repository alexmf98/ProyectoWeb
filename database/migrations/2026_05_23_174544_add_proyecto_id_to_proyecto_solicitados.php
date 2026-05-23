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
        Schema::table('proyecto_solicitados', function (Blueprint $table) {
            $table->foreignId('proyecto_id')->nullable()->constrained('proyectos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('proyecto_solicitados', function (Blueprint $table) {
            $table->dropColumn('proyecto_id');
        });
    }
};
