# 🔧 ARREGLO COMPLETO DE AUTENTICACIÓN

## 📋 LO QUE ACABO DE HACER

### 1. ✅ Creado script de prueba del backend
**Archivo:** `test_sistema.js`

Este script prueba TODAS las rutas importantes:
- Health check
- Login
- Obtener perfil
- Obtener pacientes
- Obtener solicitudes
- Resumen de caja

### 2. ✅ Configurado proxy explícito
**Archivo:** `frontend/src/setupProxy.js`

En lugar de depender del proxy simple de `package.json`, ahora usamos `http-proxy-middleware` que es más robusto.

### 3. ✅ Actualizado package.json
Agregada la dependencia `http-proxy-middleware`.

---

## 🚀 PASOS PARA ARREGLAR TODO

### PASO 1: Probar el Backend

Abre una terminal y ejecuta:
```bash
node test_sistema.js
```

**Si TODO pasa ✅:**
- El backend funciona correctamente
- El problema está en el frontend

**Si algo FALLA ❌:**
- Hay un problema en el backend
- Sigue las instrucciones que muestra el script

---

### PASO 2: Instalar nueva dependencia

En la carpeta `frontend`:
```bash
cd frontend
npm install
```

Esto instalará `http-proxy-middleware`.

---

### PASO 3: Reiniciar COMPLETAMENTE

#### Backend:
```bash
cd backend
npm run dev
```

#### Frontend (en otra terminal):
```bash
cd frontend
npm start
```

---

### PASO 4: Limpiar TODO en el navegador

1. Abre http://localhost:3000
2. Presiona **F12** para abrir DevTools
3. Ve a la pestaña **Application** (Aplicación)
4. En la barra lateral izquierda:
   - Click en "Local Storage" → Elimina todo
   - Click en "Session Storage" → Elimina todo
5. Cierra DevTools
6. Presiona **Ctrl + Shift + R** para recargar sin caché

---

### PASO 5: Intentar Login

```
Email:    ocabrerah99@gmail.com
Password: Admin2025!
```

---

## 🔍 DIAGNÓSTICO SI SIGUE SIN FUNCIONAR

### A. Verificar en la Consola del Navegador (F12)

#### Pestaña Console:
Busca errores en rojo. Los más comunes:
- `CORS error` → Problema de configuración
- `401 Unauthorized` → Problema de autenticación
- `404 Not Found` → Problema de rutas
- `Network Error` → Backend no responde

#### Pestaña Network:
1. Busca la petición `login`
2. Click en ella
3. Ve a la pestaña "Headers"
4. Verifica:
   - **Request URL:** Debe ser `http://localhost:3000/api/auth/login`
   - **Status Code:** Debe ser `200 OK`

Si el Status es:
- **404:** La ruta no existe (problema de configuración)
- **401:** Credenciales incorrectas
- **500:** Error en el backend
- **Failed:** Backend no responde

---

## 📝 CONFIGURACIÓN ACTUAL

### Frontend (`api.js`):
```javascript
axios.defaults.baseURL = '/api';
```

### Frontend (`setupProxy.js`):
```javascript
'/api' → redirige a → 'http://localhost:5000'
```

### Backend (`server.js`):
```javascript
app.use('/api/auth', require('./routes/auth'));
```

### Flujo completo:
```
Frontend: POST /api/auth/login
    ↓
Proxy: detecta /api
    ↓
Redirige a: http://localhost:5000/api/auth/login
    ↓
Backend: recibe en /api/auth/login
    ↓
Ejecuta: router.post('/login', authController.login)
    ↓
Responde con token
    ↓
Frontend: recibe token y guarda en localStorage
```

---

## 🐛 ERRORES COMUNES Y SOLUCIONES

### Error: "Cannot read properties of undefined"
**Causa:** El frontend no recibe la respuesta esperada
**Solución:** 
```javascript
// Verifica que el backend responda con este formato:
{
  token: "...",
  usuario: {
    id: "...",
    nombre: "...",
    email: "...",
    rol: "..."
  }
}
```

### Error: "CORS policy"
**Causa:** Configuración de CORS en el backend
**Solución:** Ya está configurado en `server.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### Error: "Token inválido"
**Causa:** El token guardado está corrupto
**Solución:**
1. F12 → Application → Local Storage
2. Elimina el item "token"
3. Intenta login nuevamente

### Error: "Usuario no autorizado"
**Causa:** El usuario está inactivo en la BD
**Solución:**
```sql
-- Ejecuta en la BD:
UPDATE usuarios 
SET activo = true, validado = true 
WHERE email = 'ocabrerah99@gmail.com';
```

---

## ✅ CHECKLIST DE VERIFICACIÓN

- [ ] Backend corriendo en puerto 5000
- [ ] Frontend corriendo en puerto 3000
- [ ] PostgreSQL activo (Docker)
- [ ] Base de datos poblada
- [ ] Usuario admin existe en BD
- [ ] `npm install` ejecutado en frontend (para http-proxy-middleware)
- [ ] Caché del navegador limpia
- [ ] Local Storage vacío
- [ ] Script `test_sistema.js` pasa todas las pruebas

---

## 🎯 COMANDO TODO-EN-UNO

Si quieres empezar desde cero:

```bash
# 1. Matar procesos de Node
taskkill /F /IM node.exe

# 2. Probar backend
node test_sistema.js

# 3. Si pasa, instalar dependencias frontend
cd frontend
npm install

# 4. Iniciar backend
cd ../backend
start cmd /k "npm run dev"

# 5. Esperar 5 segundos

# 6. Iniciar frontend
cd ../frontend
start cmd /k "npm start"
```

---

## 📞 SI NADA FUNCIONA

**Mándame estos datos:**

1. **Resultado del script:**
   ```bash
   node test_sistema.js
   ```

2. **Error en la consola del navegador (F12 → Console)**

3. **Request URL de la petición login (F12 → Network → login)**

4. **Status code de la respuesta**

---

**© 2025 O. Cabrera**

**El sistema DEBE funcionar. Si no lo hace, necesito ver los errores específicos.**

