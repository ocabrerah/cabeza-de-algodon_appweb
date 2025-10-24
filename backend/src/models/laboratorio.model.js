/**
 * Modelo de Laboratorio
 * @author Omar Cabrera
 */

const { pool } = require('../config/database');

class LaboratorioModel {
  // Crear examen
  static async create(examenData) {
    const query = `
      INSERT INTO examenes_laboratorio (
        visita_medica_id, tipo_examen_id, costo, observaciones
      ) VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [
      examenData.visita_medica_id,
      examenData.tipo_examen_id,
      examenData.costo || 0,
      examenData.observaciones || null
    ]);
    return result.insertId;
  }

  // Buscar por ID
  static async findById(id) {
    const query = `
      SELECT e.*,
        t.nombre as tipo_examen_nombre, t.codigo as tipo_examen_codigo,
        v.paciente_id,
        p.nombre as paciente_nombre, p.apellido as paciente_apellido, p.numero_expediente,
        u.nombre as laboratorista_nombre, u.apellido as laboratorista_apellido
      FROM examenes_laboratorio e
      LEFT JOIN tipos_examenes t ON e.tipo_examen_id = t.id
      LEFT JOIN visitas_medicas v ON e.visita_medica_id = v.id
      LEFT JOIN pacientes p ON v.paciente_id = p.id
      LEFT JOIN usuarios u ON e.laboratorista_id = u.id
      WHERE e.id = ?
    `;
    const [rows] = await pool.execute(query, [id]);
    return rows[0] || null;
  }

  // Obtener todos los exámenes
  static async findAll(filters = {}) {
    let query = `
      SELECT e.*,
        t.nombre as tipo_examen_nombre, t.codigo as tipo_examen_codigo,
        p.nombre as paciente_nombre, p.apellido as paciente_apellido, p.numero_expediente
      FROM examenes_laboratorio e
      LEFT JOIN tipos_examenes t ON e.tipo_examen_id = t.id
      LEFT JOIN visitas_medicas v ON e.visita_medica_id = v.id
      LEFT JOIN pacientes p ON v.paciente_id = p.id
      WHERE 1=1
    `;
    const params = [];

    if (filters.estado) {
      query += ' AND e.estado = ?';
      params.push(filters.estado);
    }

    if (filters.visita_id) {
      query += ' AND e.visita_medica_id = ?';
      params.push(filters.visita_id);
    }

    query += ' ORDER BY e.fecha_solicitud DESC';

    const [rows] = await pool.execute(query, params);
    return rows;
  }

  // Actualizar examen
  static async update(id, examenData) {
    const fields = [];
    const params = [];

    Object.keys(examenData).forEach(key => {
      if (examenData[key] !== undefined && key !== 'id') {
        fields.push(`${key} = ?`);
        params.push(examenData[key]);
      }
    });

    if (fields.length === 0) return false;

    params.push(id);
    const query = `UPDATE examenes_laboratorio SET ${fields.join(', ')} WHERE id = ?`;
    const [result] = await pool.execute(query, params);
    return result.affectedRows > 0;
  }

  // Registrar resultados
  static async registrarResultados(id, resultados, laboratorista_id) {
    const query = `
      UPDATE examenes_laboratorio 
      SET resultados = ?, fecha_resultados = CURRENT_TIMESTAMP, 
          estado = 'completado', laboratorista_id = ?
      WHERE id = ?
    `;
    const [result] = await pool.execute(query, [resultados, laboratorista_id, id]);
    return result.affectedRows > 0;
  }

  // Obtener tipos de exámenes
  static async getTiposExamen() {
    const query = 'SELECT * FROM tipos_examenes WHERE activo = true ORDER BY nombre';
    const [rows] = await pool.execute(query);
    return rows;
  }
}

module.exports = LaboratorioModel;

