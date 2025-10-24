/**
 * Rutas de Laboratorio
 * @author Omar Cabrera
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const LaboratorioController = require('../controllers/laboratorio.controller');
const { verifyToken, verifyRole } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validation.middleware');

// Crear examen
router.post('/',
  verifyToken,
  verifyRole('medico', 'admin'),
  [
    body('visita_medica_id').isInt().withMessage('ID de visita inválido'),
    body('tipo_examen_id').isInt().withMessage('ID de tipo de examen inválido'),
    validate
  ],
  LaboratorioController.create
);

// Obtener todos los exámenes
router.get('/', verifyToken, LaboratorioController.getAll);

// Obtener tipos de exámenes
router.get('/tipos', verifyToken, LaboratorioController.getTipos);

// Obtener examen por ID
router.get('/:id', verifyToken, LaboratorioController.getById);

// Registrar resultados
router.post('/:id/resultados',
  verifyToken,
  verifyRole('laboratorista', 'admin'),
  [
    body('resultados').trim().notEmpty().withMessage('Los resultados son requeridos'),
    validate
  ],
  LaboratorioController.registrarResultados
);

module.exports = router;

