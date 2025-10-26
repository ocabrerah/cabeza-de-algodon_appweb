# 🚀 GUÍA DE INICIO RÁPIDO

## ✅ SISTEMA RESTAURADO Y POBLADO

El sistema de autenticación ha sido **restaurado** y la base de datos ha sido **poblada con datos completos**.

---

## 🎯 INICIAR EL SISTEMA

### **Windows (Recomendado)**
```cmd
INICIAR_SISTEMA_COMPLETO.bat
```

### **Linux/Mac/Codespaces**
```bash
bash iniciar_sistema_completo.sh
```

El script automáticamente:
1. ✅ Verifica/Inicia PostgreSQL (Docker)
2. ✅ Crea la base de datos si no existe
3. ✅ Pobla la base de datos con datos de prueba
4. ✅ Inicia el Backend (puerto 5000)
5. ✅ Inicia el Frontend (puerto 3000)
6. ✅ Abre el navegador automáticamente

---

## 🔐 CREDENCIALES DE ACCESO

### **Usuario Administrador**
```
Email:    ocabrerah99@gmail.com
Password: Admin2025!
```

### **Otros Usuarios de Prueba**
```
Médico:
  Email:    medico@asilo.com
  Password: Admin2025!

Enfermero:
  Email:    enfermero@asilo.com
  Password: Admin2025!

Farmacia:
  Email:    farmacia@asilo.com
  Password: Admin2025!

Caja:
  Email:    caja@asilo.com
  Password: Admin2025!
```

---

## 📊 DATOS DE PRUEBA INCLUIDOS

La base de datos contiene:

| Módulo | Cantidad | Descripción |
|--------|----------|-------------|
| **Usuarios** | 5 | Admin, Médico, Enfermero, Farmacia, Caja |
| **Pacientes** | 5 | Con datos completos y fichas médicas |
| **Fichas Médicas** | 5 | Peso, altura, diagnóstico, tratamiento |
| **Solicitudes Médicas** | 5 | Diferentes tipos y prioridades |
| **Visitas Médicas** | 3 | Consultas completadas con recetas |
| **Medicamentos** | 8 | Stock completo con precios |
| **Aplicaciones** | 5 | Medicamentos aplicados a pacientes |
| **Pruebas Lab** | 4 | Análisis de sangre e imágenes |
| **Resultados Lab** | 5 | Resultados con interpretación |
| **Movimientos Caja** | 13 | Ingresos, egresos, donaciones |

---

## 🌐 URLs DEL SISTEMA

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **API Health:** http://localhost:5000/api/health

---

## 📱 MÓDULOS DISPONIBLES

### **Para Administrador (ocabrerah99@gmail.com)**
✅ **Dashboard** - Estadísticas y gráficos  
✅ **Pacientes** - Gestión completa de pacientes  
✅ **Solicitudes** - Solicitudes médicas y derivaciones  
✅ **Visitas** - Registro de consultas médicas  
✅ **Farmacia** - Control de medicamentos  
✅ **Caja** - Ingresos, egresos y balance  
✅ **Reportes** - Generación de PDFs y Excel  
✅ **Usuarios** - Gestión de usuarios del sistema  

### **Para Médico**
✅ Dashboard, Pacientes, Solicitudes, Visitas, Reportes

### **Para Enfermero**
✅ Dashboard, Pacientes, Solicitudes, Visitas

### **Para Farmacia**
✅ Dashboard, Farmacia

### **Para Caja**
✅ Dashboard, Caja, Reportes

---

## 🔧 SOLUCIÓN DE PROBLEMAS

### **El frontend no carga**
```bash
# Detener procesos
taskkill /F /IM node.exe

# Reiniciar
cd frontend
npm start
```

### **El backend no responde**
```bash
# Verificar que está corriendo
curl http://localhost:5000/api/health

# Si no responde, reiniciar
cd backend
npm run dev
```

### **PostgreSQL no conecta**
```bash
# Verificar Docker
docker ps | grep postgres

# Reiniciar contenedor
docker restart postgres-asilo
```

### **Volver a poblar la base de datos**
```bash
docker exec -i postgres-asilo psql -U postgres -d cabeza_algodon_db < poblar_bd_completo.sql
```

---

## 📝 FUNCIONALIDADES PRINCIPALES

### **1. Dashboard**
- Estadísticas en tiempo real
- Gráficos de ingresos vs egresos
- Alertas y notificaciones

### **2. Pacientes**
- Registro completo de pacientes
- Fichas médicas detalladas
- Historial clínico

### **3. Solicitudes Médicas**
- Creación de solicitudes
- Asignación de especialistas
- Notificación a familias por email

### **4. Visitas Médicas**
- Registro de consultas
- Recetas médicas
- Órdenes de laboratorio

### **5. Farmacia**
- Control de inventario
- Registro de aplicaciones
- Alertas de stock mínimo

### **6. Caja**
- Registro de ingresos/egresos
- Control de donaciones
- Cuentas pendientes con fundación

### **7. Reportes**
- Reportes en PDF y Excel
- Filtros por fecha
- Múltiples tipos de reportes

### **8. Usuarios**
- Gestión de usuarios
- Roles y permisos
- Activación/Desactivación

---

## ✅ VERIFICAR QUE TODO FUNCIONA

1. Abrir http://localhost:3000
2. Hacer login con: `ocabrerah99@gmail.com` / `Admin2025!`
3. Ver Dashboard con estadísticas
4. Ir a **Pacientes** → Ver 5 pacientes registrados
5. Ir a **Solicitudes** → Ver solicitudes médicas
6. Ir a **Caja** → Ver movimientos financieros
7. Ir a **Farmacia** → Ver medicamentos en stock
8. Ir a **Reportes** → Generar un reporte PDF

---

## 🎉 ¡TODO LISTO!

El sistema está **100% funcional** con:
- ✅ Login/Registro funcionando
- ✅ Base de datos poblada
- ✅ Todas las páginas conectadas
- ✅ Datos de prueba completos
- ✅ Notificaciones por email configuradas
- ✅ Reportes PDF/Excel operativos

---

**© 2025 Asilo Cabeza de Algodón**  
**Desarrollado por O. Cabrera**

