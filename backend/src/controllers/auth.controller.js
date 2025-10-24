/**
 * Controlador de Autenticación
 * @author Omar Cabrera
 */

const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');
const { hashPassword, comparePassword, generateToken } = require('../utils/encryption');
const { sendWelcomeEmail } = require('../utils/email');

class AuthController {
  // Registro de usuario
  static async register(req, res) {
    try {
      const { nombre, apellido, email, password, rol, telefono } = req.body;

      // Verificar si el email ya existe
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'El correo electrónico ya está registrado'
        });
      }

      // Encriptar contraseña
      const hashedPassword = await hashPassword(password);
      
      // Generar token de verificación
      const verificationToken = generateToken();

      // Crear usuario
      const userId = await UserModel.create({
        nombre,
        apellido,
        email,
        password: hashedPassword,
        rol: rol || 'empleado',
        telefono,
        token_verificacion: verificationToken,
        creado_por: req.user?.id
      });

      // Enviar correo de bienvenida
      await sendWelcomeEmail(email, `${nombre} ${apellido}`, password);

      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente. Se ha enviado un correo de verificación.',
        data: { userId }
      });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({
        success: false,
        message: 'Error al registrar usuario'
      });
    }
  }

  // Login
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Buscar usuario
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas'
        });
      }

      // Verificar si el usuario está activo
      if (!user.activo) {
        return res.status(403).json({
          success: false,
          message: 'Usuario inactivo. Contacte al administrador'
        });
      }

      // Verificar contraseña
      const isValidPassword = await comparePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas'
        });
      }

      // Actualizar última conexión
      await UserModel.updateLastLogin(user.id);

      // Generar token JWT
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          rol: user.rol,
          activo: user.activo
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
      );

      // Remover password de la respuesta
      delete user.password;

      res.json({
        success: true,
        message: 'Inicio de sesión exitoso',
        data: {
          user,
          token
        }
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({
        success: false,
        message: 'Error al iniciar sesión'
      });
    }
  }

  // Verificar email
  static async verifyEmail(req, res) {
    try {
      const { token } = req.params;

      const verified = await UserModel.verifyEmail(token);
      if (!verified) {
        return res.status(400).json({
          success: false,
          message: 'Token de verificación inválido o expirado'
        });
      }

      res.json({
        success: true,
        message: 'Correo electrónico verificado exitosamente'
      });
    } catch (error) {
      console.error('Error en verificación:', error);
      res.status(500).json({
        success: false,
        message: 'Error al verificar correo'
      });
    }
  }

  // Cambiar contraseña
  static async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const userId = req.user.id;

      // Obtener usuario con password
      const user = await UserModel.findByEmail(req.user.email);
      
      // Verificar contraseña actual
      const isValid = await comparePassword(oldPassword, user.password);
      if (!isValid) {
        return res.status(400).json({
          success: false,
          message: 'Contraseña actual incorrecta'
        });
      }

      // Encriptar nueva contraseña
      const hashedPassword = await hashPassword(newPassword);

      // Actualizar contraseña
      await UserModel.update(userId, { password: hashedPassword });

      res.json({
        success: true,
        message: 'Contraseña actualizada exitosamente'
      });
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      res.status(500).json({
        success: false,
        message: 'Error al cambiar contraseña'
      });
    }
  }

  // Obtener perfil del usuario autenticado
  static async getProfile(req, res) {
    try {
      const user = await UserModel.findById(req.user.id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener perfil'
      });
    }
  }
}

module.exports = AuthController;

