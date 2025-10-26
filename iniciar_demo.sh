#!/bin/bash

echo ""
echo "================================"
echo "INICIANDO APP SIN LOGIN"
echo "================================"
echo ""

# 1. Backend
echo "[1/2] Iniciando Backend..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..
sleep 5

# 2. Frontend  
echo "[2/2] Iniciando Frontend..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "================================"
echo "ESPERA 30 SEGUNDOS..."
echo "================================"
echo ""
echo "Luego abre en tu navegador:"
echo "http://localhost:3000"
echo ""
echo "IRA DIRECTO AL DASHBOARD (sin login)"
echo "================================"
echo ""

# Esperar
sleep 30

echo ""
echo "✅ LISTO!"
echo ""
echo "Abre: http://localhost:3000"
echo ""
echo "Procesos:"
echo "- Backend PID: $BACKEND_PID"
echo "- Frontend PID: $FRONTEND_PID"
echo ""
echo "Para detener:"
echo "kill $BACKEND_PID $FRONTEND_PID"
echo ""

