# Sistema de Administração - Blog e Portfólio

## Visão Geral

Este projeto agora inclui um sistema completo de administração para gerenciar conteúdo do blog e portfólio de forma dinâmica, utilizando:

- **Drizzle ORM** - ORM moderno para TypeScript
- **SQLite** com **libsql** - Banco de dados local
- **Next.js API Routes** - Backend para operações CRUD
- **Interface de Administração** - Painel web para gerenciar conteúdo

## Estrutura do Banco de Dados

### Tabela `blog_posts`

- `id` - Identificador único
- `title` - Título do post
- `content` - Conteúdo completo
- `excerpt` - Resumo do post
- `image` - URL da imagem
- `authorName` - Nome do autor
- `authorImage` - Foto do autor
- `authorDesignation` - Cargo do autor
- `tags` - Tags (JSON)
- `publishDate` - Data de publicação
- `createdAt` / `updatedAt` - Timestamps

### Tabela `portfolio_items`

- `id` - Identificador único
- `title` - Título do projeto
- `description` - Descrição do projeto
- `image` - URL da imagem
- `technologies` - Tecnologias usadas (JSON)
- `projectUrl` - URL do projeto (opcional)
- `githubUrl` - URL do GitHub (opcional)
- `featured` - Se é item em destaque
- `createdAt` / `updatedAt` - Timestamps

## Scripts Disponíveis

```bash
# Gerar migrações do banco
pnpm db:generate

# Aplicar migrações
pnpm db:migrate

# Popular banco com dados iniciais
pnpm db:seed

# Executar em desenvolvimento
pnpm dev
```

## Funcionalidades

### 🔧 Administração

- **URL**: `/admin`
- Interface com abas para Blog e Portfólio
- Operações CRUD completas
- Formulários responsivos
- Confirmações de exclusão

### 📝 Blog

- Criação/edição de posts
- Sistema de tags
- Informações do autor
- Data de publicação
- Imagens personalizadas

### 💼 Portfólio

- Gerenciamento de projetos
- Tecnologias utilizadas
- Links para projeto e GitHub
- Sistema de destaques
- Imagens dos projetos

### 🌐 API Routes

#### Blog

- `GET /api/blog` - Lista todos os posts
- `POST /api/blog` - Cria novo post
- `GET /api/blog/[id]` - Busca post específico
- `PUT /api/blog/[id]` - Atualiza post
- `DELETE /api/blog/[id]` - Remove post

#### Portfólio

- `GET /api/portfolio` - Lista todos os itens
- `POST /api/portfolio` - Cria novo item
- `GET /api/portfolio/[id]` - Busca item específico
- `PUT /api/portfolio/[id]` - Atualiza item
- `DELETE /api/portfolio/[id]` - Remove item

## Hooks Personalizados

### `useBlogPosts()`

```tsx
const { posts, loading, error } = useBlogPosts();
```

### `usePortfolio()`

```tsx
const { items, loading, error } = usePortfolio();
```

## Componentes Dinâmicos

- **Blog Section**: Carrega automaticamente os 3 posts mais recentes
- **Portfolio Section**: Exibe todos os projetos do banco
- **Admin Interface**: Interface completa de gerenciamento

## Dados Iniciais

O script de seed adiciona:

- 3 posts de exemplo no blog
- 3 projetos no portfólio
- Dados realistas com informações do autor

## Configuração do Banco

O banco SQLite está configurado em `./sqlite.db` com:

- Configuração Drizzle em `drizzle.config.ts`
- Schema em `src/lib/db/schema.ts`
- Conexão em `src/lib/db/index.ts`

## Como Usar

1. **Instalar dependências**:

   ```bash
   pnpm install
   ```

2. **Configurar banco**:

   ```bash
   pnpm db:migrate
   pnpm db:seed
   ```

3. **Executar aplicação**:

   ```bash
   pnpm dev
   ```

4. **Acessar admin**:
   - Ir para `http://localhost:3001/admin`
   - Gerenciar conteúdo nas abas Blog/Portfólio

## Benefícios

✅ **Conteúdo Dinâmico**: Dados vêm do banco, não de arquivos estáticos
✅ **Interface Amigável**: Admin panel intuitivo e responsivo
✅ **Type Safety**: TypeScript em toda a aplicação
✅ **Performance**: Drizzle ORM otimizado e eficiente
✅ **Escalabilidade**: Estrutura preparada para crescimento
✅ **Flexibilidade**: Fácil adição de novos campos e funcionalidades
