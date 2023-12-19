<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Names extends Model
{
    use HasFactory;

    protected $table = 'names'; 

    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'address',
        'phone'  
    ];
}
