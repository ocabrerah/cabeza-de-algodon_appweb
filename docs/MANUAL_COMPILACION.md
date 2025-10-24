# Manual de Compilación y Despliegue
## Sistema Asilo de Ancianos "Cabeza de Algodón"

**Desarrollado por: Omar Cabrera**  
**© 2025 - Todos los derechos reservados**

---

## 📋 Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Configuración en GitHub Codespaces](#configuración-en-github-codespaces)
3. [Configuración de la Base de Datos](#configuración-de-la-base-de-datos)
4. [Configuración del Backend](#configuración-del-backend)
5. [Configuración del Frontend](#configuración-del-frontend)
6. [Ejecución del Sistema](#ejecución-del-sistema)
7. [Solución de Problemas](#solución-de-problemas)

---

## 🔧 Requisitos Previos

### Software Necesario

- **Node.js**: v16.0.0 o superior
- **MySQL**: v8.0 o superior  
- **Git**: Para clonar el repositorio
- **npm**: Incluido con Node.js

---

## 🚀 Configuración en GitHub Codespaces

### Paso 1: Crear Codespace

1. Ve al repositorio en GitHub
2. Haz clic en el botón verde **"Code"**
3. Selecciona la pestaña **"Codespaces"**
4. Haz clic en **"Create codespace on main"**
5. Espera a que se cargue el entorno (puede tomar 2-3 minutos)

### Paso 2: Verificar Node.js y npm

Abre la terminal integrada en Codespaces y verifica las versiones:

```bash
node --version
npm --version
```

Deberías ver versiones v16+ para Node.js y v8+ para npm.

---

## 🗄️ Configuración de la Base de Datos

### Paso 1: Instalar MySQL en Codespaces

```bash
# Actualizar paquetes del sistema
sudo apt-get update

# Instalar MySQL Server
sudo apt-get install -y mysql-server

# Iniciar el servicio de MySQL
sudo service mysql start

# Verificar que MySQL está corriendo
sudo service mysql status
```

### Paso 2: Configurar MySQL

```bash
# Acceder a MySQL como root (sin contraseña en Codespaces)
sudo mysql

# Dentro del shell de MySQL, ejecutar:
```

```sql
-- Crear la base de datos
CREATE DATABASE asilo_cabeza_algodon CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Crear usuario para la aplicación
CREATE USER 'asilo_user'@'localhost' IDENTIFIED BY 'AsiloPassword2025!';

-- Otorgar permisos
GRANT ALL PRIVILEGES ON asilo_cabeza_algodon.* TO 'asilo_user'@'localhost';
FLUSH PRIVILEGES;

-- Salir
EXIT;
```

### Paso 3: Importar el Schema de la Base de Datos

```bash
# Desde la raíz del proyecto
sudo mysql asilo_cabeza_algodon < database/schema.sql
```

### Paso 4: Verificar la Creación de Tablas

```bash
sudo mysql asilo_cabeza_algodon -e "SHOW TABLES;"
```

Deberías ver todas las tablas listadas (usuarios, pacientes, visitas_medicas, etc.).

---

## ⚙️ Configuración del Backend

### Paso 1: Instalar Dependencias

```bash
# Navegar al directorio del backend
cd backend

# Instalar todas las dependencias
npm install
```

### Paso 2: Configurar Variables de Entorno

```bash
# Crear archivo .env desde el template
cp .env.example .env

# Editar el archivo .env con tus configuraciones
nano .env
```

**Contenido del archivo `.env`:**

```env
# Configuración del Servidor
PORT=5000
NODE_ENV=development

# Base de Datos MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USER=asilo_user
DB_PASSWORD=AsiloPassword2025!
DB_NAME=asilo_cabeza_algodon

# JWT
JWT_SECRET=tu_clave_secreta_super_segura_cambiar_en_produccion_12345
JWT_EXPIRES_IN=24h

# Correo Electrónico (Gmail ejemplo)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASSWORD=tu_password_de_aplicacion
EMAIL_FROM=Sistema Asilo Cabeza de Algodón <noreply@asilocabezaalgodon.com>

# URLs
FRONTEND_URL=http://localhost:3000

# Archivos
UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760
```

**IMPORTANTE:** Para usar Gmail, debes generar una "Contraseña de Aplicación":
1. Ve a tu cuenta de Google
2. Seguridad → Verificación en 2 pasos
3. Contraseñas de aplicaciones
4. Genera una nueva contraseña para "Correo"

### Paso 3: Crear Carpeta de Uploads

```bash
mkdir -p uploads
```

---

## 🎨 Configuración del Frontend

### Paso 1: Instalar Dependencias

```bash
# Desde la raíz del proyecto
cd frontend

# Instalar todas las dependencias
npm install
```

### Paso 2: Configurar Proxy (Ya está en package.json)

El archivo `package.json` ya incluye:
```json
"proxy": "http://localhost:5000"
```

Esto permite que el frontend se comunique con el backend.

---

## ▶️ Ejecución del Sistema

### Opción 1: Ejecutar Backend y Frontend Simultáneamente (Recomendado)

Desde la **raíz del proyecto**:

```bash
# Instalar dependencias de ambos (si no lo has hecho)
npm install

# Ejecutar ambos servidores
npm run dev
```

Este comando iniciará:
- Backend en `http://localhost:5000`
- Frontend en `http://localhost:3000`

### Opción 2: Ejecutar Backend y Frontend por Separado

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Verificar que Todo Funciona

1. **Backend**: Abre `http://localhost:5000` en el navegador
   - Deberías ver un mensaje JSON con información de la API

2. **Frontend**: Abre `http://localhost:3000`
   - Deberías ver la página de login del sistema

---

## 🔑 Credenciales de Acceso Inicial

**Usuario Administrador por Defecto:**
- **Email**: `admin@asilocabezaalgodon.com`
- **Contraseña**: `Admin2025!`

⚠️ **IMPORTANTE**: Cambia esta contraseña inmediatamente después del primer inicio de sesión.

---

## 🐛 Solución de Problemas

### Problema: Error de Conexión a MySQL

**Síntoma**: `Error: connect ECONNREFUSED 127.0.0.1:3306`

**Solución**:
```bash
# Verificar que MySQL está corriendo
sudo service mysql status

# Si no está corriendo, iniciarlo
sudo service mysql start

# Verificar credenciales en backend/.env
```

### Problema: Puerto 5000 o 3000 Ya en Uso

**Solución**:
```bash
# Matar el proceso en el puerto 5000
lsof -ti:5000 | xargs kill -9

# Matar el proceso en el puerto 3000
lsof -ti:3000 | xargs kill -9
```

O cambiar el puerto en `backend/.env` o `frontend/package.json`.

### Problema: Módulos de Node.js Faltantes

**Solución**:
```bash
# Borrar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Problema: Error al Importar Schema SQL

**Solución**:
```bash
# Verificar que el archivo existe
ls -la database/schema.sql

# Importar con verbose para ver errores
sudo mysql asilo_cabeza_algodon < database/schema.sql 2>&1 | tee import_log.txt
```

### Problema: Frontend No Conecta con Backend

**Solución**:
1. Verificar que el backend está corriendo en el puerto 5000
2. Verificar el proxy en `frontend/package.json`
3. Limpiar caché del navegador
4. Reiniciar el servidor de desarrollo del frontend

---

## 📦 Construcción para Producción

### Backend

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend
npm run build
```

Los archivos estáticos se generarán en `frontend/build/`.

Para servir el frontend en producción, puedes usar el backend para servir los archivos estáticos:

```javascript
// Agregar al backend/src/server.js
app.use(express.static(path.join(__dirname, '../../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
});
```

---

## 📝 Comandos Útiles Resumen

```bash
# Instalar todo desde la raíz
npm run install-all

# Ejecutar en desarrollo
npm run dev

# Solo backend
cd backend && npm run dev

# Solo frontend
cd frontend && npm start

# Iniciar MySQL
sudo service mysql start

# Ver logs de MySQL
sudo tail -f /var/log/mysql/error.log

# Verificar puertos en uso
netstat -tuln | grep LISTEN
```

---

## 🆘 Soporte

Si encuentras problemas no cubiertos en este manual:

1. Verifica los logs de la terminal
2. Verifica los logs del navegador (Consola de Desarrollador F12)
3. Verifica la configuración del archivo `.env`
4. Asegúrate de que MySQL está corriendo

---

## ✅ Checklist de Verificación

- [ ] Node.js instalado (v16+)
- [ ] MySQL instalado y corriendo
- [ ] Base de datos creada
- [ ] Schema importado correctamente
- [ ] Backend/.env configurado
- [ ] Backend dependencias instaladas
- [ ] Frontend dependencias instaladas
- [ ] Backend corriendo en puerto 5000
- [ ] Frontend corriendo en puerto 3000
- [ ] Login funciona correctamente

---

**Desarrollado con ❤️ por Omar Cabrera**  
**© 2025 - Sistema Asilo de Ancianos "Cabeza de Algodón"**

