const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const visitaController = require('../controllers/visitaController');

router.use(verifyToken);

router.get('/', visitaController.obtenerVisitas);
router.get('/:id', visitaController.obtenerVisita);
router.post('/', visitaController.crearVisita);
router.put('/:id', visitaController.actualizarVisita);
router.post('/:id/examenes', visitaController.agregarExamen);
router.post('/:id/medicamentos', visitaController.agregarMedicamento);

module.exports = router;

