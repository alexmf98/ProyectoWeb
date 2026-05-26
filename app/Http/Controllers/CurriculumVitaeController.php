<?php

namespace App\Http\Controllers;

use App\Models\CurriculumVitae;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CurriculumVitaeController extends Controller
{
    public function index(){

        Gate::authorize('view', User::class);

        $cv = CurriculumVitae::all()->map(function($dato){
            return [
                'id'=>$dato->id,
                'email'=>$dato->email,
                'cv'=>Storage::url('cvitaes/' . $dato->cv),
            ];
        });

        return Inertia::render('CurriculumVitae',[
            'cv' => $cv,
        ]);
    }

    public function store(Request $request){
        $validate = $request->validate([
            'email' => 'email|required|unique:curriculum_vitaes,email',
            'cv'=>'file|mimes:pdf',
        ],[
            'email.unique' => 'Este email no esta disponible',
        ]);

        if($request->hasFile('cv')){
            $path = Storage::disk('public')->put('cvitaes/', $request->file('cv'));
            $validate['cv'] = basename($path);

        }
      
        CurriculumVitae::create($validate);

        return redirect()->back();
    }

    public function destroy(CurriculumVitae $id) {
        
        if($id){
            Storage::disk('public')->delete('cvitaes/'.$id->cv);
        }

        $id->delete();
    }
}
