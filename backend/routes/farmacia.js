const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middleware/auth');
const farmaciaController = require('../controllers/farmaciaController');

router.use(verifyToken);

router.get('/medicamentos', farmaciaController.obtenerMedicamentos);
router.put('/medicamentos/:id/despachar', checkRole('admin', 'farmacia'), farmaciaController.despacharMedicamento);
router.put('/medicamentos/:id', checkRole('admin', 'farmacia'), farmaciaController.actualizarMedicamento);

module.exports = router;

