@echo off
chcp 65001 >nul
cls

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║          ASILO CABEZA DE ALGODÓN - SISTEMA COMPLETO           ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

echo [PASO 1/5] Verificando PostgreSQL...
docker ps | findstr postgres-asilo >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ PostgreSQL no está corriendo
    echo Iniciando PostgreSQL con Docker...
    docker start postgres-asilo 2>nul || docker run -d --name postgres-asilo -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=cabeza_algodon_db -p 5432:5432 postgres:14-alpine
    timeout /t 5 /nobreak >nul
) else (
    echo ✅ PostgreSQL corriendo
)
echo.

echo [PASO 2/5] Verificando base de datos...
docker exec -i postgres-asilo psql -U postgres -d cabeza_algodon_db -c "SELECT 1" >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Base de datos no encontrada, creando...
    docker exec -i postgres-asilo psql -U postgres -c "CREATE DATABASE cabeza_algodon_db"
) else (
    echo ✅ Base de datos existe
)
echo.

echo [PASO 3/5] Poblando base de datos con datos de prueba...
docker exec -i postgres-asilo psql -U postgres -d cabeza_algodon_db < poblar_bd_completo.sql >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Base de datos poblada exitosamente
) else (
    echo ⚠️  Advertencia: Error al poblar BD
)
echo.

echo [PASO 4/5] Iniciando Backend...
start "Backend - Asilo Cabeza de Algodón" cmd /k "cd backend && npm run dev"
timeout /t 5 /nobreak >nul
echo ✅ Backend iniciado en puerto 5000
echo.

echo [PASO 5/5] Iniciando Frontend...
start "Frontend - Asilo Cabeza de Algodón" cmd /k "cd frontend && npm start"
echo ✅ Frontend iniciando en puerto 3000
echo.

echo ╔════════════════════════════════════════════════════════════════╗
echo ║                    SISTEMA INICIADO                            ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo 🌐 El navegador se abrirá automáticamente en 30 segundos...
echo.
echo 📝 CREDENCIALES DE ACCESO:
echo    Email:     ocabrerah99@gmail.com
echo    Password:  Admin2025!
echo.
echo 📊 DATOS DE PRUEBA INCLUIDOS:
echo    ✓ 5 Pacientes
echo    ✓ 5 Fichas Médicas
echo    ✓ 5 Solicitudes Médicas
echo    ✓ 3 Visitas Médicas
echo    ✓ 8 Medicamentos
echo    ✓ 4 Pruebas de Laboratorio
echo    ✓ 13 Movimientos de Caja
echo    ✓ 5 Usuarios (diferentes roles)
echo.
echo ⏱️  Esperando que el frontend compile (30 segundos)...
timeout /t 30 /nobreak

start http://localhost:3000

echo.
echo ✅ ¡SISTEMA LISTO!
echo.
echo 🔗 URLs:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:5000
echo.
pause

