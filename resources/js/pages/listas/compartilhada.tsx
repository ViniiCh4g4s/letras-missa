import AppLayout from '@/components/app-layout';
import LetraFormatada from '@/components/letra-formatada';
import {
    Calendar,
    ChevronDown,
    ChevronUp,
    Clock,
    MapPin,
    Music2,
    User,
} from 'lucide-react';
import { useState } from 'react';

export default function Compartilhada({ lista }) {
    const [musicaExpandida, setMusicaExpandida] = useState(null);

    const toggleMusica = (musicaId) => {
        setMusicaExpandida(musicaExpandida === musicaId ? null : musicaId);
    };

    return (
        <AppLayout>
            <div className="mx-auto max-w-3xl">
                {/* Header da Lista */}
                <div className="mb-6 rounded-xl p-6 text-white shadow-lg md:p-8" style={{ background: 'linear-gradient(135deg, #C7AB65 0%, #B89B55 100%)' }}>
                    <h1 className="mb-4 text-3xl font-bold md:text-4xl">
                        {lista.nome}
                    </h1>

                    {/* Informações da Missa */}
                    <div className="grid gap-3 text-sm sm:grid-cols-2">
                        {lista.data_missa && (
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>
                                    {new Date(
                                        lista.data_missa + 'T00:00:00',
                                    ).toLocaleDateString('pt-BR', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </span>
                            </div>
                        )}
                        {lista.horario_missa && (
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{lista.horario_missa}</span>
                            </div>
                        )}
                        {lista.local && (
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{lista.local}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>Criado por {lista.user.name}</span>
                        </div>
                    </div>

                    {lista.descricao && (
                        <p className="mt-4 opacity-90">{lista.descricao}</p>
                    )}

                    {/* Total de Músicas */}
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                        <Music2 className="h-4 w-4" />
                        <span className="font-medium">
                            {lista.musicas.length}{' '}
                            {lista.musicas.length === 1 ? 'música' : 'músicas'}
                        </span>
                    </div>
                </div>

                {/* Lista de Músicas */}
                <div className="space-y-3">
                    {lista.musicas.map((musica, index) => (
                        <div
                            key={musica.id}
                            className="overflow-hidden rounded-lg bg-white shadow-sm"
                        >
                            {/* Header da Música */}
                            <button
                                onClick={() => toggleMusica(musica.id)}
                                className="flex w-full items-center gap-4 p-4 transition-colors hover:bg-gray-50"
                            >
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg font-bold" style={{ backgroundColor: '#F5F0E8', color: '#C7AB65' }}>
                                    {musica.numero}
                                </div>
                                <div className="min-w-0 flex-1 text-left">
                                    <h3 className="mb-1 font-semibold text-gray-900">
                                        {musica.titulo}
                                    </h3>
                                    <div className="flex flex-wrap gap-2 text-xs">
                                        {musica.tema && (
                                            <span className="rounded-full px-2 py-1" style={{ backgroundColor: '#F5F0E8', color: '#8B7A45' }}>
                                                {musica.tema.nome}
                                            </span>
                                        )}
                                        {musica.autor && (
                                            <span className="text-gray-500">
                                                {musica.autor}
                                            </span>
                                        )}
                                        {musica.tom && (
                                            <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-700">
                                                {musica.tom}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {musicaExpandida === musica.id ? (
                                    <ChevronUp className="h-5 w-5 flex-shrink-0 text-gray-400" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 flex-shrink-0 text-gray-400" />
                                )}
                            </button>

                            {/* Letra da Música (Expansível) */}
                            {musicaExpandida === musica.id && (
                                <div className="border-t border-gray-200 bg-gray-50 p-4">
                                    <LetraFormatada letra={musica.letra} />
                                    {musica.pivot?.observacao && (
                                        <div className="mt-4 rounded border-l-4 border-yellow-400 bg-yellow-50 p-3">
                                            <p className="text-sm text-yellow-800">
                                                <strong>Observação:</strong>{' '}
                                                {musica.pivot.observacao}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Mensagem se não houver músicas */}
                {lista.musicas.length === 0 && (
                    <div className="rounded-lg bg-white p-12 text-center shadow-sm">
                        <Music2 className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                        <p className="text-gray-600">
                            Esta lista ainda não possui músicas.
                        </p>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="mb-4 text-sm text-gray-500">
                        Gostou? Crie sua própria lista de músicas!
                    </p>
                    <a
                        href="/register"
                        className="inline-block rounded-lg px-6 py-3 font-semibold text-white transition-colors"
                        style={{ backgroundColor: '#C7AB65' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B89B55'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#C7AB65'}
                    >
                        Criar Minha Lista
                    </a>
                </div>
            </div>

            {/* Estilos para impressão */}
            <style jsx>{`
                @media print {
                    header,
                    footer,
                    button,
                    a[href='/register'] {
                        display: none !important;
                    }
                    .bg-gradient-to-r {
                        background: white !important;
                        color: black !important;
                        border: 2px solid #ddd !important;
                    }
                    .space-y-3 > div {
                        page-break-inside: avoid;
                    }
                }
            `}</style>
        </AppLayout>
    );
}
