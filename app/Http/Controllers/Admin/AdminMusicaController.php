<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Musica;
use App\Models\Tema;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminMusicaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Musica::with('tema');

        // Filtro por tema
        if ($request->has('tema_id') && $request->tema_id) {
            $query->where('tema_id', $request->tema_id);
        }

        // Busca
        if ($request->has('search') && $request->search) {
            $query->search($request->search);
        }

        $musicas = $query->orderBy('numero')->paginate(20);
        $temas = Tema::orderBy('ordem')->get();

        return Inertia::render('admin/musicas/index', [
            'musicas' => $musicas,
            'temas' => $temas,
            'filters' => [
                'search' => $request->search,
                'tema_id' => $request->tema_id,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $temas = Tema::orderBy('ordem')->get();

        return Inertia::render('admin/musicas/create', [
            'temas' => $temas,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'numero' => 'required|integer|unique:musicas,numero',
            'titulo' => 'required|string|max:255',
            'letra' => 'required|string',
            'autor' => 'nullable|string|max:255',
            'tom' => 'nullable|string|max:10',
            'tema_id' => 'required|exists:temas,id',
            'tags' => 'nullable|string',
            'ativo' => 'sometimes|boolean',
        ]);

        // Garante que ativo tenha um valor padrão se não fornecido
        $validated['ativo'] = $validated['ativo'] ?? true;

        Musica::create($validated);

        return redirect()->route('admin.musicas.index')
            ->with('success', 'Música criada com sucesso!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Musica $musica)
    {
        $temas = Tema::orderBy('ordem')->get();

        return Inertia::render('admin/musicas/edit', [
            'musica' => $musica->load('tema'),
            'temas' => $temas,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Musica $musica)
    {
        $validated = $request->validate([
            'numero' => 'required|integer|unique:musicas,numero,' . $musica->id,
            'titulo' => 'required|string|max:255',
            'letra' => 'required|string',
            'autor' => 'nullable|string|max:255',
            'tom' => 'nullable|string|max:10',
            'tema_id' => 'required|exists:temas,id',
            'tags' => 'nullable|string',
            'ativo' => 'boolean',
        ]);

        $musica->update($validated);

        return redirect()->route('admin.musicas.index')
            ->with('success', 'Música atualizada com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Musica $musica)
    {
        // Verifica se está em alguma lista
        if ($musica->listas()->count() > 0) {
            return back()->with('error', 'Não é possível excluir uma música que está sendo usada em listas.');
        }

        $musica->delete();

        return redirect()->route('admin.musicas.index')
            ->with('success', 'Música excluída com sucesso!');
    }
}
