# Manual de Usuario
## Sistema de Gestión del Asilo de Ancianos "Cabeza de Algodón"

**Desarrollado por: Omar Cabrera**  
**© 2025 - Todos los derechos reservados**

---

## 📋 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Acceso al Sistema](#acceso-al-sistema)
3. [Dashboard Principal](#dashboard-principal)
4. [Gestión de Pacientes](#gestión-de-pacientes)
5. [Solicitudes Médicas](#solicitudes-médicas)
6. [Visitas Médicas](#visitas-médicas)
7. [Laboratorio Clínico](#laboratorio-clínico)
8. [Farmacia](#farmacia)
9. [Caja y Finanzas](#caja-y-finanzas)
10. [Reportes](#reportes)
11. [Gestión de Usuarios](#gestión-de-usuarios)
12. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## 📖 Introducción

Bienvenido al Sistema de Gestión del Asilo de Ancianos "Cabeza de Algodón". Este sistema integral le permite gestionar todas las operaciones del asilo, desde el registro de pacientes hasta la generación de reportes financieros.

### Funcionalidades Principales

- ✅ **Gestión de Pacientes**: Registro y seguimiento completo de internos
- ✅ **Fichas Médicas**: Historial médico detallado de cada paciente
- ✅ **Solicitudes y Visitas**: Coordinación con la fundación médica
- ✅ **Laboratorio**: Gestión de exámenes y resultados
- ✅ **Farmacia**: Control de medicamentos y prescripciones
- ✅ **Finanzas**: Entradas, salidas, donaciones y cobros
- ✅ **Reportes**: Generación de documentos en PDF, Word y Excel
- ✅ **Notificaciones**: Alertas automáticas por correo electrónico

### Roles de Usuario

El sistema cuenta con diferentes roles con permisos específicos:

- **Admin**: Acceso completo a todas las funciones
- **Staff**: Gestión administrativa y financiera
- **Empleado**: Operaciones diarias del asilo
- **Médico**: Atención médica y prescripciones
- **Enfermero**: Apoyo en visitas y solicitudes
- **Laboratorista**: Gestión de exámenes
- **Farmacéutico**: Entrega de medicamentos
- **Fundación**: Asignación de médicos y horarios

---

## 🔐 Acceso al Sistema

### Primer Acceso

1. Abre tu navegador web (Chrome, Firefox, Edge, Safari)
2. Navega a la URL del sistema: `http://localhost:3000` (desarrollo) o la URL de producción
3. Verás la pantalla de **Login**

![Pantalla de Login](login-screen-description)

### Inicio de Sesión

1. Ingresa tu **correo electrónico** registrado
2. Ingresa tu **contraseña**
3. Haz clic en el botón **"Iniciar Sesión"**

**Credenciales de Administrador por Defecto:**
- Email: `admin@asilocabezaalgodon.com`
- Contraseña: `Admin2025!`

⚠️ **IMPORTANTE**: Cambia la contraseña del administrador inmediatamente después del primer acceso.

### Primer Inicio de Sesión

Al iniciar sesión por primera vez, recibirás un correo electrónico de bienvenida con tus credenciales.

### Recuperación de Contraseña

Si olvidaste tu contraseña, contacta al administrador del sistema para que te genere una nueva.

### Cerrar Sesión

Para cerrar sesión:
1. Haz clic en tu nombre en la esquina superior derecha
2. Selecciona **"Cerrar Sesión"** en el menú lateral

---

## 📊 Dashboard Principal

Al iniciar sesión, verás el Dashboard con información general del sistema:

### Tarjetas de Estadísticas

- **Total Pacientes**: Número de pacientes activos en el asilo
- **Solicitudes Pendientes**: Solicitudes médicas esperando asignación
- **Visitas Hoy**: Consultas médicas programadas para hoy
- **Ingresos del Mes**: Total de ingresos del mes actual

### Navegación

El menú lateral izquierdo te permite navegar entre los diferentes módulos del sistema:

- 🏠 **Dashboard**: Vista general
- 👥 **Pacientes**: Gestión de internos
- 📋 **Solicitudes**: Solicitudes médicas
- 🏥 **Visitas Médicas**: Fichas médicas
- 🔬 **Laboratorio**: Exámenes clínicos
- 💊 **Farmacia**: Medicamentos
- 💰 **Caja**: Finanzas
- 📄 **Reportes**: Generación de documentos
- ⚙️ **Usuarios**: Administración (solo Admin)

---

## 👥 Gestión de Pacientes

### Ver Lista de Pacientes

1. Haz clic en **"Pacientes"** en el menú lateral
2. Verás una tabla con todos los pacientes registrados

La tabla muestra:
- **Expediente**: Número único de identificación
- **Nombre**: Nombre completo del paciente
- **Edad**: Edad actual
- **Fecha de Ingreso**: Cuándo ingresó al asilo

### Buscar Pacientes

1. Usa el cuadro de búsqueda en la parte superior
2. Escribe el nombre, apellido o número de expediente
3. Los resultados se filtrarán automáticamente

### Registrar Nuevo Paciente

1. Haz clic en el botón **"+ Nuevo Paciente"**
2. Completa el formulario con la información requerida:

**Información Personal:**
- Nombre y Apellido
- Fecha de Nacimiento
- Género
- Tipo de Sangre
- Dirección y Ciudad
- Teléfono de Emergencia

**Información Médica:**
- Motivo de Ingreso
- Psicopatología (si aplica)
- Medicamentos Regulares
- Alergias
- Observaciones

**Familiar Responsable:**
- Nombre y Apellido
- Relación con el paciente
- Teléfono
- Email
- Dirección
- Cuota Mensual

3. Haz clic en **"Guardar"**

El sistema generará automáticamente un número de expediente único (ej: EXP000001).

### Ver Detalle del Paciente

1. Haz clic en el ícono de **editar** (lápiz) en la fila del paciente
2. Verás toda la información del paciente incluyendo:
   - Datos personales
   - Familiares registrados
   - Estado de cuenta
   - Historial médico

### Editar Información del Paciente

1. En la vista de detalle, haz clic en **"Editar"**
2. Modifica los campos necesarios
3. Haz clic en **"Guardar Cambios"**

---

## 📋 Solicitudes Médicas

Las solicitudes médicas son el primer paso cuando un paciente necesita atención especializada.

### Ver Solicitudes

1. Haz clic en **"Solicitudes"** en el menú lateral
2. Verás una lista de todas las solicitudes con su estado:
   - 🟡 **Pendiente**: Esperando asignación
   - 🔵 **Programada**: Médico y fecha asignados
   - 🟢 **Completada**: Visita realizada
   - 🔴 **Cancelada**: Solicitud cancelada

### Crear Nueva Solicitud

**Rol requerido**: Empleado, Staff, Admin

1. Haz clic en **"+ Nueva Solicitud"**
2. Completa el formulario:
   - **Paciente**: Selecciona el paciente
   - **Especialidad Requerida**: Cardiología, Neurología, Geriatría, etc.
   - **Motivo**: Describe por qué se solicita la consulta
   - **Prioridad**: Baja, Media, Alta, Urgente
   - **Enfermero Asignado**: (opcional) Selecciona quién acompañará

3. Haz clic en **"Crear Solicitud"**

El sistema automáticamente:
- Enviará un correo al familiar responsable
- Notificará a la fundación
- Generará un registro en el historial del paciente

### Asignar Médico y Fecha (Fundación)

**Rol requerido**: Fundación, Admin

1. Abre la solicitud pendiente
2. Haz clic en **"Asignar"**
3. Completa:
   - **Médico**: Selecciona el médico especialista
   - **Fecha y Hora**: Programa la cita
4. Haz clic en **"Confirmar Asignación"**

El sistema notificará al asilo y al familiar sobre la cita programada.

---

## 🏥 Visitas Médicas

Las visitas médicas son las fichas médicas completas de cada consulta.

### Ver Visitas

1. Haz clic en **"Visitas Médicas"** en el menú lateral
2. Verás todas las visitas programadas y completadas

### Crear Visita desde Solicitud

**Rol requerido**: Médico, Admin

1. En la lista de solicitudes, selecciona una con estado "Programada"
2. Haz clic en **"Iniciar Visita"**
3. El sistema creará una nueva visita médica

### Completar Ficha Médica

Durante o después de la consulta, el médico debe completar:

**Información de la Visita:**
- **Fecha y Hora**: Automática
- **Motivo de Visita**: Ya completado desde la solicitud
- **Síntomas**: Describe los síntomas presentados
- **Examen Físico**: Hallazgos del examen físico

**Diagnóstico:**
- **Diagnóstico**: Conclusión médica
- **Observaciones Médicas**: Notas adicionales
- **Tratamiento**: Plan de tratamiento sugerido
- **Próxima Cita**: (opcional) Programar seguimiento

**Acciones Adicionales:**

1. **Solicitar Exámenes de Laboratorio**:
   - Haz clic en **"+ Agregar Examen"**
   - Selecciona el tipo de examen
   - El sistema registrará el costo automáticamente

2. **Prescribir Medicamentos**:
   - Haz clic en **"+ Agregar Medicamento"**
   - Busca el medicamento
   - Especifica dosis, frecuencia y duración
   - Indica cantidad a entregar

3. **Guardar Visita**:
   - Haz clic en **"Guardar y Completar"**
   - La visita quedará registrada en el historial del paciente
   - Los costos se cargarán automáticamente a la cuenta del familiar

### Ver Historial Médico

Para ver todo el historial médico de un paciente:

1. Ve a **Pacientes** → Selecciona un paciente
2. Haz clic en la pestaña **"Historial Médico"**
3. Verás todas las visitas ordenadas por fecha

---

## 🔬 Laboratorio Clínico

### Ver Exámenes Solicitados

**Rol requerido**: Laboratorista, Admin, Médico

1. Haz clic en **"Laboratorio"** en el menú lateral
2. Verás todos los exámenes con su estado:
   - 🟡 **Solicitado**: Pendiente de realizar
   - 🔵 **En Proceso**: Paciente realizó el examen
   - 🟢 **Completado**: Resultados disponibles

### Registrar Realización del Examen

Cuando el paciente llega al laboratorio:

1. Busca el examen solicitado
2. Haz clic en **"Iniciar Examen"**
3. El estado cambia a "En Proceso"

### Registrar Resultados

Una vez que los resultados están listos:

1. Abre el examen en proceso
2. Haz clic en **"Registrar Resultados"**
3. Escribe los resultados del examen
4. (opcional) Sube el archivo PDF del resultado
5. Haz clic en **"Guardar Resultados"**

El sistema:
- Marca el examen como completado
- Notifica al médico tratante
- Carga el costo a la cuenta del paciente

### Tipos de Exámenes Disponibles

- Hemograma Completo
- Glucosa en Sangre
- Perfil Lipídico
- Examen General de Orina
- Creatinina
- Electrolitos
- Perfil Tiroideo
- Perfil Hepático
- Rayos X
- Electrocardiograma
- Y más...

---

## 💊 Farmacia

### Ver Prescripciones

**Rol requerido**: Farmacéutico, Admin, Médico

1. Haz clic en **"Farmacia"** en el menú lateral
2. Verás todas las prescripciones con su estado:
   - 🟡 **Pendiente**: Medicamento no entregado
   - 🟢 **Entregado**: Medicamento ya fue entregado
   - 🔴 **Cancelado**: Prescripción cancelada

### Entregar Medicamento

Cuando el paciente o familiar llega a recoger medicamento:

1. Busca la prescripción pendiente
2. Verifica:
   - Identidad del paciente o familiar
   - Medicamento correcto
   - Cantidad disponible en stock

3. Haz clic en **"Entregar"**
4. Confirma la entrega

El sistema:
- Actualiza el stock del medicamento
- Marca la prescripción como entregada
- Carga el costo a la cuenta del paciente
- Registra quién entregó y cuándo

### Ver Inventario de Medicamentos

1. En el módulo de farmacia, haz clic en **"Inventario"**
2. Verás todos los medicamentos con:
   - Código
   - Nombre
   - Presentación
   - Stock actual
   - Stock mínimo
   - Precio

### Alertas de Stock Bajo

El sistema mostrará una alerta cuando un medicamento esté por debajo del stock mínimo.

---

## 💰 Caja y Finanzas

**Rol requerido**: Admin, Staff

### Panel de Caja

El módulo de Caja te permite gestionar todas las finanzas del asilo.

### Ver Estado de Cuenta de un Paciente

1. Ve a **Caja** → **Cuentas de Pacientes**
2. Busca el paciente
3. Verás:
   - Cuota mensual
   - Saldo pendiente
   - Historial de movimientos (cargos y abonos)

### Registrar Pago

Cuando un familiar realiza un pago:

1. Busca la cuenta del paciente
2. Haz clic en **"Registrar Pago"**
3. Completa:
   - **Monto**: Cantidad pagada
   - **Método de Pago**: Efectivo, Transferencia, Tarjeta, etc.
   - **Concepto**: (opcional) Descripción del pago
   - **Número de Recibo**: (opcional)

4. Haz clic en **"Guardar"**

El saldo pendiente se actualizará automáticamente.

### Registrar Donación

1. Ve a **Caja** → **Donaciones**
2. Haz clic en **"+ Nueva Donación"**
3. Completa el formulario:
   - **Tipo de Donante**: Empresa Internacional, Nacional, Gobierno, Particular
   - **Nombre del Donante**
   - **Identificación**: (opcional) RTN o DNI
   - **Monto**
   - **Fecha**
   - **Método de Pago**
   - **Número de Recibo**
   - **Concepto**: Para qué es la donación
   - **Observaciones**

4. Haz clic en **"Guardar"**

### Registrar Gasto Operativo

Para gastos del asilo (luz, agua, sueldos, etc.):

1. Ve a **Caja** → **Gastos**
2. Haz clic en **"+ Nuevo Gasto"**
3. Completa:
   - **Categoría**: Servicios Básicos, Sueldos, Mantenimiento, etc.
   - **Descripción**: Detalle del gasto
   - **Monto**
   - **Fecha**
   - **Proveedor**: (opcional)
   - **Número de Factura**: (opcional)

4. Haz clic en **"Guardar"**

### Ver Resumen Financiero

1. Ve a **Caja** → **Resumen**
2. Selecciona el rango de fechas
3. Verás:
   - Total de donaciones
   - Total de cobros a familiares
   - Total de gastos operativos
   - Saldo pendiente de cobro
   - Balance general (ingresos - gastos)

---

## 📄 Reportes

El módulo de reportes te permite generar documentos en diferentes formatos.

### Tipos de Reportes Disponibles

1. **Costos por Cita de Paciente**
   - Detalle de consultas, exámenes y medicamentos por visita
   - Incluye costos individuales y totales

2. **Ficha Médica de Paciente**
   - Información completa del paciente
   - Motivo de ingreso y psicopatología
   - Historial médico completo

3. **Cobros por Paciente**
   - Estado de cuenta detallado
   - Cargos y abonos por rango de fechas
   - Saldo pendiente

4. **Pagos a la Fundación**
   - Total adeudado por servicios médicos
   - Desglose por consultas, laboratorio y medicamentos

5. **Entradas (Donaciones y Cobros)**
   - Todas las entradas de dinero
   - Por tipo de donante y por fecha

6. **Exámenes Médicos por Paciente**
   - Todos los exámenes realizados
   - Con resultados y fechas

7. **Medicamentos Aplicados por Paciente**
   - Historial de prescripciones
   - Dosis y duración de tratamientos

### Generar un Reporte

1. Ve a **Reportes**
2. Selecciona el tipo de reporte
3. Completa los filtros:
   - **Paciente**: (si aplica)
   - **Fecha Inicio** y **Fecha Fin**: Para reportes por período
   - **Otros filtros** según el tipo de reporte

4. Selecciona el formato:
   - 📄 **PDF**: Para impresión y archivo
   - 📊 **Excel**: Para análisis de datos
   - 📝 **Word**: Para edición posterior

5. Haz clic en **"Generar Reporte"**

El archivo se descargará automáticamente.

### Ejemplos de Uso

**Caso 1: Familiar solicita estado de cuenta**
1. Generar reporte "Cobros por Paciente"
2. Seleccionar el paciente
3. Seleccionar rango de fechas del mes
4. Formato: PDF
5. Entregar al familiar

**Caso 2: Análisis financiero mensual**
1. Generar reporte "Entradas (Donaciones y Cobros)"
2. Seleccionar el mes
3. Formato: Excel
4. Analizar en Microsoft Excel o Google Sheets

---

## ⚙️ Gestión de Usuarios

**Rol requerido**: Solo Administrador

### Ver Usuarios

1. Haz clic en **"Usuarios"** en el menú lateral
2. Verás todos los usuarios del sistema con:
   - Nombre completo
   - Email
   - Rol
   - Estado (Activo/Inactivo)
   - Fecha de creación

### Registrar Nuevo Usuario

1. Haz clic en **"+ Nuevo Usuario"**
2. Completa el formulario:
   - **Nombre y Apellido**
   - **Email**: Será el usuario de inicio de sesión
   - **Contraseña Temporal**: El usuario la cambiará en el primer acceso
   - **Rol**: Selecciona el rol apropiado
   - **Teléfono**: (opcional)

3. Haz clic en **"Registrar"**

El sistema enviará automáticamente un correo de bienvenida al usuario con sus credenciales.

### Roles y Permisos

| Rol | Permisos |
|-----|----------|
| **Admin** | Acceso total a todo el sistema |
| **Staff** | Pacientes, Caja, Reportes |
| **Empleado** | Pacientes, Solicitudes básicas |
| **Médico** | Visitas, Laboratorio, Farmacia |
| **Enfermero** | Pacientes, Solicitudes, Visitas (vista) |
| **Laboratorista** | Solo Laboratorio |
| **Farmacéutico** | Solo Farmacia |
| **Fundación** | Solicitudes (asignación) |

### Desactivar Usuario

Para desactivar un usuario (sin eliminarlo):

1. Busca el usuario en la lista
2. Haz clic en **"Editar"**
3. Cambia el estado a **"Inactivo"**
4. Haz clic en **"Guardar"**

El usuario no podrá iniciar sesión pero su información se conserva.

### Cambiar Contraseña de Usuario

Si un usuario olvida su contraseña:

1. Edita el usuario
2. Ingresa una nueva contraseña temporal
3. Notifica al usuario por otro medio
4. El usuario debe cambiarla en el primer inicio de sesión

---

## ❓ Preguntas Frecuentes

### ¿Cómo cambio mi contraseña?

1. Haz clic en tu nombre en la barra superior
2. Selecciona **"Cambiar Contraseña"**
3. Ingresa tu contraseña actual
4. Ingresa la nueva contraseña (mínimo 6 caracteres)
5. Confirma la nueva contraseña
6. Haz clic en **"Guardar"**

### ¿Qué hago si olvidé mi contraseña?

Contacta al administrador del sistema para que te genere una contraseña temporal.

### ¿Por qué no puedo ver ciertos módulos?

Los módulos visibles dependen de tu rol. Habla con el administrador si necesitas acceso a funcionalidades adicionales.

### ¿Se pueden borrar pacientes?

No se eliminan físicamente de la base de datos. Se marcan como "inactivos" para mantener el historial.

### ¿Cómo funciona el sistema de notificaciones?

El sistema envía correos automáticos cuando:
- Se crea una solicitud médica (al familiar)
- Se asigna una cita (al asilo y familiar)
- Un usuario nuevo es registrado (al usuario)
- (Puedes configurar más notificaciones según necesites)

### ¿Puedo acceder desde mi teléfono?

Sí, el sistema es responsive y se adapta a dispositivos móviles.

### ¿Los reportes se guardan?

Los reportes se generan en el momento. Puedes descargarlos y guardarlos en tu computadora.

### ¿Qué navegador debo usar?

El sistema funciona en todos los navegadores modernos: Chrome, Firefox, Edge, Safari.

### ¿Hay límite de usuarios?

No hay límite técnico. Puedes registrar tantos usuarios como necesites.

### ¿Se puede personalizar el logo del asilo?

Sí, el administrador puede cambiar el logo en la configuración del sistema (requiere acceso al código).

---

## 📞 Soporte Técnico

Si tienes problemas técnicos:

1. **Problemas de Inicio de Sesión**:
   - Verifica tu email y contraseña
   - Verifica que tu cuenta esté activa
   - Contacta al administrador

2. **Errores del Sistema**:
   - Recarga la página (F5)
   - Cierra y vuelve a iniciar sesión
   - Limpia el caché del navegador
   - Contacta al administrador con detalles del error

3. **Preguntas sobre Funcionalidades**:
   - Consulta este manual
   - Contacta al administrador del sistema

---

## ✅ Mejores Prácticas

1. **Seguridad**:
   - Nunca compartas tu contraseña
   - Cierra sesión cuando termines
   - Usa contraseñas seguras

2. **Registro de Datos**:
   - Completa toda la información requerida
   - Verifica antes de guardar
   - Mantén actualizada la información de contacto

3. **Fichas Médicas**:
   - Sé detallado en observaciones y diagnósticos
   - Registra las visitas el mismo día
   - Revisa el historial antes de una consulta

4. **Finanzas**:
   - Registra pagos inmediatamente
   - Conserva los recibos físicos
   - Revisa el resumen mensualmente

---

**¡Gracias por usar el Sistema de Gestión del Asilo de Ancianos "Cabeza de Algodón"!**

**Desarrollado con ❤️ por Omar Cabrera**  
**© 2025 - Todos los derechos reservados**

