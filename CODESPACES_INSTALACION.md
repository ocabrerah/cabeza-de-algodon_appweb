# 🚀 INSTALACIÓN DEFINITIVA EN CODESPACES

## ✅ Método Actualizado y Probado - Sin Contraseñas

**Tiempo total: 8-10 minutos**

---

## 📋 PASOS COMPLETOS

### PASO 0: Subir el Código a GitHub

Si aún no lo has hecho:

```bash
# En tu máquina local
git init
git add .
git commit -m "Sistema Asilo Cabeza de Algodón"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/cabeza-de-algodon.git
git push -u origin main
```

---

### PASO 1: Crear el Codespace

1. Ve a tu repositorio en GitHub
2. Click en el botón **"Code"** (verde)
3. Selecciona la pestaña **"Codespaces"**
4. Click en **"Create codespace on main"**
5. Espera 2-3 minutos mientras se crea el entorno

✅ **Se abrirá VS Code en tu navegador**

---

### PASO 2: Verificar el Entorno

Una vez dentro del Codespace, abre la terminal:

**Teclado:** `Ctrl + Ñ` o `Ctrl + `` (backtick)

Verifica que estás en la carpeta correcta:

```bash
pwd
```

Deberías ver: `/workspaces/nombre-de-tu-repo`

Si no, navega a ella:

```bash
cd /workspaces/nombre-de-tu-repo
```

Verifica los archivos:

```bash
ls -la
```

Deberías ver: `backend/`, `frontend/`, `setup.sh`, etc.

---

### PASO 3: Instalar PostgreSQL

```bash
sudo apt update
sudo apt install -y postgresql postgresql-contrib
```

**Nota:** Este comando **SÍ** necesita sudo pero **NO** pedirá contraseña en Codespaces.

Espera 1-2 minutos. Verás muchas líneas de texto instalándose.

---

### PASO 4: Iniciar PostgreSQL

```bash
sudo service postgresql start
```

Deberías ver: `* Starting PostgreSQL 14 database server`

Verifica que está corriendo:

```bash
sudo service postgresql status
```

Deberías ver algo como: `14/main (port 5432): online`

✅ **PostgreSQL instalado y corriendo**

---

### PASO 5: Crear la Base de Datos (SIN SUDO - SIN CONTRASEÑA)

**Este es el método correcto que funciona en Codespaces:**

```bash
createdb cabeza_algodon_db
```

✅ **¡Eso es todo!** Si no sale ningún error, la base de datos se creó correctamente.

**Verificar que se creó:**

```bash
psql -l | grep cabeza_algodon_db
```

Deberías ver una línea con `cabeza_algodon_db`.

**Si sale error "role does not exist":**

```bash
sudo -u postgres createdb cabeza_algodon_db
```

---

### PASO 6: Configurar la Base de Datos (Opcional pero Recomendado)

Acceder a PostgreSQL:

```bash
psql -d cabeza_algodon_db
```

O si lo anterior falla:

```bash
sudo -u postgres psql -d cabeza_algodon_db
```

Una vez dentro (verás el prompt `cabeza_algodon_db=#`), ejecuta:

```sql
-- Crear extensiones útiles (opcional)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Salir
\q
```

✅ **Base de datos lista**

---

### PASO 7: Hacer el Script Ejecutable

```bash
chmod +x setup.sh
chmod +x start.sh
```

---

### PASO 8: Instalar Dependencias

**Opción A: Automática (Recomendada)**

```bash
npm install
```

Luego:

```bash
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

**Opción B: Manual paso por paso**

```bash
# Dependencias raíz
npm install

# Dependencias backend
cd backend
npm install
cd ..

# Dependencias frontend
cd frontend
npm install
cd ..
```

Espera 5-7 minutos. Verás muchos paquetes instalándose.

**Ignorar advertencias (warnings)** - solo preocúpate por errores rojos.

✅ **Todas las dependencias instaladas**

---

### PASO 9: Crear el Archivo .env del Backend

El backend necesita variables de entorno:

```bash
cd backend
cat > .env << 'EOF'
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cabeza_algodon_db
DB_USER=codespace
DB_PASSWORD=
JWT_SECRET=cabeza_algodon_jwt_secret_key_2025_super_secure
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=ocabrerah99@gmail.com
EMAIL_PASSWORD=
FRONTEND_URL=http://localhost:3000
EOF
cd ..
```

**Nota:** Las contraseñas están vacías porque en Codespaces PostgreSQL no requiere contraseña para usuario local.

✅ **Configuración lista**

---

### PASO 10: Iniciar el Sistema

**Opción A: Todo junto (Recomendada para desarrollo)**

Abre DOS terminales en Codespaces:

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

Espera hasta ver:

```
✅ Conexión a PostgreSQL establecida correctamente
✅ Modelos sincronizados con la base de datos
✅ Usuario administrador creado
🚀 Servidor ejecutándose en: http://localhost:5000
```

**NO CIERRES ESTA TERMINAL** - déjala corriendo.

**Terminal 2 - Frontend:**

Click en el **+** para abrir nueva terminal, o:
- Menú: `Terminal → New Terminal`

```bash
cd frontend
npm start
```

Espera hasta ver:

```
Compiled successfully!
You can now view cabeza-de-algodon-frontend in the browser.
  Local:            http://localhost:3000
