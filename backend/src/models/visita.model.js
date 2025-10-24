/**
 * Modelo de Visita Médica
 * @author Omar Cabrera
 */

const { pool } = require('../config/database');

class VisitaModel {
  // Crear visita
  static async create(visitaData) {
    const query = `
      INSERT INTO visitas_medicas (
        solicitud_id, paciente_id, medico_id, fecha_visita,
        motivo_visita, costo_consulta, estado
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [
      visitaData.solicitud_id || null,
      visitaData.paciente_id,
      visitaData.medico_id,
      visitaData.fecha_visita,
      visitaData.motivo_visita,
      visitaData.costo_consulta || 0,
      visitaData.estado || 'programada'
    ]);
    return result.insertId;
  }

  // Buscar por ID con joins
  static async findById(id) {
    const query = `
      SELECT v.*,
        p.nombre as paciente_nombre, p.apellido as paciente_apellido, 
        p.numero_expediente, p.fecha_nacimiento, p.edad, p.genero,
        p.tipo_sangre, p.alergias, p.psicopatologia, p.medicamentos_regulares,
        m.nombre as medico_nombre, m.apellido as medico_apellido,
        e.nombre as especialidad_nombre
      FROM visitas_medicas v
      LEFT JOIN pacientes p ON v.paciente_id = p.id
      LEFT JOIN medicos m ON v.medico_id = m.id
      LEFT JOIN especialidades e ON m.especialidad_id = e.id
      WHERE v.id = ?
    `;
    const [rows] = await pool.execute(query, [id]);
    return rows[0] || null;
  }

  // Obtener todas las visitas
  static async findAll(filters = {}) {
    let query = `
      SELECT v.*,
        p.nombre as paciente_nombre, p.apellido as paciente_apellido, p.numero_expediente,
        m.nombre as medico_nombre, m.apellido as medico_apellido,
        e.nombre as especialidad_nombre
      FROM visitas_medicas v
      LEFT JOIN pacientes p ON v.paciente_id = p.id
      LEFT JOIN medicos m ON v.medico_id = m.id
      LEFT JOIN especialidades e ON m.especialidad_id = e.id
      WHERE 1=1
    `;
    const params = [];

    if (filters.paciente_id) {
      query += ' AND v.paciente_id = ?';
      params.push(filters.paciente_id);
    }

    if (filters.medico_id) {
      query += ' AND v.medico_id = ?';
      params.push(filters.medico_id);
    }

    if (filters.estado) {
      query += ' AND v.estado = ?';
      params.push(filters.estado);
    }

    query += ' ORDER BY v.fecha_visita DESC';

    const [rows] = await pool.execute(query, params);
    return rows;
  }

  // Actualizar visita
  static async update(id, visitaData) {
    const fields = [];
    const params = [];

    Object.keys(visitaData).forEach(key => {
      if (visitaData[key] !== undefined && key !== 'id') {
        fields.push(`${key} = ?`);
        params.push(visitaData[key]);
      }
    });

    if (fields.length === 0) return false;

    params.push(id);
    const query = `UPDATE visitas_medicas SET ${fields.join(', ')} WHERE id = ?`;
    const [result] = await pool.execute(query, params);
    return result.affectedRows > 0;
  }

  // Obtener historial médico completo de un paciente
  static async getHistorialPaciente(pacienteId) {
    const query = `
      SELECT v.*,
        m.nombre as medico_nombre, m.apellido as medico_apellido,
        e.nombre as especialidad_nombre
      FROM visitas_medicas v
      LEFT JOIN medicos m ON v.medico_id = m.id
      LEFT JOIN especialidades e ON m.especialidad_id = e.id
      WHERE v.paciente_id = ? AND v.estado = 'completada'
      ORDER BY v.fecha_visita DESC
    `;
    const [rows] = await pool.execute(query, [pacienteId]);
    return rows;
  }
}

module.exports = VisitaModel;

