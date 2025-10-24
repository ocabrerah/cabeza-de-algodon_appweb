/**
 * Modelo de Solicitud Médica
 * @author Omar Cabrera
 */

const { pool } = require('../config/database');

class SolicitudModel {
  // Crear solicitud
  static async create(solicitudData) {
    const query = `
      INSERT INTO solicitudes_medicas (
        paciente_id, medico_general_id, especialidad_solicitada_id,
        motivo, enfermero_asignado_id, prioridad, creado_por
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [
      solicitudData.paciente_id,
      solicitudData.medico_general_id || null,
      solicitudData.especialidad_solicitada_id,
      solicitudData.motivo,
      solicitudData.enfermero_asignado_id || null,
      solicitudData.prioridad || 'media',
      solicitudData.creado_por || null
    ]);
    return result.insertId;
  }

  // Buscar por ID con joins
  static async findById(id) {
    const query = `
      SELECT s.*,
        p.nombre as paciente_nombre, p.apellido as paciente_apellido, p.numero_expediente,
        e.nombre as especialidad_nombre,
        m.nombre as medico_nombre, m.apellido as medico_apellido,
        u.nombre as enfermero_nombre, u.apellido as enfermero_apellido
      FROM solicitudes_medicas s
      LEFT JOIN pacientes p ON s.paciente_id = p.id
      LEFT JOIN especialidades e ON s.especialidad_solicitada_id = e.id
      LEFT JOIN medicos m ON s.medico_asignado_id = m.id
      LEFT JOIN usuarios u ON s.enfermero_asignado_id = u.id
      WHERE s.id = ?
    `;
    const [rows] = await pool.execute(query, [id]);
    return rows[0] || null;
  }

  // Obtener todas las solicitudes
  static async findAll(filters = {}) {
    let query = `
      SELECT s.*,
        p.nombre as paciente_nombre, p.apellido as paciente_apellido, p.numero_expediente,
        e.nombre as especialidad_nombre,
        m.nombre as medico_nombre, m.apellido as medico_apellido
      FROM solicitudes_medicas s
      LEFT JOIN pacientes p ON s.paciente_id = p.id
      LEFT JOIN especialidades e ON s.especialidad_solicitada_id = e.id
      LEFT JOIN medicos m ON s.medico_asignado_id = m.id
      WHERE 1=1
    `;
    const params = [];

    if (filters.estado) {
      query += ' AND s.estado = ?';
      params.push(filters.estado);
    }

    if (filters.paciente_id) {
      query += ' AND s.paciente_id = ?';
      params.push(filters.paciente_id);
    }

    if (filters.especialidad_id) {
      query += ' AND s.especialidad_solicitada_id = ?';
      params.push(filters.especialidad_id);
    }

    query += ' ORDER BY s.fecha_solicitud DESC';

    const [rows] = await pool.execute(query, params);
    return rows;
  }

  // Actualizar solicitud
  static async update(id, solicitudData) {
    const fields = [];
    const params = [];

    Object.keys(solicitudData).forEach(key => {
      if (solicitudData[key] !== undefined && key !== 'id') {
        fields.push(`${key} = ?`);
        params.push(solicitudData[key]);
      }
    });

    if (fields.length === 0) return false;

    params.push(id);
    const query = `UPDATE solicitudes_medicas SET ${fields.join(', ')} WHERE id = ?`;
    const [result] = await pool.execute(query, params);
    return result.affectedRows > 0;
  }

  // Asignar médico y fecha
  static async asignar(id, medicoId, fechaProgramada) {
    const query = `
      UPDATE solicitudes_medicas 
      SET medico_asignado_id = ?, fecha_programada = ?, estado = 'programada'
      WHERE id = ?
    `;
    const [result] = await pool.execute(query, [medicoId, fechaProgramada, id]);
    return result.affectedRows > 0;
  }
}

module.exports = SolicitudModel;

