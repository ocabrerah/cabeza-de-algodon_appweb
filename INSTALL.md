# 🚀 Guía de Instalación - Asilo Cabeza de Algodón

## Para Codespaces (GitHub)

### Paso 1: Iniciar PostgreSQL

```bash
# Actualizar sistema
sudo apt update

# Instalar PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Iniciar servicio
sudo service postgresql start

# Crear base de datos y usuario
sudo -u postgres psql << EOF
CREATE DATABASE cabeza_algodon_db;
ALTER USER postgres PASSWORD 'postgres';
\q
EOF
```

### Paso 2: Instalar Dependencias

```bash
# Desde la raíz del proyecto
npm run install-all
```

### Paso 3: Configurar Variables de Entorno

El archivo `.env` ya está configurado con valores por defecto. Si deseas cambiar algo:

```bash
# Editar backend/.env (opcional)
nano backend/.env
```

### Paso 4: Iniciar la Aplicación

**Opción A: Todo junto (recomendado)**
```bash
npm run dev
```

**Opción B: Terminales separadas**
```bash
# Terminal 1 - Backend
npm run backend

# Terminal 2 - Frontend  
npm run frontend
```

### Paso 5: Acceder al Sistema

El sistema estará disponible en:
- Frontend: https://[tu-codespace-url]-3000.preview.app.github.dev
- Backend: https://[tu-codespace-url]-5000.preview.app.github.dev

**Credenciales por defecto:**
- Email: ocabrerah99@gmail.com
- Contraseña: Admin2025!

---

## Para Instalación Local

### Requisitos Previos
- Node.js 16+ 
- PostgreSQL 12+
- Git

### Paso 1: Clonar el Repositorio

```bash
git clone [url-del-repositorio]
cd cabeza-de-algodon_appweb
```

### Paso 2: Instalar PostgreSQL

**Windows:**
1. Descargar desde https://www.postgresql.org/download/windows/
2. Instalar y recordar la contraseña del usuario postgres

**Mac:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Paso 3: Crear Base de Datos

```bash
# Acceder a PostgreSQL
psql -U postgres

# Dentro de psql:
CREATE DATABASE cabeza_algodon_db;
\q
```

### Paso 4: Instalar Dependencias

```bash
npm run install-all
```

### Paso 5: Configurar Variables de Entorno

Crear archivo `.env` en la carpeta backend:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cabeza_algodon_db
DB_USER=postgres
DB_PASSWORD=tu_contraseña_postgres
JWT_SECRET=cabeza_algodon_jwt_secret_key_2025_super_secure
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=tu_password_aplicacion
FRONTEND_URL=http://localhost:3000
```

### Paso 6: Iniciar la Aplicación

```bash
npm run dev
```

### Paso 7: Acceder

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## Verificación de Instalación

### 1. Verificar Backend

```bash
curl http://localhost:5000/api/health
```

Debería responder: `{"status":"OK"}`

### 2. Verificar Frontend

Abrir http://localhost:3000 en el navegador. Debería mostrar la página de login.

### 3. Verificar Base de Datos

```bash
psql -U postgres -d cabeza_algodon_db -c "\dt"
```

Debería mostrar todas las tablas creadas.

---

## Solución de Problemas

### Error: Puerto en uso

```bash
# Liberar puerto 5000
lsof -ti:5000 | xargs kill -9

# Liberar puerto 3000
lsof -ti:3000 | xargs kill -9
```

### Error: No se puede conectar a PostgreSQL

```bash
# Verificar que esté corriendo
sudo service postgresql status

# Iniciar si está detenido
sudo service postgresql start
```

### Error: Dependencias no instaladas

```bash
# Limpiar e instalar de nuevo
rm -rf node_modules backend/node_modules frontend/node_modules
npm run install-all
```

### Error: Base de datos no existe

```bash
sudo -u postgres psql -c "CREATE DATABASE cabeza_algodon_db;"
```

---

## Primeros Pasos Después de Instalar

1. **Iniciar sesión** con las credenciales de admin
2. **Crear usuarios** para el personal
3. **Registrar pacientes** 
4. **Configurar email** para notificaciones (opcional)
5. **Explorar el sistema** y familiarizarse con los módulos

---

## Datos de Prueba

El sistema crea automáticamente:
- ✅ Usuario administrador
- ✅ Base de datos con todas las tablas
- ✅ Estructura completa

Para agregar datos de prueba manualmente, usa el panel de administración del sistema.

---

## Actualización

Para actualizar a una nueva versión:

```bash
git pull origin main
npm run install-all
npm run dev
```

---

## Desinstalación

Para remover completamente el sistema:

```bash
# Eliminar archivos
rm -rf cabeza-de-algodon_appweb

# Eliminar base de datos
sudo -u postgres psql -c "DROP DATABASE cabeza_algodon_db;"
```

---

¿Necesitas ayuda? Contacta a: ocabrerah99@gmail.com

