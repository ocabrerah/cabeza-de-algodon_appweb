/**
 * Rutas de Donaciones
 * @author Omar Cabrera
 */

const express = require('express');
const router = express.Router();
const CajaController = require('../controllers/caja.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Las rutas de donaciones están en caja.routes, esta es una redirección
router.get('/', verifyToken, CajaController.getDonaciones);

module.exports = router;

