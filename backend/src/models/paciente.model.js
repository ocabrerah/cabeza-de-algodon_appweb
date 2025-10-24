/**
 * Modelo de Paciente
 * @author Omar Cabrera
 */

const { pool } = require('../config/database');

class PacienteModel {
  // Crear paciente
  static async create(pacienteData) {
    const query = `
      INSERT INTO pacientes (
        numero_expediente, nombre, apellido, fecha_nacimiento, edad, genero,
        tipo_sangre, direccion, ciudad, departamento, telefono_emergencia,
        fecha_ingreso, motivo_ingreso, psicopatologia, medicamentos_regulares,
        alergias, observaciones, creado_por
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [
      pacienteData.numero_expediente,
      pacienteData.nombre,
      pacienteData.apellido,
      pacienteData.fecha_nacimiento,
      pacienteData.edad,
      pacienteData.genero,
      pacienteData.tipo_sangre || null,
      pacienteData.direccion || null,
      pacienteData.ciudad || null,
      pacienteData.departamento || null,
      pacienteData.telefono_emergencia || null,
      pacienteData.fecha_ingreso,
      pacienteData.motivo_ingreso || null,
      pacienteData.psicopatologia || null,
      pacienteData.medicamentos_regulares || null,
      pacienteData.alergias || null,
      pacienteData.observaciones || null,
      pacienteData.creado_por || null
    ]);
    return result.insertId;
  }

  // Buscar por ID
  static async findById(id) {
    const query = 'SELECT * FROM pacientes WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows[0] || null;
  }

  // Buscar por número de expediente
  static async findByExpediente(numero_expediente) {
    const query = 'SELECT * FROM pacientes WHERE numero_expediente = ?';
    const [rows] = await pool.execute(query, [numero_expediente]);
    return rows[0] || null;
  }

  // Obtener todos los pacientes
  static async findAll(filters = {}) {
    let query = 'SELECT * FROM pacientes WHERE 1=1';
    const params = [];

    if (filters.activo !== undefined) {
      query += ' AND activo = ?';
      params.push(filters.activo);
    }

    if (filters.search) {
      query += ' AND (nombre LIKE ? OR apellido LIKE ? OR numero_expediente LIKE ?)';
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    query += ' ORDER BY fecha_creacion DESC';

    const [rows] = await pool.execute(query, params);
    return rows;
  }

  // Actualizar paciente
  static async update(id, pacienteData) {
    const fields = [];
    const params = [];

    Object.keys(pacienteData).forEach(key => {
      if (pacienteData[key] !== undefined && key !== 'id') {
        fields.push(`${key} = ?`);
        params.push(pacienteData[key]);
      }
    });

    if (fields.length === 0) return false;

    params.push(id);
    const query = `UPDATE pacientes SET ${fields.join(', ')} WHERE id = ?`;
    const [result] = await pool.execute(query, params);
    return result.affectedRows > 0;
  }

  // Generar número de expediente
  static async generateExpediente() {
    const query = 'SELECT MAX(CAST(SUBSTRING(numero_expediente, 4) AS UNSIGNED)) as max_num FROM pacientes WHERE numero_expediente LIKE "EXP%"';
    const [rows] = await pool.execute(query);
    const nextNum = (rows[0].max_num || 0) + 1;
    return `EXP${String(nextNum).padStart(6, '0')}`;
  }

  // Obtener familiares de un paciente
  static async getFamiliares(pacienteId) {
    const query = 'SELECT * FROM familiares WHERE paciente_id = ? ORDER BY es_responsable DESC';
    const [rows] = await pool.execute(query, [pacienteId]);
    return rows;
  }

  // Agregar familiar
  static async addFamiliar(familiarData) {
    const query = `
      INSERT INTO familiares (paciente_id, nombre, apellido, relacion, telefono, email, direccion, es_responsable)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [
      familiarData.paciente_id,
      familiarData.nombre,
      familiarData.apellido,
      familiarData.relacion,
      familiarData.telefono,
      familiarData.email || null,
      familiarData.direccion || null,
      familiarData.es_responsable || false
    ]);
    return result.insertId;
  }
}

module.exports = PacienteModel;

