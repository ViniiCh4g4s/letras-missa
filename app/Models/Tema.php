<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tema extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'slug',
        'cor',
        'ordem',
    ];

    public function musicas(): HasMany
    {
        return $this->hasMany(Musica::class);
    }
}
