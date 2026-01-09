@echo off
REM Script para iniciar o projeto com Docker no Windows

setlocal enabledelayedexpansion

echo.
echo 🚀 Cardápio Digital - Docker Setup
echo ==================================
echo.

REM Verificar se Docker está instalado
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker não está instalado
    exit /b 1
)

echo ✓ Docker encontrado

REM Verificar se Docker Compose está instalado
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Compose não está instalado
    exit /b 1
)

echo ✓ Docker Compose encontrado
echo.

REM Verificar variáveis de ambiente
echo 📋 Verificando variáveis de ambiente...

if not exist "back\.env" (
    echo ⚠️  back\.env não encontrado
    echo Criando arquivo padrão...
    (
        echo DATABASE_URL="mysql://root:root@db:3306/cum_cardapio"
        echo PORT=3000
        echo ABLY_KEY=sua_chave_ably_aqui
        echo NODE_ENV=development
    ) > "back\.env"
)

if not exist "front\.env.local" (
    echo ⚠️  front\.env.local não encontrado
    echo Criando arquivo padrão...
    (
        echo NEXT_PUBLIC_API_URL=http://localhost:3000
        echo NEXT_PUBLIC_ABLY_KEY=sua_chave_ably_aqui
    ) > "front\.env.local"
)

echo ✓ Variáveis de ambiente configuradas
echo.

REM Verificar se ABLY_KEY está configurada
findstr "ABLY_KEY=sua_chave_ably_aqui" back\.env >nul 2>&1
if not errorlevel 1 (
    echo ⚠️  ABLY_KEY não está configurada!
    echo Por favor, configure a chave do Ably em:
    echo   - back\.env (ABLY_KEY^)
    echo   - front\.env.local (NEXT_PUBLIC_ABLY_KEY^)
    echo.
    echo Obtenha sua chave em: https://ably.com/dashboard
    pause
)

echo.
echo 🐳 Iniciando containers...
docker-compose up -d

if errorlevel 1 (
    echo ❌ Erro ao iniciar containers
    exit /b 1
)

echo ✓ Containers iniciados com sucesso
echo.

echo ⏳ Aguardando serviços ficarem prontos...
timeout /t 5 /nobreak

REM Aguardar banco de dados
echo 🗄️  Aguardando banco de dados...
setlocal enabledelayedexpansion
for /l %%i in (1,1,30) do (
    docker-compose exec -T db mysqladmin ping -h localhost -u root -proot >nul 2>&1
    if not errorlevel 1 (
        echo ✓ Banco de dados pronto
        goto db_ready
    )
    echo -n "."
    timeout /t 1 /nobreak
)

echo ❌ Timeout esperando banco de dados
exit /b 1

:db_ready
echo.
echo 🔄 Executando migrações Prisma...
docker-compose exec -T api npx prisma migrate deploy

if not errorlevel 1 (
    echo ✓ Migrações executadas
) else (
    echo ⚠️  Erro ao executar migrações (verifique logs^)
)

echo.
echo 🌱 Executando seed (opcional^)...
docker-compose exec -T api npx prisma db seed 2>nul
if errorlevel 1 (
    echo Sem seed configurada
)

echo.
echo ==================================
echo ✅ Setup concluído com sucesso!
echo ==================================
echo.
echo 🌐 Serviços disponíveis:
echo   Frontend:     http://localhost:3001
echo   Backend API:  http://localhost:3000
echo   Banco de dados: localhost:3306
echo.
echo 📊 Monitorar logs:
echo   docker-compose logs -f
echo.
echo 🛑 Parar containers:
echo   docker-compose down
echo.
pause
