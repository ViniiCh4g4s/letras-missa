import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface Tema {
    id: number;
    nome: string;
    cor: string;
}

interface Musica {
    id: number;
    numero: number;
    titulo: string;
    letra: string;
    autor: string | null;
    tom: string | null;
    tema_id: number;
    tags: string | null;
    ativo: boolean;
    tema: Tema;
}

interface Props {
    musica: Musica;
    temas: Tema[];
}

export default function MusicasEdit({ musica, temas }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Músicas', href: '/admin/musicas' },
        { title: musica.titulo, href: `/admin/musicas/${musica.id}/edit` },
    ];

    const { data, setData, put, processing, errors } = useForm({
        numero: musica.numero.toString(),
        titulo: musica.titulo,
        letra: musica.letra,
        autor: musica.autor || '',
        tom: musica.tom || '',
        tema_id: musica.tema_id.toString(),
        tags: musica.tags || '',
        ativo: musica.ativo,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/musicas/${musica.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar ${musica.titulo}`} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/admin/musicas">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold">Editar {musica.titulo}</h1>
                </div>

                <Card className="max-w-4xl">
                    <CardHeader>
                        <CardTitle>Informações da Música</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="numero">
                                        Número <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="numero"
                                        type="number"
                                        value={data.numero}
                                        onChange={(e) =>
                                            setData('numero', e.target.value)
                                        }
                                        placeholder="Ex: 001"
                                        autoFocus
                                    />
                                    {errors.numero && (
                                        <p className="text-sm text-destructive">
                                            {errors.numero}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tema_id">
                                        Tema <span className="text-destructive">*</span>
                                    </Label>
                                    <select
                                        id="tema_id"
                                        value={data.tema_id}
                                        onChange={(e) =>
                                            setData('tema_id', e.target.value)
                                        }
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                    >
                                        <option value="">Selecione um tema</option>
                                        {temas.map((tema) => (
                                            <option key={tema.id} value={tema.id}>
                                                {tema.nome}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.tema_id && (
                                        <p className="text-sm text-destructive">
                                            {errors.tema_id}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="titulo">
                                    Título <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="titulo"
                                    value={data.titulo}
                                    onChange={(e) => setData('titulo', e.target.value)}
                                    placeholder="Ex: Maria, Mãe de Deus"
                                />
                                {errors.titulo && (
                                    <p className="text-sm text-destructive">
                                        {errors.titulo}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="letra">
                                    Letra <span className="text-destructive">*</span>
                                </Label>
                                <textarea
                                    id="letra"
                                    value={data.letra}
                                    onChange={(e) => setData('letra', e.target.value)}
                                    placeholder="Digite a letra da música..."
                                    rows={10}
                                    className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                />
                                {errors.letra && (
                                    <p className="text-sm text-destructive">
                                        {errors.letra}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="autor">Autor</Label>
                                    <Input
                                        id="autor"
                                        value={data.autor}
                                        onChange={(e) => setData('autor', e.target.value)}
                                        placeholder="Ex: João Silva"
                                    />
                                    {errors.autor && (
                                        <p className="text-sm text-destructive">
                                            {errors.autor}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tom">Tom</Label>
                                    <Input
                                        id="tom"
                                        value={data.tom}
                                        onChange={(e) => setData('tom', e.target.value)}
                                        placeholder="Ex: C, G, Am"
                                    />
                                    {errors.tom && (
                                        <p className="text-sm text-destructive">
                                            {errors.tom}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tags">Tags (opcional)</Label>
                                <Input
                                    id="tags"
                                    value={data.tags}
                                    onChange={(e) => setData('tags', e.target.value)}
                                    placeholder="Ex: natal, páscoa"
                                />
                                {errors.tags && (
                                    <p className="text-sm text-destructive">
                                        {errors.tags}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="ativo"
                                    checked={data.ativo}
                                    onCheckedChange={(checked) =>
                                        setData('ativo', checked as boolean)
                                    }
                                />
                                <Label htmlFor="ativo" className="cursor-pointer">
                                    Música ativa
                                </Label>
                            </div>

                            <div className="flex gap-2 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Salvando...' : 'Atualizar Música'}
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <Link href="/admin/musicas">Cancelar</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
