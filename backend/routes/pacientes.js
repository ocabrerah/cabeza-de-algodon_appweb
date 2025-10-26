const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const pacienteController = require('../controllers/pacienteController');

router.use(verifyToken);

router.get('/', pacienteController.obtenerPacientes);
router.get('/:id', pacienteController.obtenerPaciente);
router.post('/', pacienteController.crearPaciente);
router.put('/:id', pacienteController.actualizarPaciente);
router.delete('/:id', pacienteController.eliminarPaciente);
router.get('/:id/estadisticas', pacienteController.obtenerEstadisticas);

module.exports = router;

