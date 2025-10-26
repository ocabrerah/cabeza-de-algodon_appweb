#!/bin/bash

clear

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║          ASILO CABEZA DE ALGODÓN - SISTEMA COMPLETO           ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

echo "[PASO 1/5] Verificando PostgreSQL..."
if docker ps | grep -q postgres-asilo; then
    echo "✅ PostgreSQL corriendo"
else
    echo "❌ PostgreSQL no está corriendo"
    echo "Iniciando PostgreSQL con Docker..."
    docker start postgres-asilo 2>/dev/null || docker run -d --name postgres-asilo \
        -e POSTGRES_PASSWORD=postgres \
        -e POSTGRES_DB=cabeza_algodon_db \
        -p 5432:5432 \
        postgres:14-alpine
    sleep 5
fi
echo ""

echo "[PASO 2/5] Verificando base de datos..."
if docker exec -i postgres-asilo psql -U postgres -d cabeza_algodon_db -c "SELECT 1" >/dev/null 2>&1; then
    echo "✅ Base de datos existe"
else
    echo "❌ Base de datos no encontrada, creando..."
    docker exec -i postgres-asilo psql -U postgres -c "CREATE DATABASE cabeza_algodon_db"
fi
echo ""

echo "[PASO 3/5] Poblando base de datos con datos de prueba..."
if docker exec -i postgres-asilo psql -U postgres -d cabeza_algodon_db < poblar_bd_completo.sql >/dev/null 2>&1; then
    echo "✅ Base de datos poblada exitosamente"
else
    echo "⚠️  Advertencia: Error al poblar BD (puede que ya esté poblada)"
fi
echo ""

echo "[PASO 4/5] Iniciando Backend..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..
sleep 5
echo "✅ Backend iniciado en puerto 5000 (PID: $BACKEND_PID)"
echo ""

echo "[PASO 5/5] Iniciando Frontend..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..
echo "✅ Frontend iniciando en puerto 3000 (PID: $FRONTEND_PID)"
echo ""

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                    SISTEMA INICIADO                            ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "📝 CREDENCIALES DE ACCESO:"
echo "   Email:     ocabrerah99@gmail.com"
echo "   Password:  Admin2025!"
echo ""
echo "📊 DATOS DE PRUEBA INCLUIDOS:"
echo "   ✓ 5 Pacientes"
echo "   ✓ 5 Fichas Médicas"
echo "   ✓ 5 Solicitudes Médicas"
echo "   ✓ 3 Visitas Médicas"
echo "   ✓ 8 Medicamentos"
echo "   ✓ 4 Pruebas de Laboratorio"
echo "   ✓ 13 Movimientos de Caja"
echo "   ✓ 5 Usuarios (diferentes roles)"
echo ""
echo "⏱️  Esperando que el frontend compile (30 segundos)..."
sleep 30

echo ""
echo "✅ ¡SISTEMA LISTO!"
echo ""
echo "🔗 URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
echo "🛑 Para detener el sistema:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo ""
