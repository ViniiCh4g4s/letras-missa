<?php

use App\Models\Musica;
use App\Models\Tema;

it('tem relacionamento com músicas', function () {
    $tema = Tema::factory()->create();
    Musica::factory()->count(5)->create(['tema_id' => $tema->id]);

    expect($tema->musicas)->toHaveCount(5);
});

it('preenche os campos corretamente', function () {
    $tema = Tema::factory()->create([
        'nome' => 'Entrada',
        'slug' => 'entrada',
        'cor' => '#FF0000',
        'ordem' => 1,
    ]);

    expect($tema->nome)->toBe('Entrada')
        ->and($tema->slug)->toBe('entrada')
        ->and($tema->cor)->toBe('#FF0000')
        ->and($tema->ordem)->toBe(1);
});
