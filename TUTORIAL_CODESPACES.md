# 🎓 TUTORIAL COMPLETO - Instalación en GitHub Codespaces

## 📋 Índice
1. [Preparación Inicial](#preparación-inicial)
2. [Crear el Codespace](#crear-el-codespace)
3. [Instalar PostgreSQL](#instalar-postgresql)
4. [Instalar Dependencias](#instalar-dependencias)
5. [Iniciar el Sistema](#iniciar-el-sistema)
6. [Verificar que Todo Funciona](#verificar-que-todo-funciona)
7. [Solución de Problemas](#solución-de-problemas)

---

## 🎯 Preparación Inicial

### Requisitos
- ✅ Cuenta de GitHub
- ✅ Acceso a GitHub Codespaces
- ✅ Código del proyecto en un repositorio de GitHub

### Tiempo Estimado
⏱️ **10-15 minutos** para la instalación completa

---

## 📦 PASO 1: Crear el Codespace

### 1.1 Subir el Código a GitHub

Si aún no tienes el código en GitHub:

```bash
# En tu máquina local, desde la carpeta del proyecto
git init
git add .
git commit -m "Sistema Asilo Cabeza de Algodón - Versión Completa"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/cabeza-de-algodon.git
git push -u origin main
```

### 1.2 Crear el Codespace

1. Ve a tu repositorio en GitHub: `https://github.com/TU_USUARIO/cabeza-de-algodon`

2. Haz clic en el botón verde **"Code"**

3. Selecciona la pestaña **"Codespaces"**

4. Haz clic en **"Create codespace on main"**

   ![Crear Codespace](https://docs.github.com/assets/cb-138303/mw-1440/images/help/codespaces/new-codespace-button.webp)

5. **Espera** mientras Codespaces configura tu entorno (2-3 minutos)

6. Una vez que se abra, verás VS Code en tu navegador con tu proyecto cargado

---

## 🐘 PASO 2: Instalar PostgreSQL

Una vez dentro de Codespaces:

### 2.1 Abrir la Terminal

1. En VS Code (navegador), presiona:
   - **Windows/Linux**: `Ctrl + ñ` o `Ctrl + ``
   - **Mac**: `Cmd + ``
   
2. O ve al menú: **Terminal → New Terminal**

### 2.2 Actualizar el Sistema

En la terminal, escribe:

```bash
sudo apt update
```

**Explicación**: Actualiza la lista de paquetes disponibles.

Presiona **Enter** y espera unos segundos.

### 2.3 Instalar PostgreSQL

```bash
sudo apt install -y postgresql postgresql-contrib
```

**Explicación**: Instala PostgreSQL y herramientas adicionales.

Presiona **Enter** y espera 1-2 minutos. Verás mucho texto pasando, es normal.

### 2.4 Iniciar PostgreSQL

```bash
sudo service postgresql start
```

**Explicación**: Inicia el servicio de PostgreSQL.

Deberías ver: `* Starting PostgreSQL 14 database server`

### 2.5 Verificar que PostgreSQL Está Corriendo

```bash
sudo service postgresql status
```

Deberías ver algo como: `postgresql is running`

Si ves esto, ✅ **PostgreSQL está instalado correctamente!**

---

## 🗄️ PASO 3: Crear la Base de Datos

### 3.1 Acceder a PostgreSQL como Usuario Postgres

```bash
sudo -u postgres psql
```

**Explicación**: Entra a la consola de PostgreSQL como superusuario.

Verás el prompt cambiar a: `postgres=#`

### 3.2 Crear la Base de Datos

Dentro de PostgreSQL, escribe:

```sql
CREATE DATABASE cabeza_algodon_db;
```

Presiona **Enter**. Deberías ver: `CREATE DATABASE`

### 3.3 Configurar Contraseña del Usuario Postgres

```sql
ALTER USER postgres PASSWORD 'postgres';
```

Presiona **Enter**. Deberías ver: `ALTER ROLE`

### 3.4 Verificar que la Base de Datos Existe

```sql
\l
```

Deberías ver `cabeza_algodon_db` en la lista.

### 3.5 Salir de PostgreSQL

```sql
\q
```

Volverás a la terminal normal.

✅ **Base de datos creada correctamente!**

---

## 📦 PASO 4: Instalar Dependencias del Proyecto

### 4.1 Verificar que Estás en la Carpeta Correcta

```bash
pwd
```

Deberías ver algo como: `/workspaces/cabeza-de-algodon`

Si no estás ahí:

```bash
cd /workspaces/cabeza-de-algodon
```

### 4.2 Ver los Archivos del Proyecto

```bash
ls -la
```

Deberías ver carpetas como: `backend`, `frontend`, `setup.sh`, etc.

### 4.3 OPCIÓN A: Usar el Script Automático (RECOMENDADO)

Si el archivo `setup.sh` existe:

```bash
chmod +x setup.sh
./setup.sh
```

**Explicación**: 
- `chmod +x` hace el archivo ejecutable
- `./setup.sh` ejecuta el script de instalación automática

Esto instalará todo automáticamente. Espera 3-5 minutos.

Si todo sale bien, verás mensajes como:
- ✅ PostgreSQL iniciado
- ✅ Base de datos creada
- ✅ Dependencias instaladas

**¡LISTO!** Salta al [PASO 5](#paso-5-iniciar-el-sistema)

### 4.3 OPCIÓN B: Instalación Manual

Si prefieres hacerlo paso a paso o el script no funciona:

#### Instalar Dependencias de la Raíz

```bash
npm install
```

Espera 1-2 minutos. Verás muchos paquetes instalándose.

#### Instalar Dependencias del Backend

```bash
cd backend
npm install
```

Espera 2-3 minutos. Si ves advertencias (warnings), no te preocupes.

Vuelve a la raíz:

```bash
cd ..
```

#### Instalar Dependencias del Frontend

```bash
cd frontend
npm install
```

Espera 2-3 minutos.

Vuelve a la raíz:

```bash
cd ..
```

✅ **Todas las dependencias instaladas!**

---

## 🚀 PASO 5: Iniciar el Sistema

### 5.1 OPCIÓN A: Iniciar Todo Junto (Recomendado)

Desde la raíz del proyecto:

```bash
npm run dev
```

**Explicación**: Este comando inicia el backend y el frontend simultáneamente.

Verás dos bloques de mensajes:
1. Mensajes del backend (puerto 5000)
2. Mensajes del frontend (puerto 3000)

### 5.2 OPCIÓN B: Iniciar en Terminales Separadas

Si prefieres verlos por separado:

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

Espera hasta ver:
```
🚀 Servidor ejecutándose en: http://localhost:5000
✅ Usuario administrador creado
```

**Terminal 2 - Frontend:**

Abre una nueva terminal: `Terminal → New Terminal`

```bash
cd frontend
npm start
```

Espera hasta ver:
```
Compiled successfully!
You can now view cabeza-de-algodon-frontend in the browser.
```

---

## 🌐 PASO 6: Acceder al Sistema

### 6.1 Ports en Codespaces

Cuando el sistema se inicie, Codespaces abrirá automáticamente los puertos.

1. Verás una notificación en la esquina inferior derecha:
   - "Your application running on port 3000 is available"

2. Haz clic en **"Open in Browser"**

3. O ve a la pestaña **"PORTS"** en el panel inferior:
   - Verás el puerto 3000 (Frontend)
   - Verás el puerto 5000 (Backend)

### 6.2 Abrir el Frontend

**Método 1**: Hacer clic en el icono de globo 🌐 junto al puerto 3000

**Método 2**: Hacer clic derecho en el puerto 3000 → "Open in Browser"

**Método 3**: Copiar la URL que aparece en "Forwarded Address"

### 6.3 Ver la Página de Login

Se abrirá una nueva pestaña con la página de login del sistema.

Deberías ver:
- 🏥 Logo de Cabeza de Algodón
- Formulario de login elegante
- Fondo con gradientes morados
- Credenciales de demo

---

## 🔐 PASO 7: Iniciar Sesión

### 7.1 Credenciales de Administrador

En la página de login, ingresa:

**Email**: `ocabrerah99@gmail.com`  
**Contraseña**: `Admin2025!`

### 7.2 Hacer Clic en "Iniciar Sesión"

Si todo está correcto:
- ✅ Verás una notificación: "¡Bienvenido(a) Administrador!"
- ✅ Serás redirigido al Dashboard
- ✅ Verás estadísticas, gráficos y el menú lateral

---

## ✅ PASO 8: Verificar que Todo Funciona

### 8.1 Explorar el Dashboard

Deberías ver:
- 📊 Tarjetas con estadísticas (Pacientes, Solicitudes, Visitas, Balance)
- 📈 Gráficos de barras y líneas
- 🔔 Alertas y notificaciones

### 8.2 Probar el Menú Lateral

Haz clic en cada opción del menú:
- ✅ Dashboard
- ✅ Pacientes
- ✅ Solicitudes
- ✅ Visitas Médicas
- ✅ Farmacia
- ✅ Caja
- ✅ Reportes
- ✅ Usuarios

Todas deberían cargar sin errores.

### 8.3 Verificar el Backend

Abre una nueva pestaña y ve a:

```
https://[tu-codespace-url]-5000.preview.app.github.dev/api/health
```

Reemplaza `[tu-codespace-url]` con tu URL de Codespaces.

Deberías ver:
```json
{
  "status": "OK",
  "message": "Backend Asilo Cabeza de Algodón funcionando correctamente",
  "timestamp": "2025-10-26T..."
}
```

### 8.4 Crear un Paciente de Prueba

1. Ve a **Pacientes** en el menú
2. Haz clic en **"Nuevo Paciente"**
3. Completa el formulario (solo los campos marcados con * son obligatorios)
4. Haz clic en **"Guardar"**
5. Deberías ver el paciente en la lista

✅ **Si puedes crear un paciente, ¡TODO ESTÁ FUNCIONANDO!**

---

## 🎉 ¡FELICIDADES! Sistema Instalado Correctamente

Tu sistema está ahora:
- ✅ Corriendo en Codespaces
- ✅ Backend funcionando en puerto 5000
- ✅ Frontend funcionando en puerto 3000
- ✅ Base de datos PostgreSQL operativa
- ✅ Usuario administrador creado
- ✅ Listo para usar

---

## 🔧 PASO 9: Comandos Útiles

### Ver Logs del Backend

```bash
cd backend
npm run dev
```

### Ver Logs del Frontend

```bash
cd frontend
npm start
```

### Detener el Sistema

Presiona `Ctrl + C` en la terminal donde está corriendo

### Reiniciar PostgreSQL

```bash
sudo service postgresql restart
```

### Ver Estado de PostgreSQL

```bash
sudo service postgresql status
```

### Acceder a la Base de Datos

```bash
sudo -u postgres psql -d cabeza_algodon_db
```

Comandos útiles dentro de PostgreSQL:
- `\dt` - Ver todas las tablas
- `\d usuarios` - Ver estructura de tabla usuarios
- `SELECT * FROM usuarios;` - Ver todos los usuarios
- `\q` - Salir

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### Problema 1: "PostgreSQL no está instalado"

**Solución:**
```bash
sudo apt update
sudo apt install -y postgresql postgresql-contrib
sudo service postgresql start
```

### Problema 2: "Cannot find module"

**Solución:**
```bash
# Desde la raíz
rm -rf node_modules package-lock.json
npm install

# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
cd ..

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
cd ..
```

### Problema 3: "Puerto 3000 o 5000 en uso"

**Solución:**
```bash
# Matar proceso en puerto 5000
lsof -ti:5000 | xargs kill -9

# Matar proceso en puerto 3000
lsof -ti:3000 | xargs kill -9
```

### Problema 4: "Error de conexión a la base de datos"

**Solución:**
```bash
# Verificar que PostgreSQL está corriendo
sudo service postgresql status

# Si no está corriendo
sudo service postgresql start

# Recrear la base de datos
sudo -u postgres psql -c "DROP DATABASE IF EXISTS cabeza_algodon_db;"
sudo -u postgres psql -c "CREATE DATABASE cabeza_algodon_db;"
```

### Problema 5: "Las tablas no se crean"

**Solución:**

Las tablas se crean automáticamente cuando inicias el backend por primera vez.

Si no se crean:
1. Detén el backend (Ctrl + C)
2. Inicia de nuevo: `npm run backend`
3. Mira los logs, deberías ver: "✅ Modelos sincronizados"

### Problema 6: "No puedo acceder al frontend"

**Solución:**

1. Ve a la pestaña **"PORTS"** en VS Code
2. Busca el puerto 3000
3. Haz clic derecho → "Make Public" (si está privado)
4. Haz clic en el icono de globo 🌐

### Problema 7: "Error al iniciar sesión"

**Verifica:**
- ✅ Email: `ocabrerah99@gmail.com`
- ✅ Contraseña: `Admin2025!` (con mayúsculas y símbolo)
- ✅ Backend está corriendo
- ✅ PostgreSQL está corriendo

### Problema 8: "CORS Error"

**Solución:**

Asegúrate de que el backend esté configurado correctamente. En `backend/server.js` debe tener:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

---

## 📊 VERIFICACIÓN FINAL - Checklist

Marca cada punto cuando lo hayas completado:

- [ ] PostgreSQL instalado y corriendo
- [ ] Base de datos `cabeza_algodon_db` creada
- [ ] Dependencias del proyecto instaladas
- [ ] Backend iniciado sin errores
- [ ] Frontend iniciado sin errores
- [ ] Puedo acceder al frontend en el navegador
- [ ] Puedo iniciar sesión con las credenciales de admin
- [ ] Puedo navegar por el Dashboard
- [ ] Puedo ver la lista de pacientes (vacía inicialmente)
- [ ] Puedo crear un paciente de prueba
- [ ] Todos los módulos del menú cargan correctamente

Si marcaste todo ✅, **¡EL SISTEMA ESTÁ FUNCIONANDO PERFECTAMENTE!**

---

## 🎓 CONSEJOS PARA CODESPACES

### Mantener el Codespace Activo

- Los Codespaces se detienen después de 30 minutos de inactividad
- Para reactivarlo, solo ábrelo de nuevo desde GitHub
- PostgreSQL se detendrá, así que ejecuta: `sudo service postgresql start`

### Guardar Cambios

- Todos los cambios se guardan automáticamente en Codespaces
- Para commitear a GitHub:
  ```bash
  git add .
  git commit -m "Descripción de cambios"
  git push
  ```

### Compartir el Codespace

- Puedes hacer el puerto 3000 público para compartirlo
- Ve a PORTS → Click derecho en 3000 → "Port Visibility" → "Public"

### Descargar Archivos

- Click derecho en cualquier archivo/carpeta → "Download"

---

## 📱 PRÓXIMOS PASOS

Ahora que tienes el sistema funcionando:

1. **Crear Usuarios**: Ve a Usuarios → Nuevo Usuario
2. **Registrar Pacientes**: Ve a Pacientes → Nuevo Paciente
3. **Crear Solicitudes**: Ve a Solicitudes → Nueva Solicitud
4. **Explorar Reportes**: Ve a Reportes → Generar cualquier reporte
5. **Personalizar tu Perfil**: Ve a Mi Perfil → Editar

---

## 📞 SOPORTE

Si algo no funciona:

1. **Revisa la sección de [Solución de Problemas](#solución-de-problemas)**
2. **Verifica los logs** en las terminales del backend y frontend
3. **Contacta al desarrollador**: ocabrerah99@gmail.com

---

## 📄 DOCUMENTACIÓN ADICIONAL

Para más información, consulta:
- `README.md` - Documentación completa
- `QUICK_START.md` - Inicio rápido
- `GUIA_USUARIO.md` - Manual de usuario
- `INSTALL.md` - Guía de instalación detallada

---

## 🎉 ¡ÉXITO!

**¡Has instalado exitosamente el Sistema de Gestión del Asilo Cabeza de Algodón en GitHub Codespaces!**

El sistema está listo para:
- ✅ Gestionar pacientes
- ✅ Crear solicitudes médicas
- ✅ Registrar visitas
- ✅ Controlar farmacia
- ✅ Administrar caja
- ✅ Generar reportes

**© 2025 O. Cabrera - Todos los derechos reservados**

---

**¡Disfruta usando el sistema! 🏥💙**

