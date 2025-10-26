const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middleware/auth');
const laboratorioController = require('../controllers/laboratorioController');

router.use(verifyToken);

router.get('/examenes', laboratorioController.obtenerExamenes);
router.put('/examenes/:id/resultado', checkRole('admin', 'laboratorio'), laboratorioController.actualizarResultado);
router.put('/examenes/:id/estado', checkRole('admin', 'laboratorio'), laboratorioController.actualizarEstado);

module.exports = router;

