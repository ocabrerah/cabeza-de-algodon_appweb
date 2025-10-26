# 📊 INSTALACIÓN VISUAL - Paso a Paso

## 🗺️ Mapa del Proceso

```
┌─────────────────────────────────────────────────────────────┐
│  PASO 1: Crear Codespace en GitHub                         │
│  ⏱️  2-3 minutos                                             │
│  ✅ Se abre VS Code en el navegador                         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  PASO 2: Instalar PostgreSQL                               │
│  ⏱️  1-2 minutos                                             │
│  📝 sudo apt install -y postgresql                          │
│  ✅ PostgreSQL instalado                                    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  PASO 3: Iniciar PostgreSQL                                │
│  ⏱️  10 segundos                                             │
│  📝 sudo service postgresql start                           │
│  ✅ PostgreSQL corriendo                                    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  PASO 4: Crear Base de Datos (SIN CONTRASEÑA)              │
│  ⏱️  5 segundos                                              │
│  📝 createdb cabeza_algodon_db                              │
│  ✅ Base de datos creada                                    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  PASO 5: Instalar Dependencias                             │
│  ⏱️  5-7 minutos                                             │
│  📝 npm install (raíz, backend, frontend)                   │
│  ✅ 3 package.json instalados                               │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  PASO 6: Configurar Backend                                │
│  ⏱️  10 segundos                                             │
│  📝 Crear archivo .env                                      │
│  ✅ Variables de entorno configuradas                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  PASO 7: Iniciar Backend                                   │
│  ⏱️  30 segundos                                             │
│  📝 cd backend && npm run dev                               │
│  ✅ API corriendo en puerto 5000                            │
│  ✅ Tablas creadas automáticamente                          │
│  ✅ Usuario admin creado                                    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  PASO 8: Iniciar Frontend                                  │
│  ⏱️  1-2 minutos                                             │
│  📝 cd frontend && npm start                                │
│  ✅ React app corriendo en puerto 3000                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  PASO 9: Abrir en Navegador                                │
│  ⏱️  10 segundos                                             │
│  🌐 Click en puerto 3000 → Open in Browser                  │
│  ✅ Página de login visible                                 │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  PASO 10: Login                                            │
│  ⏱️  5 segundos                                              │
│  📝 ocabrerah99@gmail.com / Admin2025!                      │
│  ✅ Dashboard con gráficos                                  │
└─────────────────────────────────────────────────────────────┘
                            ↓
                    🎉 ¡SISTEMA FUNCIONANDO!
```

---

## ⏱️ Tiempo Total Estimado

| Paso | Descripción | Tiempo |
|------|-------------|--------|
| 1 | Crear Codespace | 2-3 min |
| 2 | Instalar PostgreSQL | 1-2 min |
| 3 | Iniciar PostgreSQL | 10 seg |
| 4 | Crear Base de Datos | 5 seg |
| 5 | Instalar Dependencias | 5-7 min |
| 6 | Configurar Backend | 10 seg |
| 7 | Iniciar Backend | 30 seg |
| 8 | Iniciar Frontend | 1-2 min |
| 9 | Abrir Navegador | 10 seg |
| 10 | Login | 5 seg |
| **TOTAL** | | **~10-15 min** |

---

## 🔄 Estados del Sistema

### ❌ Estado Inicial (Sin instalar)
```
PostgreSQL:  ❌ No instalado
Base de Datos: ❌ No existe
Dependencias: ❌ No instaladas
Backend:      ❌ No corriendo
Frontend:     ❌ No corriendo
```

### ⚙️ Durante la Instalación
```
PostgreSQL:  ✅ Instalando...
Base de Datos: ⏳ Creando...
Dependencias: ⏳ Instalando...
Backend:      ❌ No iniciado
Frontend:     ❌ No iniciado
```

### ✅ Sistema Funcionando
```
PostgreSQL:  ✅ Corriendo (puerto 5432)
Base de Datos: ✅ cabeza_algodon_db (8 tablas)
Dependencias: ✅ Instaladas (backend + frontend)
Backend:      ✅ Corriendo (puerto 5000)
Frontend:     ✅ Corriendo (puerto 3000)
Usuario Admin: ✅ Creado
```

---

## 🎯 Comandos por Paso

### Paso 1: No requiere comandos (interfaz GitHub)

