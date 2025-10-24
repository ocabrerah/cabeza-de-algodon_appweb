/**
 * Servidor Principal - Sistema Asilo de Ancianos "Cabeza de Algodón"
 * 
 * @author Omar Cabrera
 * @copyright 2025 - Todos los derechos reservados
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
require('dotenv').config();

const { testConnection } = require('./config/database');

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const pacienteRoutes = require('./routes/paciente.routes');
const fichaMedicaRoutes = require('./routes/fichaMedica.routes');
const solicitudRoutes = require('./routes/solicitud.routes');
const visitaRoutes = require('./routes/visita.routes');
const laboratorioRoutes = require('./routes/laboratorio.routes');
const farmaciaRoutes = require('./routes/farmacia.routes');
const cajaRoutes = require('./routes/caja.routes');
const donacionRoutes = require('./routes/donacion.routes');
const reporteRoutes = require('./routes/reporte.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares de seguridad
app.use(helmet());
app.use(compression());

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: '🏥 API Sistema Asilo de Ancianos "Cabeza de Algodón"',
    version: '1.0.0',
    author: 'Omar Cabrera',
    status: 'active'
  });
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/fichas-medicas', fichaMedicaRoutes);
app.use('/api/solicitudes', solicitudRoutes);
app.use('/api/visitas', visitaRoutes);
app.use('/api/laboratorio', laboratorioRoutes);
app.use('/api/farmacia', farmaciaRoutes);
app.use('/api/caja', cajaRoutes);
app.use('/api/donaciones', donacionRoutes);
app.use('/api/reportes', reporteRoutes);

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Iniciar servidor
const startServer = async () => {
  try {
    // Probar conexión a la base de datos
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('⚠️  Servidor iniciado sin conexión a la base de datos');
    }
    
    app.listen(PORT, () => {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`🏥 Sistema Asilo de Ancianos "Cabeza de Algodón"`);
      console.log(`   Desarrollado por: Omar Cabrera`);
      console.log(`   © 2025 - Todos los derechos reservados`);
      console.log(`${'='.repeat(60)}`);
      console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
      console.log(`📝 Entorno: ${process.env.NODE_ENV || 'development'}`);
      console.log(`${'='.repeat(60)}\n`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;

