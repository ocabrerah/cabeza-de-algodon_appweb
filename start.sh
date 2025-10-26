#!/bin/bash

echo "🏥 Iniciando Asilo Cabeza de Algodón..."
echo ""

# Verificar PostgreSQL
if ! sudo service postgresql status > /dev/null 2>&1; then
    echo "📊 Iniciando PostgreSQL..."
    sudo service postgresql start
fi

# Iniciar backend en background
echo "🚀 Iniciando Backend..."
cd backend && npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Esperar un momento para que el backend inicie
sleep 3

# Iniciar frontend en background
echo "🎨 Iniciando Frontend..."
cd frontend && npm start > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Sistema iniciado correctamente!"
echo ""
echo "📍 URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
echo "🔑 Credenciales Admin:"
echo "   Email: ocabrerah99@gmail.com"
echo "   Contraseña: Admin2025!"
echo ""
echo "📝 Logs:"
echo "   Backend:  tail -f backend.log"
echo "   Frontend: tail -f frontend.log"
echo ""
echo "Para detener el sistema:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo ""

