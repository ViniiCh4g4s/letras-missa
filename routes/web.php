<?php

use App\Http\Controllers\Admin\AdminMusicaController;
use App\Http\Controllers\Admin\AdminTemaController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\ListaController;
use App\Http\Controllers\MusicaController;
use App\Http\Controllers\TemaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ==========================================
// ROTAS PÚBLICAS (SEM AUTENTICAÇÃO)
// ==========================================

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Catálogo público de músicas
Route::prefix('musicas')->name('musicas.')->group(function () {
    Route::get('/', [MusicaController::class, 'index'])->name('index');
    Route::get('/{musica}', [MusicaController::class, 'show'])->name('show');
});

// Catálogo público de temas
Route::prefix('temas')->name('temas.')->group(function () {
    Route::get('/', [TemaController::class, 'index'])->name('index');
    Route::get('/{tema}', [TemaController::class, 'show'])->name('show');
});

// Visualizar lista compartilhada (pública)
Route::get('/lista/{token}', [ListaController::class, 'compartilhada'])
    ->name('listas.compartilhada');

// ==========================================
// ROTAS DE USUÁRIOS AUTENTICADOS (não admin)
// ==========================================

Route::middleware(['auth', 'verified'])->group(function () {

    // ==========================================
    // ROTAS DE LISTAS
    // ==========================================
    Route::prefix('listas')->name('listas.')->group(function () {
        Route::get('/', [ListaController::class, 'index'])->name('index');
        Route::get('/create', [ListaController::class, 'create'])->name('create');
        Route::post('/', [ListaController::class, 'store'])->name('store');
        Route::get('/{lista}/edit', [ListaController::class, 'edit'])->name('edit');
        Route::put('/{lista}', [ListaController::class, 'update'])->name('update');
        Route::delete('/{lista}', [ListaController::class, 'destroy'])->name('destroy');
    });

    // ==========================================
    // GERENCIAMENTO DE MÚSICAS
    // ==========================================
    Route::post('/{lista}/musicas', [ListaController::class, 'adicionarMusica'])
        ->name('musicas.adicionar');
    Route::delete('/{lista}/musicas/{musica}', [ListaController::class, 'removerMusica'])
        ->name('musicas.remover');
    Route::post('/{lista}/reordenar', [ListaController::class, 'reordenar'])
        ->name('reordenar');

});

// ==========================================
// ROTAS DO PAINEL ADMIN (is_admin = true)
// ==========================================

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {

    // Dashboard do Admin
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    // ==========================================
    // GERENCIAMENTO DE TEMAS
    // ==========================================
    Route::prefix('temas')->name('temas.')->group(function () {
        Route::get('/', [AdminTemaController::class, 'index'])->name('index');
        Route::get('/create', [AdminTemaController::class, 'create'])->name('create');
        Route::post('/', [AdminTemaController::class, 'store'])->name('store');
        Route::get('/{tema}/edit', [AdminTemaController::class, 'edit'])->name('edit');
        Route::put('/{tema}', [AdminTemaController::class, 'update'])->name('update');
        Route::delete('/{tema}', [AdminTemaController::class, 'destroy'])->name('destroy');
    });

    // ==========================================
    // GERENCIAMENTO DE MÚSICAS
    // ==========================================
    Route::prefix('musicas')->name('musicas.')->group(function () {
        Route::get('/', [AdminMusicaController::class, 'index'])->name('index');
        Route::get('/create', [AdminMusicaController::class, 'create'])->name('create');
        Route::post('/', [AdminMusicaController::class, 'store'])->name('store');
        Route::get('/{musica}/edit', [AdminMusicaController::class, 'edit'])->name('edit');
        Route::put('/{musica}', [AdminMusicaController::class, 'update'])->name('update');
        Route::delete('/{musica}', [AdminMusicaController::class, 'destroy'])->name('destroy');
    });
});

// ==========================================
// ROTAS DE AUTENTICAÇÃO
// ==========================================
require __DIR__.'/auth.php';
require __DIR__.'/settings.php';
