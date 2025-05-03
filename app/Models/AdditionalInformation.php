<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AdditionalInformation extends Model
{
    use HasFactory;

    protected $fillable = [
        'phone_number',
        'facebook',
        'instagram',
        'tiktok',
        'twitter',
        'tag_line',
        'sub_tag_line',
        'address',
        'about',
    ];
}
