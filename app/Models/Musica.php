<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\DB;

class Musica extends Model
{
    use HasFactory;

    protected $fillable = [
        'numero',
        'titulo',
        'letra',
        'autor',
        'tom',
        'tags',
        'ativo',
    ];

    protected $casts = [
        'ativo' => 'boolean',
    ];

    public function temas(): BelongsToMany
    {
        return $this->belongsToMany(Tema::class, 'musica_tema')->withTimestamps();
    }

    public function listas(): BelongsToMany
    {
        return $this->belongsToMany(Lista::class, 'lista_musicas')
            ->withPivot('ordem', 'observacao')
            ->withTimestamps()
            ->orderBy('ordem');
    }

    // Scope para busca (accent-insensitive no MySQL via COLLATE utf8mb4_general_ci)
    public function scopeSearch($query, $search)
    {
        $isMySQL = DB::connection()->getDriverName() === 'mysql';
        $term = "%{$search}%";

        return $query->where(function ($q) use ($term, $isMySQL) {
            if ($isMySQL) {
                $q->whereRaw('numero LIKE ?', [$term])
                    ->orWhereRaw('titulo COLLATE utf8mb4_general_ci LIKE ?', [$term])
                    ->orWhereRaw('autor COLLATE utf8mb4_general_ci LIKE ?', [$term])
                    ->orWhereRaw('letra COLLATE utf8mb4_general_ci LIKE ?', [$term]);
            } else {
                $q->where('numero', 'like', $term)
                    ->orWhere('titulo', 'like', $term)
                    ->orWhere('autor', 'like', $term)
                    ->orWhere('letra', 'like', $term);
            }
        });
    }

    // Scope para filtrar por tema
    public function scopeByTema($query, $temaId)
    {
        return $query->whereHas('temas', fn ($q) => $q->where('temas.id', $temaId));
    }
}
