/**
 * Rutas de Reportes
 * @author Omar Cabrera
 */

const express = require('express');
const router = express.Router();
const ReporteController = require('../controllers/reporte.controller');
const { verifyToken, verifyRole } = require('../middleware/auth.middleware');

// Reporte de costos por cita de paciente
router.get('/costos-cita', verifyToken, ReporteController.costoCitaPaciente);

// Reporte de ficha médica de paciente
router.get('/ficha-medica', verifyToken, ReporteController.fichaMedicaPaciente);

// Reporte de cobros por paciente
router.get('/cobros-paciente', verifyToken, ReporteController.cobrosPaciente);

// Reporte de entradas (donaciones y cobros)
router.get('/entradas', verifyToken, verifyRole('admin', 'staff'), ReporteController.entradas);

module.exports = router;

