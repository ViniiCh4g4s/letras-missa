import { Link, usePage } from '@inertiajs/react';
import {
    FolderOpen,
    Home,
    List,
    LogOut,
    Menu,
    Music,
    Plus,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AppLayout({ children }) {
    const { auth } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = [
        { name: 'Início', href: '/', icon: Home },
        { name: 'Músicas', href: '/musicas', icon: Music },
        { name: 'Temas', href: '/temas', icon: FolderOpen },
    ];

    const authNavigation = auth.user
        ? [
              { name: 'Minhas Listas', href: '/listas', icon: List },
              { name: 'Nova Lista', href: '/listas/create', icon: Plus },
          ]
        : [];

    // Fecha o menu ao pressionar ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setMobileMenuOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Previne scroll quando menu está aberto
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [mobileMenuOpen]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2">
                            <Music className="h-8 w-8 text-blue-600" />
                            <span className="text-xl font-bold text-gray-900">
                                Cânticos de Missa
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden space-x-4 lg:flex">
                            {[...navigation, ...authNavigation].map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center space-x-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                                >
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.name}</span>
                                </Link>
                            ))}
                        </nav>

                        {/* User Menu Desktop */}
                        <div className="hidden items-center space-x-4 lg:flex">
                            {auth.user ? (
                                <>
                                    <span className="text-sm text-gray-700">
                                        Olá, {auth.user.name}
                                    </span>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="flex items-center space-x-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        <span>Sair</span>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="text-sm font-medium text-gray-700 hover:text-blue-600"
                                    >
                                        Entrar
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                    >
                                        Cadastrar
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="rounded-md p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Sidebar Overlay */}
            {mobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 lg:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Sidebar */}
                    <div className="fixed top-0 right-0 bottom-0 z-50 w-72 transform bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden"
                        style={{ animation: 'slideInRight 0.3s ease-out' }}
                    >
                        <div className="flex h-full flex-col">
                            {/* Header do Sidebar */}
                            <div className="flex items-center justify-between border-b border-gray-200 p-4">
                                <span className="text-lg font-bold text-gray-900">
                                    Menu
                                </span>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Conteúdo do Sidebar */}
                            <div className="flex-1 overflow-y-auto p-4">
                                {/* User Info */}
                                {auth.user && (
                                    <div className="mb-4 rounded-lg bg-blue-50 p-4">
                                        <p className="text-sm text-gray-600">
                                            Olá,
                                        </p>
                                        <p className="font-semibold text-gray-900">
                                            {auth.user.name}
                                        </p>
                                    </div>
                                )}

                                {/* Navigation */}
                                <nav className="space-y-2">
                                    {[...navigation, ...authNavigation].map(
                                        (item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="flex items-center space-x-3 rounded-lg px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                            >
                                                <item.icon className="h-5 w-5" />
                                                <span>{item.name}</span>
                                            </Link>
                                        ),
                                    )}
                                </nav>
                            </div>

                            {/* Footer do Sidebar */}
                            <div className="border-t border-gray-200 p-4">
                                {auth.user ? (
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="flex w-full items-center justify-center space-x-2 rounded-lg bg-red-50 px-4 py-3 text-base font-medium text-red-600 transition-colors hover:bg-red-100"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <LogOut className="h-5 w-5" />
                                        <span>Sair</span>
                                    </Link>
                                ) : (
                                    <div className="space-y-2">
                                        <Link
                                            href="/login"
                                            className="block rounded-lg border-2 border-blue-600 bg-white px-4 py-3 text-center text-base font-medium text-blue-600 transition-colors hover:bg-blue-50"
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                        >
                                            Entrar
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="block rounded-lg bg-blue-600 px-4 py-3 text-center text-base font-medium text-white transition-colors hover:bg-blue-700"
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                        >
                                            Cadastrar
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="mt-12 border-t border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <p className="text-center text-sm text-gray-500">
                        © 2025 Cânticos de Missa. Feito para a
                        comunidade.
                    </p>
                </div>
            </footer>
        </div>
    );
}
