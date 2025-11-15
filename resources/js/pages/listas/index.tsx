import AppLayout from '@/components/app-layout';
import { Link } from '@inertiajs/react';
import { Calendar, Edit, Music2, Plus, Share2, Trash2 } from 'lucide-react';

export default function Index({ listas }) {
    const handleCompartilhar = async (lista) => {
        const url = `${window.location.origin}/lista/${lista.token}`;

        // Se o navegador suporta Web Share API (mobile)
        if (navigator.share) {
            try {
                await navigator.share({
                    title: lista.nome,
                    text: `Confira a lista de músicas: ${lista.nome}`,
                    url: url,
                });
            } catch (error) {
                // Usuário cancelou ou erro
                console.log('Compartilhamento cancelado');
            }
        } else {
            // Desktop: copiar link
            try {
                await navigator.clipboard.writeText(url);
                alert('Link copiado para a área de transferência!');
            } catch (error) {
                // Fallback se clipboard API falhar
                const textArea = document.createElement('textarea');
                textArea.value = url;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    alert('Link copiado para a área de transferência!');
                } catch (err) {
                    alert('Não foi possível copiar o link. URL: ' + url);
                }
                document.body.removeChild(textArea);
            }
        }
    };

    const abrirLista = (token) => {
        window.open(`/lista/${token}`, '_blank');
    };

    return (
        <AppLayout>
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
                            Minhas Listas
                        </h1>
                        <p className="text-gray-600">
                            Gerencie suas listas de músicas para missas
                        </p>
                    </div>
                    <Link
                        href="/listas/create"
                        className="flex items-center gap-2 rounded-lg px-4 py-3 text-white shadow-lg transition-colors hover:shadow-xl"
                        style={{ backgroundColor: '#C7AB65' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B89B55'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#C7AB65'}
                    >
                        <Plus className="h-5 w-5" />
                        <span className="hidden sm:inline">Nova Lista</span>
                    </Link>
                </div>

                {/* Lista */}
                {listas.length > 0 ? (
                    <div className="overflow-hidden rounded-xl bg-white shadow-md">
                        <div className="divide-y divide-gray-200">
                            {listas.map((lista) => (
                                <div key={lista.id}>
                                    {/* Linha Principal - Clicável */}
                                    <div
                                        onClick={() => abrirLista(lista.token)}
                                        className="flex cursor-pointer items-center gap-3 p-4 transition-colors hover:bg-gray-50 md:gap-4"
                                    >
                                        {/* Nome da Lista */}
                                        <div className="min-w-0 flex-1">
                                            <h3 className="truncate font-semibold text-gray-900">
                                                {lista.nome}
                                            </h3>
                                            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Music2 className="h-3 w-3" />
                                                    {lista.musicas_count}{' '}
                                                    {lista.musicas_count === 1
                                                        ? 'música'
                                                        : 'músicas'}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(
                                                        lista.created_at,
                                                    ).toLocaleDateString(
                                                        'pt-BR',
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Ações */}
                                        <div className="flex flex-shrink-0 gap-2">
                                            <Link
                                                href={`/listas/${lista.id}/edit`}
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors"
                                                style={{ backgroundColor: '#C7AB65' }}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B89B55'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#C7AB65'}
                                                title="Editar"
                                            >
                                                <Edit className="h-4 w-4" />
                                                <span className="hidden md:inline">
                                                    Editar
                                                </span>
                                            </Link>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCompartilhar(lista);
                                                }}
                                                className="flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                                                title="Compartilhar"
                                            >
                                                <Share2 className="h-4 w-4" />
                                                <span className="hidden md:inline">
                                                    Compartilhar
                                                </span>
                                            </button>
                                            <Link
                                                href={`/listas/${lista.id}`}
                                                method="delete"
                                                as="button"
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                                onBefore={() =>
                                                    confirm(
                                                        'Tem certeza que deseja excluir esta lista?',
                                                    )
                                                }
                                                className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                                                title="Excluir"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="hidden md:inline">
                                                    Excluir
                                                </span>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Footer com Visualizações */}
                                    <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500">
                                        {lista.visualizacoes}{' '}
                                        {lista.visualizacoes === 1
                                            ? 'visualização'
                                            : 'visualizações'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    // Estado vazio
                    <div className="rounded-xl bg-white p-12 text-center shadow-md">
                        <Music2 className="mx-auto mb-4 h-20 w-20 text-gray-300" />
                        <h3 className="mb-2 text-xl font-semibold text-gray-900">
                            Nenhuma lista criada ainda
                        </h3>
                        <p className="mb-6 text-gray-600">
                            Comece criando sua primeira lista de músicas para a
                            missa
                        </p>
                        <Link
                            href="/listas/create"
                            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-colors"
                            style={{ backgroundColor: '#C7AB65' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B89B55'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#C7AB65'}
                        >
                            <Plus className="h-5 w-5" />
                            Criar Primeira Lista
                        </Link>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
