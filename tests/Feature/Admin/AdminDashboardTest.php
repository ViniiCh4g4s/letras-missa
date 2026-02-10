<?php

use App\Models\User;

it('redireciona guest para login', function () {
    $this->get(route('admin.dashboard'))->assertRedirect(route('login'));
});

it('bloqueia acesso de usuário não-admin', function () {
    $user = User::factory()->create(['is_admin' => false]);

    $this->actingAs($user)
        ->get(route('admin.dashboard'))
        ->assertRedirect('/');
});

it('permite acesso ao admin', function () {
    $admin = User::factory()->create(['is_admin' => true]);

    $this->actingAs($admin)
        ->get(route('admin.dashboard'))
        ->assertOk();
});
