const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');
const { enviarEmailBienvenida } = require('../utils/email');

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const { rol, activo } = req.query;
    
    const where = {};
    if (rol) where.rol = rol;
    if (activo !== undefined) where.activo = activo === 'true';

    const usuarios = await Usuario.findAll({
      where,
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });

    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
};

// Obtener un usuario
exports.obtenerUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    
    const usuario = await Usuario.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
  }
};

// Crear usuario (solo admin)
exports.crearUsuario = async (req, res) => {
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
      especialidad
    });

    // Enviar email de bienvenida
    await enviarEmailBienvenida(email, nombre, password);

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ message: 'Error al crear usuario', error: error.message });
  }
};

// Actualizar usuario
exports.actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, telefono, especialidad, rol, activo } = req.body;
    
    const usuario = await Usuario.findByPk(id);
    
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await usuario.update({
      nombre: nombre || usuario.nombre,
      telefono: telefono || usuario.telefono,
      especialidad: especialidad || usuario.especialidad,
      rol: rol || usuario.rol,
      activo: activo !== undefined ? activo : usuario.activo
    });

    res.json({
      message: 'Usuario actualizado exitosamente',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        telefono: usuario.telefono,
        especialidad: usuario.especialidad,
        activo: usuario.activo
      }
    });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
  }
};

// Eliminar usuario (desactivar)
exports.eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    
    const usuario = await Usuario.findByPk(id);
    
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await usuario.update({ activo: false });

    res.json({ message: 'Usuario desactivado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
  }
};

// Resetear contraseña
exports.resetearPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { nuevaPassword } = req.body;
    
    const usuario = await Usuario.findByPk(id);
    
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Encriptar nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(nuevaPassword, salt);

    await usuario.update({ password: passwordHash });

    res.json({ message: 'Contraseña reseteada exitosamente' });
  } catch (error) {
    console.error('Error al resetear contraseña:', error);
    res.status(500).json({ message: 'Error al resetear contraseña', error: error.message });
  }
};

