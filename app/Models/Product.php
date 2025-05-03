<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'alias',
        'badge',
        'stock',
        'view',
        'price',
        'limited',
        'negoable',
        'number',
        'date',
        'weight',
        'diameter',
        'cut',
        'shape',
        'color',
        'comments',
        'origin',
        'description',
        'image'
    ];

    protected $casts = [
        'image' => 'array',
        'limited' => 'boolean',
        'negoable' => 'boolean',
        'date' => 'date',
        'weight' => 'decimal:2'
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }
}