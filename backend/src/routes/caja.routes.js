/**
 * Rutas de Caja (Finanzas)
 * @author Omar Cabrera
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const CajaController = require('../controllers/caja.controller');
const { verifyToken, verifyRole } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validation.middleware');

// Obtener cuenta de paciente
router.get('/cuenta/:paciente_id', verifyToken, CajaController.getCuentaPaciente);

// Registrar pago
router.post('/pagos',
  verifyToken,
  verifyRole('admin', 'staff'),
  [
    body('cuenta_id').isInt().withMessage('ID de cuenta inválido'),
    body('monto').isFloat({ min: 0.01 }).withMessage('Monto inválido'),
    validate
  ],
  CajaController.registrarPago
);

// Obtener movimientos de cuenta
router.get('/movimientos/:cuenta_id', verifyToken, CajaController.getMovimientos);

// Registrar donación
router.post('/donaciones',
  verifyToken,
  verifyRole('admin', 'staff'),
  [
    body('tipo_donante').isIn(['empresa_internacional', 'empresa_nacional', 'gobierno', 'particular']),
    body('nombre_donante').trim().notEmpty().withMessage('Nombre del donante requerido'),
    body('monto').isFloat({ min: 0.01 }).withMessage('Monto inválido'),
    body('fecha_donacion').isDate().withMessage('Fecha inválida'),
    validate
  ],
  CajaController.registrarDonacion
);

// Obtener donaciones
router.get('/donaciones', verifyToken, CajaController.getDonaciones);

// Registrar gasto
router.post('/gastos',
  verifyToken,
  verifyRole('admin', 'staff'),
  [
    body('categoria').trim().notEmpty().withMessage('Categoría requerida'),
    body('descripcion').trim().notEmpty().withMessage('Descripción requerida'),
    body('monto').isFloat({ min: 0.01 }).withMessage('Monto inválido'),
    body('fecha_gasto').isDate().withMessage('Fecha inválida'),
    validate
  ],
  CajaController.registrarGasto
);

// Obtener gastos
router.get('/gastos', verifyToken, CajaController.getGastos);

// Obtener resumen financiero
router.get('/resumen', verifyToken, verifyRole('admin', 'staff'), CajaController.getResumen);

module.exports = router;

