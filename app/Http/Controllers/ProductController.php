<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\AdditionalInformation;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function show($id)
    {
        $product = Product::with(['categories'])->findOrFail($id);
        $product->increment('view');
        $info = AdditionalInformation::first();
        $categories = Category::all();
        return Inertia::render('detail', [
            'products' => $product,
            'info' => $info,
            'categories' => $categories,
        ]);
    }
} 