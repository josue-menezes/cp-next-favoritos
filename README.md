# Minha lista de produtos favoritos

Projeto em **Next.js (App Router) + TypeScript + Tailwind** que consome a API pública [DummyJSON](https://dummyjson.com/docs/products).

## 🔗 Link da aplicação

**https://SEU-PROJETO.vercel.app** ← trocar depois do deploy

## Funcionalidades

- Login (usuário + senha) validado no servidor por Route Handler (`/api/login`), com a senha em `APP_PASSWORD`
- Sessão em cookie httpOnly assinado: continua logado ao atualizar a página
- `proxy.ts` protege `/products` e `/favorites` (sem login → volta para o login)
- Lista inicial de 15 produtos + busca com debounce (máx. 15 por requisição)
- Estados de carregamento, lista vazia e erro na API (com "Tentar novamente")
- Favoritar/desfavoritar salvando no `localStorage`, com indicação visual (♥)
- Página de favoritos e contador no menu
- Logout no topo: apaga o cookie e limpa os favoritos
- **Extra:** página de detalhes (`/products/[id]`) com descrição, marca, desconto, garantia, devolução, avaliações e botão de favoritar

## Estrutura

```
app/
  page.tsx                  → login
  api/login/route.ts        → valida a senha e cria o cookie
  api/logout/route.ts       → apaga o cookie
  (private)/layout.tsx      → header com logout (área logada)
  (private)/products/       → listagem + busca, loading, detalhes [id]
  (private)/favorites/      → favoritos do usuário
components/                 → UI (cards, botões, estados)
hooks/useFavorites.ts       → lê/atualiza favoritos do localStorage
lib/api.ts                  → chamadas à DummyJSON
lib/session.ts              → criação/validação do cookie de sessão
lib/favorites.ts            → leitura/escrita no localStorage
types/product.ts            → interfaces da API
proxy.ts                    → proteção das rotas
```

## Rodando localmente

```bash
npm install
cp .env.example .env.local   # e defina APP_PASSWORD
npm run dev
```

Login: qualquer usuário + a senha definida em `APP_PASSWORD`.

## Deploy (Vercel)

Em **Settings → Environment Variables**, criar `APP_PASSWORD` (Production) e fazer redeploy.
