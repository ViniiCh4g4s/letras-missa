<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lista;
use App\Models\Musica;
use App\Models\Tema;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Estatísticas gerais
        $stats = [
            'total_musicas' => Musica::count(),
            'total_usuarios' => User::count(),
            'total_listas' => Lista::count(),
            'total_visualizacoes' => Lista::sum('visualizacoes'),
        ];

        // Músicas mais acessadas (através das listas)
        $musicasMaisUsadas = Musica::withCount('listas')
            ->orderBy('listas_count', 'desc')
            ->limit(10)
            ->get();

        // Listas mais visualizadas
        $listasMaisVisualizadas = Lista::with('user')
            ->orderBy('visualizacoes', 'desc')
            ->limit(10)
            ->get();

        // Músicas por tema
        $musicasPorTema = Tema::withCount('musicas')
            ->orderBy('ordem')
            ->get();

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'musicasMaisUsadas' => $musicasMaisUsadas,
            'listasMaisVisualizadas' => $listasMaisVisualizadas,
            'musicasPorTema' => $musicasPorTema,
        ]);
    }
}
