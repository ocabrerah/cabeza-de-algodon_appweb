# Backend - Sistema Asilo Cabeza de Algodón

API REST desarrollada con Node.js y Express.

## Tecnologías Utilizadas

- **Node.js** + **Express**
- **MySQL2** - Base de datos
- **JWT** - Autenticación
- **Bcrypt** - Encriptación de contraseñas
- **Nodemailer** - Envío de correos
- **PDFKit** - Generación de PDFs
- **ExcelJS** - Generación de Excel
- **Docx** - Generación de Word
- **Helmet** - Seguridad
- **Express Validator** - Validación

## Instalación

```bash
npm install
```

## Configuración

1. Copia `.env.example` a `.env`
2. Configura las variables de entorno
3. Asegúrate de que MySQL esté corriendo
4. Importa el schema de la base de datos

## Ejecución en Desarrollo

```bash
npm run dev
```

El backend se ejecutará en `http://localhost:5000`

## Ejecución en Producción

```bash
npm start
```

## Estructura de la API

```
/api/
├── /auth          # Autenticación
├── /users         # Usuarios
├── /pacientes     # Pacientes
├── /solicitudes   # Solicitudes médicas
├── /visitas       # Visitas médicas
├── /laboratorio   # Laboratorio
├── /farmacia      # Farmacia
├── /caja          # Finanzas
├── /donaciones    # Donaciones
└── /reportes      # Reportes
```

## Endpoints Principales

### Autenticación

- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/change-password` - Cambiar contraseña
- `GET /api/auth/profile` - Obtener perfil

### Pacientes

- `GET /api/pacientes` - Listar pacientes
- `POST /api/pacientes` - Crear paciente
- `GET /api/pacientes/:id` - Obtener paciente
- `PUT /api/pacientes/:id` - Actualizar paciente

### Solicitudes

- `GET /api/solicitudes` - Listar solicitudes
- `POST /api/solicitudes` - Crear solicitud
- `PUT /api/solicitudes/:id/asignar` - Asignar médico

### Visitas Médicas

- `GET /api/visitas` - Listar visitas
- `POST /api/visitas/from-solicitud` - Crear desde solicitud
- `PUT /api/visitas/:id` - Actualizar visita
- `GET /api/visitas/historial/:paciente_id` - Historial

### Reportes

- `GET /api/reportes/costos-cita?paciente_id=X&formato=pdf`
- `GET /api/reportes/ficha-medica?paciente_id=X&formato=excel`
- `GET /api/reportes/entradas?fecha_inicio=X&fecha_fin=Y&formato=word`

## Seguridad

- Autenticación JWT
- Encriptación de contraseñas con bcrypt
- Validación de datos
- Rate limiting
- Helmet para headers de seguridad
- Roles y permisos

---

**Desarrollado por Omar Cabrera © 2025**

