/**
 * Rutas de Visitas Médicas
 * @author Omar Cabrera
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const VisitaController = require('../controllers/visita.controller');
const { verifyToken, verifyRole } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validation.middleware');

// Crear visita desde solicitud
router.post('/from-solicitud',
  verifyToken,
  verifyRole('medico', 'admin', 'fundacion'),
  [
    body('solicitud_id').isInt().withMessage('ID de solicitud inválido'),
    validate
  ],
  VisitaController.createFromSolicitud
);

// Obtener todas las visitas
router.get('/', verifyToken, VisitaController.getAll);

// Obtener visita por ID
router.get('/:id', verifyToken, VisitaController.getById);

// Actualizar visita (completar ficha médica)
router.put('/:id', verifyToken, verifyRole('medico', 'admin'), VisitaController.update);

// Obtener historial médico de un paciente
router.get('/historial/:paciente_id', verifyToken, VisitaController.getHistorial);

module.exports = router;

