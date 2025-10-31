import AppLayout from '@/components/app-layout';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nome: '',
        publica: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/listas');
    };

    return (
        <AppLayout>
            <div className="mx-auto max-w-2xl">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        href="/listas"
                        className="mb-4 inline-flex items-center text-blue-600 hover:text-blue-700"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar para minhas listas
                    </Link>
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">
                        Nova Lista de Músicas
                    </h1>
                    <p className="text-gray-600">
                        Crie uma lista personalizada para sua missa
                    </p>
                </div>

                {/* Formulário */}
                <div className="rounded-xl bg-white p-6 shadow-md md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nome */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Nome da Lista *
                            </label>
                            <input
                                type="text"
                                value={data.nome}
                                onChange={(e) =>
                                    setData('nome', e.target.value)
                                }
                                placeholder="Ex: Missa Domingo 15/10"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.nome && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.nome}
                                </p>
                            )}
                        </div>

                        {/* Botões */}
                        <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Save className="h-5 w-5" />
                                {processing ? 'Criando...' : 'Criar Lista'}
                            </button>
                            <Link
                                href="/listas"
                                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-300"
                            >
                                Cancelar
                            </Link>
                        </div>

                        {/* Info */}
                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                            <p className="text-sm text-blue-800">
                                💡 <strong>Dica:</strong> Após criar a lista,
                                você poderá adicionar as músicas e compartilhar
                                com seu grupo pelo WhatsApp.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