```

**NO CIERRES ESTA TERMINAL** - déjala corriendo.

---

### PASO 11: Abrir el Sistema en el Navegador

Codespaces detectará automáticamente los puertos y te mostrará una notificación.

**Método 1: Notificación automática**
- Aparecerá una notificación: "Your application running on port 3000 is available"
- Click en **"Open in Browser"**

**Método 2: Panel de Puertos**
1. Ve al panel inferior de VS Code
2. Click en la pestaña **"PORTS"**
3. Verás los puertos 3000 y 5000 listados
4. Junto al puerto 3000, click en el icono de **globo 🌐**

**Método 3: URL directa**
- Copia la URL del puerto 3000 en el panel PORTS
- Pégala en una nueva pestaña del navegador

---

### PASO 12: Iniciar Sesión

Verás la página de login con diseño moderno y gradientes morados.

**Credenciales:**
```
Email:     ocabrerah99@gmail.com
Password:  Admin2025!
```

⚠️ **Importante:** 
- La contraseña tiene mayúsculas: `Admin2025!`
- Incluye el signo de exclamación al final

Click en **"Iniciar Sesión"**

✅ **Si entras al Dashboard, ¡TODO ESTÁ FUNCIONANDO!**

---

## 🎉 ¡SISTEMA INSTALADO Y FUNCIONANDO!

Ahora deberías ver:
- ✅ Dashboard con gráficos
- ✅ Menú lateral con todas las opciones
- ✅ Tu nombre (Administrador) en la esquina superior derecha
- ✅ Estadísticas de pacientes, solicitudes, etc.

---

## 🔍 VERIFICACIÓN COMPLETA

### 1. Verificar Backend

Abre una nueva pestaña del navegador y ve a:

```
https://[tu-codespace-url]-5000.preview.app.github.dev/api/health
```

(Reemplaza `[tu-codespace-url]` con tu URL de Codespaces)

Deberías ver:
```json
{
  "status": "OK",
  "message": "Backend Asilo Cabeza de Algodón funcionando correctamente"
}
```

### 2. Verificar Base de Datos

En una terminal:

```bash
psql -d cabeza_algodon_db -c "\dt"
```

O:

```bash
sudo -u postgres psql -d cabeza_algodon_db -c "\dt"
```

Deberías ver 8 tablas:
- usuarios
- pacientes
- solicitudes_medicas
- visitas_medicas
- examenes_laboratorio
- medicamentos
- transacciones
- cuentas_pacientes

### 3. Probar Funcionalidades

**Crear un Paciente:**
1. En el menú → **Pacientes**
2. Click **"Nuevo Paciente"**
3. Llena al menos los campos obligatorios (*)
4. Click **"Guardar"**

Si se guarda correctamente, **¡TODO FUNCIONA A LA PERFECCIÓN!** ✅

---

## 🎯 RESUMEN DE COMANDOS (Todo junto)

Para referencia rápida, aquí están TODOS los comandos en orden:

```bash
# 1. Instalar PostgreSQL
sudo apt update
sudo apt install -y postgresql postgresql-contrib
sudo service postgresql start

# 2. Crear base de datos
createdb cabeza_algodon_db

# 3. Verificar
psql -l | grep cabeza_algodon_db

# 4. Instalar dependencias
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# 5. Crear .env
cd backend
cat > .env << 'EOF'
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cabeza_algodon_db
DB_USER=codespace
DB_PASSWORD=
JWT_SECRET=cabeza_algodon_jwt_secret_key_2025_super_secure
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=ocabrerah99@gmail.com
EMAIL_PASSWORD=
FRONTEND_URL=http://localhost:3000
EOF
cd ..

# 6. Iniciar (en dos terminales separadas)
# Terminal 1:
cd backend && npm run dev

