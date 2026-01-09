# 📁 Estrutura do Projeto - Cardápio Digital

## 🌳 Árvore Completa

```
cardapio-digital-fullstack/
│
├── 📚 DOCUMENTAÇÃO & README
│   ├── README.md                    ← COMECE AQUI
│   ├── COMECE_AQUI.md              ← Guia super rápido
│   ├── QUICK_START.md              ← 5 minutos
│   ├── SETUP_CHECKLIST.md          ← Checklist completo
│   ├── DOCKER_SETUP.md             ← Docker detalhado
│   ├── ABLY_GUIDE.md               ← Ably com exemplos
│   ├── ARQUITETURA.md              ← Diagrama técnico
│   ├── README_SETUP.md             ← Visão geral
│   ├── INDEX.md                    ← Índice de tudo
│   ├── SUMARIO.md                  ← Resumo executivo
│   ├── AJUSTES_REALIZADOS.md       ← Mudanças feitas
│   └── FINALIZADO.md               ← Status final
│
├── 🐳 DOCKER & CONFIGURAÇÃO (RAIZ)
│   ├── docker-compose.yml          ← Orquestração principal
│   ├── Dockerfile.backend          ← Build backend
│   ├── Dockerfile.frontend         ← Build frontend
│   ├── start-docker.sh             ← Script Linux/Mac
│   ├── start-docker.bat            ← Script Windows
│   ├── .env.example                ← Template variáveis
│   ├── .gitignore                  ← Ignorados do git
│   └── ESTRUTURA.md                ← Este arquivo
│
├── 🔧 BACKEND (back/)
│   ├── src/
│   │   ├── ably.ts                 ← Config Ably
│   │   ├── app.ts                  ← App Express
│   │   ├── index.ts                ← Entry point
│   │   ├── prisma.ts               ← Config Prisma
│   │   ├── sse.ts                  ← Server-Sent Events
│   │   │
│   │   ├── routes/
│   │   │   ├── order.routes.ts     ← Rotas pedidos
│   │   │   ├── category.routes.ts  ← Rotas categorias
│   │   │   └── dish.routes.ts      ← Rotas pratos
│   │   │
│   │   └── validators/
│   │       ├── order.ts            ← Validação pedidos
│   │       ├── category.ts         ← Validação categorias
│   │       └── dish.ts             ← Validação pratos
│   │
│   ├── prisma/
│   │   ├── schema.prisma           ← Schema DB
│   │   ├── seed.ts                 ← Seed inicial
│   │   └── migrations/
│   │       ├── migration_lock.toml
│   │       └── 20251105125813_init/
│   │           └── migration.sql
│   │
│   ├── postman/                    ← Coleções Postman
│   │   ├── Cardapio Digital - Production.postman_collection.json
│   │   └── Cum Cardapio.postman_collection.json
│   │
│   ├── .env                        ← Variáveis (não commitado)
│   ├── .env.example                ← Template
│   ├── package.json                ← Dependências
│   ├── tsconfig.json               ← Configuração TypeScript
│   ├── Dockerfile.dev              ← Legado (usar Dockerfile.backend na raiz)
│   ├── docker-compose.yml          ← Legado (usar da raiz)
│   ├── README.md                   ← README backend
│   └── node_modules/               ← (não commitado)
│
├── 🎨 FRONTEND (front/)
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx            ← Home page
│   │   │   ├── layout.tsx          ← Layout root
│   │   │   ├── globals.css         ← CSS global
│   │   │   │
│   │   │   ├── orders/
│   │   │   │   └── page.tsx        ← Página pedidos
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx        ← Dashboard
│   │   │   │
│   │   │   ├── analytics/
│   │   │   │   └── page.tsx        ← Analytics
│   │   │   │
│   │   │   └── login/
│   │   │       └── page.tsx        ← Login
│   │   │
│   │   ├── lib/
│   │   │   ├── ably.ts             ← Cliente Ably
│   │   │   ├── api.ts              ← Cliente API
│   │   │   └── swal.ts             ← SweetAlert config
│   │   │
│   │   ├── hooks/
│   │   │   └── useAblyChannel.ts   ← Hook Ably custom
│   │   │
│   │   ├── components/
│   │   │   ├── CartButton.tsx      ← Botão carrinho
│   │   │   ├── CartModal.tsx       ← Modal carrinho
│   │   │   ├── CartProvider.tsx    ← Context carrinho
│   │   │   ├── CategoriaComponent.tsx
│   │   │   ├── CategoriasList.tsx
│   │   │   ├── GraniteBackground.tsx
│   │   │   ├── LoadingOverlay.tsx
│   │   │   ├── LoadingProvider.tsx
│   │   │   ├── MenuTable.tsx
│   │   │   ├── NewOrderNotifier.tsx ← Notificações (com Ably)
│   │   │   └── OrdersWithAbly.tsx  ← Exemplo Ably completo
│   │   │
│   │   └── img/                    ← Assets
│   │
│   ├── public/                     ← Assets públicos
│   │
│   ├── .env.local                  ← Variáveis (não commitado)
│   ├── .env.example                ← Template
│   ├── package.json                ← Dependências
│   ├── tsconfig.json               ← Configuração TypeScript
│   ├── next.config.ts              ← Next.js config
│   ├── postcss.config.mjs          ← PostCSS config
│   ├── next-env.d.ts               ← Types Next.js
│   ├── Dockerfile.dev              ← Legado (usar Dockerfile.frontend na raiz)
│   ├── README.md                   ← README frontend
│   └── node_modules/               ← (não commitado)
│
└── 📦 RAIZ
    ├── .git/                       ← Repositório Git
    ├── .gitignore                  ← Arquivo ignore
    ├── node_modules/               ← (não commitado, se instalado aqui)
    └── ... outros arquivos
```

