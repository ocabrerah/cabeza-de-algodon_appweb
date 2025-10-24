/**
 * Modelo de Caja (Finanzas)
 * @author Omar Cabrera
 */

const { pool } = require('../config/database');

class CajaModel {
  // Crear cuenta de paciente
  static async createCuentaPaciente(pacienteId, familiarId, cuotaMensual) {
    const query = `
      INSERT INTO cuentas_paciente (paciente_id, familiar_responsable_id, cuota_mensual)
      VALUES (?, ?, ?)
    `;
    const [result] = await pool.execute(query, [pacienteId, familiarId, cuotaMensual]);
    return result.insertId;
  }

  // Obtener cuenta de paciente
  static async getCuentaPaciente(pacienteId) {
    const query = `
      SELECT c.*,
        p.nombre as paciente_nombre, p.apellido as paciente_apellido, p.numero_expediente,
        f.nombre as familiar_nombre, f.apellido as familiar_apellido, f.telefono as familiar_telefono, f.email as familiar_email
      FROM cuentas_paciente c
      LEFT JOIN pacientes p ON c.paciente_id = p.id
      LEFT JOIN familiares f ON c.familiar_responsable_id = f.id
      WHERE c.paciente_id = ?
    `;
    const [rows] = await pool.execute(query, [pacienteId]);
    return rows[0] || null;
  }

  // Crear movimiento de cuenta
  static async createMovimiento(movimientoData) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Obtener saldo actual
      const [cuenta] = await connection.execute(
        'SELECT saldo_pendiente FROM cuentas_paciente WHERE id = ?',
        [movimientoData.cuenta_id]
      );
      const saldoAnterior = cuenta[0].saldo_pendiente;
      
      // Calcular nuevo saldo
      const monto = parseFloat(movimientoData.monto);
      const saldoNuevo = movimientoData.tipo === 'cargo' 
        ? saldoAnterior + monto 
        : saldoAnterior - monto;

      // Insertar movimiento
      const [result] = await connection.execute(
        `INSERT INTO movimientos_cuenta (
          cuenta_id, tipo, concepto, monto, saldo_anterior, saldo_nuevo,
          referencia_id, referencia_tipo, creado_por
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          movimientoData.cuenta_id,
          movimientoData.tipo,
          movimientoData.concepto,
          monto,
          saldoAnterior,
          saldoNuevo,
          movimientoData.referencia_id || null,
          movimientoData.referencia_tipo || null,
          movimientoData.creado_por || null
        ]
      );

      // Actualizar saldo de la cuenta
      await connection.execute(
        'UPDATE cuentas_paciente SET saldo_pendiente = ? WHERE id = ?',
        [saldoNuevo, movimientoData.cuenta_id]
      );

      await connection.commit();
      return { success: true, movimientoId: result.insertId, saldoNuevo };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Obtener movimientos de una cuenta
  static async getMovimientos(cuentaId, filters = {}) {
    let query = `
      SELECT * FROM movimientos_cuenta 
      WHERE cuenta_id = ?
    `;
    const params = [cuentaId];

    if (filters.fecha_inicio && filters.fecha_fin) {
      query += ' AND DATE(fecha_movimiento) BETWEEN ? AND ?';
      params.push(filters.fecha_inicio, filters.fecha_fin);
    }

    query += ' ORDER BY fecha_movimiento DESC';

    const [rows] = await pool.execute(query, params);
    return rows;
  }

  // Crear donación
  static async createDonacion(donacionData) {
    const query = `
      INSERT INTO donaciones (
        tipo_donante, nombre_donante, identificacion, monto, moneda,
        fecha_donacion, metodo_pago, numero_recibo, concepto, observaciones, registrado_por
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [
      donacionData.tipo_donante,
      donacionData.nombre_donante,
      donacionData.identificacion || null,
      donacionData.monto,
      donacionData.moneda || 'HNL',
      donacionData.fecha_donacion,
      donacionData.metodo_pago || null,
      donacionData.numero_recibo || null,
      donacionData.concepto || null,
      donacionData.observaciones || null,
      donacionData.registrado_por || null
    ]);
    return result.insertId;
  }

  // Obtener donaciones
  static async getDonaciones(filters = {}) {
    let query = 'SELECT * FROM donaciones WHERE 1=1';
    const params = [];

    if (filters.fecha_inicio && filters.fecha_fin) {
      query += ' AND fecha_donacion BETWEEN ? AND ?';
      params.push(filters.fecha_inicio, filters.fecha_fin);
    }

    if (filters.tipo_donante) {
      query += ' AND tipo_donante = ?';
      params.push(filters.tipo_donante);
    }

    query += ' ORDER BY fecha_donacion DESC';

    const [rows] = await pool.execute(query, params);
    return rows;
  }

  // Crear gasto operativo
  static async createGasto(gastoData) {
    const query = `
      INSERT INTO gastos_operativos (
        categoria, descripcion, monto, fecha_gasto, proveedor,
        numero_factura, metodo_pago, observaciones, registrado_por
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [
      gastoData.categoria,
      gastoData.descripcion,
      gastoData.monto,
      gastoData.fecha_gasto,
      gastoData.proveedor || null,
      gastoData.numero_factura || null,
      gastoData.metodo_pago || null,
      gastoData.observaciones || null,
      gastoData.registrado_por || null
    ]);
    return result.insertId;
  }

  // Obtener gastos
  static async getGastos(filters = {}) {
    let query = 'SELECT * FROM gastos_operativos WHERE 1=1';
    const params = [];

    if (filters.fecha_inicio && filters.fecha_fin) {
      query += ' AND fecha_gasto BETWEEN ? AND ?';
      params.push(filters.fecha_inicio, filters.fecha_fin);
    }

    if (filters.categoria) {
      query += ' AND categoria = ?';
      params.push(filters.categoria);
    }

    query += ' ORDER BY fecha_gasto DESC';

    const [rows] = await pool.execute(query, params);
    return rows;
  }

  // Resumen financiero
  static async getResumenFinanciero(fechaInicio, fechaFin) {
    const query = `
      SELECT 
        (SELECT COALESCE(SUM(monto), 0) FROM donaciones WHERE fecha_donacion BETWEEN ? AND ?) as total_donaciones,
        (SELECT COALESCE(SUM(monto), 0) FROM movimientos_cuenta WHERE tipo = 'abono' AND DATE(fecha_movimiento) BETWEEN ? AND ?) as total_cobros,
        (SELECT COALESCE(SUM(monto), 0) FROM gastos_operativos WHERE fecha_gasto BETWEEN ? AND ?) as total_gastos,
        (SELECT COALESCE(SUM(saldo_pendiente), 0) FROM cuentas_paciente) as saldo_pendiente_total
    `;
    const [rows] = await pool.execute(query, [
      fechaInicio, fechaFin,
      fechaInicio, fechaFin,
      fechaInicio, fechaFin
    ]);
    return rows[0];
  }
}

module.exports = CajaModel;

