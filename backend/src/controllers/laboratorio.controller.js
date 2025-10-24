/**
 * Controlador de Laboratorio
 * @author Omar Cabrera
 */

const LaboratorioModel = require('../models/laboratorio.model');
const CajaModel = require('../models/caja.model');
const VisitaModel = require('../models/visita.model');

class LaboratorioController {
  // Crear examen
  static async create(req, res) {
    try {
      const examenData = req.body;
      const examenId = await LaboratorioModel.create(examenData);

      res.status(201).json({
        success: true,
        message: 'Examen de laboratorio registrado exitosamente',
        data: { examenId }
      });
    } catch (error) {
      console.error('Error al crear examen:', error);
      res.status(500).json({
        success: false,
        message: 'Error al registrar examen'
      });
    }
  }

  // Obtener todos los exámenes
  static async getAll(req, res) {
    try {
      const filters = {
        estado: req.query.estado,
        visita_id: req.query.visita_id
      };

      const examenes = await LaboratorioModel.findAll(filters);

      res.json({
        success: true,
        data: examenes
      });
    } catch (error) {
      console.error('Error al obtener exámenes:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener exámenes'
      });
    }
  }

  // Obtener examen por ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const examen = await LaboratorioModel.findById(id);

      if (!examen) {
        return res.status(404).json({
          success: false,
          message: 'Examen no encontrado'
        });
      }

      res.json({
        success: true,
        data: examen
      });
    } catch (error) {
      console.error('Error al obtener examen:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener examen'
      });
    }
  }

  // Registrar resultados
  static async registrarResultados(req, res) {
    try {
      const { id } = req.params;
      const { resultados } = req.body;

      const updated = await LaboratorioModel.registrarResultados(
        id,
        resultados,
        req.user.id
      );

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: 'Examen no encontrado'
        });
      }

      // Registrar cargo en cuenta del paciente
      const examen = await LaboratorioModel.findById(id);
      const visita = await VisitaModel.findById(examen.visita_medica_id);
      const cuenta = await CajaModel.getCuentaPaciente(visita.paciente_id);

      if (cuenta && examen.costo) {
        await CajaModel.createMovimiento({
          cuenta_id: cuenta.id,
          tipo: 'cargo',
          concepto: `Examen de laboratorio - ${examen.tipo_examen_nombre}`,
          monto: examen.costo,
          referencia_id: id,
          referencia_tipo: 'examen_laboratorio',
          creado_por: req.user.id
        });
      }

      res.json({
        success: true,
        message: 'Resultados registrados exitosamente'
      });
    } catch (error) {
      console.error('Error al registrar resultados:', error);
      res.status(500).json({
        success: false,
        message: 'Error al registrar resultados'
      });
    }
  }

  // Obtener tipos de exámenes
  static async getTipos(req, res) {
    try {
      const tipos = await LaboratorioModel.getTiposExamen();

      res.json({
        success: true,
        data: tipos
      });
    } catch (error) {
      console.error('Error al obtener tipos de exámenes:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener tipos de exámenes'
      });
    }
  }
}

module.exports = LaboratorioController;

