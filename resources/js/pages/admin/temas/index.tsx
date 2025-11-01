import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Plus, Trash2 } from 'lucide-react';

interface Tema {
    id: number;
    nome: string;
    slug: string;
    cor: string;
    ordem: number;
    musicas_count: number;
}

interface Props {
    temas: Tema[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Temas', href: '/admin/temas' },
];

export default function TemasIndex({ temas }: Props) {
    const handleDelete = (tema: Tema) => {
        if (confirm(`Deseja excluir o tema "${tema.nome}"?`)) {
            router.delete(`/admin/temas/${tema.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Temas" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Temas</h1>
                    <Button asChild>
                        <Link href="/admin/temas/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Novo Tema
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Lista de Temas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {temas.length === 0 ? (
                                <p className="text-center text-muted-foreground py-8">
                                    Nenhum tema cadastrado.
                                </p>
                            ) : (
                                <div className="space-y-2">
                                    {temas.map((tema) => (
                                        <div
                                            key={tema.id}
                                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className="w-12 h-12 rounded-lg border-2"
                                                    style={{ backgroundColor: tema.cor }}
                                                />
                                                <div>
                                                    <h3 className="font-semibold">
                                                        {tema.nome}
                                                    </h3>
                                                    <div className="flex gap-2 mt-1">
                                                        <Badge variant="secondary">
                                                            Ordem: {tema.ordem}
                                                        </Badge>
                                                        <Badge variant="outline">
                                                            {tema.musicas_count}{' '}
                                                            {tema.musicas_count === 1
                                                                ? 'música'
                                                                : 'músicas'}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link href={`/admin/temas/${tema.id}/edit`}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(tema)}
                                                    disabled={tema.musicas_count > 0}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
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
