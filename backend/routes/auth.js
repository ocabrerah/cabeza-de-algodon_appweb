const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const authController = require('../controllers/authController');

// Rutas públicas
router.post('/registro', authController.registro);
router.post('/login', authController.login);

// Rutas protegidas
router.get('/perfil', verifyToken, authController.obtenerPerfil);
router.put('/perfil', verifyToken, authController.actualizarPerfil);
router.put('/cambiar-password', verifyToken, authController.cambiarPassword);

module.exports = router;

