import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Tema {
    id: number;
    nome: string;
    cor: string;
}

interface Musica {
    id: number;
    numero: number;
    titulo: string;
    autor: string | null;
    tom: string | null;
    ativo: boolean;
    tema: Tema;
}

interface PaginatedMusicas {
    data: Musica[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    musicas: PaginatedMusicas;
    temas: Tema[];
    filters: {
        search: string | null;
        tema_id: number | null;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Músicas', href: '/admin/musicas' },
];

export default function MusicasIndex({ musicas, temas, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [temaId, setTemaId] = useState(filters.tema_id?.toString() || '');

    const handleDelete = (musica: Musica) => {
        if (confirm(`Deseja excluir a música "${musica.titulo}"?`)) {
            router.delete(`/admin/musicas/${musica.id}`);
        }
    };

    const handleFilter = () => {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (temaId) params.append('tema_id', temaId);
        router.get(`/admin/musicas?${params.toString()}`, {}, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Músicas" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Músicas</h1>
                    <Button asChild>
                        <Link href="/admin/musicas/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Nova Música
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Filtros</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
                            <div className="flex-1 space-y-2">
                                <Label htmlFor="search">Buscar</Label>
                                <Input
                                    id="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Número, título, letra ou autor..."
                                    onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
                                />
                            </div>
                            <div className="w-64 space-y-2">
                                <Label htmlFor="tema">Tema</Label>
                                <select
                                    id="tema"
                                    value={temaId}
                                    onChange={(e) => setTemaId(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                >
                                    <option value="">Todos os temas</option>
                                    {temas.map((tema) => (
                                        <option key={tema.id} value={tema.id}>
                                            {tema.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-end">
                                <Button onClick={handleFilter}>
                                    <Search className="mr-2 h-4 w-4" />
                                    Filtrar
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Lista de Músicas ({musicas.total} total)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {musicas.data.length === 0 ? (
                                <p className="text-center text-muted-foreground py-8">
                                    Nenhuma música encontrada.
                                </p>
                            ) : (
                                <div className="space-y-2">
                                    {musicas.data.map((musica) => (
                                        <div
                                            key={musica.id}
                                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                                        >
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className="text-center">
                                                    <div className="text-2xl font-bold">
                                                        {musica.numero}
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold">
                                                        {musica.titulo}
                                                    </h3>
                                                    <div className="flex gap-2 mt-1 flex-wrap">
                                                        {musica.tema && (
                                                            <Badge
                                                                variant="secondary"
                                                                style={{
                                                                    backgroundColor:
                                                                        musica.tema.cor,
                                                                    color: '#fff',
                                                                }}
                                                            >
                                                                {musica.tema.nome}
                                                            </Badge>
                                                        )}
                                                        {musica.autor && (
                                                            <Badge variant="outline">
                                                                {musica.autor}
                                                            </Badge>
                                                        )}
                                                        {musica.tom && (
                                                            <Badge variant="outline">
                                                                Tom: {musica.tom}
                                                            </Badge>
                                                        )}
                                                        {!musica.ativo && (
                                                            <Badge variant="destructive">
                                                                Inativa
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link
                                                        href={`/admin/musicas/${musica.id}/edit`}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(musica)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {musicas.last_page > 1 && (
                                <div className="flex justify-center gap-2 mt-4">
                                    {Array.from(
                                        { length: musicas.last_page },
                                        (_, i) => i + 1
                                    ).map((page) => (
                                        <Button
                                            key={page}
                                            variant={
                                                page === musicas.current_page
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                            size="sm"
                                            onClick={() =>
                                                router.get(
                                                    `/admin/musicas?page=${page}&search=${search}&tema_id=${temaId}`
                                                )
                                            }
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
