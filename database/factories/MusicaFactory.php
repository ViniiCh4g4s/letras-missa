<?php

namespace Database\Factories;

use App\Models\Musica;
use App\Models\Tema;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Musica>
 */
class MusicaFactory extends Factory
{
    protected $model = Musica::class;

    public function definition(): array
    {
        return [
            'numero' => fake()->unique()->numberBetween(1, 9999),
            'titulo' => fake()->sentence(3),
            'letra' => fake()->paragraphs(3, true),
            'autor' => fake()->name(),
            'tom' => fake()->randomElement(['C', 'D', 'E', 'F', 'G', 'A', 'B', 'Am', 'Em', 'Dm']),
            'tema_id' => Tema::factory(),
            'tags' => null,
            'ativo' => true,
        ];
    }

    public function inativo(): static
    {
        return $this->state(fn (array $attributes) => [
            'ativo' => false,
        ]);
    }
}
