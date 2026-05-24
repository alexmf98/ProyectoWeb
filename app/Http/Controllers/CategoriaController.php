<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    public function store(Request $request){

        
        $validated = $request->validate([
            'categoria'=>'required',
        ]);
        
        $validated['is_active'] = true;

        Categoria::create($validated);

        return redirect()->back();
    }

    public function update(Request $request, Categoria $categoria){

        $validate = $request->validate([
            'categoria' => 'string',
            'is_active' => 'boolean',
        ]);
    
        $categoria->update($validate);
    }
}
