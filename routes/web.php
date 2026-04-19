<?php

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

Route::post('login', function(Request $request){
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();

        return redirect()->route('home');
    }

    return back()->withErrors([
        'email' => 'The provided credentials do not match our records.',
    ])->onlyInput('email');

});

Route::middleware('auth')->group(function(){
    Route::post('/logout', function(Request $request){
        Auth::logout(); 
        
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        
        return redirect('/home');
    })->name('logout');
});