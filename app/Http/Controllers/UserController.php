<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{

    public function login(Request $request){
        
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

    
        if (Auth::attempt($credentials) && Auth::user()->is_active !== false) {
            $request->session()->regenerate();
    
            return redirect()->route('home');
        }
        

        if(Auth::user()?->is_active === false){
            return back()->withErrors([
                'is_active'=> 'Tu cuenta ha sido desactivada',
            ]);
        }

        return back()->withErrors([
            'email' => 'Las credenciales no son correctas',
        ])->onlyInput('email');
    }

    public function logout(Request $request){
        
        Auth::logout(); 
        
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        
        return redirect('/home');
    
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('view', User::class);

        return Inertia::render('EditarUsuario',[
            
            'usuarios'=>User::all()
    
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'=>'required',
            'apellido'=>'required',
            'email'=>'required',
            'password'=>'required',
            'segundo_apellido'=>'nullable',
        ]);
        
        $nombre = $request->input('name');
        $apellido = $request->input('apellido');
        $segundoapellido = $request->input('segundo_apellido');
        
        
        $existe = User::where('name', $nombre)
                        ->where('apellido', $apellido)
                        ->where('segundo_apellido', $segundoapellido)
                        ->exists();
    
        if($existe){
            return back()->withErrors([
                'errorcreate'=>"Ya existe ese usuario"
            ]);
        }

        $emailOcupado = User::where('email', $request->email)
                        ->exists();

        if ($emailOcupado) {
            return back()->withErrors([
                'erroremail' => 'Este email ya está en uso'
            ]);
        }
        
        $validated['password'] = Hash::make($request->password);
        $validated['role'] = 'usuario';

        User::create($validated);

        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials) && Auth::user()->is_active !== false) {
            $request->session()->regenerate();
    
            return redirect()->route('home');
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {

       
        $user = Auth::user();

        $validated = $request->validate([
            'name'=>'required',
            'apellido'=>'required',
            'email'=>'required',
            'password'=>'nullable',
            'dni'=>'nullable',
            'segundo_apellido'=>'nullable',
            'fecha_nacimiento'=>'nullable',
        ]);

        $existeDuplicado = User::where('name', $request->name)
                            ->where('apellido', $request->apellido)
                            ->where('segundo_apellido', $request->segundo_apellido)
                            ->where('id', '!=', $user->id)
                            ->exists();
     
        
        $emailOcupado = User::where('email', $request->email)
                            ->where('id', '!=', $user->id)
                            ->exists();

        $dniOcupado = $request->filled('dni') && User::where('dni', $request->dni)
                            ->where('id', '!=', $user->id)
                            ->exists();
        
        if ($dniOcupado) {
            return back()->withErrors([
                'dni' => 'Este DNI ya está en uso por otro usuario'
            ]);
        }

        if ($emailOcupado) {
            return back()->withErrors([
                'email' => 'Este email ya está en uso por otro usuario'
            ]);
        }
        
        if ($existeDuplicado) {
            return back()->withErrors([
                'errorupdate' => 'Ya existe un usuario con esos datos'
            ]);
        }

        
        if($request->filled('password')){
            $validated['password'] = Hash::make($request->password);
        }else{
            unset($validated['password']);
        }

        $user->update($validated);

        return redirect()->route('perfil');
    }

    public function updateAdmin(Request $request, $id)
    {
      
       
        Gate::authorize('update', User::class);

        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name'     => 'required',
            'apellido' => 'required',
            'email'    => 'required',
            'password' => 'nullable',
            'role'     => 'required|in:administrador,usuario,trabajador',
            'dni'=>'nullable',
            'segundo_apellido'=>'nullable',
            'fecha_nacimiento'=>'nullable',
        ]);

        $emailOcupado = User::where('email', $request->email)
                            ->where('id', '!=', $id)
                            ->exists();
                    
        $existeDuplicado = User::where('name', $request->name)
                            ->where('apellido', $request->apellido)
                            ->where('segundo_apellido', $request->segundo_apellido)
                            ->where('id', '!=', $id)
                            ->exists();

        $dniOcupado = $request->filled('dni') && User::where('dni', $request->dni)
                            ->where('id', '!=', $id)
                            ->exists();
        
        if ($dniOcupado) {
            return back()->withErrors([
                'dni' => 'Este DNI ya está en uso por otro usuario'
            ]);
        }

        if ($emailOcupado) {
            return back()->withErrors([
                'email' => 'Este email ya está en uso por otro usuario'
            ]);
        }
        
        if ($existeDuplicado) {
            return back()->withErrors([
                'errorupdate' => 'Ya existe un usuario con esos datos'
            ]);
        }

        if ($request->filled('password')) {
            $validated['password'] = Hash::make($request->password);
        } else {
            unset($validated['password']);
        }

        
        $user->update($validated);

        return redirect()->route('editAdmin');
    }


    public function desactivar(User $user){
        
       
        $user->update([
            'is_active'=>false,
        ]);

        return redirect()->route('logout');
    }

    public function desactivarAdmin(Request $request, User $user){
        $user->update([
            'is_active'=>$request->is_active,
        ]);
        
        return redirect()->route('editAdmin');
    }
}
