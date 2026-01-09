# 🍽️ Cardápio Digital - Full Stack

[![Docker](https://img.shields.io/badge/Docker-Compose-blue?logo=docker)](https://www.docker.com)
[![Node.js](https://img.shields.io/badge/Node.js-20-green?logo=node.js)](https://nodejs.org)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![Express](https://img.shields.io/badge/Express-4-yellow?logo=express)](https://expressjs.com)
[![Ably](https://img.shields.io/badge/Ably-Real--time-orange)](https://ably.com)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?logo=mysql)](https://www.mysql.com)

Sistema completo de cardápio digital com suporte a pedidos em tempo real, desenvolvido com **Next.js**, **Express**, **Prisma** e **Ably**.

## ✨ Features

- ✅ **Frontend moderno** com Next.js 15 e React 19
- ✅ **Backend robusto** com Express e TypeScript
- ✅ **Banco de dados** MySQL gerenciado com Prisma
- ✅ **Comunicação em tempo real** com Ably (Pub/Sub)
- ✅ **Hot reload** para desenvolvimento local
- ✅ **Docker Compose** para containerização completa
- ✅ **Dashboard** de análise e gerenciamento
- ✅ **Validação** com Zod
- ✅ **Notificações** em tempo real de pedidos
- ✅ **Fully Dockerized** - Tudo em containers

## 🚀 Quick Start

### 1️⃣ Pré-requisitos

```bash
# Verificar instalação
docker --version
docker-compose --version
```

- Docker e Docker Compose instalados
- Chave do Ably (obtenha em https://ably.com/dashboard)

### 2️⃣ Configurar Variáveis de Ambiente

**Backend** - Crie ou edite `back/.env`:
```env
DATABASE_URL="mysql://root:root@db:3306/cum_cardapio"
PORT=3000
ABLY_KEY=sua_chave_ably_aqui
NODE_ENV=development
```

**Frontend** - Crie ou edite `front/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_ABLY_KEY=sua_chave_ably_aqui
```

### 3️⃣ Iniciar o Projeto

**Windows:**
```powershell
.\start-docker.bat
```

**Linux/Mac:**
```bash
bash start-docker.sh
```

**Ou manualmente:**
```bash
docker-compose up -d
docker-compose exec api npx prisma migrate deploy
```

### 4️⃣ Acessar

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **Health Check**: http://localhost:3000/health

## 📁 Estrutura do Projeto

```
cardapio-digital-fullstack/
│
├── 📚 DOCUMENTAÇÃO
│   ├── README.md                    ← Você está aqui
│   ├── COMECE_AQUI.md              ← Guia rápido
│   ├── QUICK_START.md              ← Início rápido
│   ├── SETUP_CHECKLIST.md          ← Checklist
│   ├── DOCKER_SETUP.md             ← Docker detalhado
│   ├── ABLY_GUIDE.md               ← Ably explicado
│   ├── ARQUITETURA.md              ← Diagrama técnico
│   ├── INDEX.md                    ← Índice completo
│   ├── SUMARIO.md                  ← Resumo executivo
│   ├── AJUSTES_REALIZADOS.md       ← Alterações feitas
│   └── FINALIZADO.md               ← Status final
│
├── 🐳 DOCKER (Raiz)
│   ├── docker-compose.yml          ← Orquestração
│   ├── Dockerfile.backend          ← Backend container
│   ├── Dockerfile.frontend         ← Frontend container
│   ├── start-docker.sh             ← Script Linux/Mac
│   └── start-docker.bat            ← Script Windows
│
├── 🔧 BACKEND
│   └── back/
│       ├── src/
│       │   ├── ably.ts             ← Config Ably
│       │   ├── app.ts              ← App Express
│       │   ├── index.ts            ← Entry point
│       │   ├── prisma.ts           ← Config DB
│       │   ├── sse.ts              ← Server-Sent Events
│       │   ├── routes/
│       │   │   ├── order.routes.ts
│       │   │   ├── category.routes.ts
│       │   │   └── dish.routes.ts
│       │   └── validators/
│       │       ├── order.ts
│       │       ├── category.ts
│       │       └── dish.ts
│       ├── prisma/
│       │   ├── schema.prisma
│       │   ├── seed.ts
│       │   └── migrations/
│       ├── .env                    ← Variáveis
│       ├── .env.example
│       ├── package.json
│       ├── tsconfig.json
│       ├── Dockerfile.dev          ← Legado (usar raiz)
│       └── docker-compose.yml      ← Legado (usar raiz)
│
├── 🎨 FRONTEND
│   └── front/
│       ├── src/
│       │   ├── lib/
│       │   │   ├── ably.ts         ← Client Ably
│       │   │   └── api.ts          ← API client
│       │   ├── hooks/
│       │   │   └── useAblyChannel.ts
│       │   ├── components/
│       │   │   ├── OrdersWithAbly.tsx
│       │   │   ├── NewOrderNotifier.tsx
│       │   │   ├── CartButton.tsx
│       │   │   ├── CategoriasList.tsx
│       │   │   └── ... outros
│       │   ├── app/
│       │   │   ├── page.tsx
│       │   │   ├── orders/
│       │   │   ├── dashboard/
│       │   │   ├── analytics/
│       │   │   ├── login/
│       │   │   ├── layout.tsx
│       │   │   └── globals.css
│       │   └── img/
│       ├── public/
│       ├── .env.local               ← Variáveis
│       ├── .env.example
│       ├── package.json
│       ├── tsconfig.json
│       ├── next.config.ts
│       ├── postcss.config.mjs
│       ├── Dockerfile.dev          ← Legado (usar raiz)
│       └── next-env.d.ts
│
└── 📝 CONFIGURAÇÃO
    ├── .gitignore
    └── .env* (não commitados)
```

## 🐳 Docker Compose

O projeto está completamente dockerizado com 3 containers:

```
┌─────────────────────┐
│   Frontend (3001)   │
│     Next.js         │
└─────────────────────┘
          ↕
┌─────────────────────┐
│   Backend (3000)    │
│    Express API      │
└─────────────────────┘
          ↕
┌─────────────────────┐
│  Database (3306)    │
│     MySQL 8.0       │
└─────────────────────┘
```

### Comandos Docker

```bash
# Subir containers
docker-compose up -d

# Ver status
docker-compose ps

# Ver logs
docker-compose logs -f
docker-compose logs -f api

# Parar
docker-compose down

# Limpar volumes
docker-compose down -v

# Reconstruir
docker-compose build --no-cache && docker-compose up -d
```

## 🔥 Hot Reload

Ambos serviços têm hot reload automático:

- **Backend**: Edite `back/src/*` → recarrega instantaneamente
- **Frontend**: Edite `front/src/*` → recarrega no browser
- Sem parar containers
- Sem rebuilds

## 📡 Ably (Comunicação em Tempo Real)

### O que é Ably?

Plataforma de comunicação em tempo real com Pub/Sub, presença, histórico e confiabilidade.

### Canais Implementados

| Canal | Eventos |
|-------|---------|
| `orders` | new-order, order-update, order-delete |
| `menu` | category-added, category-updated, category-deleted |
| `menu` | dish-added, dish-updated, dish-deleted |
| `notifications` | alert |

### Como Usar

**Backend - Publicar:**
```typescript
import { publishMessage } from './ably';

publishMessage('orders', 'new-order', {
  id: order.id,
  items: order.itens,
  total: order.total
});
```

**Frontend - Escutar:**
```typescript
import { useAblyChannel } from '@/hooks/useAblyChannel';

useAblyChannel('orders', {
  onMessage: (message) => {
    if (message.name === 'new-order') {
      // Atualizar UI com novo pedido
    }
  }
});
```

## 📊 API Endpoints

### Pedidos
- `GET /api/orders` - Listar pedidos
- `GET /api/orders/:id` - Detalhes
- `POST /api/orders` - Criar
- `PUT /api/orders/:id` - Atualizar
- `DELETE /api/orders/:id` - Deletar

### Pratos
- `GET /api/dishes` - Listar
- `POST /api/dishes` - Criar
- `PUT /api/dishes/:id` - Atualizar
- `DELETE /api/dishes/:id` - Deletar

### Categorias
- `GET /api/categories` - Listar
- `POST /api/categories` - Criar
- `PUT /api/categories/:id` - Atualizar
- `DELETE /api/categories/:id` - Deletar

## 🔑 Configuração Ably

### 1. Obter Chave

1. Acesse https://ably.com/dashboard
2. Crie uma conta (gratuita)
3. Vá para "API Keys"
4. Copie sua chave

### 2. Adicionar ao Projeto

**Backend** (`back/.env`):
```env
ABLY_KEY=xVLyHw.SEE1Cg:ZDXbSKrDBzZSLhqH
```

**Frontend** (`front/.env.local`):
```env
NEXT_PUBLIC_ABLY_KEY=xVLyHw.SEE1Cg:ZDXbSKrDBzZSLhqH
```

## 🛠️ Desenvolvimento

### Instalar Dependências

```bash
# Backend
cd back && npm install

# Frontend
cd ../front && npm install
```

### Scripts Disponíveis

**Backend:**
```bash
npm run dev              # Desenvolvimento
npm run build            # Build TypeScript
npm start                # Produção
npm run prisma:migrate   # Migrações
npm run prisma:seed      # Seed do banco
```

**Frontend:**
```bash
npm run dev              # Desenvolvimento
npm run build            # Build Next.js
npm start                # Produção
npm run lint             # ESLint
```

## 🔐 Variáveis de Ambiente

### Backend (`back/.env`)

```env
# Banco de dados
DATABASE_URL="mysql://root:root@db:3306/cum_cardapio"

# Servidor
PORT=3000
NODE_ENV=development

# Ably
ABLY_KEY=sua_chave_aqui
```

### Frontend (`front/.env.local`)

```env
# API Backend
NEXT_PUBLIC_API_URL=http://localhost:3000

# Ably (público)
NEXT_PUBLIC_ABLY_KEY=sua_chave_aqui
```

## 🧪 Testar Funcionamento

```bash
# Terminal 1: Monitorar logs
docker-compose logs -f

# Terminal 2: Criar pedido
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"items": [{"pratoId": 1, "quantidade": 2}]}'

# Terminal 3: Abrir frontend
# http://localhost:3001
# Pedido deve aparecer em tempo real!
```

## 📚 Documentação Completa

- **[COMECE_AQUI.md](./COMECE_AQUI.md)** - Guia super rápido
- **[QUICK_START.md](./QUICK_START.md)** - Início em 5 minutos
- **[SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)** - Checklist detalhado
- **[DOCKER_SETUP.md](./DOCKER_SETUP.md)** - Docker completo
- **[ABLY_GUIDE.md](./ABLY_GUIDE.md)** - Guia Ably com exemplos
- **[ARQUITETURA.md](./ARQUITETURA.md)** - Diagrama técnico
- **[INDEX.md](./INDEX.md)** - Índice de toda documentação

## 🚀 Deployment

### Azure Container Instances
```bash
az container create --resource-group myGroup \
  --name cardapio-digital \
  --image myregistry.azurecr.io/cardapio:latest
```

### Docker Hub
```bash
docker build -t myuser/cardapio-digital:latest -f Dockerfile.backend .
docker push myuser/cardapio-digital:latest
```

### Railway / Heroku
1. Conectar repositório Git
2. Configurar variáveis de ambiente
3. Deploy automático em cada push

## 🐛 Troubleshooting

### Docker não inicia

```bash
# Verificar se Docker está rodando
docker ps

# Reconstruir do zero
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

### Banco de dados não conecta

```bash
# Limpar volumes
docker-compose down -v

# Subir novamente
docker-compose up -d

# Aguardar 10 segundos
sleep 10

# Executar migrações
docker-compose exec api npx prisma migrate deploy
```

### Ably não funciona

```bash
# Verificar logs
docker-compose logs api

# Procurar por "Ably Connected"
# Se não encontrar, verificar ABLY_KEY

# Adicione a chave em back/.env
# Reinicie: docker-compose restart api
```

## 📊 Banco de Dados

### Estrutura

```sql
-- Categorias
CREATE TABLE categoria (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL
);

-- Pratos
CREATE TABLE prato (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  preco DECIMAL(10,2) NOT NULL,
  categoriaId INT,
  FOREIGN KEY (categoriaId) REFERENCES categoria(id)
);

-- Pedidos
CREATE TABLE pedido (
  id INT PRIMARY KEY AUTO_INCREMENT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Itens de Pedidos
CREATE TABLE itemPedido (
  id INT PRIMARY KEY AUTO_INCREMENT,
  pedidoId INT,
  pratoId INT,
  quantidade INT DEFAULT 1,
  FOREIGN KEY (pedidoId) REFERENCES pedido(id),
  FOREIGN KEY (pratoId) REFERENCES prato(id)
);
```

### Migrações

```bash
# Criar nova migração
docker-compose exec api npx prisma migrate dev --name sua_migracao

# Deploy em produção
docker-compose exec api npx prisma migrate deploy

# Seed do banco
docker-compose exec api npx prisma db seed
```

## 📈 Performance

### Otimizações

- ✅ Next.js com Turbopack (dev)
- ✅ Express com morgan logging
- ✅ Prisma com query optimization
- ✅ MySQL com índices
- ✅ Docker com volumes otimizados

### Monitorar

```bash
# Ver uso de recursos
docker stats

# Ver tamanho das imagens
docker images

# Limpar imagens não usadas
docker image prune
```

## 🔒 Segurança

- ✅ `.env` não commitado
- ✅ Chaves isoladas por ambiente
- ✅ Network isolada no Docker
- ✅ Banco em container privado
- ✅ Validação com Zod
- ✅ CORS configurado

## 👥 Contribuindo

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

MIT

## 📞 Suporte

Encontrou um problema?

1. Consulte [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)
2. Verifique os logs: `docker-compose logs -f`
3. Consulte a documentação apropriada
4. Abra uma issue no repositório

## 🎓 Aprenda Mais

- [Docker Documentation](https://docs.docker.com/)
- [Ably Documentation](https://ably.com/documentation)
- [Next.js Documentation](https://nextjs.org/docs)
- [Express Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)

## 🏆 Tecnologias

- **Frontend**: Next.js 15, React 19, TailwindCSS, TypeScript
- **Backend**: Express 4, TypeScript, Prisma, Zod
- **Database**: MySQL 8.0
- **Real-time**: Ably
- **Container**: Docker, Docker Compose
- **Tools**: ESLint, Prettier, ts-node

## 📌 Checklist Rápido

- [ ] Docker instalado
- [ ] Variáveis .env configuradas
- [ ] Chave Ably obtida
- [ ] Containers subindo (`docker-compose up -d`)
- [ ] Migrações executadas
- [ ] Frontend acessível (http://localhost:3001)
- [ ] Backend respondendo (http://localhost:3000/health)
- [ ] Ably conectado (ver logs)

---

Versão: 1.0.0  
Data: 9 de janeiro de 2026  
