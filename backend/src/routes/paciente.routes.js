/**
 * Rutas de Pacientes
 * @author Omar Cabrera
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const PacienteController = require('../controllers/paciente.controller');
const { verifyToken, verifyRole } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validation.middleware');

// Crear paciente
router.post('/',
  verifyToken,
  verifyRole('admin', 'staff', 'empleado'),
  [
    body('nombre').trim().notEmpty().withMessage('El nombre es requerido'),
    body('apellido').trim().notEmpty().withMessage('El apellido es requerido'),
    body('fecha_nacimiento').isDate().withMessage('Fecha de nacimiento inválida'),
    body('genero').isIn(['Masculino', 'Femenino', 'Otro']).withMessage('Género inválido'),
    body('fecha_ingreso').isDate().withMessage('Fecha de ingreso inválida'),
    validate
  ],
  PacienteController.create
);

// Obtener todos los pacientes
router.get('/', verifyToken, PacienteController.getAll);

// Obtener paciente por ID
router.get('/:id', verifyToken, PacienteController.getById);

// Actualizar paciente
router.put('/:id', verifyToken, verifyRole('admin', 'staff', 'empleado'), PacienteController.update);

// Agregar familiar
router.post('/:id/familiares',
  verifyToken,
  verifyRole('admin', 'staff', 'empleado'),
  [
    body('nombre').trim().notEmpty().withMessage('El nombre es requerido'),
    body('apellido').trim().notEmpty().withMessage('El apellido es requerido'),
    body('relacion').trim().notEmpty().withMessage('La relación es requerida'),
    body('telefono').trim().notEmpty().withMessage('El teléfono es requerido'),
    validate
  ],
  PacienteController.addFamiliar
);

module.exports = router;

