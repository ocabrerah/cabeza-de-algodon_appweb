# 📚 Guía de Usuario - Asilo Cabeza de Algodón

## 🎯 Introducción

Bienvenido al Sistema de Gestión del Asilo Cabeza de Algodón. Este sistema le permitirá gestionar de manera eficiente todas las operaciones del asilo.

---

## 🔐 Inicio de Sesión

### Credenciales de Administrador
- **Email**: ocabrerah99@gmail.com
- **Contraseña**: Admin2025!

### Primer Ingreso
1. Abrir http://localhost:3000
2. Ingresar credenciales
3. Hacer clic en "Iniciar Sesión"
4. Se recomienda cambiar la contraseña después del primer acceso

---

## 🏠 Dashboard

El Dashboard muestra una vista general del sistema:
- **Pacientes Activos**: Total de pacientes en el asilo
- **Solicitudes Pendientes**: Solicitudes médicas por asignar
- **Visitas Hoy**: Consultas programadas para hoy
- **Balance**: Estado financiero actual

### Gráficos
- Ingresos vs Egresos de los últimos 6 meses
- Tendencias mensuales

---

## 👥 Gestión de Pacientes

### Registrar un Nuevo Paciente

1. Ir a **Pacientes** en el menú
2. Clic en **Nuevo Paciente**
3. Completar los siguientes datos:

**Información Personal:**
- Nombre completo
- DPI
- Fecha de nacimiento
- Tipo de sangre
- Sexo
- Teléfono y dirección

**Información del Familiar:**
- Nombre del familiar responsable
- Teléfono y email (importante para notificaciones)
- Parentesco

**Información Médica:**
- Fecha de ingreso al asilo
- Motivo de reclusión
- Psicopatología (si aplica)
- Medicamentos de cajón
- Alergias
- Antecedentes médicos

4. Clic en **Guardar**

### Buscar Pacientes
- Usar la barra de búsqueda
- Filtrar por nombre o DPI

### Ver Ficha del Paciente
- Clic en el ícono de ojo 👁️
- Ver historial completo de visitas
- Ver información médica detallada

### Editar Paciente
- Clic en el ícono de lápiz ✏️
- Modificar información
- Guardar cambios

---

## 📋 Solicitudes Médicas

### Crear una Solicitud

1. Ir a **Solicitudes** en el menú
2. Clic en **Nueva Solicitud**
3. Completar:
   - Seleccionar paciente
   - Motivo de la consulta
   - Especialidad requerida (ej: Cardiología, Geriatría)
   - Prioridad (Baja, Media, Alta, Urgente)
   - Enfermero que acompañará
4. Guardar

**Nota**: Se enviará un email automático al familiar informando sobre la solicitud.

### Estados de Solicitudes
- **Pendiente**: Creada, esperando asignación
- **Asignada**: Fecha y médico asignados
- **Completada**: Visita realizada
- **Cancelada**: Solicitud cancelada

---

## 🏥 Visitas Médicas

### Ver Visitas
- Lista de todas las visitas médicas
- Filtrar por fecha, paciente o estado

### Información de una Visita
- Fecha y hora
- Paciente atendido
- Médico tratante y especialidad
- Motivo de la visita
- Diagnóstico
- Exámenes solicitados
- Medicamentos prescritos
- Costo de la consulta

---

## 💊 Módulo de Farmacia

### Gestión de Medicamentos

1. Ver lista de medicamentos prescritos
2. Filtrar por estado:
   - **Prescrito**: Recién ordenado
   - **Despachado**: Entregado al paciente
   - **Completado**: Tratamiento finalizado

### Despachar Medicamento
1. Encontrar el medicamento en la lista
2. Clic en **Despachar**
3. Se registrará la fecha de despacho

---

## 🧪 Laboratorio

### Gestión de Exámenes

1. Ver exámenes solicitados
2. Estados:
   - **Solicitado**: Pendiente de realizar
   - **En Proceso**: Realizándose
   - **Completado**: Resultados listos

### Ingresar Resultados
1. Seleccionar examen
2. Ingresar resultados
3. Adjuntar archivo (opcional)
4. Guardar

---

## 💰 Módulo de Caja

### Ver Resumen Financiero
- **Ingresos totales**: Donaciones + cuotas
- **Egresos totales**: Gastos operativos
- **Balance**: Diferencia entre ingresos y egresos

### Registrar Transacción

**Ingreso:**
1. Clic en **Nueva Transacción**
2. Tipo: Ingreso
3. Categoría: Donación / Cuota Mensual
4. Monto y descripción
5. Método de pago
6. Guardar

**Egreso:**
1. Tipo: Egreso
2. Categoría: Servicios / Otros
3. Completar detalles
4. Guardar

