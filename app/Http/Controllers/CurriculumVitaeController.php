<?php

namespace App\Http\Controllers;

use App\Models\CurriculumVitae;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CurriculumVitaeController extends Controller
{
    public function index(){

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
            'email'=>'email|required',
            'cv'=>'file|mimes:pdf',
        ]);

        if($request->hasFile('cv')){
            $path = Storage::disk('public')->put('cvitaes/', $request->file('cv'));
            $validate['cv'] = basename($path);

        }
      
        CurriculumVitae::create($validate);

        return redirect()->back();
    }

}
