<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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

    // Scope para busca
    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('numero', 'like', "%{$search}%")
                ->orWhere('titulo', 'like', "%{$search}%")
                ->orWhere('letra', 'like', "%{$search}%")
                ->orWhere('autor', 'like', "%{$search}%");
        });
    }

    // Scope para filtrar por tema
    public function scopeByTema($query, $temaId)
    {
        return $query->where('tema_id', $temaId);
    }
}
