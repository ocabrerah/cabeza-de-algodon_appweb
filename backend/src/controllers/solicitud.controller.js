/**
 * Controlador de Solicitudes Médicas
 * @author Omar Cabrera
 */

const SolicitudModel = require('../models/solicitud.model');
const PacienteModel = require('../models/paciente.model');
const { sendSolicitudNotification } = require('../utils/email');

class SolicitudController {
  // Crear solicitud
  static async create(req, res) {
    try {
      const solicitudData = {
        ...req.body,
        creado_por: req.user.id
      };

      const solicitudId = await SolicitudModel.create(solicitudData);

      // Obtener información del paciente y familiar para notificación
      const paciente = await PacienteModel.findById(solicitudData.paciente_id);
      const familiares = await PacienteModel.getFamiliares(solicitudData.paciente_id);
      
      // Enviar notificación al familiar responsable
      const familiarResponsable = familiares.find(f => f.es_responsable);
      if (familiarResponsable && familiarResponsable.email) {
        await sendSolicitudNotification(
          familiarResponsable.email,
          `${paciente.nombre} ${paciente.apellido}`,
          req.body.especialidad_nombre || 'Especialidad médica',
          req.body.motivo
        );
      }

      res.status(201).json({
        success: true,
        message: 'Solicitud médica creada exitosamente',
        data: { solicitudId }
      });
    } catch (error) {
      console.error('Error al crear solicitud:', error);
      res.status(500).json({
        success: false,
        message: 'Error al crear solicitud médica'
      });
    }
  }

  // Obtener todas las solicitudes
  static async getAll(req, res) {
    try {
      const filters = {
        estado: req.query.estado,
        paciente_id: req.query.paciente_id,
        especialidad_id: req.query.especialidad_id
      };

      const solicitudes = await SolicitudModel.findAll(filters);

      res.json({
        success: true,
        data: solicitudes
      });
    } catch (error) {
      console.error('Error al obtener solicitudes:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener solicitudes'
      });
    }
  }

  // Obtener solicitud por ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const solicitud = await SolicitudModel.findById(id);

      if (!solicitud) {
        return res.status(404).json({
          success: false,
          message: 'Solicitud no encontrada'
        });
      }

      res.json({
        success: true,
        data: solicitud
      });
    } catch (error) {
      console.error('Error al obtener solicitud:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener solicitud'
      });
    }
  }

  // Asignar médico y fecha (Fundación)
  static async asignar(req, res) {
    try {
      const { id } = req.params;
      const { medico_asignado_id, fecha_programada } = req.body;

      const updated = await SolicitudModel.asignar(id, medico_asignado_id, fecha_programada);

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: 'Solicitud no encontrada'
        });
      }

      res.json({
        success: true,
        message: 'Solicitud asignada exitosamente'
      });
    } catch (error) {
      console.error('Error al asignar solicitud:', error);
      res.status(500).json({
        success: false,
        message: 'Error al asignar solicitud'
      });
    }
  }

  // Actualizar estado
  static async updateEstado(req, res) {
    try {
      const { id } = req.params;
      const { estado, observaciones } = req.body;

      const updated = await SolicitudModel.update(id, { estado, observaciones });

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: 'Solicitud no encontrada'
        });
      }

      res.json({
        success: true,
        message: 'Estado actualizado exitosamente'
      });
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar estado'
      });
    }
  }
}

module.exports = SolicitudController;

