import AppLayout from '@/components/app-layout';
import { Link } from '@inertiajs/react';
import { List, Music, Search, Share2 } from 'lucide-react';

export default function Welcome() {
    const features = [
        {
            icon: Music,
            title: 'Catálogo Completo',
            description:
                'Acesso a centenas de músicas organizadas por número, como no livro Louvemos o Senhor',
        },
        {
            icon: Search,
            title: 'Busca Inteligente',
            description:
                'Encontre músicas por número, título, tema ou até mesmo trechos da letra',
        },
        {
            icon: List,
            title: 'Crie suas Listas',
            description:
                'Monte a sequência de músicas para sua missa de forma rápida e organizada',
        },
        {
            icon: Share2,
            title: 'Compartilhe Facilmente',
            description:
                'Gere um link e compartilhe com seu grupo sem necessidade de login',
        },
    ];

    return (
        <AppLayout>
            {/* Hero Section */}
            <div className="py-12 text-center md:py-20">
                <div className="mb-6 flex justify-center">
                    <Music className="h-20 w-20 text-blue-600" />
                </div>
                <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-6xl">
                    Cânticos de Missa
                </h1>
                <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 md:text-2xl">
                    Todas as letras das músicas da missa na palma da sua mão
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <Link
                        href="/musicas"
                        className="rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition-colors hover:bg-blue-700 hover:shadow-xl"
                    >
                        Ver Músicas
                    </Link>
                    <Link
                        href="/temas"
                        className="rounded-lg border-2 border-blue-600 bg-white px-8 py-4 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
                    >
                        Explorar Temas
                    </Link>
                </div>
            </div>

            {/* Features Grid */}
            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
                    >
                        <feature.icon className="mb-4 h-12 w-12 text-blue-600" />
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                            {feature.title}
                        </h3>
                        <p className="text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </div>

            {/* CTA Section */}
            <div className="mt-16 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white md:p-12">
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                    Organize suas Missas com Facilidade
                </h2>
                <p className="mb-8 text-lg opacity-90 md:text-xl">
                    Cadastre-se gratuitamente e comece a criar suas listas de
                    músicas hoje mesmo
                </p>
                <Link
                    href="/register"
                    className="inline-block rounded-lg bg-white px-8 py-4 font-semibold text-blue-600 shadow-lg transition-colors hover:bg-gray-100"
                >
                    Criar Conta Grátis
                </Link>
            </div>

            {/* How it Works */}
            <div className="mt-16">
                <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
                    Como Funciona
                </h2>
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
                            1
                        </div>
                        <h3 className="mb-2 text-xl font-semibold">
                            Explore o Catálogo
                        </h3>
                        <p className="text-gray-600">
                            Navegue por todas as músicas organizadas por número
                            ou tema
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-2xl font-bold text-purple-600">
                            2
                        </div>
                        <h3 className="mb-2 text-xl font-semibold">
                            Crie sua Lista
                        </h3>
                        <p className="text-gray-600">
                            Monte a sequência de músicas para sua missa
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-600">
                            3
                        </div>
                        <h3 className="mb-2 text-xl font-semibold">
                            Compartilhe
                        </h3>
                        <p className="text-gray-600">
                            Envie o link para seu grupo pelo WhatsApp
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
