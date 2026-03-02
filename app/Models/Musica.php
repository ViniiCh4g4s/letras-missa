<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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
        'tema_id',
        'tags',
        'ativo',
    ];

    protected $casts = [
        'ativo' => 'boolean',
    ];

    public function tema(): BelongsTo
    {
        return $this->belongsTo(Tema::class);
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

        return $query->where(function ($q) use ($search, $term, $isMySQL) {
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
        return $query->where('tema_id', $temaId);
    }
}
