import AppLayout from '@/components/app-layout';
import LetraFormatada from '@/components/letra-formatada';
import { Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, Check, ListPlus, Music2, Tag, User, X } from 'lucide-react';
import { useState } from 'react';

export default function Show({ musica, listas }) {
    const { auth } = usePage().props;
    const [modalAberto, setModalAberto] = useState(false);
    const [listaSelecionada, setListaSelecionada] = useState<number[]>([]);
    const [toast, setToast] = useState<{
        show: boolean;
        message: string;
        type: 'success' | 'error';
    }>({ show: false, message: '', type: 'success' });

    const handleAdicionarALista = (listaId: number, temMusica: boolean) => {
        // Não permite desmarcar listas que já têm a música
        if (temMusica) return;

        if (listaSelecionada.includes(listaId)) {
            setListaSelecionada(listaSelecionada.filter((id) => id !== listaId));
        } else {
            setListaSelecionada([...listaSelecionada, listaId]);
        }
    };

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: '', type: 'success' });
        }, 3000);
    };

    const handleConfirmar = () => {
        let successCount = 0;
        const totalToAdd = listaSelecionada.length;

        if (totalToAdd === 0) {
            showToast('Selecione pelo menos uma lista', 'error');
            return;
        }

        listaSelecionada.forEach((listaId, index) => {
            router.post(
                `/${listaId}/musicas`,
                {
                    musica_id: musica.id,
                },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        successCount++;
                        if (index === totalToAdd - 1) {
                            const message =
                                successCount === 1
                                    ? 'Música adicionada à lista com sucesso!'
                                    : `Música adicionada a ${successCount} listas com sucesso!`;
                            showToast(message);
                        }
                    },
                    onError: () => {
                        if (index === totalToAdd - 1 && successCount === 0) {
                            showToast('Erro ao adicionar música', 'error');
                        }
                    },
                },
            );
        });

        setModalAberto(false);
        setListaSelecionada([]);
    };

    return (
        <AppLayout>
            <div className="mx-auto max-w-3xl">
                {/* Botão Voltar */}
                <div className="mb-6 flex items-center justify-between">
                    <Link
                        href="/musicas"
                        className="inline-flex items-center transition-colors"
                        style={{ color: '#C7AB65' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#B89B55'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#C7AB65'}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar para o catálogo
                    </Link>

                    {auth.user && listas && listas.length > 0 && (
                        <button
                            onClick={() => setModalAberto(true)}
                            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                        >
                            <ListPlus className="h-4 w-4" />
                            Adicionar à Lista
                        </button>
                    )}
                </div>

                {/* Card da Música */}
                <div className="overflow-hidden rounded-xl bg-white shadow-lg">
                    {/* Header */}
                    <div className="p-6 text-white" style={{ background: 'linear-gradient(135deg, #C7AB65 0%, #B89B55 100%)' }}>
                        <div className="flex items-start gap-4">
                            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-white/20 text-2xl font-bold backdrop-blur-sm">
                                {musica.numero}
                            </div>
                            <div className="flex-1">
                                <h1 className="mb-2 text-2xl font-bold md:text-3xl">
                                    {musica.titulo}
                                </h1>
                                <div className="flex flex-wrap gap-3 text-sm">
                                    {musica.autor && (
                                        <div className="flex items-center gap-1">
                                            <User className="h-4 w-4" />
                                            <span>{musica.autor}</span>
                                        </div>
                                    )}
                                    {musica.tom && (
                                        <div className="flex items-center gap-1">
                                            <Music2 className="h-4 w-4" />
                                            <span>Tom: {musica.tom}</span>
                                        </div>
                                    )}
                                    {musica.tema && (
                                        <div className="flex items-center gap-1">
                                            <Tag className="h-4 w-4" />
                                            <span>{musica.tema.nome}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Letra */}
                    <div className="p-6 md:p-8">
                        <LetraFormatada letra={musica.letra} />
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                            <Link
                                href={`/musicas?tema=${musica.tema?.id || ''}`}
                                className="text-sm transition-colors"
                                style={{ color: '#C7AB65' }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#B89B55'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#C7AB65'}
                            >
                                Ver mais músicas de{' '}
                                {musica.tema?.nome || 'outros temas'}
                            </Link>
                            <button
                                onClick={() => window.print()}
                                className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300"
                            >
                                Imprimir
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Adicionar à Lista */}
            {modalAberto && auth.user && listas && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-gray-200 p-4">
                            <h3 className="text-lg font-bold text-gray-900">
                                Adicionar à Lista
                            </h3>
                            <button
                                onClick={() => {
                                    setModalAberto(false);
                                    setListaSelecionada([]);
                                }}
                                className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="max-h-96 overflow-y-auto p-4">
                            <p className="mb-4 text-sm text-gray-600">
                                Selecione em quais listas deseja adicionar esta
                                música:
                            </p>
                            <div className="space-y-2">
                                {listas.map((lista) => (
                                    <label
                                        key={lista.id}
                                        className={`flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors ${
                                            lista.tem_musica
                                                ? 'cursor-not-allowed bg-gray-50 opacity-60'
                                                : 'cursor-pointer'
                                        }`}
                                        style={!lista.tem_musica ? { backgroundColor: 'white' } : undefined}
                                        onMouseEnter={(e) => {
                                            if (!lista.tem_musica) {
                                                e.currentTarget.style.backgroundColor = '#F5F0E8';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!lista.tem_musica) {
                                                e.currentTarget.style.backgroundColor = 'white';
                                            }
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={
                                                lista.tem_musica ||
                                                listaSelecionada.includes(lista.id)
                                            }
                                            onChange={() =>
                                                handleAdicionarALista(
                                                    lista.id,
                                                    lista.tem_musica,
                                                )
                                            }
                                            disabled={lista.tem_musica}
                                            className="h-5 w-5 rounded border-gray-300 disabled:cursor-not-allowed"
                                            style={{
                                                accentColor: '#C7AB65'
                                            }}
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">
                                                {lista.nome}
                                            </p>
                                            {lista.tem_musica && (
                                                <p className="text-xs text-gray-500">
                                                    Já está nesta lista
                                                </p>
                                            )}
                                        </div>
                                        {listaSelecionada.includes(
                                            lista.id,
                                        ) && (
                                            <Check className="h-5 w-5 text-green-600" />
                                        )}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-gray-200 p-4">
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setModalAberto(false);
                                        setListaSelecionada([]);
                                    }}
                                    className="flex-1 rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-300"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleConfirmar}
                                    disabled={listaSelecionada.length === 0}
                                    className="flex-1 rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Adicionar
                                    {listaSelecionada.length > 0 &&
                                        ` (${listaSelecionada.length})`}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast de Notificação */}
            {toast.show && (
                <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div
                        className={`rounded-lg px-6 py-4 shadow-lg ${
                            toast.type === 'success'
                                ? 'bg-green-600 text-white'
                                : 'bg-red-600 text-white'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            {toast.type === 'success' ? (
                                <Check className="h-5 w-5" />
                            ) : (
                                <X className="h-5 w-5" />
                            )}
                            <p className="font-medium">{toast.message}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Estilos para impressão */}
            <style>{`
                @media print {
                    header,
                    footer,
                    button {
                        display: none !important;
                    }
                    .bg-gradient-to-r {
                        background: white !important;
                        color: black !important;
                    }
                }
            `}</style>
        </AppLayout>
    );
}