### Paso 2-4: PostgreSQL
```bash
sudo apt update && sudo apt install -y postgresql postgresql-contrib
sudo service postgresql start
createdb cabeza_algodon_db
```

### Paso 5: Dependencias
```bash
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

### Paso 6: Configuración
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

### Paso 7-8: Iniciar
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm start
```

---

## 📊 Qué Esperar en Cada Paso

### PASO 2: Instalación PostgreSQL
```
Leyendo lista de paquetes... Hecho
Construyendo árbol de dependencias... Hecho
Los siguientes paquetes se instalarán:
  postgresql postgresql-contrib
...
[muchas líneas más]
...
Configurando postgresql...
```

### PASO 3: Iniciar PostgreSQL
```
* Starting PostgreSQL 14 database server
```

### PASO 4: Crear Base de Datos
```
[Sin salida = éxito]
```
Luego verificar:
```
         Name          | Owner | Encoding
-----------------------+-------+----------
 cabeza_algodon_db     | ...   | UTF8
```

### PASO 5: Dependencias
```
npm WARN deprecated ...
added 1523 packages in 45s
...
```

### PASO 7: Backend Iniciado
```
✅ Conexión a PostgreSQL establecida correctamente
✅ Modelos sincronizados con la base de datos
✅ Usuario administrador creado
📧 Email: ocabrerah99@gmail.com
🔑 Contraseña: Admin2025!
═══════════════════════════════════════════════════════
🏥  ASILO CABEZA DE ALGODÓN - BACKEND
═══════════════════════════════════════════════════════
🚀 Servidor ejecutándose en: http://localhost:5000
```

### PASO 8: Frontend Iniciado
```
Compiled successfully!

You can now view cabeza-de-algodon-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://172.16.5.4:3000

webpack compiled with 0 errors
```

---

## 🔍 Verificaciones en Cada Paso

| Paso | Comando de Verificación | Resultado Esperado |
|------|------------------------|-------------------|
| 2 | `which psql` | `/usr/bin/psql` |
| 3 | `sudo service postgresql status` | `online` |
| 4 | `psql -l \| grep cabeza` | `cabeza_algodon_db` |
| 5 | `ls node_modules \| wc -l` | `> 100` |
| 6 | `cat backend/.env` | Ver variables |
| 7 | `curl localhost:5000/api/health` | `{"status":"OK"}` |
| 8 | `curl localhost:3000` | HTML de React |

---

## 🆘 Puntos Críticos

### ⚠️ CRÍTICO 1: PostgreSQL debe estar corriendo
```bash
sudo service postgresql status
```
Si no está: `sudo service postgresql start`

### ⚠️ CRÍTICO 2: Base de datos debe existir
```bash
psql -l | grep cabeza
```
Si no existe: `createdb cabeza_algodon_db`

### ⚠️ CRÍTICO 3: Archivo .env debe existir
```bash
ls -la backend/.env
```
Si no existe: Ejecutar el comando del PASO 6

### ⚠️ CRÍTICO 4: Backend debe crear tablas
Ver en los logs: "✅ Modelos sincronizados"

Si no aparece, hay problema de conexión a la DB.

### ⚠️ CRÍTICO 5: Usuario admin debe crearse
Ver en los logs: "✅ Usuario administrador creado"

Si no aparece, detener backend y reiniciar.

---

## 🎯 Checklist Visual

Marca con ✅ cuando completes cada uno:

```
[ ] 1. Codespace abierto
[ ] 2. PostgreSQL instalado
[ ] 3. PostgreSQL iniciado
[ ] 4. Base de datos creada
[ ] 5. Verificada la DB
[ ] 6. Dependencias instaladas
[ ] 7. Archivo .env creado
[ ] 8. Backend iniciado
[ ] 9. Veo logs del backend
[ ] 10. Frontend iniciado
[ ] 11. Veo logs del frontend
[ ] 12. Puerto 3000 visible
[ ] 13. Página login cargada
[ ] 14. Login exitoso
[ ] 15. Dashboard visible
```

Si marcaste todo ✅: **¡PERFECTO!**

---

## 📱 Próximos Pasos

Una vez funcionando:

```
1. Crear Usuarios
   ↓
2. Registrar Pacientes
   ↓
3. Crear Solicitudes
   ↓
4. Registrar Visitas
   ↓
5. Generar Reportes
```

---

**© 2025 O. Cabrera**

**Sigue esta guía visual y tendrás el sistema funcionando en ~10 minutos** 🚀

