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
                    <span>Como formatar a letra?</span>
                </div>
                <span className="text-sm text-blue-700">
                    {mostrar ? 'Ocultar' : 'Mostrar'}
                </span>
            </button>

            {mostrar && (
                <div className="mt-4 space-y-3 text-sm text-blue-800">
                    <div className="grid gap-2 sm:grid-cols-2">
                        <div className="flex items-center gap-3">
                            <code className="rounded bg-blue-100 px-2 py-1">**texto**</code>
                            <span>→</span>
                            <strong>texto</strong>
                        </div>
                        <div className="flex items-center gap-3">
                            <code className="rounded bg-blue-100 px-2 py-1">*texto*</code>
                            <span>→</span>
                            <em>texto</em>
                        </div>
                        <div className="flex items-center gap-3">
                            <code className="rounded bg-blue-100 px-2 py-1">__texto__</code>
                            <span>→</span>
                            <u>texto</u>
                        </div>
                        <div className="flex items-center gap-3">
                            <code className="rounded bg-blue-100 px-2 py-1">[Refrão]</code>
                            <span>→</span>
                            <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                Refrão
                            </span>
                        </div>
                    </div>

                    <div className="rounded border border-blue-200 bg-white p-3">
                        <p className="mb-3 font-medium">Exemplo (resultado visual):</p>
                        <div className="space-y-0.5 text-xs leading-relaxed text-gray-800">
                            <p><strong>1.</strong> Glória a Deus nas alturas</p>
                            <p>E paz na terra aos homens por Ele amados</p>
                            <p>Senhor Deus, Rei dos céus, Deus Pai todo-poderoso</p>
                            <p>&nbsp;</p>
                            <p><strong>Nós vos louvamos</strong></p>
                            <p><strong>Nós vos bendizemos</strong></p>
                            <p><strong>Nós vos adoramos</strong></p>
                            <p><strong>Nós vos glorificamos</strong></p>
                            <p><strong>Nós vos damos graças por vossa imensa glória</strong></p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
