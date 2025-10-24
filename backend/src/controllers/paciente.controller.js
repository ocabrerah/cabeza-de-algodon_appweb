/**
 * Controlador de Pacientes
 * @author Omar Cabrera
 */

const PacienteModel = require('../models/paciente.model');
const CajaModel = require('../models/caja.model');

class PacienteController {
  // Crear paciente
  static async create(req, res) {
    try {
      const pacienteData = req.body;
      
      // Generar número de expediente si no se proporciona
      if (!pacienteData.numero_expediente) {
        pacienteData.numero_expediente = await PacienteModel.generateExpediente();
      }

      // Calcular edad
      if (pacienteData.fecha_nacimiento) {
        const birthDate = new Date(pacienteData.fecha_nacimiento);
        const today = new Date();
        pacienteData.edad = today.getFullYear() - birthDate.getFullYear();
      }

      pacienteData.creado_por = req.user.id;

      const pacienteId = await PacienteModel.create(pacienteData);

      // Crear cuenta del paciente si se proporciona información de familiar
      if (req.body.familiar && req.body.cuota_mensual) {
        const familiarId = await PacienteModel.addFamiliar({
          paciente_id: pacienteId,
          ...req.body.familiar,
          es_responsable: true
        });

        await CajaModel.createCuentaPaciente(
          pacienteId,
          familiarId,
          req.body.cuota_mensual
        );
      }

      res.status(201).json({
        success: true,
        message: 'Paciente registrado exitosamente',
        data: { pacienteId }
      });
    } catch (error) {
      console.error('Error al crear paciente:', error);
      res.status(500).json({
        success: false,
        message: 'Error al registrar paciente'
      });
    }
  }

  // Obtener todos los pacientes
  static async getAll(req, res) {
    try {
      const filters = {
        activo: req.query.activo !== undefined ? req.query.activo === 'true' : true,
        search: req.query.search
      };

      const pacientes = await PacienteModel.findAll(filters);

      res.json({
        success: true,
        data: pacientes
      });
    } catch (error) {
      console.error('Error al obtener pacientes:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener pacientes'
      });
    }
  }

  // Obtener paciente por ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const paciente = await PacienteModel.findById(id);

      if (!paciente) {
        return res.status(404).json({
          success: false,
          message: 'Paciente no encontrado'
        });
      }

      // Obtener familiares
      const familiares = await PacienteModel.getFamiliares(id);

      // Obtener cuenta
      const cuenta = await CajaModel.getCuentaPaciente(id);

      res.json({
        success: true,
        data: {
          ...paciente,
          familiares,
          cuenta
        }
      });
    } catch (error) {
      console.error('Error al obtener paciente:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener paciente'
      });
    }
  }

  // Actualizar paciente
  static async update(req, res) {
    try {
      const { id } = req.params;
      const pacienteData = req.body;

      // Recalcular edad si se actualiza fecha de nacimiento
      if (pacienteData.fecha_nacimiento) {
        const birthDate = new Date(pacienteData.fecha_nacimiento);
        const today = new Date();
        pacienteData.edad = today.getFullYear() - birthDate.getFullYear();
      }

      const updated = await PacienteModel.update(id, pacienteData);

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: 'Paciente no encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Paciente actualizado exitosamente'
      });
    } catch (error) {
      console.error('Error al actualizar paciente:', error);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar paciente'
      });
    }
  }

  // Agregar familiar
  static async addFamiliar(req, res) {
    try {
      const { id } = req.params;
      const familiarData = {
        paciente_id: id,
        ...req.body
      };

      const familiarId = await PacienteModel.addFamiliar(familiarData);

      res.status(201).json({
        success: true,
        message: 'Familiar agregado exitosamente',
        data: { familiarId }
      });
    } catch (error) {
      console.error('Error al agregar familiar:', error);
      res.status(500).json({
        success: false,
        message: 'Error al agregar familiar'
      });
    }
  }
}

module.exports = PacienteController;

