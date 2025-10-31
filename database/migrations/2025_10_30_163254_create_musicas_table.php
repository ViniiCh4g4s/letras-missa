<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('musicas', function (Blueprint $table) {
            $table->id();
            $table->integer('numero')->unique(); // Número do hinário (ex: 123)
            $table->string('titulo');
            $table->text('letra');
            $table->string('autor')->nullable();
            $table->string('tom')->nullable(); // Tom musical (ex: G, C, D)
            $table->foreignId('tema_id')->nullable()->constrained('temas')->nullOnDelete();
            $table->text('tags')->nullable(); // Para busca adicional
            $table->boolean('ativo')->default(true);
            $table->timestamps();

            // Índices para otimizar buscas
            $table->index('numero');
            $table->index('tema_id');
            $table->fullText(['titulo', 'letra']); // Busca full-text
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('musicas');
    }
};
