const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const reporteController = require('../controllers/reporteController');

router.use(verifyToken);

router.get('/costos-paciente', reporteController.reporteCostosPaciente);
router.get('/ficha-medica', reporteController.reporteFichaMedica);
router.get('/cobros-paciente', reporteController.reporteCobrosPaciente);
router.get('/pagos-fundacion', reporteController.reportePagosFundacion);
router.get('/entradas', reporteController.reporteEntradas);

module.exports = router;

