# 🎵 Guia de Instalação - Cânticos de Missa

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- PHP >= 8.1
- Composer
- Node.js >= 18
- MySQL ou PostgreSQL
- Git

## Passo a Passo

### 1. Clone o Repositório

```bash
git clone <seu-repositorio>
cd canticos-missa
```

### 2. Instale as Dependências do PHP

```bash
composer install
```

### 3. Instale as Dependências do JavaScript

```bash
npm install
```

### 4. Configure o Ambiente

Copie o arquivo de exemplo e configure:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e configure as variáveis:

```env
APP_NAME="Cânticos de Missa"
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=canticos_missa
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
```

### 5. Gere a Chave da Aplicação

```bash
php artisan key:generate
```

### 6. Crie o Banco de Dados

Crie um banco de dados MySQL/PostgreSQL:

```sql
CREATE DATABASE canticos_missa CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 7. Execute as Migrações e Seeders

```bash
php artisan migrate --seed
```

Isso irá:
- Criar todas as tabelas necessárias
- Popular com temas (ENTRADA, PERDÃO, etc.)
- Adicionar músicas de exemplo
- Criar um usuário de teste

### 8. Inicie os Servidores

Em um terminal, inicie o servidor PHP:

```bash
php artisan serve
```

Em outro terminal, inicie o Vite:

```bash
npm run dev
```

### 9. Acesse a Aplicação

Abra seu navegador em: `http://localhost:8000`

**Credenciais de teste:**
- Email: `teste@exemplo.com`
- Senha: `password`

## Estrutura do Projeto

```
canticos-missa/
├── app/
│   ├── Http/Controllers/    # Controladores da aplicação
│   ├── Models/              # Models Eloquent
│   └── Policies/            # Políticas de autorização
├── database/
│   ├── migrations/          # Migrações do banco
│   └── seeders/             # Seeders para popular dados
├── resources/
│   ├── css/                 # Estilos CSS
│   └── js/
│       ├── Components/      # Componentes React reutilizáveis
│       ├── Layouts/         # Layouts da aplicação
│       └── Pages/           # Páginas Inertia
└── routes/
    └── web.php              # Rotas da aplicação
```

## Próximos Passos

### 1. Adicionar Mais Músicas

Você pode adicionar músicas manualmente pelo banco de dados ou criar um seeder:

```bash
php artisan make:seeder MinhasMusicasSeeder
```

### 2. Personalizar Temas

Edite os temas existentes ou adicione novos em:
- `database/seeders/TemaSeeder.php`

### 3. Configurar Autenticação

O sistema usa Laravel Breeze/Sanctum. Para personalizar:

```bash
php artisan vendor:publish --tag=breeze-views
```

### 4. Deploy em Produção

Para deploy, não esqueça de:

1. Configurar variáveis de ambiente de produção
2. Executar `npm run build`
3. Configurar servidor web (Apache/Nginx)
4. Configurar SSL (recomendado)
5. Configurar backups do banco de dados

## Comandos Úteis

```bash
# Limpar cache
php artisan cache:clear
php artisan config:clear
php artisan view:clear

# Recriar banco de dados
php artisan migrate:fresh --seed

# Ver rotas
php artisan route:list

# Criar novo controller
php artisan make:controller NomeController

# Criar nova migration
php artisan make:migration create_nome_table
```

## Solução de Problemas

### Erro de Permissão

```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

### Node Modules com Erro

```bash
rm -rf node_modules package-lock.json
npm install
```

### Vite não carrega assets

Verifique se o servidor Vite está rodando:
```bash
npm run dev
```

## Suporte

Para dúvidas ou problemas, abra uma issue no GitHub.

## Licença

MIT License - sinta-se livre para usar e modificar!
