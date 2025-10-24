/**
 * Middleware de Autenticación
 * @author Omar Cabrera
 */

const jwt = require('jsonwebtoken');

// Verificar token JWT
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No se proporcionó token de autenticación'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado'
    });
  }
};

// Verificar roles
const verifyRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }

    if (!allowedRoles.includes(req.user.rol)) {
      return res.status(403).json({
        success: false,
        message: 'No tiene permisos para realizar esta acción'
      });
    }

    next();
  };
};

// Verificar que el usuario esté activo
const verifyActiveUser = (req, res, next) => {
  if (!req.user.activo) {
    return res.status(403).json({
      success: false,
      message: 'Usuario inactivo. Contacte al administrador'
    });
  }
  next();
};

module.exports = {
  verifyToken,
  verifyRole,
  verifyActiveUser
};

