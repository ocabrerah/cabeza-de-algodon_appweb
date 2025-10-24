/**
 * Rutas de Farmacia
 * @author Omar Cabrera
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const FarmaciaController = require('../controllers/farmacia.controller');
const { verifyToken, verifyRole } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validation.middleware');

// Crear prescripción
router.post('/prescripciones',
  verifyToken,
  verifyRole('medico', 'admin'),
  [
    body('visita_medica_id').isInt().withMessage('ID de visita inválido'),
    body('medicamento_id').isInt().withMessage('ID de medicamento inválido'),
    body('dosis').trim().notEmpty().withMessage('La dosis es requerida'),
    body('frecuencia').trim().notEmpty().withMessage('La frecuencia es requerida'),
    body('duracion').trim().notEmpty().withMessage('La duración es requerida'),
    body('cantidad').isInt({ min: 1 }).withMessage('La cantidad debe ser mayor a 0'),
    validate
  ],
  FarmaciaController.createPrescripcion
);

// Obtener prescripciones
router.get('/prescripciones', verifyToken, FarmaciaController.getPrescripciones);

// Obtener prescripción por ID
router.get('/prescripciones/:id', verifyToken, FarmaciaController.getPrescripcionById);

// Entregar medicamento
router.post('/prescripciones/:id/entregar',
  verifyToken,
  verifyRole('farmaceutico', 'admin'),
  FarmaciaController.entregarMedicamento
);

// Obtener medicamentos
router.get('/medicamentos', verifyToken, FarmaciaController.getMedicamentos);

module.exports = router;

