#!/bin/bash

echo "============================================"
echo "🏥 Asilo Cabeza de Algodón - Setup Script"
echo "============================================"
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# Verificar si estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    print_error "Por favor ejecuta este script desde la raíz del proyecto"
    exit 1
fi

print_info "Iniciando configuración del sistema..."
echo ""

# Paso 1: Instalar PostgreSQL (si no está instalado)
print_info "Verificando PostgreSQL..."
if ! command -v psql &> /dev/null; then
    print_info "Instalando PostgreSQL..."
    sudo apt update
    sudo apt install -y postgresql postgresql-contrib
    print_success "PostgreSQL instalado"
else
    print_success "PostgreSQL ya está instalado"
fi

# Paso 2: Iniciar PostgreSQL
print_info "Iniciando servicio PostgreSQL..."
sudo service postgresql start
if [ $? -eq 0 ]; then
    print_success "PostgreSQL iniciado"
else
    print_error "Error al iniciar PostgreSQL"
    exit 1
fi

# Paso 3: Crear base de datos
print_info "Creando base de datos..."
sudo -u postgres psql -c "DROP DATABASE IF EXISTS cabeza_algodon_db;" 2>/dev/null
sudo -u postgres psql -c "CREATE DATABASE cabeza_algodon_db;"
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"
if [ $? -eq 0 ]; then
    print_success "Base de datos creada"
else
    print_error "Error al crear base de datos"
    exit 1
fi

# Paso 4: Instalar dependencias
print_info "Instalando dependencias del proyecto..."
npm install
if [ $? -ne 0 ]; then
    print_error "Error al instalar dependencias raíz"
    exit 1
fi

print_info "Instalando dependencias del backend..."
cd backend && npm install
if [ $? -ne 0 ]; then
    print_error "Error al instalar dependencias del backend"
    exit 1
fi
cd ..

print_info "Instalando dependencias del frontend..."
cd frontend && npm install
if [ $? -ne 0 ]; then
    print_error "Error al instalar dependencias del frontend"
    exit 1
fi
cd ..

print_success "Todas las dependencias instaladas"

# Paso 5: Crear directorio de uploads
print_info "Creando directorio de uploads..."
mkdir -p backend/uploads
touch backend/uploads/.gitkeep
print_success "Directorio de uploads creado"

echo ""
echo "============================================"
echo "✅ ¡Instalación completada exitosamente!"
echo "============================================"
echo ""
echo "Para iniciar el sistema, ejecuta:"
echo ""
echo "  npm run dev"
echo ""
echo "O en terminales separadas:"
echo ""
echo "  Terminal 1: npm run backend"
echo "  Terminal 2: npm run frontend"
echo ""
echo "Credenciales de administrador:"
echo "  Email: ocabrerah99@gmail.com"
echo "  Contraseña: Admin2025!"
echo ""
echo "El sistema estará disponible en:"
echo "  Frontend: http://localhost:3000"
echo "  Backend: http://localhost:5000"
echo ""
echo "© 2025 O. Cabrera - Todos los derechos reservados"
echo ""

