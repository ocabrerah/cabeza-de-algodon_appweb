# ⚡ Inicio Rápido - Asilo Cabeza de Algodón

## Para Codespaces (1 minuto)

```bash
# Ejecutar script de instalación automática
./setup.sh

# Iniciar el sistema
npm run dev
```

¡Eso es todo! El sistema estará disponible en tu puerto 3000.

---

## Credenciales

**Admin:**
- Email: `ocabrerah99@gmail.com`
- Contraseña: `Admin2025!`

---

## URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api

---

## Verificación Rápida

### 1. Verificar Backend
```bash
curl http://localhost:5000/api/health
```
Debe responder: `{"status":"OK"}`

### 2. Verificar Frontend
Abrir http://localhost:3000 - debe mostrar el login

### 3. Verificar Base de Datos
```bash
sudo -u postgres psql -d cabeza_algodon_db -c "SELECT * FROM usuarios WHERE rol='admin';"
```

---

## Comandos Útiles

```bash
# Ver logs del backend
cd backend && npm run dev

# Ver logs del frontend
cd frontend && npm start

# Reiniciar base de datos
sudo -u postgres psql -c "DROP DATABASE cabeza_algodon_db; CREATE DATABASE cabeza_algodon_db;"
```

---

## Troubleshooting

**Puerto ocupado:**
```bash
lsof -ti:5000 | xargs kill -9  # Backend
lsof -ti:3000 | xargs kill -9  # Frontend
```

**PostgreSQL no inicia:**
```bash
sudo service postgresql start
```

**Reinstalar todo:**
```bash
rm -rf node_modules */node_modules
./setup.sh
```

---

## Estructura de Carpetas

```
.
├── backend/          # API Node.js + Express
├── frontend/         # App React
├── setup.sh          # Script de instalación
└── README.md         # Documentación completa
```

---

## Próximos Pasos

1. ✅ Iniciar sesión con las credenciales de admin
2. ✅ Crear usuarios para tu equipo (Usuarios → Nuevo Usuario)
3. ✅ Registrar pacientes (Pacientes → Nuevo Paciente)
4. ✅ Explorar los módulos del sistema

---

## Soporte

📧 Email: ocabrerah99@gmail.com  
👤 Autor: O. Cabrera

---

**© 2025 O. Cabrera - Todos los derechos reservados**

