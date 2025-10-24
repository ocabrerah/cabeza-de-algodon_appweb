# Base de Datos - Sistema Asilo Cabeza de Algodón

## Estructura de la Base de Datos

La base de datos `asilo_cabeza_algodon` contiene todas las tablas necesarias para el funcionamiento del sistema.

### Importar Schema

```bash
sudo mysql asilo_cabeza_algodon < schema.sql
```

### Tablas Principales

- `usuarios` - Usuarios del sistema
- `pacientes` - Internos del asilo
- `familiares` - Familiares responsables
- `especialidades` - Especialidades médicas
- `medicos` - Médicos de la fundación
- `solicitudes_medicas` - Solicitudes de atención médica
- `visitas_medicas` - Fichas médicas de consultas
- `examenes_laboratorio` - Exámenes de laboratorio
- `tipos_examenes` - Catálogo de exámenes
- `medicamentos` - Inventario de medicamentos
- `prescripciones` - Recetas médicas
- `cuentas_paciente` - Cuentas por paciente
- `movimientos_cuenta` - Cargos y abonos
- `donaciones` - Donaciones recibidas
- `gastos_operativos` - Gastos del asilo
- `pagos_fundacion` - Pagos a la fundación
- `logs_sistema` - Auditoría del sistema

### Usuario Administrador por Defecto

**Email**: admin@asilocabezaalgodon.com  
**Contraseña**: Admin2025!

**IMPORTANTE**: Cambiar esta contraseña inmediatamente después del primer acceso.

---

**Desarrollado por Omar Cabrera © 2025**

