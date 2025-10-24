/**
 * Rutas de Usuarios
 * @author Omar Cabrera
 */

const express = require('express');
const router = express.Router();
const UserModel = require('../models/user.model');
const { verifyToken, verifyRole } = require('../middleware/auth.middleware');

// Obtener todos los usuarios (solo admin)
router.get('/', verifyToken, verifyRole('admin'), async (req, res) => {
  try {
    const users = await UserModel.findAll(req.query);
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener usuarios' });
  }
});

// Obtener usuario por ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener usuario' });
  }
});

// Actualizar usuario
router.put('/:id', verifyToken, verifyRole('admin'), async (req, res) => {
  try {
    const updated = await UserModel.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    res.json({ success: true, message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar usuario' });
  }
});

// Eliminar usuario (soft delete)
router.delete('/:id', verifyToken, verifyRole('admin'), async (req, res) => {
  try {
    const deleted = await UserModel.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    res.json({ success: true, message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar usuario' });
  }
});

module.exports = router;

