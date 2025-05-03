<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AboutController;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/product/{id}', [ProductController::class, 'show'])->name('product.show');

Route::get('/about', [AboutController::class, 'index'])->name('about');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
