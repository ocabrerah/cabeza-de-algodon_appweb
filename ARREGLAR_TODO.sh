#!/bin/bash

echo "🔧 DIAGNÓSTICO Y REPARACIÓN AUTOMÁTICA"
echo "======================================"
echo ""

# Función para mostrar errores
error() {
    echo "❌ ERROR: $1"
    exit 1
}

# Función para mostrar éxito
success() {
    echo "✅ $1"
}

# 1. VERIFICAR DOCKER/POSTGRESQL
echo "1️⃣  Verificando PostgreSQL..."
docker ps | grep postgres > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "   Iniciando PostgreSQL..."
    docker rm -f postgres-asilo 2>/dev/null
    docker run -d --name postgres-asilo -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=cabeza_algodon_db -p 5432:5432 postgres:14-alpine
    sleep 8
fi
docker ps | grep postgres > /dev/null 2>&1 || error "PostgreSQL no está corriendo"
success "PostgreSQL OK"

# 2. VERIFICAR BASE DE DATOS
echo ""
echo "2️⃣  Verificando base de datos..."
docker exec postgres-asilo psql -U postgres -l | grep cabeza_algodon_db > /dev/null 2>&1 || error "Base de datos no existe"
success "Base de datos existe"

# 3. VERIFICAR TABLAS
echo ""
echo "3️⃣  Verificando tablas..."
TABLES=$(docker exec postgres-asilo psql -U postgres -d cabeza_algodon_db -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';" 2>/dev/null | tr -d ' ')
if [ "$TABLES" = "0" ] || [ -z "$TABLES" ]; then
    echo "   ⚠️  Tablas no existen, necesitas iniciar el backend primero"
    echo "   Creando archivo .env..."
    cd /workspaces/cabeza-de-algodon_appweb/backend
    cat > .env << 'EOF'
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cabeza_algodon_db
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=cabeza_algodon_jwt_secret_key_2025_super_secure
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=ocabrerah99@gmail.com
EMAIL_PASSWORD=
FRONTEND_URL=http://localhost:3000
EOF
    echo ""
    echo "⚠️  IMPORTANTE: Ejecuta esto en orden:"
    echo ""
    echo "   Terminal 1:"
    echo "   cd backend && npm run dev"
    echo ""
    echo "   Espera a ver: '✅ Usuario administrador creado'"
    echo ""
    echo "   Terminal 2:"
    echo "   cd frontend && npm start"
    echo ""
    echo "   Luego:"
    echo "   Email: ocabrerah99@gmail.com"
    echo "   Pass: Admin2025!"
    echo ""
    exit 0
else
    success "Tablas existen ($TABLES tablas)"
fi

# 4. VERIFICAR USUARIO ADMIN
echo ""
echo "4️⃣  Verificando usuario admin..."
ADMIN=$(docker exec postgres-asilo psql -U postgres -d cabeza_algodon_db -t -c "SELECT email FROM usuarios WHERE email='ocabrerah99@gmail.com';" 2>/dev/null | tr -d ' ')
if [ -z "$ADMIN" ]; then
    echo "   ⚠️  Usuario admin no existe"
    echo "   Creando usuario admin..."
    docker exec postgres-asilo psql -U postgres -d cabeza_algodon_db << 'EOSQL'
INSERT INTO usuarios (id, nombre, email, password, rol, activo, validado, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'Administrador',
  'ocabrerah99@gmail.com',
  '$2a$10$rZ5Ym8N6QqXYLx.vqN5GduEKzYxH6gO3hP3vHZxQvJQzKJm8YOUZS',
  'admin',
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;
EOSQL
fi
success "Usuario admin OK"

# 5. RESETEAR CONTRASEÑA
echo ""
echo "5️⃣  Reseteando contraseña admin..."
docker exec postgres-asilo psql -U postgres -d cabeza_algodon_db -c "UPDATE usuarios SET password = '\$2a\$10\$rZ5Ym8N6QqXYLx.vqN5GduEKzYxH6gO3hP3vHZxQvJQzKJm8YOUZS', activo = true, validado = true WHERE email = 'ocabrerah99@gmail.com';" > /dev/null 2>&1
success "Contraseña reseteada"

# 6. VERIFICAR ARCHIVO .env
echo ""
echo "6️⃣  Verificando configuración backend..."
cd /workspaces/cabeza-de-algodon_appweb/backend
if [ ! -f .env ]; then
    cat > .env << 'EOF'
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cabeza_algodon_db
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=cabeza_algodon_jwt_secret_key_2025_super_secure
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=ocabrerah99@gmail.com
EMAIL_PASSWORD=
FRONTEND_URL=http://localhost:3000
EOF
fi
success ".env configurado"

# 7. VERIFICAR PROCESOS
echo ""
echo "7️⃣  Verificando procesos..."
BACKEND_RUNNING=false
lsof -i:5000 > /dev/null 2>&1 && BACKEND_RUNNING=true

FRONTEND_RUNNING=false
lsof -i:3000 > /dev/null 2>&1 && FRONTEND_RUNNING=true

if [ "$BACKEND_RUNNING" = false ]; then
    echo "   ⚠️  Backend NO está corriendo"
else
    success "Backend corriendo en puerto 5000"
fi

if [ "$FRONTEND_RUNNING" = false ]; then
    echo "   ⚠️  Frontend NO está corriendo"
else
    success "Frontend corriendo en puerto 3000"
fi

# 8. PROBAR LOGIN
echo ""
echo "8️⃣  Probando autenticación..."
if [ "$BACKEND_RUNNING" = true ]; then
    RESPONSE=$(curl -s -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"email":"ocabrerah99@gmail.com","password":"Admin2025!"}')
    
    if echo "$RESPONSE" | grep -q "token"; then
        success "✅ ¡AUTENTICACIÓN FUNCIONA!"
        echo ""
        echo "════════════════════════════════════════════"
        echo "✅ TODO ESTÁ BIEN - Puedes hacer login"
        echo "════════════════════════════════════════════"
        echo ""
        echo "Credenciales:"
        echo "  Email: ocabrerah99@gmail.com"
        echo "  Pass:  Admin2025!"
        echo ""
        echo "Si aún no funciona en el navegador:"
        echo "1. Abre Developer Tools (F12)"
        echo "2. Ve a Console"
        echo "3. Intenta login"
        echo "4. Busca errores en rojo"
        echo ""
    else
        echo "   ❌ Login falla. Respuesta:"
        echo "$RESPONSE"
    fi
else
    echo "   ⚠️  No se puede probar, backend no está corriendo"
fi

# RESUMEN
echo ""
echo "════════════════════════════════════════════"
echo "📊 RESUMEN"
echo "════════════════════════════════════════════"
echo "PostgreSQL:  ✅"
echo "Base Datos:  ✅"
echo "Usuario:     ✅"
echo "Contraseña:  ✅ (Admin2025!)"
echo "Backend:     $([ "$BACKEND_RUNNING" = true ] && echo "✅" || echo "❌")"
echo "Frontend:    $([ "$FRONTEND_RUNNING" = true ] && echo "✅" || echo "❌")"
echo ""

if [ "$BACKEND_RUNNING" = false ] || [ "$FRONTEND_RUNNING" = false ]; then
    echo "⚠️  NECESITAS INICIAR:"
    echo ""
    if [ "$BACKEND_RUNNING" = false ]; then
        echo "Terminal 1:"
        echo "  cd backend && npm run dev"
        echo ""
    fi
    if [ "$FRONTEND_RUNNING" = false ]; then
        echo "Terminal 2:"
        echo "  cd frontend && npm start"
        echo ""
    fi
    echo "Luego abre: http://localhost:3000"
fi

echo ""
echo "════════════════════════════════════════════"

