# 🎵 Cânticos de Missa

Sistema web moderno para letras de músicas de missa, com foco em dispositivos móveis.

## 📱 Funcionalidades

- **Catálogo de Músicas**: Lista completa numerada (estilo "Louvemos o Senhor")
- **Índice por Temas**: Organize por ENTRADA, PERDÃO, ADORAÇÃO, COMUNHÃO, etc.
- **Busca Inteligente**: Encontre músicas por número, título ou trecho da letra
- **Listas Personalizadas**: Crie playlists para suas missas
- **Compartilhamento**: Compartilhe listas via link sem necessidade de login
- **Interface Mobile-First**: Otimizado para smartphones
- **Sem Anúncios**: Interface limpa e focada

## 🚀 Tecnologias

- **Backend**: Laravel 11
- **Frontend**: React 18 + Inertia.js
- **Build**: Vite
- **Database**: MySQL/PostgreSQL
- **Autenticação**: Laravel Sanctum

## 📦 Instalação

```bash
# Clone o repositório
git clone <seu-repositorio>
cd canticos-missa

# Instale as dependências
composer install
npm install

# Configure o ambiente
cp .env.example .env
php artisan key:generate

# Configure o banco de dados no .env
# DB_DATABASE=canticos_missa
# DB_USERNAME=seu_usuario
# DB_PASSWORD=sua_senha

# Execute as migrações
php artisan migrate --seed

# Inicie o servidor
php artisan serve
npm run dev
```

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais

- **musicas**: Catálogo de músicas
- **temas**: Categorias (Entrada, Perdão, etc.)
- **listas**: Listas personalizadas de músicas
- **lista_musicas**: Relação entre listas e músicas

## 🎯 Como Usar

1. **Navegar pelo Catálogo**: Acesse a lista completa de músicas
2. **Buscar por Tema**: Use o índice para filtrar por categoria
3. **Criar Lista** (requer login): Monte sua sequência de músicas para a missa
4. **Compartilhar**: Gere um link único e compartilhe com seu grupo

## 📱 Screenshots

[Adicionar screenshots aqui]

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

MIT License