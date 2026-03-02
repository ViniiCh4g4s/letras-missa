import { Info } from 'lucide-react';
import { useState } from 'react';

export default function GuiaFormatacao() {
    const [mostrar, setMostrar] = useState(false);

    return (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <button
                type="button"
                onClick={() => setMostrar(!mostrar)}
                className="flex w-full items-center justify-between text-left font-medium text-blue-900"
            >
                <div className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    <span>Como adicionar as músicas?</span>
                </div>
                <span className="text-sm text-blue-700">
                    {mostrar ? 'Ocultar' : 'Mostrar'}
                </span>
            </button>

            {mostrar && (
                <>
                    <div className="mt-4 space-y-3 text-sm text-blue-800">
                        <div className="mt-2">
                            <span className="text-left text-sm font-medium text-blue-900">
                                Temas para Grupo de Oração
                            </span>
                        </div>

                        <div className="grid gap-2 sm:grid-cols-3">
                            <div className="flex items-center gap-3">
                                <code className="rounded bg-blue-100 px-2 py-1">
                                    L
                                </code>
                                <span>→</span>
                                <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                    Louvor
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <code className="rounded bg-blue-100 px-2 py-1">
                                    P
                                </code>
                                <span>→</span>
                                <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                    Perdão
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <code className="rounded bg-blue-100 px-2 py-1">
                                    A
                                </code>
                                <span>→</span>
                                <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                    Adoração
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <code className="rounded bg-blue-100 px-2 py-1">
                                    EG
                                </code>
                                <span>→</span>
                                <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                    Entrega
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <code className="rounded bg-blue-100 px-2 py-1">
                                    ES
                                </code>
                                <span>→</span>
                                <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                    Espírito Santo
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <code className="rounded bg-blue-100 px-2 py-1">
                                    M
                                </code>
                                <span>→</span>
                                <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                    Maria
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <code className="rounded bg-blue-100 px-2 py-1">
                                    EX
                                </code>
                                <span>→</span>
                                <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                    Exaltação
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <code className="rounded bg-blue-100 px-2 py-1">
                                    C
                                </code>
                                <span>→</span>
                                <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                    Cura
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <code className="rounded bg-blue-100 px-2 py-1">
                                    AN
                                </code>
                                <span>→</span>
                                <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                    Anjos
                                </span>
                            </div>
                        </div>

                        <div className="mt-2">
                            <span className="text-left text-sm font-medium text-blue-900">
                                Temas para Missa
                            </span>
                        </div>

                        <div className="grid gap-2 sm:grid-cols-3">
                            <div className="flex items-center gap-3">
                                <code className="rounded bg-blue-100 px-2 py-1">
                                    EN
                                </code>
                                <span>→</span>
                                <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                    Entrada
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <code className="rounded bg-blue-100 px-2 py-1">
                                    AP
                                </code>
                                <span>→</span>
                                <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                    Ato Penitencial
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <code className="rounded bg-blue-100 px-2 py-1">
                                    AC
                                </code>
                                <span>→</span>
                                <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                    Aclamação
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <code className="rounded bg-blue-100 px-2 py-1">
                                    OF
                                </code>
                                <span>→</span>
                                <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                    Ofertório
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <code className="rounded bg-blue-100 px-2 py-1">
                                    ST
                                </code>
                                <span>→</span>
                                <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                    Santo
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <code className="rounded bg-blue-100 px-2 py-1">
                                    CM
                                </code>
                                <span>→</span>
                                <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                    Comunhão
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <code className="rounded bg-blue-100 px-2 py-1">
                                    AG
                                </code>
                                <span>→</span>
                                <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                    Ação de Graças
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <code className="rounded bg-blue-100 px-2 py-1">
                                    F
                                </code>
                                <span>→</span>
                                <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                    Final
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <code className="rounded bg-blue-100 px-2 py-1">
                                    HL
                                </code>
                                <span>→</span>
                                <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                    Hino de Louvor
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <code className="rounded bg-blue-100 px-2 py-1">
                                    SL
                                </code>
                                <span>→</span>
                                <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                    Salmo
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <code className="rounded bg-blue-100 px-2 py-1">
                                    CD
                                </code>
                                <span>→</span>
                                <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                    Cordeiro
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <code className="rounded bg-blue-100 px-2 py-1">
                                    B
                                </code>
                                <span>→</span>
                                <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                    Benção
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <code className="rounded bg-blue-100 px-2 py-1">
                                    E
                                </code>
                                <span>→</span>
                                <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                    Especiais*
                                </span>
                            </div>
                        </div>

                        <div className="rounded border border-blue-200 bg-white p-3">
                            <p className="mb-3 font-medium">
                                Exemplo (resultado visual):
                            </p>
                            <div className="space-y-0.5 text-xs leading-relaxed text-gray-800">
                                <p>
                                    <strong>1.</strong> Glória a Deus nas
                                    alturas
                                </p>
                                <p>E paz na terra aos homens por Ele amados</p>
                                <p>
                                    Senhor Deus, Rei dos céus, Deus Pai
                                    todo-poderoso
                                </p>
                                <p>&nbsp;</p>
                                <p>
                                    <strong>Nós vos louvamos</strong>
                                </p>
                                <p>
                                    <strong>Nós vos bendizemos</strong>
                                </p>
                                <p>
                                    <strong>Nós vos adoramos</strong>
                                </p>
                                <p>
                                    <strong>Nós vos glorificamos</strong>
                                </p>
                                <p>
                                    <strong>
                                        Nós vos damos graças por vossa imensa
                                        glória
                                    </strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
