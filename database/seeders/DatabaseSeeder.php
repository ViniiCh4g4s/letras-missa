<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\{App, Crypt, Hash};
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Só cria o admin fora do ambiente de testes
        if (!App::environment('testing')) {
            $this->createAdminUser();
        }

        $this->call([
            TemaSeeder::class,
            MusicaSeeder::class,
        ]);
    }

    /**
     * Cria o usuário administrador padrão
     */
    private function createAdminUser(): void
    {
        // Cria o administrador padrão (ou recupera se já existir)
        $admin = User::firstOrCreate(
            ['email' => 'admin@admin.com'],
            [
                'name'     => 'Vinicius Boschetti',
                'password' => Hash::make('admin@123'),
                'is_admin' => true,
            ]
        );

        // Configura 2FA para ambiente de desenvolvimento
        $secret = 'JBSWY3DPEHPK3PXP';

        // Gera recovery codes
        $recoveryCodes = [];

        for ($i = 0; $i < 8; $i++) {
            $recoveryCodes[] = Str::random(10);
        }

        $admin->two_factor_secret         = Crypt::encrypt($secret);
        $admin->two_factor_recovery_codes = Crypt::encrypt(json_encode($recoveryCodes));
        $admin->two_factor_confirmed_at   = now();
        $admin->save();
    }
}
