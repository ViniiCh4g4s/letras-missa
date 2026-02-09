# Cânticos de Missa

Aplicação web para acesso a letras de músicas católicas de missa, inspirada no livro "Louvemos o Senhor". Pensada para coordenadores de música, músicos, coralistas e comunidades paroquiais que precisam consultar e organizar músicas litúrgicas de forma prática pelo celular.

## Funcionalidades

### Acesso público (sem login)

- **Catálogo de músicas** — navegação pela lista completa numerada, com busca por número, título, letra ou autor
- **Índice por temas litúrgicos** — 21 categorias (Entrada, Perdão, Glória, Comunhão, Ofertório, Santo, etc.), cada uma com cor própria
- **Filtros e ordenação** — filtre por tema e autor, ordene por número ou título
- **Visualização de listas compartilhadas** — acesse listas de músicas via link único, sem precisar de conta

### Área autenticada

- **Criação de listas** — monte a sequência de músicas para cada missa
- **Reordenação por arrastar e soltar** — organize a ordem das músicas na lista com drag & drop
- **Observações por música** — adicione anotações específicas para cada música dentro da lista
- **Compartilhamento por link** — gere um link público para compartilhar no WhatsApp ou onde preferir

### Painel administrativo

- **Dashboard com estatísticas** — músicas, usuários, listas, visualizações, músicas mais usadas e listas mais acessadas
- **Gerenciamento de músicas** — cadastro, edição e ativação/desativação de músicas do catálogo
- **Gerenciamento de temas** — criação e edição de temas litúrgicos com cores personalizadas

## Tecnologias

- **Backend**: Laravel 12 / PHP 8.2+
- **Frontend**: React 19 + TypeScript + Inertia.js
- **UI**: Tailwind CSS v4, Radix UI, Lucide Icons
- **Build**: Vite
- **Banco de dados**: MySQL / PostgreSQL
- **Autenticação**: Laravel Fortify (com suporte a 2FA)

## Licença

MIT License