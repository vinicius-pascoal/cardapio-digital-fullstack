#!/bin/bash

# Script para iniciar o projeto com Docker

echo "🚀 Cardápio Digital - Docker Setup"
echo "=================================="
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker não está instalado${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker encontrado${NC}"

# Verificar se Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose não está instalado${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker Compose encontrado${NC}"
echo ""

# Verificar variáveis de ambiente
echo "📋 Verificando variáveis de ambiente..."

if [ ! -f "back/.env" ]; then
    echo -e "${YELLOW}⚠️  back/.env não encontrado${NC}"
    echo "Criando arquivo padrão..."
    cp back/.env.example back/.env || cat > back/.env << 'EOF'
DATABASE_URL="mysql://root:root@db:3306/cum_cardapio"
PORT=3000
ABLY_KEY=sua_chave_ably_aqui
NODE_ENV=development
EOF
fi

if [ ! -f "front/.env.local" ]; then
    echo -e "${YELLOW}⚠️  front/.env.local não encontrado${NC}"
    echo "Criando arquivo padrão..."
    cat > front/.env.local << 'EOF'
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_ABLY_KEY=sua_chave_ably_aqui
EOF
fi

echo -e "${GREEN}✓ Variáveis de ambiente configuradas${NC}"
echo ""

# Verificar se ABLY_KEY está configurada
if grep -q "ABLY_KEY=sua_chave_ably_aqui" back/.env; then
    echo -e "${YELLOW}⚠️  ABLY_KEY não está configurada!${NC}"
    echo "Por favor, configure a chave do Ably em:"
    echo "  - back/.env (ABLY_KEY)"
    echo "  - front/.env.local (NEXT_PUBLIC_ABLY_KEY)"
    echo ""
    echo "Obtenha sua chave em: https://ably.com/dashboard"
    read -p "Pressione Enter para continuar mesmo assim (não recomendado)..."
fi

echo ""
echo "🐳 Iniciando containers..."
docker-compose up -d

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Containers iniciados com sucesso${NC}"
else
    echo -e "${RED}❌ Erro ao iniciar containers${NC}"
    exit 1
fi

echo ""
echo "⏳ Aguardando serviços ficarem prontos..."
sleep 5

# Verificar se o banco de dados está pronto
echo "🗄️  Aguardando banco de dados..."
for i in {1..30}; do
    if docker-compose exec -T db mysqladmin ping -h localhost -u root -proot > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Banco de dados pronto${NC}"
        break
    fi
    if [ $i -eq 30 ]; then
        echo -e "${RED}❌ Timeout esperando banco de dados${NC}"
        exit 1
    fi
    echo -n "."
    sleep 1
done

echo ""
echo "🔄 Executando migrações Prisma..."
docker-compose exec -T api npx prisma migrate deploy

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Migrações executadas${NC}"
else
    echo -e "${YELLOW}⚠️  Erro ao executar migrações (verifique logs)${NC}"
fi

echo ""
echo "🌱 Executando seed (opcional)..."
docker-compose exec -T api npx prisma db seed 2>/dev/null || echo "Sem seed configurada"

echo ""
echo -e "${GREEN}=================================="
echo "✅ Setup concluído com sucesso!"
echo "==================================${NC}"
echo ""
echo "🌐 Serviços disponíveis:"
echo "  Frontend:     http://localhost:3001"
echo "  Backend API:  http://localhost:3000"
echo "  Banco de dados: localhost:3306"
echo ""
echo "📊 Monitorar logs:"
echo "  docker-compose logs -f"
echo ""
echo "🛑 Parar containers:"
echo "  docker-compose down"
echo ""