### Cuentas por Paciente
- Ver cuentas mensuales de cada paciente
- Incluye: cuota mensual + gastos médicos
- Registrar pagos
- Ver saldo pendiente

---

## 📊 Reportes

### Tipos de Reportes Disponibles

1. **Costos por Paciente**
   - Detalle de todos los gastos médicos
   - Incluye consultas, exámenes y medicamentos

2. **Ficha Médica**
   - Historial completo del paciente
   - Antecedentes y tratamientos

3. **Cobros por Paciente**
   - Reporte de cobros en un período
   - Filtrable por fechas

4. **Pagos a Fundación**
   - Resumen de pagos realizados

5. **Entradas y Donaciones**
   - Reporte de ingresos

6. **Exámenes Médicos**
   - Historial de exámenes por paciente

7. **Medicamentos Aplicados**
   - Registro de medicamentos dispensados

### Generar un Reporte

1. Ir a **Reportes**
2. Seleccionar filtros:
   - Fecha inicio / fin
   - Formato (PDF, Excel, Word)
3. Clic en **Generar** en el reporte deseado
4. El archivo se descargará automáticamente

---

## 👤 Gestión de Usuarios (Solo Admin)

### Crear Nuevo Usuario

1. Ir a **Usuarios** en el menú
2. Clic en **Nuevo Usuario**
3. Completar:
   - Nombre completo
   - Email (será el usuario para login)
   - Contraseña temporal
   - Rol:
     - **Admin**: Acceso total
     - **Médico**: Solicitudes, visitas, reportes
     - **Enfermero**: Pacientes, solicitudes
     - **Farmacia**: Módulo de farmacia
     - **Laboratorio**: Módulo de laboratorio
     - **Caja**: Módulo financiero
   - Teléfono
   - Especialidad (solo para médicos)
4. Guardar

**Nota**: Se envía un email automático al usuario con sus credenciales.

### Editar Usuario
- Cambiar información
- Activar/Desactivar usuario
- Cambiar rol

### Resetear Contraseña
- Opción disponible para administradores
- Genera nueva contraseña temporal

---

## 🔧 Mi Perfil

### Editar Mi Información

1. Ir a **Mi Perfil** (ícono de usuario en la esquina superior derecha)
2. Clic en **Editar Perfil**
3. Modificar:
   - Nombre
   - Teléfono
   - Especialidad (si es médico)
   - Foto de perfil
4. **Cambiar Foto**: Clic en el ícono de cámara
5. Guardar cambios

### Cambiar Contraseña
- Opción en Mi Perfil
- Ingresar contraseña actual
- Ingresar nueva contraseña
- Confirmar

---

## 📧 Notificaciones por Email

El sistema envía emails automáticamente en los siguientes casos:

1. **Bienvenida de nuevo usuario**
   - Se envía al crear una cuenta
   - Incluye credenciales de acceso

2. **Solicitud médica creada**
   - Se notifica al familiar del paciente
   - Incluye detalles de la referencia

---

## 💡 Consejos y Mejores Prácticas

### Para Administradores
- ✅ Crear usuarios con roles específicos
- ✅ Revisar reportes mensualmente
- ✅ Mantener actualizada la información de contacto
- ✅ Hacer respaldos periódicos de la información

### Para Médicos
- ✅ Completar diagnósticos detallados
- ✅ Registrar todos los medicamentos prescritos
- ✅ Solicitar exámenes cuando sea necesario
- ✅ Revisar la ficha médica antes de cada consulta

### Para Personal de Caja
- ✅ Registrar todas las transacciones diariamente
- ✅ Conciliar cuentas al final del mes
- ✅ Mantener actualizado el estado de pagos
- ✅ Generar reportes para auditoría

---

## 🆘 Solución de Problemas

### No puedo iniciar sesión
- Verificar email y contraseña
- Asegurar que el usuario esté activo
- Contactar al administrador

### No veo ciertos módulos
- Verificar que tu rol tenga permisos
- Contactar al administrador

### Error al guardar datos
- Verificar que todos los campos requeridos estén completos
- Verificar conexión a internet
- Recargar la página

### No llegan los emails
- Verificar configuración de email en el sistema
- Revisar carpeta de spam
- Contactar al administrador

---

## 📞 Soporte Técnico

Para asistencia técnica o reportar problemas:

**Email**: ocabrerah99@gmail.com  
**Desarrollador**: O. Cabrera

---

## 📄 Notas Importantes

- ⚠️ No compartir credenciales de acceso
- ⚠️ Cerrar sesión al terminar de usar el sistema
- ⚠️ La información médica es confidencial
- ⚠️ Hacer respaldos regularmente

---

**© 2025 O. Cabrera - Todos los derechos reservados**

Este sistema fue desarrollado específicamente para el Asilo Cabeza de Algodón con el objetivo de mejorar la atención y gestión de nuestros adultos mayores. 💙

