@echo off
echo.
echo ================================
echo INICIANDO APP SIN LOGIN
echo ================================
echo.

REM 1. Backend
echo [1/2] Iniciando Backend...
start "Backend" cmd /k "cd backend && npm run dev"
timeout /t 5 /nobreak >nul

REM 2. Frontend
echo [2/2] Iniciando Frontend...
start "Frontend" cmd /k "cd frontend && npm start"

echo.
echo ================================
echo ESPERA 30 SEGUNDOS...
echo ================================
echo.
echo El navegador se abrira automaticamente en:
echo http://localhost:3000
echo.
echo IRA DIRECTO AL DASHBOARD (sin login)
echo ================================
timeout /t 30 /nobreak

REM Abrir navegador
start http://localhost:3000

echo.
echo LISTO! Si no se abrio, abre manualmente:
echo http://localhost:3000
echo.
pause

