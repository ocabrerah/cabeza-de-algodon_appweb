# 🚀 CÓMO INICIAR EL SISTEMA

## ⚡ MÉTODO MÁS RÁPIDO (RECOMENDADO)

### **1. Doble clic en este archivo:**
```
INICIAR_SISTEMA_COMPLETO.bat
```

### **2. Espera 30 segundos**

El script automáticamente:
- ✅ Verifica PostgreSQL
- ✅ Crea/Pobla la base de datos
- ✅ Inicia el Backend
- ✅ Inicia el Frontend
- ✅ Abre el navegador

### **3. Login**
```
Email:    ocabrerah99@gmail.com
Password: Admin2025!
```

---

## 📋 MÉTODO MANUAL (Si el script no funciona)

### **PASO 1: Verificar PostgreSQL**

Abre PowerShell y ejecuta:
```powershell
docker ps | findstr postgres
```

**Si no hay salida**, ejecuta:
```powershell
docker start postgres-asilo
```

**Si dice "no existe"**, ejecuta:
```powershell
docker run -d --name postgres-asilo -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=cabeza_algodon_db -p 5432:5432 postgres:14-alpine
```

---

### **PASO 2: Poblar Base de Datos**

```powershell
docker exec -i postgres-asilo psql -U postgres -d cabeza_algodon_db < poblar_bd_completo.sql
```

---

### **PASO 3: Iniciar Backend**

Abre una terminal (PowerShell) en la carpeta del proyecto:
```powershell
cd backend
npm run dev
```

Deberías ver:
```
🚀 Servidor ejecutándose en: http://localhost:5000
✅ Conexión a PostgreSQL establecida correctamente
```

**NO CIERRES ESTA TERMINAL**

---

### **PASO 4: Iniciar Frontend**

Abre OTRA terminal (PowerShell) en la carpeta del proyecto:
```powershell
cd frontend
npm start
```

Deberías ver:
```
Compiled successfully!

Local:            http://localhost:3000
```

El navegador se abrirá automáticamente.

**NO CIERRES ESTA TERMINAL**

---

### **PASO 5: Login**

En el navegador (http://localhost:3000):

```
Email:    ocabrerah99@gmail.com
Password: Admin2025!
```

Presiona "Iniciar Sesión"

---

## 🎉 ¡LISTO!

Deberías ver el Dashboard con:
- ✅ Estadísticas de pacientes
- ✅ Gráficos
- ✅ Menú lateral con todas las opciones

---

## ❌ SOLUCIÓN DE PROBLEMAS

### **Problema: "Puerto 3000 ya está en uso"**

**Solución:**
```powershell
# Cerrar todos los procesos de Node
taskkill /F /IM node.exe

# Reintentar
cd frontend
npm start
```

---

### **Problema: "Puerto 5000 ya está en uso"**

**Solución:**
```powershell
# Cerrar todos los procesos de Node
taskkill /F /IM node.exe

# Reintentar
cd backend
npm run dev
```

---

### **Problema: "Cannot connect to database"**

**Solución:**
```powershell
# Verificar que PostgreSQL está corriendo
docker ps | findstr postgres

# Si no aparece, iniciarlo
docker start postgres-asilo

# Esperar 5 segundos y reintentar el backend
```

---

### **Problema: "Login no funciona"**

**Solución 1: Verificar que el backend responde**
```powershell
curl http://localhost:5000/api/health
```

Debería responder con algo.

**Solución 2: Re-poblar la base de datos**
```powershell
docker exec -i postgres-asilo psql -U postgres -d cabeza_algodon_db < poblar_bd_completo.sql
```

**Solución 3: Verificar credenciales**
```
Email:    ocabrerah99@gmail.com
Password: Admin2025!
```
(¡Copia y pega para evitar errores!)

---

### **Problema: "Cannot find module..."**

**Solución:**
```powershell
# Reinstalar dependencias
npm install
cd backend
npm install
cd ../frontend
npm install
```

---

## 🔄 REINICIAR TODO

Si nada funciona, **REINICIO COMPLETO**:

```powershell
# 1. Cerrar todos los Node
taskkill /F /IM node.exe

# 2. Reiniciar PostgreSQL
docker restart postgres-asilo

# 3. Esperar 5 segundos
Start-Sleep -Seconds 5

# 4. Re-poblar BD
docker exec -i postgres-asilo psql -U postgres -d cabeza_algodon_db < poblar_bd_completo.sql

# 5. Iniciar Backend (nueva terminal)
cd backend
npm run dev

# 6. Iniciar Frontend (otra terminal nueva)
cd frontend
npm start
```

---

## 📞 AYUDA RÁPIDA

### **¿El Backend está corriendo?**
```powershell
curl http://localhost:5000/api/health
```
Si responde = ✅ Backend OK

### **¿PostgreSQL está corriendo?**
```powershell
docker ps | findstr postgres
```
Si aparece "postgres-asilo" = ✅ PostgreSQL OK

### **¿Hay datos en la BD?**
```powershell
docker exec -it postgres-asilo psql -U postgres -d cabeza_algodon_db -c "SELECT COUNT(*) FROM pacientes;"
```
Si muestra "5" = ✅ Datos OK

---

## 🎯 FLUJO COMPLETO (PARA REFERENCIA)

1. PostgreSQL corriendo (Docker)
2. Base de datos creada
3. Datos poblados
4. Backend corriendo (puerto 5000)
5. Frontend corriendo (puerto 3000)
6. Navegador abierto en localhost:3000
7. Login con credenciales
8. ¡Usar el sistema!

---

## 📝 NOTAS IMPORTANTES

- **NO cierres las terminales** del backend y frontend mientras uses el sistema
- Si cierras el navegador, puedes volver a abrir http://localhost:3000
- Para **detener** el sistema: Ctrl+C en cada terminal (backend y frontend)
- Para **reiniciar**: Cierra todo y vuelve a ejecutar `INICIAR_SISTEMA_COMPLETO.bat`

---

## ✅ VERIFICACIÓN RÁPIDA

Después de iniciar, verifica:

1. ✅ Backend responde: http://localhost:5000/api/health
2. ✅ Frontend carga: http://localhost:3000
3. ✅ Login funciona con: ocabrerah99@gmail.com / Admin2025!
4. ✅ Dashboard muestra estadísticas
5. ✅ Menú lateral aparece
6. ✅ Ir a "Pacientes" muestra 5 pacientes

Si todos ✅ = **¡Todo funciona perfecto!**

---

**¿AÚN TIENES PROBLEMAS?**

1. Lee el archivo: `GUIA_INICIO_RAPIDO.md`
2. Revisa: `CHECKLIST_FINAL.md`
3. Consulta: `README.md`

---

**© 2025 Asilo Cabeza de Algodón**  
**Sistema 100% Funcional**

