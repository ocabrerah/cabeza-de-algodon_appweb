/**
 * Controlador de Farmacia
 * @author Omar Cabrera
 */

const FarmaciaModel = require('../models/farmacia.model');
const CajaModel = require('../models/caja.model');
const VisitaModel = require('../models/visita.model');

class FarmaciaController {
  // Crear prescripción
  static async createPrescripcion(req, res) {
    try {
      const prescripcionData = req.body;

      // Calcular costo total
      const medicamento = await FarmaciaModel.getMedicamentoById(prescripcionData.medicamento_id);
      prescripcionData.costo_total = medicamento.precio_unitario * prescripcionData.cantidad;

      const prescripcionId = await FarmaciaModel.createPrescripcion(prescripcionData);

      res.status(201).json({
        success: true,
        message: 'Prescripción registrada exitosamente',
        data: { prescripcionId }
      });
    } catch (error) {
      console.error('Error al crear prescripción:', error);
      res.status(500).json({
        success: false,
        message: 'Error al registrar prescripción'
      });
    }
  }

  // Obtener prescripciones
  static async getPrescripciones(req, res) {
    try {
      const filters = {
        estado: req.query.estado,
        visita_id: req.query.visita_id
      };

      const prescripciones = await FarmaciaModel.findAllPrescripciones(filters);

      res.json({
        success: true,
        data: prescripciones
      });
    } catch (error) {
      console.error('Error al obtener prescripciones:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener prescripciones'
      });
    }
  }

  // Obtener prescripción por ID
  static async getPrescripcionById(req, res) {
    try {
      const { id } = req.params;
      const prescripcion = await FarmaciaModel.findPrescripcionById(id);

      if (!prescripcion) {
        return res.status(404).json({
          success: false,
          message: 'Prescripción no encontrada'
        });
      }

      res.json({
        success: true,
        data: prescripcion
      });
    } catch (error) {
      console.error('Error al obtener prescripción:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener prescripción'
      });
    }
  }

  // Entregar medicamento
  static async entregarMedicamento(req, res) {
    try {
      const { id } = req.params;

      // Obtener prescripción
      const prescripcion = await FarmaciaModel.findPrescripcionById(id);
      if (!prescripcion) {
        return res.status(404).json({
          success: false,
          message: 'Prescripción no encontrada'
        });
      }

      // Verificar stock
      const medicamento = await FarmaciaModel.getMedicamentoById(prescripcion.medicamento_id);
      if (medicamento.stock < prescripcion.cantidad) {
        return res.status(400).json({
          success: false,
          message: 'Stock insuficiente'
        });
      }

      // Marcar como entregado
      await FarmaciaModel.entregarMedicamento(id, req.user.id);

      // Actualizar stock
      await FarmaciaModel.updateStock(prescripcion.medicamento_id, prescripcion.cantidad);

      // Registrar cargo en cuenta del paciente
      const visita = await VisitaModel.findById(prescripcion.visita_medica_id);
      const cuenta = await CajaModel.getCuentaPaciente(visita.paciente_id);

      if (cuenta) {
        await CajaModel.createMovimiento({
          cuenta_id: cuenta.id,
          tipo: 'cargo',
          concepto: `Medicamento - ${prescripcion.medicamento_nombre} x${prescripcion.cantidad}`,
          monto: prescripcion.costo_total,
          referencia_id: id,
          referencia_tipo: 'prescripcion',
          creado_por: req.user.id
        });
      }

      res.json({
        success: true,
        message: 'Medicamento entregado exitosamente'
      });
    } catch (error) {
      console.error('Error al entregar medicamento:', error);
      res.status(500).json({
        success: false,
        message: 'Error al entregar medicamento'
      });
    }
  }

  // Obtener medicamentos
  static async getMedicamentos(req, res) {
    try {
      const filters = {
        search: req.query.search
      };

      const medicamentos = await FarmaciaModel.getMedicamentos(filters);

      res.json({
        success: true,
        data: medicamentos
      });
    } catch (error) {
      console.error('Error al obtener medicamentos:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener medicamentos'
      });
    }
  }
}

module.exports = FarmaciaController;

