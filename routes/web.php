<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/home', function(){
    return Inertia::render('Home');
});

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