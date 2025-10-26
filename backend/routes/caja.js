const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middleware/auth');
const cajaController = require('../controllers/cajaController');

router.use(verifyToken);

router.get('/transacciones', cajaController.obtenerTransacciones);
router.post('/transacciones', checkRole('admin', 'caja'), cajaController.crearTransaccion);
router.get('/cuentas', cajaController.obtenerCuentasPacientes);
router.post('/cuentas', checkRole('admin', 'caja'), cajaController.actualizarCuentaPaciente);
router.post('/cuentas/:id/pago', checkRole('admin', 'caja'), cajaController.registrarPago);
router.get('/resumen', cajaController.obtenerResumen);

module.exports = router;

