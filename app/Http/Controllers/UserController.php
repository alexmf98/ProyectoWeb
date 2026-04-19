<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
            'email'=>'required',
            'password'=>'required',
        ]);

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
            'email'=>'required',
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user = Auth::user();

        $user->delete();

        return redirect()->route('home');
    }
}
