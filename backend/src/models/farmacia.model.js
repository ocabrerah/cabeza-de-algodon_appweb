/**
 * Modelo de Farmacia
 * @author Omar Cabrera
 */

const { pool } = require('../config/database');

class FarmaciaModel {
  // Crear prescripción
  static async createPrescripcion(prescripcionData) {
    const query = `
      INSERT INTO prescripciones (
        visita_medica_id, medicamento_id, dosis, frecuencia, duracion,
        cantidad, indicaciones, costo_total
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [
      prescripcionData.visita_medica_id,
      prescripcionData.medicamento_id,
      prescripcionData.dosis,
      prescripcionData.frecuencia,
      prescripcionData.duracion,
      prescripcionData.cantidad,
      prescripcionData.indicaciones || null,
      prescripcionData.costo_total || 0
    ]);
    return result.insertId;
  }

  // Buscar prescripción por ID
  static async findPrescripcionById(id) {
    const query = `
      SELECT p.*,
        m.nombre as medicamento_nombre, m.presentacion, m.concentracion,
        v.paciente_id,
        pac.nombre as paciente_nombre, pac.apellido as paciente_apellido,
        u.nombre as entregado_por_nombre, u.apellido as entregado_por_apellido
      FROM prescripciones p
      LEFT JOIN medicamentos m ON p.medicamento_id = m.id
      LEFT JOIN visitas_medicas v ON p.visita_medica_id = v.id
      LEFT JOIN pacientes pac ON v.paciente_id = pac.id
      LEFT JOIN usuarios u ON p.entregado_por = u.id
      WHERE p.id = ?
    `;
    const [rows] = await pool.execute(query, [id]);
    return rows[0] || null;
  }

  // Obtener todas las prescripciones
  static async findAllPrescripciones(filters = {}) {
    let query = `
      SELECT p.*,
        m.nombre as medicamento_nombre, m.presentacion,
        pac.nombre as paciente_nombre, pac.apellido as paciente_apellido, pac.numero_expediente
      FROM prescripciones p
      LEFT JOIN medicamentos m ON p.medicamento_id = m.id
      LEFT JOIN visitas_medicas v ON p.visita_medica_id = v.id
      LEFT JOIN pacientes pac ON v.paciente_id = pac.id
      WHERE 1=1
    `;
    const params = [];

    if (filters.estado) {
      query += ' AND p.estado = ?';
      params.push(filters.estado);
    }

    if (filters.visita_id) {
      query += ' AND p.visita_medica_id = ?';
      params.push(filters.visita_id);
    }

    query += ' ORDER BY p.fecha_prescripcion DESC';

    const [rows] = await pool.execute(query, params);
    return rows;
  }

  // Entregar medicamento
  static async entregarMedicamento(id, usuarioId) {
    const query = `
      UPDATE prescripciones 
      SET estado = 'entregado', fecha_entrega = CURRENT_TIMESTAMP, entregado_por = ?
      WHERE id = ?
    `;
    const [result] = await pool.execute(query, [usuarioId, id]);
    return result.affectedRows > 0;
  }

  // Obtener medicamentos
  static async getMedicamentos(filters = {}) {
    let query = 'SELECT * FROM medicamentos WHERE activo = true';
    const params = [];

    if (filters.search) {
      query += ' AND (nombre LIKE ? OR codigo LIKE ?)';
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm, searchTerm);
    }

    query += ' ORDER BY nombre';

    const [rows] = await pool.execute(query, params);
    return rows;
  }

  // Buscar medicamento por ID
  static async getMedicamentoById(id) {
    const query = 'SELECT * FROM medicamentos WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows[0] || null;
  }

  // Actualizar stock de medicamento
  static async updateStock(id, cantidad) {
    const query = 'UPDATE medicamentos SET stock = stock - ? WHERE id = ? AND stock >= ?';
    const [result] = await pool.execute(query, [cantidad, id, cantidad]);
    return result.affectedRows > 0;
  }
}

module.exports = FarmaciaModel;

