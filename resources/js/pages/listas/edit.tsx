import AppLayout from '@/components/app-layout';
import { router, useForm } from '@inertiajs/react';
import {
    Check,
    GripVertical,
    Plus,
    Save,
    Search,
    Share2,
    Trash2,
    X,
} from 'lucide-react';
import { useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Componente para item arrastável
function SortableItem({ musica, removerMusica }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: musica.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100"
        >
            <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing"
            >
                <GripVertical className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded bg-blue-100 text-sm font-bold text-blue-600">
                {musica.numero}
            </div>
            <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-gray-900">
                    {musica.titulo}
                </p>
                {musica.tema && (
                    <p className="text-xs text-gray-500">{musica.tema.nome}</p>
                )}
            </div>
            <button
                onClick={() => removerMusica(musica)}
                className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
            >
                <Trash2 className="h-4 w-4" />
            </button>
        </div>
    );
}

export default function Edit({ lista, todasMusicas, temas, autores }) {
    const [copiado, setCopiado] = useState(false);
    const [modalAberto, setModalAberto] = useState(false);
    const [buscaMusica, setBuscaMusica] = useState('');
    const [temaSelecionado, setTemaSelecionado] = useState('');
    const [autorSelecionado, setAutorSelecionado] = useState('');
    const [musicas, setMusicas] = useState(lista.musicas);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const { data, setData, put, processing, errors } = useForm({
        nome: lista.nome,
        publica: lista.publica,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/listas/${lista.id}`);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = musicas.findIndex((m) => m.id === active.id);
            const newIndex = musicas.findIndex((m) => m.id === over.id);

            const newMusicas = arrayMove(musicas, oldIndex, newIndex);
            setMusicas(newMusicas);

            // Enviar nova ordem ao backend
            router.post(
                `/listas/${lista.id}/reordenar`,
                {
                    musicas: newMusicas.map((m) => m.id),
                },
                {
                    preserveScroll: true,
                },
            );
        }
    };

    const adicionarMusica = (musica) => {
        router.post(
            `/listas/${lista.id}/musicas`,
            {
                musica_id: musica.id,
            },
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    setModalAberto(false);
                    setBuscaMusica('');
                    // Atualizar lista local
                    setMusicas(page.props.lista.musicas);
                },
            },
        );
    };

    const removerMusica = (musica) => {
        if (confirm('Remover esta música da lista?')) {
            router.delete(`/listas/${lista.id}/musicas/${musica.id}`, {
                preserveScroll: true,
                onSuccess: (page) => {
                    // Atualizar lista local
                    setMusicas(page.props.lista.musicas);
                },
            });
        }
    };

    const copiarLink = () => {
        const url = `${window.location.origin}/lista/${lista.token}`;
        navigator.clipboard.writeText(url);
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2000);
    };

    const musicasFiltradas = todasMusicas.filter((m) => {
        // Filtro de busca (número, título, autor e letra)
        const matchBusca =
            !buscaMusica ||
            m.numero.toString().includes(buscaMusica) ||
            m.titulo.toLowerCase().includes(buscaMusica.toLowerCase()) ||
            m.autor?.toLowerCase().includes(buscaMusica.toLowerCase()) ||
            m.letra?.toLowerCase().includes(buscaMusica.toLowerCase());

        // Filtro de tema
        const matchTema =
            !temaSelecionado || m.tema?.id === parseInt(temaSelecionado);

        // Filtro de autor
        const matchAutor = !autorSelecionado || m.autor === autorSelecionado;

        return matchBusca && matchTema && matchAutor;
    });

    const musicasNaLista = musicas.map((m) => m.id);

    return (
        <AppLayout>
            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">
                        Editar Lista
                    </h1>
                    <p className="text-gray-600">
                        Monte a sequência de músicas para sua missa
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Informações da Lista */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 rounded-xl bg-white p-6 shadow-md">
                            <h2 className="mb-4 text-lg font-semibold">
                                Informações
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Nome da Lista *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.nome}
                                        onChange={(e) =>
                                            setData('nome', e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.nome && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.nome}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                                >
                                    <Save className="h-4 w-4" />
                                    Salvar
                                </button>
                            </form>

                            {/* Compartilhar */}
                            <div className="mt-6 border-t border-gray-200 pt-6">
                                <h3 className="mb-3 text-sm font-semibold text-gray-700">
                                    Compartilhar Lista
                                </h3>
                                <button
                                    onClick={copiarLink}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
                                >
                                    {copiado ? (
                                        <>
                                            <Check className="h-4 w-4" />
                                            Link Copiado!
                                        </>
                                    ) : (
                                        <>
                                            <Share2 className="h-4 w-4" />
                                            Copiar Link
                                        </>
                                    )}
                                </button>
                                <p className="mt-2 text-center text-xs text-gray-500">
                                    Qualquer pessoa com o link poderá visualizar
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Lista de Músicas */}
                    <div className="lg:col-span-2">
                        <div className="rounded-xl bg-white p-6 shadow-md">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-lg font-semibold">
                                    Músicas ({musicas.length})
                                </h2>
                                <button
                                    onClick={() => setModalAberto(true)}
                                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                                >
                                    <Plus className="h-4 w-4" />
                                    Adicionar
                                </button>
                            </div>

                            {/* Músicas */}
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <SortableContext
                                    items={musicas.map((m) => m.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div className="space-y-2">
                                        {musicas.length === 0 ? (
                                            <div className="py-12 text-center text-gray-500">
                                                <p>
                                                    Nenhuma música adicionada
                                                    ainda.
                                                </p>
                                                <p className="mt-2 text-sm">
                                                    Clique em "Adicionar" para
                                                    começar
                                                </p>
                                            </div>
                                        ) : (
                                            musicas.map((musica) => (
                                                <SortableItem
                                                    key={musica.id}
                                                    musica={musica}
                                                    removerMusica={
                                                        removerMusica
                                                    }
                                                />
                                            ))
                                        )}
                                    </div>
                                </SortableContext>
                            </DndContext>
                        </div>
                    </div>
                </div>

                {/* Modal Adicionar Música */}
                {modalAberto && (
                    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
                        <div className="flex max-h-[80vh] w-full max-w-2xl flex-col rounded-xl bg-white">
                            <div className="flex items-center justify-between border-b border-gray-200 p-6">
                                <h3 className="text-xl font-bold">
                                    Adicionar Música
                                </h3>
                                <button
                                    onClick={() => setModalAberto(false)}
                                    className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="border-b border-gray-200 p-6">
                                <div className="space-y-3">
                                    {/* Busca */}
                                    <div className="relative">
                                        <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                                        <input
                                            type="text"
                                            value={buscaMusica}
                                            onChange={(e) =>
                                                setBuscaMusica(e.target.value)
                                            }
                                            placeholder="Buscar por número, título, autor ou letra..."
                                            className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            autoFocus
                                        />
                                    </div>

                                    {/* Filtros */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <select
                                            value={temaSelecionado}
                                            onChange={(e) =>
                                                setTemaSelecionado(e.target.value)
                                            }
                                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Todos os temas</option>
                                            {temas.map((tema) => (
                                                <option
                                                    key={tema.id}
                                                    value={tema.id}
                                                >
                                                    {tema.nome}
                                                </option>
                                            ))}
                                        </select>

                                        <select
                                            value={autorSelecionado}
                                            onChange={(e) =>
                                                setAutorSelecionado(e.target.value)
                                            }
                                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Todos os autores</option>
                                            {autores.map((autor) => (
                                                <option key={autor} value={autor}>
                                                    {autor}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Contador de resultados */}
                                    <p className="text-xs text-gray-500">
                                        {musicasFiltradas.length}{' '}
                                        {musicasFiltradas.length === 1
                                            ? 'música encontrada'
                                            : 'músicas encontradas'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6">
                                <div className="space-y-2">
                                    {musicasFiltradas.map((musica) => (
                                        <button
                                            key={musica.id}
                                            onClick={() =>
                                                adicionarMusica(musica)
                                            }
                                            disabled={musicasNaLista.includes(
                                                musica.id,
                                            )}
                                            className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-600">
                                                {musica.numero}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-medium text-gray-900">
                                                    {musica.titulo}
                                                </p>
                                                {musica.tema && (
                                                    <p className="text-sm text-gray-500">
                                                        {musica.tema.nome}
                                                    </p>
                                                )}
                                            </div>
                                            {musicasNaLista.includes(
                                                musica.id,
                                            ) && (
                                                <span className="text-xs font-medium text-green-600">
                                                    Já adicionada
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
