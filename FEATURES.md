# 📚 Documentação de Funcionalidades

## Visão Geral

O sistema Cânticos de Missa é uma aplicação web mobile-first para gerenciamento e compartilhamento de letras de músicas litúrgicas.

## Funcionalidades Principais

### 1. Catálogo de Músicas

**Acesso:** Público (não requer login)

#### Listar Músicas
- **Rota:** `GET /musicas`
- **Funcionalidades:**
    - Visualização paginada de todas as músicas
    - Busca por número, título ou trecho da letra
    - Filtro por tema litúrgico
    - Ordenação por número
    - 50 músicas por página

#### Ver Música Individual
- **Rota:** `GET /musicas/{id}`
- **Funcionalidades:**
    - Visualização completa da letra
    - Informações: autor, tom, tema
    - Botão para imprimir
    - Link para ver outras músicas do mesmo tema

### 2. Temas Litúrgicos

**Acesso:** Público (não requer login)

#### Índice de Temas
- **Rota:** `GET /temas`
- **Funcionalidades:**
    - Grid de cards com todos os temas
    - Contador de músicas por tema
    - Cores personalizadas para cada tema

#### Músicas por Tema
- **Rota:** `GET /temas/{id}`
- **Funcionalidades:**
    - Listagem de músicas do tema específico
    - Mesmo layout do catálogo geral

### 3. Sistema de Listas

**Acesso:** Requer autenticação

#### Listar Minhas Listas
- **Rota:** `GET /listas`
- **Funcionalidades:**
    - Visualização de todas as listas do usuário
    - Informações: nome, data, número de músicas
    - Acesso rápido para editar

#### Criar Nova Lista
- **Rota:** `GET /listas/create` e `POST /listas`
- **Funcionalidades:**
    - Formulário de criação
    - Campos: nome, descrição, data, horário, local
    - Configuração de visibilidade pública

#### Editar Lista
- **Rota:** `GET /listas/{id}/edit` e `PUT /listas/{id}`
- **Funcionalidades:**
    - Edição de informações da lista
    - Adicionar músicas (modal de busca)
    - Remover músicas
    - Reordenar músicas (drag & drop)
    - Gerar link de compartilhamento
    - Copiar link para área de transferência

#### Excluir Lista
- **Rota:** `DELETE /listas/{id}`
- **Funcionalidades:**
    - Confirmação antes de excluir
    - Remove lista e todas as relações

### 4. Compartilhamento de Listas

**Acesso:** Público (não requer login)

#### Ver Lista Compartilhada
- **Rota:** `GET /lista/{token}`
- **Funcionalidades:**
    - Visualização completa da lista
    - Informações da missa (data, horário, local)
    - Músicas com letras expansíveis
    - Observações específicas de cada música
    - Contador de visualizações
    - Botão para criar conta
    - Otimizado para impressão

## Fluxo de Uso

### Para Visualizadores (Sem Conta)

1. Acessa o site
2. Navega pelo catálogo de músicas
3. Busca por temas ou números
4. Visualiza letras completas
5. Recebe link compartilhado de listas
6. Visualiza lista completa sem login

### Para Coordenadores (Com Conta)

1. Cria conta gratuita
2. Faz login no sistema
3. Cria nova lista para missa
4. Adiciona músicas à lista
5. Reordena conforme necessário
6. Adiciona observações (ex: "Solo de violão")
7. Gera link de compartilhamento
8. Envia link pelo WhatsApp para o grupo
9. Todos acessam sem precisar de login

## Recursos Técnicos

### Busca Inteligente

A busca funciona nos seguintes campos:
- Número da música
- Título
- Letra completa
- Autor

Usa índice full-text do MySQL para performance.

### Paginação

- 50 itens por página no catálogo
- Navegação com botões anterior/próximo
- Links diretos para páginas

### Compartilhamento Seguro

- Token único de 32 caracteres
- Gerado automaticamente na criação
- Impossível de adivinhar
- Pode ser regenerado se necessário

### Responsive Design

- Mobile-first
- Funciona em smartphones, tablets e desktop
- Touch-friendly (botões grandes)
- Menu hambúrguer em mobile

### Performance

- Cache de queries
- Lazy loading de componentes
- Assets otimizados pelo Vite
- CSS Tailwind purged em produção

## Permissões e Segurança

### Rotas Públicas
- `/` - Home
- `/musicas` - Catálogo
- `/musicas/{id}` - Música individual
- `/temas` - Índice de temas
- `/temas/{id}` - Músicas por tema
- `/lista/{token}` - Lista compartilhada

### Rotas Protegidas (Autenticação Obrigatória)
- `/listas` - Minhas listas
- `/listas/create` - Criar lista
- `/listas/{id}/edit` - Editar lista
- `/listas/{id}` - Atualizar/Excluir lista

### Políticas de Autorização

#### ListaPolicy
- `update`: Apenas o criador pode editar
- `delete`: Apenas o criador pode excluir

Implementado via Gates do Laravel.

## API Endpoints (Futuro)

O sistema pode facilmente ser expandido para API REST:

```
GET    /api/musicas              # Listar músicas
GET    /api/musicas/{id}         # Ver música
GET    /api/temas                # Listar temas
GET    /api/lista/{token}        # Ver lista compartilhada (público)

POST   /api/listas               # Criar lista (auth)
GET    /api/listas               # Minhas listas (auth)
PUT    /api/listas/{id}          # Atualizar lista (auth)
DELETE /api/listas/{id}          # Excluir lista (auth)
```

## Melhorias Futuras

### Fase 2
- [ ] Sistema de favoritos
- [ ] Histórico de listas recentes
- [ ] Estatísticas de músicas mais usadas
- [ ] Tags personalizadas
- [ ] Notas privadas em músicas

### Fase 3
- [ ] App mobile nativo (React Native)
- [ ] Modo offline
- [ ] Sincronização multi-dispositivo
- [ ] Colaboração em tempo real
- [ ] Sugestões de músicas baseadas na liturgia

### Fase 4
- [ ] Sistema de acordes/cifras
- [ ] Transposição automática de tom
- [ ] Integração com YouTube
- [ ] QR Code para compartilhamento rápido
- [ ] PWA com notificações

## Suporte

Para dúvidas sobre funcionalidades específicas, consulte:
- README.md - Visão geral
- INSTALL.md - Instalação
- Este arquivo - Funcionalidades detalhadas
