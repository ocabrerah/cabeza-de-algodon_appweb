/**
 * Rutas de Solicitudes Médicas
 * @author Omar Cabrera
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const SolicitudController = require('../controllers/solicitud.controller');
const { verifyToken, verifyRole } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validation.middleware');

// Crear solicitud
router.post('/',
  verifyToken,
  [
    body('paciente_id').isInt().withMessage('ID de paciente inválido'),
    body('especialidad_solicitada_id').isInt().withMessage('ID de especialidad inválido'),
    body('motivo').trim().notEmpty().withMessage('El motivo es requerido'),
    validate
  ],
  SolicitudController.create
);

// Obtener todas las solicitudes
router.get('/', verifyToken, SolicitudController.getAll);

// Obtener solicitud por ID
router.get('/:id', verifyToken, SolicitudController.getById);

// Asignar médico y fecha (Fundación)
router.put('/:id/asignar',
  verifyToken,
  verifyRole('fundacion', 'admin'),
  [
    body('medico_asignado_id').isInt().withMessage('ID de médico inválido'),
    body('fecha_programada').isISO8601().withMessage('Fecha programada inválida'),
    validate
  ],
  SolicitudController.asignar
);

// Actualizar estado
router.patch('/:id/estado',
  verifyToken,
  [
    body('estado').isIn(['pendiente', 'programada', 'completada', 'cancelada']).withMessage('Estado inválido'),
    validate
  ],
  SolicitudController.updateEstado
);

module.exports = router;

