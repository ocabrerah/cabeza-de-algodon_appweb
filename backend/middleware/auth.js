const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'cabeza_algodon_jwt_secret_key_2025_super_secure');
    
    const usuario = await Usuario.findByPk(decoded.id);
    
    if (!usuario || !usuario.activo) {
      return res.status(401).json({ message: 'Usuario no autorizado' });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.usuario.rol !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador' });
  }
  next();
};

const checkRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.usuario.rol)) {
      return res.status(403).json({ message: 'Acceso denegado. Rol no autorizado' });
    }
    next();
  };
};

module.exports = { verifyToken, isAdmin, checkRole };

