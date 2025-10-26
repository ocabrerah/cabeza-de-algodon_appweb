# ⚡ CODESPACES - Referencia Rápida

## 🚀 Instalación en 3 Comandos

```bash
# 1. Instalar PostgreSQL y crear DB
sudo apt update && sudo apt install -y postgresql postgresql-contrib
sudo service postgresql start
sudo -u postgres psql -c "CREATE DATABASE cabeza_algodon_db; ALTER USER postgres PASSWORD 'postgres';"

# 2. Instalar dependencias (elegir una opción)
./setup.sh                    # Opción A: Automático
# O
npm run install-all           # Opción B: Manual

# 3. Iniciar el sistema
npm run dev
```

**¡Eso es todo!** Abre el puerto 3000 en tu navegador.

---

## 🔑 Credenciales

```
Email:    ocabrerah99@gmail.com
Password: Admin2025!
```

---

## 📍 URLs

```
Frontend: http://localhost:3000
Backend:  http://localhost:5000
API Test: http://localhost:5000/api/health
```

---

## 🔧 Comandos Útiles

```bash
# Ver estado de PostgreSQL
sudo service postgresql status

# Reiniciar PostgreSQL
sudo service postgresql restart

# Iniciar backend solo
cd backend && npm run dev

# Iniciar frontend solo
cd frontend && npm start

# Matar procesos
lsof -ti:5000 | xargs kill -9    # Backend
lsof -ti:3000 | xargs kill -9    # Frontend

# Acceder a la base de datos
sudo -u postgres psql -d cabeza_algodon_db

# Reinstalar todo
rm -rf node_modules */node_modules
./setup.sh
```

---

## 🆘 Problemas Comunes

| Problema | Solución |
|----------|----------|
| PostgreSQL no corre | `sudo service postgresql start` |
| Puerto ocupado | `lsof -ti:5000 \| xargs kill -9` |
| Módulos no encontrados | `npm run install-all` |
| DB no existe | `sudo -u postgres psql -c "CREATE DATABASE cabeza_algodon_db;"` |
| No puedo hacer login | Verificar backend esté corriendo |

---

## ✅ Verificación Rápida

```bash
# 1. PostgreSQL está corriendo?
sudo service postgresql status

# 2. Backend responde?
curl http://localhost:5000/api/health

# 3. Puedes acceder al frontend?
# Abre http://localhost:3000 en el navegador
```

---

## 📦 Estructura de Archivos

```
cabeza-de-algodon_appweb/
├── backend/              ← API Node.js
│   ├── server.js        ← Servidor principal
│   ├── models/          ← Modelos de DB
│   └── routes/          ← Rutas API
├── frontend/            ← React App
│   └── src/
│       ├── pages/       ← Páginas
│       └── components/  ← Componentes
├── setup.sh            ← Instalación automática
├── start.sh            ← Inicio rápido
└── TUTORIAL_CODESPACES.md  ← Tutorial completo
```

---

## 🎯 Primeros Pasos

1. ✅ Login con credenciales de admin
2. ✅ Ir a Usuarios → Crear usuario de prueba
3. ✅ Ir a Pacientes → Crear paciente de prueba
4. ✅ Explorar todos los módulos

---

## 📚 Documentación Completa

- **Tutorial Completo**: `TUTORIAL_CODESPACES.md`
- **Guía Rápida**: `QUICK_START.md`
- **Manual Usuario**: `GUIA_USUARIO.md`
- **README**: `README.md`

---

**© 2025 O. Cabrera**