## 📂 Diretórios Principais

### 🔧 Backend (back/)
Servidor Express com Prisma ORM e validação com Zod.

**Arquivos importantes:**
- `src/ably.ts` - Inicialização e funções Ably
- `src/app.ts` - Configuração Express
- `src/routes/` - Endpoints da API
- `prisma/schema.prisma` - Modelo de dados
- `package.json` - Dependências

### 🎨 Frontend (front/)
Aplicação Next.js com componentes React.

**Arquivos importantes:**
- `src/app/` - Páginas e layout
- `src/components/` - Componentes reutilizáveis
- `src/lib/ably.ts` - Cliente Ably
- `src/hooks/useAblyChannel.ts` - Hook customizado
- `package.json` - Dependências

### 🐳 Docker
Tudo na raiz para facilitar.

**Arquivos:**
- `docker-compose.yml` - Orquestração dos 3 containers
- `Dockerfile.backend` - Build backend
- `Dockerfile.frontend` - Build frontend
- `start-docker.sh` - Script inicialização Linux/Mac
- `start-docker.bat` - Script inicialização Windows

### 📚 Documentação
Guias completos e exemplos.

**Principais:**
- `README.md` - README principal
- `QUICK_START.md` - Início rápido
- `DOCKER_SETUP.md` - Docker detalhado
- `ABLY_GUIDE.md` - Ably com exemplos
- `INDEX.md` - Índice de tudo

## 🔑 Arquivos Importantes

### Configuração
- `.env` - Variáveis backend
- `.env.example` - Template na raiz
- `back/.env` - Variáveis backend específicas
- `front/.env.local` - Variáveis frontend específicas

### Dependências
- `back/package.json` - Backend deps
- `front/package.json` - Frontend deps

### TypeScript
- `back/tsconfig.json` - Backend config
- `front/tsconfig.json` - Frontend config

### Docker
- `docker-compose.yml` - Orquestração
- `Dockerfile.backend` - Backend build
- `Dockerfile.frontend` - Frontend build

## 📊 Tamanhos Típicos

```
back/
  ├── src/              ~100 KB
  ├── prisma/           ~50 KB
  └── node_modules/     ~500 MB (não commitado)

front/
  ├── src/              ~200 KB
  ├── public/           ~100 KB
  └── node_modules/     ~800 MB (não commitado)

.git/                   ~10 MB

Total (sem node_modules): ~500 KB
Total (com node_modules): ~1.3 GB
```

## 🔄 Fluxo de Desenvolvimento

```
1. Editar back/src/*
   └─► Auto reload via ts-node-dev
       └─► API atualizada em segundos

2. Editar front/src/*
   └─► Auto reload via Next.js
       └─► Browser refresh automático

3. Editar prisma/schema.prisma
   └─► Executar: docker-compose exec api npx prisma migrate dev
       └─► Schema e tipos atualizados
```

## 📦 Instalação Local (Sem Docker)

Se quiser rodar localmente sem Docker:

```bash
# Backend
cd back
npm install
npm run dev

# Frontend (outro terminal)
cd front
npm install
npm run dev
```

Mas **não recomendado** - use Docker para consistência!

## 🔐 Arquivos Ignorados

`.gitignore` contém:
- `.env` e `.env.local`
- `node_modules/`
- `.next/`
- `dist/`
- `.DS_Store`
- etc.

## 📋 Organização por Tipo

### Configuração
- Raiz: `docker-compose.yml`, `.env.example`, scripts
- Backend: `back/.env`, `back/package.json`, `back/tsconfig.json`
- Frontend: `front/.env.local`, `front/package.json`, `front/tsconfig.json`

### Código
- Backend: `back/src/`
- Frontend: `front/src/`

### Dados
- Backend: `back/prisma/`
- Frontend: `front/public/`

### Documentação
- Raiz: README, guias, documentação

### Docker
- Raiz: Dockerfiles, docker-compose.yml, scripts

## 🎯 Onde Fazer Alterações

| Objetivo | Arquivo | Tipo |
|----------|---------|------|
| Adicionar endpoint API | `back/src/routes/` | Backend |
| Criar página | `front/src/app/` | Frontend |
| Novo banco de dados | `back/prisma/schema.prisma` | Ambos |
| Integração Ably | `back/src/ably.ts` ou `front/src/lib/ably.ts` | Ambos |
| Variáveis env | `back/.env` ou `front/.env.local` | Config |
| Docker config | `docker-compose.yml` | Docker |
| Documentação | Raiz | Docs |

## 🚀 Próximas Passos

1. **Entender estrutura**: Ler este arquivo
2. **Começar rápido**: [QUICK_START.md](./QUICK_START.md)
3. **Configurar tudo**: [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)
4. **Aprender Ably**: [ABLY_GUIDE.md](./ABLY_GUIDE.md)
5. **Desenvolver**: Criar features!

---

*Estrutura criada em: 9 de janeiro de 2026*
