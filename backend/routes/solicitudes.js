const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const solicitudController = require('../controllers/solicitudController');

router.use(verifyToken);

router.get('/', solicitudController.obtenerSolicitudes);
router.get('/:id', solicitudController.obtenerSolicitud);
router.post('/', solicitudController.crearSolicitud);
router.put('/:id', solicitudController.actualizarSolicitud);
router.put('/:id/asignar', solicitudController.asignarSolicitud);
router.delete('/:id', solicitudController.eliminarSolicitud);

module.exports = router;

