# ⚡ INSTALACIÓN ULTRA RÁPIDA - Codespaces

## 🎯 Solo Copia y Pega Estos Comandos

### BLOQUE 1: PostgreSQL (2 minutos)

```bash
sudo apt update && sudo apt install -y postgresql postgresql-contrib
sudo service postgresql start
createdb cabeza_algodon_db
psql -l | grep cabeza_algodon_db
```

✅ Deberías ver `cabeza_algodon_db` en la última línea.

---

### BLOQUE 2: Dependencias (5 minutos)

```bash
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

✅ Espera 5-7 minutos. Ignora warnings amarillos.

---

### BLOQUE 3: Configuración Backend (10 segundos)

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

✅ Archivo `.env` creado.

---

### BLOQUE 4: Iniciar Sistema

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

✅ Espera ver: "🚀 Servidor ejecutándose en: http://localhost:5000"

**NO CIERRES ESTA TERMINAL**

---

**Terminal 2 - Frontend:**

Abre nueva terminal (`Ctrl + Shift + ñ`) y ejecuta:

```bash
cd frontend
npm start
```

✅ Espera ver: "Compiled successfully!"

**NO CIERRES ESTA TERMINAL**

---

### BLOQUE 5: Abrir en Navegador

1. Ve al panel **"PORTS"** en VS Code (abajo)
2. Busca el puerto **3000**
3. Click en el icono de **globo 🌐**

---

### BLOQUE 6: Login

```
Email:    ocabrerah99@gmail.com
Password: Admin2025!
```

---

## 🎉 ¡LISTO!

Si ves el Dashboard con gráficos, **¡TODO FUNCIONA!** ✅

---

## 🆘 Si Algo Falla

### Error: "createdb: command not found"
```bash
sudo apt install postgresql-client
createdb cabeza_algodon_db
```

### Error: "role codespace does not exist"
```bash
sudo -u postgres createdb cabeza_algodon_db
```

### Error: Puerto ocupado
```bash
lsof -ti:5000 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

---

## 📝 Comandos de Verificación

```bash
# PostgreSQL corriendo?
sudo service postgresql status

# Base de datos existe?
psql -l | grep cabeza

# Backend responde?
curl http://localhost:5000/api/health
```

---

**Tiempo total: ~8 minutos** ⏱️

**© 2025 O. Cabrera**

