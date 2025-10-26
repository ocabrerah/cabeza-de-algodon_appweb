const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
const { enviarEmailBienvenida } = require('../utils/email');

// Registro de usuario
exports.registro = async (req, res) => {
  try {
    const { nombre, email, password, rol, telefono, especialidad } = req.body;

    // Validar que el email no exista
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Crear usuario
    const usuario = await Usuario.create({
      nombre,
      email,
      password: passwordHash,
      rol: rol || 'enfermero',
      telefono,
      especialidad,
      validado: false
    });

    // Enviar email de bienvenida
    await enviarEmailBienvenida(email, nombre, password);

    res.status(201).json({
      message: 'Usuario registrado exitosamente. Se ha enviado un email de confirmación',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const usuario = await Usuario.findOne({ where: { email } });
    
    if (!usuario) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }

    // Verificar contraseña
    const passwordValido = await bcrypt.compare(password, usuario.password);
    
    if (!passwordValido) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }

    // Verificar que el usuario esté activo
    if (!usuario.activo) {
      return res.status(403).json({ message: 'Usuario inactivo. Contacte al administrador' });
    }

    // Generar token
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET || 'cabeza_algodon_jwt_secret_key_2025_super_secure',
      { expiresIn: '24h' }
    );

    // Actualizar validado a true en el primer login
    if (!usuario.validado) {
      await usuario.update({ validado: true });
    }

    res.json({
      message: 'Login exitoso',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        telefono: usuario.telefono,
        especialidad: usuario.especialidad,
        fotoPerfil: usuario.fotoPerfil,
        validado: true
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

// Obtener perfil
exports.obtenerPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id, {
      attributes: { exclude: ['password'] }
    });

    res.json(usuario);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ message: 'Error al obtener perfil', error: error.message });
  }
};

// Actualizar perfil
exports.actualizarPerfil = async (req, res) => {
  try {
    const { nombre, telefono, especialidad, fotoPerfil } = req.body;
    
    const usuario = await Usuario.findByPk(req.usuario.id);

    await usuario.update({
      nombre: nombre || usuario.nombre,
      telefono: telefono || usuario.telefono,
      especialidad: especialidad || usuario.especialidad,
      fotoPerfil: fotoPerfil || usuario.fotoPerfil
    });

    res.json({
      message: 'Perfil actualizado exitosamente',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        telefono: usuario.telefono,
        especialidad: usuario.especialidad,
        fotoPerfil: usuario.fotoPerfil
      }
    });
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    res.status(500).json({ message: 'Error al actualizar perfil', error: error.message });
  }
};

// Cambiar contraseña
exports.cambiarPassword = async (req, res) => {
  try {
    const { passwordActual, passwordNuevo } = req.body;
    
    const usuario = await Usuario.findByPk(req.usuario.id);

    // Verificar contraseña actual
    const passwordValido = await bcrypt.compare(passwordActual, usuario.password);
    
    if (!passwordValido) {
      return res.status(401).json({ message: 'Contraseña actual incorrecta' });
    }

    // Encriptar nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(passwordNuevo, salt);

    await usuario.update({ password: passwordHash });

    res.json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    res.status(500).json({ message: 'Error al cambiar contraseña', error: error.message });
  }
};

