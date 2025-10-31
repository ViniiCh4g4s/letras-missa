import AppLayout from '@/components/app-layout';
import { useForm } from '@inertiajs/react';
import { LogIn } from 'lucide-react';
import { FormEvent } from 'react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <AppLayout>
            <div className="mx-auto max-w-md py-12">
                <div className="rounded-2xl bg-white p-8 shadow-lg">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                            <LogIn className="h-8 w-8 text-blue-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Bem-vindo de volta!
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Entre para gerenciar suas listas de músicas
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={submit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-700"
                            >
                                E-mail
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                placeholder="seu@email.com"
                                required
                                autoFocus
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-gray-700"
                            >
                                Senha
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                                required
                            />
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData('remember', e.target.checked)
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">
                                    Lembrar-me
                                </span>
                            </label>
                            <a
                                href="/forgot-password"
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                Esqueceu a senha?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl disabled:opacity-50"
                        >
                            {processing ? 'Entrando...' : 'Entrar'}
                        </button>
                    </form>

                    {/* Register Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Não tem uma conta?{' '}
                            <a
                                href="/register"
                                className="font-semibold text-blue-600 hover:text-blue-700"
                            >
                                Cadastre-se gratuitamente
                            </a>
                        </p>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="mt-6 text-center">
                    <a
                        href="/"
                        className="text-sm text-gray-600 hover:text-gray-900"
                    >
                        ← Voltar para o início
                    </a>
                </div>
            </div>
        </AppLayout>
    );
}
