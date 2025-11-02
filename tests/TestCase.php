<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\{App, Config};

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // Garante que tem APP_KEY em testes
        if (empty(config('app.key'))) {
            Config::set('app.key', 'base64:' . base64_encode(random_bytes(32)));
        }

        // ✅ FORÇA INGLÊS EM TODOS OS TESTES
        App::setLocale('en');

        // Desabilita verificação CSRF em testes
        $this->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class);
    }
}
