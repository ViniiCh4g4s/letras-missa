import { Info } from 'lucide-react';
import { useState } from 'react';

export default function GuiaFormatacao() {
    const [mostrar, setMostrar] = useState(false);

    return (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <button
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
                <div className="mt-4 space-y-2 text-sm text-blue-800">
                    <div className="grid gap-2 sm:grid-cols-2">
                        <div>
                            <code className="rounded bg-blue-100 px-2 py-1">
                                **texto**
                            </code>
                            <span className="ml-2">= Negrito</span>
                        </div>
                        <div>
                            <code className="rounded bg-blue-100 px-2 py-1">
                                *texto*
                            </code>
                            <span className="ml-2">= Itálico</span>
                        </div>
                        <div>
                            <code className="rounded bg-blue-100 px-2 py-1">
                                __texto__
                            </code>
                            <span className="ml-2">= Sublinhado</span>
                        </div>
                        <div>
                            <code className="rounded bg-blue-100 px-2 py-1">
                                [Refrão]
                            </code>
                            <span className="ml-2">= Marcador</span>
                        </div>
                    </div>
                    <div className="mt-3 rounded border border-blue-200 bg-white p-3">
                        <p className="mb-2 font-medium">Exemplo:</p>
                        <code className="block text-xs whitespace-pre">
                            {`**Vem, Senhor Jesus, vem!**
Vem habitar nossa vida

[Refrão]
*Está passando Jesus de Nazaré*
E quer __entrar__ no teu coração`}
                        </code>
                    </div>
                </div>
            )}
        </div>
    );
}
