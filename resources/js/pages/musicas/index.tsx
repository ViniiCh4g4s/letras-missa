import AppLayout from '@/components/app-layout';
import { Link } from '@inertiajs/react';
import { Filter, Music2, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function Index({ musicas, temas, autores }) {
    const [busca, setBusca] = useState('');
    const [modalAberto, setModalAberto] = useState(false);
    const [temaSelecionado, setTemaSelecionado] = useState('');
    const [autorSelecionado, setAutorSelecionado] = useState('');
    const [ordenacao, setOrdenacao] = useState('numero');

    // Filtragem e ordenação no frontend
    const musicasFiltradas = useMemo(() => {
        let resultado = [...musicas];

        // Filtro de busca
        if (busca.trim()) {
            const buscaLower = busca.toLowerCase();
            resultado = resultado.filter(
                (musica) =>
                    musica.numero.toString().includes(buscaLower) ||
                    musica.titulo.toLowerCase().includes(buscaLower) ||
                    musica.letra.toLowerCase().includes(buscaLower) ||
                    musica.autor?.toLowerCase().includes(buscaLower),
            );
        }

        // Filtro por tema
        if (temaSelecionado) {
            resultado = resultado.filter(
                (musica) => musica.tema_id === parseInt(temaSelecionado),
            );
        }

        // Filtro por autor
        if (autorSelecionado) {
            resultado = resultado.filter(
                (musica) => musica.autor === autorSelecionado,
            );
        }

        // Ordenação
        switch (ordenacao) {
            case 'numero':
                resultado.sort((a, b) => a.numero - b.numero);
                break;
            case 'numero_desc':
                resultado.sort((a, b) => b.numero - a.numero);
                break;
            case 'titulo':
                resultado.sort((a, b) => a.titulo.localeCompare(b.titulo));
                break;
            case 'titulo_desc':
                resultado.sort((a, b) => b.titulo.localeCompare(a.titulo));
                break;
        }

        return resultado;
    }, [musicas, busca, temaSelecionado, autorSelecionado, ordenacao]);

    const limparFiltros = () => {
        setBusca('');
        setTemaSelecionado('');
        setAutorSelecionado('');
        setOrdenacao('numero');
        setModalAberto(false);
    };

    const temFiltrosAtivos =
        busca || temaSelecionado || autorSelecionado || ordenacao !== 'numero';

    return (
        <AppLayout>
            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
                            Catálogo de Músicas
                        </h1>
                        <p className="text-gray-600">
                            {musicasFiltradas.length} de {musicas.length}{' '}
                            músicas
                        </p>
                    </div>
                    <button
                        onClick={() => setModalAberto(true)}
                        className="relative rounded-lg bg-blue-600 px-4 py-3 font-medium text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
                    >
                        <div className="flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            <span>Filtrar</span>
                        </div>
                        {temFiltrosAtivos && (
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                !
                            </span>
                        )}
                    </button>
                </div>

                {/* Busca Rápida */}
                <div className="mb-4">
                    <div className="relative">
                        <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                        <input
                            type="text"
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            placeholder="Buscar por número, título, letra ou autor..."
                            className="w-full rounded-lg border border-gray-300 bg-white py-3 pr-4 pl-10 shadow-sm transition-shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:shadow-md"
                        />
                    </div>
                </div>

                {/* Tags de Filtros Ativos */}
                {temFiltrosAtivos && (
                    <div className="mb-4 flex flex-wrap gap-2">
                        {temaSelecionado && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                                Tema:{' '}
                                {
                                    temas.find(
                                        (t) => t.id === parseInt(temaSelecionado),
                                    )?.nome
                                }
                                <button
                                    onClick={() => setTemaSelecionado('')}
                                    className="rounded-full hover:bg-blue-200"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        )}
                        {autorSelecionado && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                                Autor: {autorSelecionado}
                                <button
                                    onClick={() => setAutorSelecionado('')}
                                    className="rounded-full hover:bg-green-200"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        )}
                        {ordenacao !== 'numero' && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                                Ordenação:{' '}
                                {ordenacao === 'numero_desc'
                                    ? 'Nº Decrescente'
                                    : ordenacao === 'titulo'
                                      ? 'A-Z'
                                      : 'Z-A'}
                                <button
                                    onClick={() => setOrdenacao('numero')}
                                    className="rounded-full hover:bg-purple-200"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        )}
                        <button
                            onClick={limparFiltros}
                            className="text-sm text-gray-600 underline hover:text-gray-900"
                        >
                            Limpar todos
                        </button>
                    </div>
                )}

                {/* Lista de Músicas */}
                <div className="space-y-3">
                    {musicasFiltradas.map((musica) => (
                        <Link
                            key={musica.id}
                            href={`/musicas/${musica.id}`}
                            className="block rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md hover:scale-[1.01]"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-600">
                                    {musica.numero}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="mb-1 text-lg font-semibold text-gray-900">
                                        {musica.titulo}
                                    </h3>
                                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                        {musica.autor && (
                                            <span className="text-gray-500">
                                                {musica.autor}
                                            </span>
                                        )}
                                        {musica.tom && (
                                            <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-700">
                                                Tom: {musica.tom}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <Music2 className="h-5 w-5 flex-shrink-0 text-gray-400" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Mensagem quando não há resultados */}
                {musicasFiltradas.length === 0 && (
                    <div className="py-12 text-center">
                        <Music2 className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                        <p className="text-gray-600">
                            Nenhuma música encontrada com esses filtros.
                        </p>
                        <button
                            onClick={limparFiltros}
                            className="mt-4 text-blue-600 underline hover:text-blue-700"
                        >
                            Limpar filtros
                        </button>
                    </div>
                )}
            </div>

            {/* Modal de Filtros */}
            {modalAberto && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                        {/* Header do Modal */}
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Filtros
                            </h2>
                            <button
                                onClick={() => setModalAberto(false)}
                                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Conteúdo do Modal */}
                        <div className="space-y-4">
                            {/* Filtro por Tema */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Tema Litúrgico
                                </label>
                                <select
                                    value={temaSelecionado}
                                    onChange={(e) =>
                                        setTemaSelecionado(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Todos os temas</option>
                                    {temas.map((tema) => (
                                        <option key={tema.id} value={tema.id}>
                                            {tema.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Filtro por Autor */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Autor/Compositor
                                </label>
                                <select
                                    value={autorSelecionado}
                                    onChange={(e) =>
                                        setAutorSelecionado(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Todos os autores</option>
                                    {autores.map((autor, index) => (
                                        <option key={index} value={autor}>
                                            {autor}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Ordenação */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Ordenar por
                                </label>
                                <select
                                    value={ordenacao}
                                    onChange={(e) =>
                                        setOrdenacao(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="numero">
                                        Número Crescente
                                    </option>
                                    <option value="numero_desc">
                                        Número Decrescente
                                    </option>
                                    <option value="titulo">
                                        Título (A-Z)
                                    </option>
                                    <option value="titulo_desc">
                                        Título (Z-A)
                                    </option>
                                </select>
                            </div>
                        </div>

                        {/* Botões do Modal */}
                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={limparFiltros}
                                className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                Limpar
                            </button>
                            <button
                                onClick={() => setModalAberto(false)}
                                className="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
                            >
                                Aplicar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
