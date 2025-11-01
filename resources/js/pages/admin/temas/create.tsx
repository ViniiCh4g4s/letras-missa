import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Temas', href: '/admin/temas' },
    { title: 'Novo Tema', href: '/admin/temas/create' },
];

export default function TemasCreate() {
    const { data, setData, post, processing, errors } = useForm({
        nome: '',
        cor: '#3B82F6',
        ordem: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/temas');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Novo Tema" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/admin/temas">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold">Novo Tema</h1>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Informações do Tema</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="nome">
                                    Nome <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="nome"
                                    value={data.nome}
                                    onChange={(e) => setData('nome', e.target.value)}
                                    placeholder="Ex: Entrada"
                                    autoFocus
                                />
                                {errors.nome && (
                                    <p className="text-sm text-destructive">
                                        {errors.nome}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="cor">
                                    Cor <span className="text-destructive">*</span>
                                </Label>
                                <div className="flex gap-2 items-center">
                                    <Input
                                        id="cor"
                                        type="color"
                                        value={data.cor}
                                        onChange={(e) => setData('cor', e.target.value)}
                                        className="w-20 h-10"
                                    />
                                    <Input
                                        type="text"
                                        value={data.cor}
                                        onChange={(e) => setData('cor', e.target.value)}
                                        placeholder="#3B82F6"
                                        className="flex-1"
                                    />
                                </div>
                                {errors.cor && (
                                    <p className="text-sm text-destructive">{errors.cor}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="ordem">Ordem (opcional)</Label>
                                <Input
                                    id="ordem"
                                    type="number"
                                    value={data.ordem}
                                    onChange={(e) => setData('ordem', e.target.value)}
                                    placeholder="Deixe em branco para ordem automática"
                                />
                                {errors.ordem && (
                                    <p className="text-sm text-destructive">
                                        {errors.ordem}
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-2 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Salvando...' : 'Salvar Tema'}
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <Link href="/admin/temas">Cancelar</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
