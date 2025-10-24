/**
 * Modelo de Usuario
 * @author Omar Cabrera
 */

const { pool } = require('../config/database');

class UserModel {
  // Crear usuario
  static async create(userData) {
    const query = `
      INSERT INTO usuarios (nombre, apellido, email, password, rol, telefono, token_verificacion, creado_por)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [
      userData.nombre,
      userData.apellido,
      userData.email,
      userData.password,
      userData.rol,
      userData.telefono || null,
      userData.token_verificacion || null,
      userData.creado_por || null
    ]);
    return result.insertId;
  }

  // Buscar por email
  static async findByEmail(email) {
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    const [rows] = await pool.execute(query, [email]);
    return rows[0] || null;
  }

  // Buscar por ID
  static async findById(id) {
    const query = 'SELECT id, nombre, apellido, email, rol, telefono, activo, email_verificado, fecha_creacion FROM usuarios WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows[0] || null;
  }

  // Obtener todos los usuarios
  static async findAll(filters = {}) {
    let query = 'SELECT id, nombre, apellido, email, rol, telefono, activo, email_verificado, fecha_creacion FROM usuarios WHERE 1=1';
    const params = [];

    if (filters.rol) {
      query += ' AND rol = ?';
      params.push(filters.rol);
    }

    if (filters.activo !== undefined) {
      query += ' AND activo = ?';
      params.push(filters.activo);
    }

    query += ' ORDER BY fecha_creacion DESC';

    const [rows] = await pool.execute(query, params);
    return rows;
  }

  // Actualizar usuario
  static async update(id, userData) {
    const fields = [];
    const params = [];

    if (userData.nombre) {
      fields.push('nombre = ?');
      params.push(userData.nombre);
    }
    if (userData.apellido) {
      fields.push('apellido = ?');
      params.push(userData.apellido);
    }
    if (userData.telefono !== undefined) {
      fields.push('telefono = ?');
      params.push(userData.telefono);
    }
    if (userData.activo !== undefined) {
      fields.push('activo = ?');
      params.push(userData.activo);
    }
    if (userData.password) {
      fields.push('password = ?');
      params.push(userData.password);
    }

    if (fields.length === 0) return false;

    params.push(id);
    const query = `UPDATE usuarios SET ${fields.join(', ')} WHERE id = ?`;
    const [result] = await pool.execute(query, params);
    return result.affectedRows > 0;
  }

  // Verificar email
  static async verifyEmail(token) {
    const query = 'UPDATE usuarios SET email_verificado = true, token_verificacion = NULL WHERE token_verificacion = ?';
    const [result] = await pool.execute(query, [token]);
    return result.affectedRows > 0;
  }

  // Actualizar última conexión
  static async updateLastLogin(id) {
    const query = 'UPDATE usuarios SET ultima_conexion = CURRENT_TIMESTAMP WHERE id = ?';
    await pool.execute(query, [id]);
  }

  // Eliminar usuario (soft delete)
  static async delete(id) {
    const query = 'UPDATE usuarios SET activo = false WHERE id = ?';
    const [result] = await pool.execute(query, [id]);
    return result.affectedRows > 0;
  }
}

module.exports = UserModel;

