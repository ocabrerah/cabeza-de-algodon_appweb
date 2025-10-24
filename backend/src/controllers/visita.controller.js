/**
 * Controlador de Visitas Médicas
 * @author Omar Cabrera
 */

const VisitaModel = require('../models/visita.model');
const SolicitudModel = require('../models/solicitud.model');
const CajaModel = require('../models/caja.model');

class VisitaController {
  // Crear visita desde solicitud
  static async createFromSolicitud(req, res) {
    try {
      const { solicitud_id } = req.body;

      // Obtener solicitud
      const solicitud = await SolicitudModel.findById(solicitud_id);
      if (!solicitud) {
        return res.status(404).json({
          success: false,
          message: 'Solicitud no encontrada'
        });
      }

      // Crear visita
      const visitaData = {
        solicitud_id,
        paciente_id: solicitud.paciente_id,
        medico_id: solicitud.medico_asignado_id,
        fecha_visita: solicitud.fecha_programada,
        motivo_visita: solicitud.motivo,
        costo_consulta: req.body.costo_consulta || 0,
        estado: 'programada'
      };

      const visitaId = await VisitaModel.create(visitaData);

      // Actualizar estado de solicitud
      await SolicitudModel.update(solicitud_id, { estado: 'completada' });

      res.status(201).json({
        success: true,
        message: 'Visita médica creada exitosamente',
        data: { visitaId }
      });
    } catch (error) {
      console.error('Error al crear visita:', error);
      res.status(500).json({
        success: false,
        message: 'Error al crear visita médica'
      });
    }
  }

  // Obtener todas las visitas
  static async getAll(req, res) {
    try {
      const filters = {
        paciente_id: req.query.paciente_id,
        medico_id: req.query.medico_id,
        estado: req.query.estado
      };

      const visitas = await VisitaModel.findAll(filters);

      res.json({
        success: true,
        data: visitas
      });
    } catch (error) {
      console.error('Error al obtener visitas:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener visitas'
      });
    }
  }

  // Obtener visita por ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const visita = await VisitaModel.findById(id);

      if (!visita) {
        return res.status(404).json({
          success: false,
          message: 'Visita no encontrada'
        });
      }

      res.json({
        success: true,
        data: visita
      });
    } catch (error) {
      console.error('Error al obtener visita:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener visita'
      });
    }
  }

  // Actualizar visita (completar ficha médica)
  static async update(req, res) {
    try {
      const { id } = req.params;
      const visitaData = req.body;

      const updated = await VisitaModel.update(id, visitaData);

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: 'Visita no encontrada'
        });
      }

      // Si se completa la visita, registrar cargo en cuenta del paciente
      if (visitaData.estado === 'completada' && visitaData.costo_consulta) {
        const visita = await VisitaModel.findById(id);
        const cuenta = await CajaModel.getCuentaPaciente(visita.paciente_id);
        
        if (cuenta) {
          await CajaModel.createMovimiento({
            cuenta_id: cuenta.id,
            tipo: 'cargo',
            concepto: `Consulta médica - ${visita.especialidad_nombre}`,
            monto: visitaData.costo_consulta,
            referencia_id: id,
            referencia_tipo: 'visita_medica',
            creado_por: req.user.id
          });
        }
      }

      res.json({
        success: true,
        message: 'Visita actualizada exitosamente'
      });
    } catch (error) {
      console.error('Error al actualizar visita:', error);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar visita'
      });
    }
  }

  // Obtener historial médico de un paciente
  static async getHistorial(req, res) {
    try {
      const { paciente_id } = req.params;
      const historial = await VisitaModel.getHistorialPaciente(paciente_id);

      res.json({
        success: true,
        data: historial
      });
    } catch (error) {
      console.error('Error al obtener historial:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener historial médico'
      });
    }
  }
}

module.exports = VisitaController;

