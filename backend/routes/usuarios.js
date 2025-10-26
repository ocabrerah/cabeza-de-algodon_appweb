const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth');
const usuarioController = require('../controllers/usuarioController');

router.use(verifyToken);
router.use(isAdmin);

router.get('/', usuarioController.obtenerUsuarios);
router.get('/:id', usuarioController.obtenerUsuario);
router.post('/', usuarioController.crearUsuario);
router.put('/:id', usuarioController.actualizarUsuario);
router.delete('/:id', usuarioController.eliminarUsuario);
router.put('/:id/resetear-password', usuarioController.resetearPassword);

module.exports = router;

