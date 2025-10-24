/**
 * Rutas de Fichas Médicas
 * @author Omar Cabrera
 */

const express = require('express');
const router = express.Router();
const VisitaController = require('../controllers/visita.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Las fichas médicas son las visitas médicas
router.get('/:paciente_id', verifyToken, VisitaController.getHistorial);

module.exports = router;