# Terminal 2:
cd frontend && npm start
```

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### Problema 1: "createdb: command not found"

**Solución:**
```bash
sudo apt install postgresql-client-common postgresql-client
createdb cabeza_algodon_db
```

### Problema 2: "createdb: error: connection to server failed"

**Solución:**
```bash
sudo service postgresql restart
sleep 3
createdb cabeza_algodon_db
```

### Problema 3: "role 'codespace' does not exist"

**Solución:**
```bash
sudo -u postgres createdb cabeza_algodon_db
```

O actualizar el .env:
```bash
cd backend
nano .env
# Cambiar DB_USER=codespace por DB_USER=postgres
```

### Problema 4: "Cannot find module"

**Solución:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
cd ../frontend
rm -rf node_modules package-lock.json
npm install
cd ..
```

### Problema 5: "Port 3000/5000 is already in use"

**Solución:**
```bash
# Buscar y matar el proceso
lsof -ti:5000 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

### Problema 6: Backend no crea tablas

**Solución:**

El backend crea las tablas automáticamente al iniciar. Si no se crean:

```bash
cd backend
# Detener si está corriendo (Ctrl+C)
# Iniciar de nuevo
npm run dev
```

Deberías ver en los logs: "✅ Modelos sincronizados con la base de datos"

### Problema 7: No puedo hacer login

**Verificar:**
1. ✅ Backend está corriendo (Terminal 1)
2. ✅ Frontend está corriendo (Terminal 2)
3. ✅ Credenciales correctas: `ocabrerah99@gmail.com` / `Admin2025!`
4. ✅ En los logs del backend debería decir: "✅ Usuario administrador creado"

Si no se creó el admin:
```bash
# Detener backend (Ctrl+C)
# Borrar DB y recrear
dropdb cabeza_algodon_db
createdb cabeza_algodon_db
# Iniciar backend de nuevo
cd backend && npm run dev
```

---

## 💡 CONSEJOS IMPORTANTES

### 1. Mantener Codespaces Activo
- Los Codespaces se suspenden después de 30 minutos de inactividad
- Para reactivar, solo ábrelo de nuevo desde GitHub
- PostgreSQL se detendrá, ejecuta: `sudo service postgresql start`

### 2. Guardar Cambios
Los cambios se guardan automáticamente, pero para commitear:
```bash
git add .
git commit -m "Cambios realizados"
git push
```

### 3. Ver Logs
- **Backend:** Logs en Terminal 1
- **Frontend:** Logs en Terminal 2
- **Errores:** Aparecen en rojo en las terminales

### 4. Reiniciar el Sistema
Si necesitas reiniciar todo:
```bash
# Ctrl+C en ambas terminales
# Luego:
sudo service postgresql restart
cd backend && npm run dev    # Terminal 1
cd frontend && npm start     # Terminal 2
```

---

## 📊 CHECKLIST FINAL

Marca cada punto cuando lo completes:

- [ ] Codespace creado y abierto
- [ ] PostgreSQL instalado
- [ ] PostgreSQL iniciado y corriendo
- [ ] Base de datos `cabeza_algodon_db` creada
- [ ] Verificada existencia de la DB
- [ ] Dependencias raíz instaladas
- [ ] Dependencias backend instaladas
- [ ] Dependencias frontend instaladas
- [ ] Archivo `.env` creado en backend
- [ ] Backend iniciado sin errores
- [ ] Frontend iniciado sin errores
- [ ] Puedo acceder al frontend en el navegador
- [ ] Puedo hacer login con credenciales de admin
- [ ] Veo el Dashboard con gráficos
- [ ] Puedo crear un paciente de prueba
- [ ] Backend API responde en `/api/health`

**Si marcaste todo ✅, ¡EL SISTEMA ESTÁ 100% FUNCIONAL!**

---

## 🎓 PRÓXIMOS PASOS

Una vez que todo funcione:

1. **Crear usuarios** para tu equipo
   - Menu → Usuarios → Nuevo Usuario

2. **Registrar pacientes**
   - Menu → Pacientes → Nuevo Paciente

3. **Crear solicitudes médicas**
   - Menu → Solicitudes → Nueva Solicitud

4. **Explorar todos los módulos**
   - Dashboard, Visitas, Farmacia, Caja, Reportes

5. **Personalizar tu perfil**
   - Click en tu nombre (arriba derecha) → Mi Perfil

---

## 📞 SOPORTE

Si después de seguir esta guía aún tienes problemas:

1. Verifica los logs en las terminales
2. Revisa la sección de Solución de Problemas
3. Contacta: ocabrerah99@gmail.com

---

## 📝 NOTAS FINALES

- ✅ Esta guía está optimizada para GitHub Codespaces
- ✅ No requiere contraseñas adicionales
- ✅ Todo se instala localmente en el Codespace
- ✅ Los datos persisten mientras el Codespace exista
- ✅ Puedes detener/iniciar el Codespace cuando quieras

---

**© 2025 O. Cabrera - Sistema Cabeza de Algodón**

**¡Éxito con tu instalación! 🚀🏥**

