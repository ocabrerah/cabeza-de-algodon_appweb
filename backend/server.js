const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const { sequelize, testConnection } = require('./config/database');
const { Usuario } = require('./models');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pacientes', require('./routes/pacientes'));
app.use('/api/solicitudes', require('./routes/solicitudes'));
app.use('/api/visitas', require('./routes/visitas'));
app.use('/api/farmacia', require('./routes/farmacia'));
app.use('/api/laboratorio', require('./routes/laboratorio'));
app.use('/api/caja', require('./routes/caja'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/reportes', require('./routes/reportes'));

// Ruta de health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend Asilo Cabeza de Algodón funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Asilo Cabeza de Algodón',
    author: 'O. Cabrera',
    version: '1.0.0'
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: 'Error interno del servidor', 
    error: err.message 
  });
});

// Inicializar base de datos y servidor
const PORT = process.env.PORT || 5000;

const iniciarServidor = async () => {
  try {
    // Probar conexión
    const connected = await testConnection();
    
    if (!connected) {
      console.log('⚠️  No se pudo conectar a PostgreSQL. Asegúrate de que esté ejecutándose.');
      console.log('📝 Iniciando servidor de todas formas...');
    }

    // Sincronizar modelos (crear tablas si no existen)
    await sequelize.sync({ alter: false });
    console.log('✅ Modelos sincronizados con la base de datos');

    // Crear usuario administrador si no existe
    const adminExiste = await Usuario.findOne({ where: { email: 'ocabrerah99@gmail.com' } });
    
    if (!adminExiste) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('Admin2025!', salt);
      
      await Usuario.create({
        nombre: 'Administrador',
        email: 'ocabrerah99@gmail.com',
        password: passwordHash,
        rol: 'admin',
        activo: true,
        validado: true
      });
      
      console.log('✅ Usuario administrador creado');
      console.log('📧 Email: ocabrerah99@gmail.com');
      console.log('🔑 Contraseña: Admin2025!');
    }

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log('');
      console.log('═══════════════════════════════════════════════════════');
      console.log('🏥  ASILO CABEZA DE ALGODÓN - BACKEND');
      console.log('═══════════════════════════════════════════════════════');
      console.log(`🚀 Servidor ejecutándose en: http://localhost:${PORT}`);
      console.log(`📅 Fecha: ${new Date().toLocaleString('es-GT')}`);
      console.log(`👤 Autor: O. Cabrera`);
      console.log('═══════════════════════════════════════════════════════');
      console.log('');
    });

  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

iniciarServidor();

module.exports = app;

