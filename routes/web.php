<?php

use App\Http\Controllers\HistorialMaquinariaController;
use App\Http\Controllers\HistorialProyectoController;
use App\Http\Controllers\MaquinariaController;
use App\Http\Controllers\ProyectoController;
use App\Http\Controllers\ProyectoSolicitadoController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/home');
});

Route::get('/home', function(){
    return Inertia::render('Home');
})->name('home');

Route::get('/alquileres', function(){
    return Inertia::render('Alquileres');
});

Route::get('/trabajar', function(){
    return Inertia::render('Trabajar');
});

Route::get('/proyectos', function(){
    return Inertia::render('Proyectos');
});

Route::get('/contactenos', function(){
    return Inertia::render('Contactenos');
});

Route::get('/restauracion', function(){
    return Inertia::render('Restauracion');
});

Route::get('/adecuacion', function(){
    return Inertia::render('Adecuacion');
});

Route::get('/personal', function(){
    return Inertia::render('Personal');
});

Route::get('/login', function(){
    return Inertia::render('Login');
});

Route::post('/login', [UserController::class, 'login']);

Route::get('/crearcuenta', function(){
    return Inertia::render('CrearCuenta');
});

Route::post('/crearcuenta',[UserController::class, 'store']);


Route::get('/perfil', function(){
    return Inertia::render('Perfil');
})->name('perfil');

Route::get('/alquileres', [MaquinariaController::class, 'index'])->name('alquiler');
Route::get('informacion/{maquinaria}', [MaquinariaController::class, 'show']);

Route::middleware('auth')->group(function(){

    Route::get('/logout', [UserController::class, 'logout'])->name('logout');
    Route::post('/logout', [UserController::class, 'logout']);
    
    Route::get('/editPerfil', function(){
        return Inertia::render('EditPerfil');
    });

    Route::post('/editPerfil', [UserController::class, 'update']);
    Route::post('/eliminarPerfil', [UserController::class, 'destroy']);

    Route::post('/desactivarPerfil/{user}', [UserController::class, 'desactivar']);

    Route::post('/maquinariaAlquiler', [HistorialMaquinariaController::class, 'store']);

    Route::get('/historialmaquinaria', [HistorialMaquinariaController::class, 'index'])
        ->name('historialMaquinaria');

    Route::put('/cancelarAlquiler/{historialMaquinaria}', [HistorialMaquinariaController::class, 'update']);

    Route::get('/historialProyectos', [HistorialProyectoController::class, 'index']);

    Route::post('/crearproyectosolicitado', [ProyectoSolicitadoController::class, 'store']);
    
    Route::get('/proyectoSolicitado', [ProyectoSolicitadoController::class, 'index']);
    
    //Admin
    Route::get('/editarUsuarios', [UserController::class, 'index'])->name('editAdmin');
    Route::put('/editarUsuario/{id}', [UserController::class, 'updateAdmin']);
    Route::put('/desactivarPerfilAdmin/{user}', [UserController::class, 'desactivarAdmin']);

    Route::get('/añadirmaquina', [MaquinariaController::class, 'añadirMaquinaria'])->name('añadirMaquina');
    Route::post('/añadirMaquina', [MaquinariaController::class, 'store']);
    Route::get('/detallemaquina/{maquinaria}', [MaquinariaController::class, 'detalleMaquina']);
    Route::put('editarMaquinaria/{maquinaria}', [MaquinariaController::class, 'update']);

    Route::get('/añadirproyecto', function(){
        return Inertia::render('ProyectoAdmin');
    });

    Route::get('/maquinariaAlquilada', [HistorialMaquinariaController::class, 'alquileres']);

    Route::put('/cancelarAlquilerAdmin/{historialMaquinaria}', 
        [HistorialMaquinariaController::class, 'updateAdmin']);

    
    Route::get('/añadirproyecto', [ProyectoController::class, 'index']);
    Route::post('/añadirproyecto', [ProyectoController::class, 'store']);
    Route::get('/proyectoPersonalAdm', [ProyectoController::class, 'indexAdm']);
    Route::post('/subirimagen/{proyecto}', [ProyectoController::class, 'subirImagenes']);
    Route::get('/verimagenes/{proyecto}', [ProyectoController::class, 'verImagenes']);
    Route::delete('/eliminarImagen/{proyectoImagen}', [ProyectoController::class, 'eliminarImagen']);

    Route::get('/proyectosSolicitados', [ProyectoSolicitadoController::class, 'indexAdmin']);
    Route::put('/proyectosSolicitados/{proyectoSolicitado}', [ProyectoSolicitadoController::class, 'update']);
});