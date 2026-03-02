<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tema extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'slug',
        'cor',
        'ordem',
    ];

    public function musicas(): BelongsToMany
    {
        return $this->belongsToMany(Musica::class, 'musica_tema')->withTimestamps();
    }
}
