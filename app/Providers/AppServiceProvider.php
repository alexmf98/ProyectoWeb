<?php

namespace App\Providers;

use App\Models\CurriculumVitae;
use App\Models\FacturacionMaquinaria;
use App\Models\FacturacionProyecto;
use App\Models\HistorialMaquinaria;
use App\Models\HistorialProyecto;
use App\Models\Maquinaria;
use App\Models\Proyecto;
use App\Models\ProyectoSolicitado;
use App\Models\Trabajador;
use App\Models\User;
use App\Policies\CurriculumVitaePolicy;
use App\Policies\FacturacionMaquinariaPolicy;
use App\Policies\FacturacionProyectoPolicy;
use App\Policies\HistorialMaquinariaPolicy;
use App\Policies\HistorialProyectoPolicy;
use App\Policies\MaquinariaPolicy;
use App\Policies\ProyectoPolicy;
use App\Policies\ProyectoSolicitadoPolicy;
use App\Policies\TrabajadorPolicy;
use App\Policies\UserPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::policy(User::class, UserPolicy::class);
        Gate::policy(Maquinaria::class, MaquinariaPolicy::class);
        Gate::policy(Proyecto::class, ProyectoPolicy::class);
        Gate::policy(HistorialMaquinaria::class, HistorialMaquinariaPolicy::class);
        Gate::policy(ProyectoSolicitado::class, ProyectoSolicitadoPolicy::class);
        Gate::policy(FacturacionProyecto::class, FacturacionProyectoPolicy::class);
        Gate::policy(FacturacionMaquinaria::class, FacturacionMaquinariaPolicy::class);
        Gate::policy(Trabajador::class, TrabajadorPolicy::class);

        Gate::define('edicion', function(User $user){
            return $user->role === 'administrador';
        });

        Gate::policy(CurriculumVitae::class, CurriculumVitaePolicy::class);
        Gate::policy(HistorialProyecto::class, HistorialProyectoPolicy::class);
    }
}
