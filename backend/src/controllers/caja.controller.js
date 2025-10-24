/**
 * Controlador de Caja (Finanzas)
 * @author Omar Cabrera
 */

const CajaModel = require('../models/caja.model');

class CajaController {
  // Obtener cuenta de paciente
  static async getCuentaPaciente(req, res) {
    try {
      const { paciente_id } = req.params;
      const cuenta = await CajaModel.getCuentaPaciente(paciente_id);

      if (!cuenta) {
        return res.status(404).json({
          success: false,
          message: 'Cuenta no encontrada'
        });
      }

      res.json({
        success: true,
        data: cuenta
      });
    } catch (error) {
      console.error('Error al obtener cuenta:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener cuenta'
      });
    }
  }

  // Registrar pago (abono)
  static async registrarPago(req, res) {
    try {
      const { cuenta_id, monto, concepto } = req.body;

      const result = await CajaModel.createMovimiento({
        cuenta_id,
        tipo: 'abono',
        concepto: concepto || 'Pago recibido',
        monto,
        creado_por: req.user.id
      });

      res.status(201).json({
        success: true,
        message: 'Pago registrado exitosamente',
        data: result
      });
    } catch (error) {
      console.error('Error al registrar pago:', error);
      res.status(500).json({
        success: false,
        message: 'Error al registrar pago'
      });
    }
  }

  // Obtener movimientos de cuenta
  static async getMovimientos(req, res) {
    try {
      const { cuenta_id } = req.params;
      const filters = {
        fecha_inicio: req.query.fecha_inicio,
        fecha_fin: req.query.fecha_fin
      };

      const movimientos = await CajaModel.getMovimientos(cuenta_id, filters);

      res.json({
        success: true,
        data: movimientos
      });
    } catch (error) {
      console.error('Error al obtener movimientos:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener movimientos'
      });
    }
  }

  // Registrar donación
  static async registrarDonacion(req, res) {
    try {
      const donacionData = {
        ...req.body,
        registrado_por: req.user.id
      };

      const donacionId = await CajaModel.createDonacion(donacionData);

      res.status(201).json({
        success: true,
        message: 'Donación registrada exitosamente',
        data: { donacionId }
      });
    } catch (error) {
      console.error('Error al registrar donación:', error);
      res.status(500).json({
        success: false,
        message: 'Error al registrar donación'
      });
    }
  }

  // Obtener donaciones
  static async getDonaciones(req, res) {
    try {
      const filters = {
        fecha_inicio: req.query.fecha_inicio,
        fecha_fin: req.query.fecha_fin,
        tipo_donante: req.query.tipo_donante
      };

      const donaciones = await CajaModel.getDonaciones(filters);

      res.json({
        success: true,
        data: donaciones
      });
    } catch (error) {
      console.error('Error al obtener donaciones:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener donaciones'
      });
    }
  }

  // Registrar gasto
  static async registrarGasto(req, res) {
    try {
      const gastoData = {
        ...req.body,
        registrado_por: req.user.id
      };

      const gastoId = await CajaModel.createGasto(gastoData);

      res.status(201).json({
        success: true,
        message: 'Gasto registrado exitosamente',
        data: { gastoId }
      });
    } catch (error) {
      console.error('Error al registrar gasto:', error);
      res.status(500).json({
        success: false,
        message: 'Error al registrar gasto'
      });
    }
  }

  // Obtener gastos
  static async getGastos(req, res) {
    try {
      const filters = {
        fecha_inicio: req.query.fecha_inicio,
        fecha_fin: req.query.fecha_fin,
        categoria: req.query.categoria
      };

      const gastos = await CajaModel.getGastos(filters);

      res.json({
        success: true,
        data: gastos
      });
    } catch (error) {
      console.error('Error al obtener gastos:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener gastos'
      });
    }
  }

  // Obtener resumen financiero
  static async getResumen(req, res) {
    try {
      const { fecha_inicio, fecha_fin } = req.query;

      if (!fecha_inicio || !fecha_fin) {
        return res.status(400).json({
          success: false,
          message: 'Se requieren fecha_inicio y fecha_fin'
        });
      }

      const resumen = await CajaModel.getResumenFinanciero(fecha_inicio, fecha_fin);

      // Calcular balance
      const totalIngresos = parseFloat(resumen.total_donaciones) + parseFloat(resumen.total_cobros);
      const balance = totalIngresos - parseFloat(resumen.total_gastos);

      res.json({
        success: true,
        data: {
          ...resumen,
          total_ingresos: totalIngresos,
          balance
        }
      });
    } catch (error) {
      console.error('Error al obtener resumen:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener resumen financiero'
      });
    }
  }
}

module.exports = CajaController;

