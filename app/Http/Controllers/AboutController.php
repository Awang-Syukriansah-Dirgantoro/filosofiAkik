<?php

namespace App\Http\Controllers;

use App\Models\AdditionalInformation;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AboutController extends Controller
{
    public function index(Request $request)
    {
        $info = AdditionalInformation::first();
        $categories = Category::all();
        return Inertia::render('about', [
            'info' => $info,
            'categories' => $categories,
        ]);
    }
} 