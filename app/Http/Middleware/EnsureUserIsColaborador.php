<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsColaborador
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        $user = auth()->user();

        if (!$user->is_colaborador && !$user->is_admin) {
            if ($request->expectsJson() || $request->header('X-Inertia')) {
                abort(403, 'Acesso negado.');
            }

            return redirect('/')->with('error', 'Acesso negado.');
        }

        return $next($request);
    }
}
