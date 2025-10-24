/**
 * Rutas de Autenticación
 * @author Omar Cabrera
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const AuthController = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validation.middleware');

// Registro de usuario
router.post('/register',
  [
    body('nombre').trim().notEmpty().withMessage('El nombre es requerido'),
    body('apellido').trim().notEmpty().withMessage('El apellido es requerido'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('rol').optional().isIn(['admin', 'staff', 'empleado', 'medico', 'enfermero', 'laboratorista', 'farmaceutico']),
    validate
  ],
  AuthController.register
);

// Login
router.post('/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
    validate
  ],
  AuthController.login
);

// Verificar email
router.get('/verify-email/:token', AuthController.verifyEmail);

// Cambiar contraseña (requiere autenticación)
router.post('/change-password',
  verifyToken,
  [
    body('oldPassword').notEmpty().withMessage('Contraseña actual requerida'),
    body('newPassword').isLength({ min: 6 }).withMessage('La nueva contraseña debe tener al menos 6 caracteres'),
    validate
  ],
  AuthController.changePassword
);

// Obtener perfil del usuario autenticado
router.get('/profile', verifyToken, AuthController.getProfile);

module.exports = router;

