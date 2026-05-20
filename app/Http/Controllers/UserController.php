<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        return Inertia::render('EditarUsuario',[
            
            'usuarios'=>User::all()
    
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
        ]);

        $nombre = $request->input('name');
        $apellido = $request->input('apellido');
        $email = $request->input('email');

        $existe = User::where('name', $nombre)
                        ->where('apellido', $apellido)
                        ->where('email', $email)->exists();

        if($existe){
            return back()->withErrors([
                'errorcreate'=>"Ya existe ese usuario"
            ]);
        }

        $validated['password'] = Hash::make($request->password);
        $validated['role'] = 'usuario';

        User::create($validated);

        return redirect()->route('home');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
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
            'email'=>'required|unique:users,email,' . $user->id,
            'password'=>'nullable',
        ]);


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
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name'     => 'required',
            'email'    => 'required|unique:users,email,' . $user->id,
            'password' => 'nullable',
            'role'     => 'required|in:administrador,usuario,trabajador',
        ]);

        if ($request->filled('password')) {
            $validated['password'] = Hash::make($request->password);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return redirect()->route('editAdmin');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        // $user = Auth::user();

        // $user->delete();

        // return redirect()->route('home');
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
