# 🏥 Asilo de Ancianos - Cabeza de Algodón

Sistema integral de gestión para asilos, desarrollado con React.js, Node.js y PostgreSQL.

---

## 🚀 INICIO RÁPIDO

### **Opción 1: Script Automático (Windows)**
```cmd
INICIAR_SISTEMA_COMPLETO.bat
```

### **Opción 2: Script Automático (Linux/Mac/Codespaces)**
```bash
bash iniciar_sistema_completo.sh
```

### **Opción 3: Manual**

#### Backend
```bash
cd backend
npm run dev
```

#### Frontend (en otra terminal)
```bash
cd frontend
npm start
```

---

## 🔐 CREDENCIALES

```
Email:    ocabrerah99@gmail.com
Password: Admin2025!
```

---

## 📚 DOCUMENTACIÓN

- **[GUIA_INICIO_RAPIDO.md](GUIA_INICIO_RAPIDO.md)** - Inicio rápido completo
- **[DATOS_PRUEBA_RESUMEN.md](DATOS_PRUEBA_RESUMEN.md)** - Resumen de datos de prueba
- **[INSTRUCCIONES_FINALES.md](INSTRUCCIONES_FINALES.md)** - Instrucciones detalladas
- **[GUIA_USUARIO.md](GUIA_USUARIO.md)** - Manual de usuario
- **[RESUMEN_PROYECTO.md](RESUMEN_PROYECTO.md)** - Resumen del proyecto

---

## 📊 DATOS DE PRUEBA

✅ **5 Pacientes** con fichas médicas completas  
✅ **5 Usuarios** (Admin, Médico, Enfermero, Farmacia, Caja)  
✅ **5 Solicitudes** médicas en diferentes estados  
✅ **3 Visitas** médicas completadas  
✅ **8 Medicamentos** en inventario  
✅ **4 Pruebas** de laboratorio  
✅ **13 Movimientos** de caja  

---

## 🎯 CARACTERÍSTICAS

### **Gestión de Pacientes**
- Registro completo de pacientes
- Fichas médicas detalladas
- Historial clínico
- Control de alergias y medicación

### **Solicitudes Médicas**
- Creación y seguimiento de solicitudes
- Asignación de especialistas
- Priorización de urgencias
- Notificación automática a familias

### **Visitas Médicas**
- Registro de consultas
- Recetas médicas
- Órdenes de laboratorio
- Diagnósticos y tratamientos

### **Farmacia**
- Control de inventario
- Registro de aplicaciones
- Alertas de stock mínimo
- Precios regulares y de fundación

### **Laboratorio**
- Solicitud de pruebas
- Registro de resultados
- Interpretación médica
- Historial completo

### **Caja**
- Registro de ingresos/egresos
- Control de donaciones
- Cuotas familiares
- Balance financiero
- Cuentas pendientes con fundación

### **Reportes**
- Reportes en PDF y Excel
- Múltiples tipos de reportes
- Filtros personalizables
- Exportación de datos

### **Usuarios**
- Gestión de usuarios
- Roles y permisos
- Activación/Desactivación
- Validación por email

---

## 🛠️ TECNOLOGÍAS

### **Frontend**
- React.js 18
- React Router v6
- Axios
- React Hot Toast
- Lucide React (iconos)
- Recharts (gráficos)

### **Backend**
- Node.js
- Express.js
- Sequelize ORM
- JWT Authentication
- Bcrypt
- Nodemailer

### **Base de Datos**
- PostgreSQL 14
- Docker

---

## 📦 INSTALACIÓN

### Requisitos
- Node.js 18+
- Docker (para PostgreSQL)
- npm o yarn

### Pasos

1. **Clonar repositorio**
```bash
git clone [URL_REPOSITORIO]
cd cabeza-de-algodon_appweb
```

2. **Instalar dependencias**
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env en backend/
cp backend/.env.example backend/.env
```

4. **Iniciar PostgreSQL**
```bash
docker run -d --name postgres-asilo \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=cabeza_algodon_db \
  -p 5432:5432 \
  postgres:14-alpine
```

5. **Poblar base de datos**
```bash
docker exec -i postgres-asilo psql -U postgres -d cabeza_algodon_db < poblar_bd_completo.sql
```

6. **Iniciar aplicación**
```bash
# Backend (terminal 1)
cd backend && npm run dev

# Frontend (terminal 2)
cd frontend && npm start
```

7. **Acceder**
```
http://localhost:3000
```

---

## 🌐 URLs

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **API Docs:** http://localhost:5000/api/health

---

## 👥 ROLES DE USUARIO

| Rol | Permisos |
|-----|----------|
| **Admin** | Acceso completo a todos los módulos |
| **Médico** | Dashboard, Pacientes, Solicitudes, Visitas, Reportes |
| **Enfermero** | Dashboard, Pacientes, Solicitudes, Visitas |
| **Farmacia** | Dashboard, Farmacia |
| **Caja** | Dashboard, Caja, Reportes |

---

## 📝 ESTRUCTURA DEL PROYECTO

```
cabeza-de-algodon_appweb/
├── backend/
│   ├── config/         # Configuración (BD, email)
│   ├── controllers/    # Lógica de negocio
│   ├── middleware/     # Autenticación, validación
│   ├── models/         # Modelos de BD (Sequelize)
│   ├── routes/         # Rutas de API
│   ├── utils/          # Utilidades (email, reportes)
│   └── server.js       # Punto de entrada
├── frontend/
│   ├── public/         # Archivos estáticos
│   └── src/
│       ├── components/ # Componentes reutilizables
│       ├── contexts/   # Contextos de React
│       ├── pages/      # Páginas de la aplicación
│       ├── services/   # Servicios de API
│       └── App.js      # Componente principal
├── poblar_bd_completo.sql    # Script de datos de prueba
└── INICIAR_SISTEMA_COMPLETO.bat  # Script de inicio
```

---

## 🔒 SEGURIDAD

- ✅ Autenticación JWT
- ✅ Encriptación de contraseñas (Bcrypt)
- ✅ Validación de datos
- ✅ Protección de rutas
- ✅ CORS configurado
- ✅ Variables de entorno

---

## 📧 NOTIFICACIONES

El sistema envía notificaciones por email en:
- ✅ Registro de nuevo usuario
- ✅ Nuevas solicitudes médicas (a familias)
- ✅ Cambios de estado en solicitudes
- ✅ Recordatorios de citas

---

## 🐛 SOLUCIÓN DE PROBLEMAS

Ver [GUIA_INICIO_RAPIDO.md](GUIA_INICIO_RAPIDO.md) sección "Solución de Problemas"

---

## 📄 LICENCIA

© 2025 Asilo Cabeza de Algodón. Todos los derechos reservados.

---

## 👨‍💻 DESARROLLADO POR

**Omar Cabrera**  
Email: ocabrerah99@gmail.com

---

## 🎉 ESTADO DEL PROYECTO

✅ **100% Funcional**
- Login/Registro ✅
- Base de datos poblada ✅
- Todas las páginas conectadas ✅
- Datos de prueba completos ✅
- Notificaciones por email ✅
- Reportes PDF/Excel ✅

---

**¿Preguntas? Consulta la documentación en la carpeta del proyecto.**
