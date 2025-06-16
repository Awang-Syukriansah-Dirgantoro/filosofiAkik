<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\AdditionalInformation;
use App\Models\Category;
use App\Models\Carousel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('categories');
        // Filter by search
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('nama', 'like', "%$search%")
                  ->orWhere('alias', 'like', "%$search%")
                  ->orWhere('badge', 'like', "%$search%")
                  ->orWhere('description', 'like', "%$search%")
                  ->orWhere('origin', 'like', "%$search%")
                  ->orWhere('color', 'like', "%$search%")
                  ->orWhere('shape', 'like', "%$search%")
                  ->orWhere('cut', 'like', "%$search%")
                  ;
            });
        }
        // Filter by category
        if ($request->filled('category')) {
            $category = $request->input('category');
            $query->whereHas('categories', function($q) use ($category) {
                $q->where('id', $category);
            });
        }
        $products = $query->latest()->paginate(12)->withQueryString();
        $info = AdditionalInformation::first();
        $categories = Category::all();
        $carousel = Carousel::all();
        // dd($categories);
        
        return Inertia::render('home', [
            'products' => $products,
            'info' => $info,
            'categories' => $categories,
            'carousel' => $carousel,
        ]);
    }
}
