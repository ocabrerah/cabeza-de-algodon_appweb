const { SolicitudMedica, Paciente, Usuario } = require('../models');
const { enviarNotificacionSolicitud } = require('../utils/email');

// Obtener todas las solicitudes
exports.obtenerSolicitudes = async (req, res) => {
  try {
    const { estado } = req.query;
    
    const where = {};
    if (estado) {
      where.estado = estado;
    }

    const solicitudes = await SolicitudMedica.findAll({
      where,
      include: [
        { model: Paciente, as: 'paciente' },
        { model: Usuario, as: 'medicoSolicitante', attributes: ['nombre', 'especialidad'] },
        { model: Usuario, as: 'enfermero', attributes: ['nombre'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(solicitudes);
  } catch (error) {
    console.error('Error al obtener solicitudes:', error);
    res.status(500).json({ message: 'Error al obtener solicitudes', error: error.message });
  }
};

// Obtener una solicitud
exports.obtenerSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    
    const solicitud = await SolicitudMedica.findByPk(id, {
      include: [
        { model: Paciente, as: 'paciente' },
        { model: Usuario, as: 'medicoSolicitante', attributes: ['nombre', 'especialidad'] },
        { model: Usuario, as: 'enfermero', attributes: ['nombre'] }
      ]
    });

    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    res.json(solicitud);
  } catch (error) {
    console.error('Error al obtener solicitud:', error);
    res.status(500).json({ message: 'Error al obtener solicitud', error: error.message });
  }
};

// Crear solicitud
exports.crearSolicitud = async (req, res) => {
  try {
    const { pacienteId, motivo, especialidadRequerida, prioridad, observaciones, enfermeroId } = req.body;
    
    // Obtener datos del paciente
    const paciente = await Paciente.findByPk(pacienteId);
    if (!paciente) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    // Crear solicitud
    const solicitud = await SolicitudMedica.create({
      pacienteId,
      medicoSolicitanteId: req.usuario.id,
      enfermeroId,
      motivo,
      especialidadRequerida,
      prioridad: prioridad || 'media',
      observaciones,
      estado: 'pendiente'
    });

    // Enviar notificación al familiar
    if (paciente.emailFamiliar) {
      const medicoSolicitante = await Usuario.findByPk(req.usuario.id);
      await enviarNotificacionSolicitud(
        paciente.emailFamiliar,
        paciente.nombre,
        medicoSolicitante.nombre,
        especialidadRequerida,
        motivo
      );
    }

    // Recargar con relaciones
    const solicitudCompleta = await SolicitudMedica.findByPk(solicitud.id, {
      include: [
        { model: Paciente, as: 'paciente' },
        { model: Usuario, as: 'medicoSolicitante', attributes: ['nombre', 'especialidad'] },
        { model: Usuario, as: 'enfermero', attributes: ['nombre'] }
      ]
    });

    res.status(201).json({
      message: 'Solicitud creada exitosamente',
      solicitud: solicitudCompleta
    });
  } catch (error) {
    console.error('Error al crear solicitud:', error);
    res.status(500).json({ message: 'Error al crear solicitud', error: error.message });
  }
};

// Actualizar solicitud
exports.actualizarSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    
    const solicitud = await SolicitudMedica.findByPk(id);
    
    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    await solicitud.update(req.body);

    const solicitudActualizada = await SolicitudMedica.findByPk(id, {
      include: [
        { model: Paciente, as: 'paciente' },
        { model: Usuario, as: 'medicoSolicitante', attributes: ['nombre', 'especialidad'] },
        { model: Usuario, as: 'enfermero', attributes: ['nombre'] }
      ]
    });

    res.json({
      message: 'Solicitud actualizada exitosamente',
      solicitud: solicitudActualizada
    });
  } catch (error) {
    console.error('Error al actualizar solicitud:', error);
    res.status(500).json({ message: 'Error al actualizar solicitud', error: error.message });
  }
};

// Asignar fecha y médico a solicitud
exports.asignarSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    const { fechaAsignada } = req.body;
    
    const solicitud = await SolicitudMedica.findByPk(id);
    
    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    await solicitud.update({
      fechaAsignada,
      estado: 'asignada'
    });

    res.json({
      message: 'Solicitud asignada exitosamente',
      solicitud
    });
  } catch (error) {
    console.error('Error al asignar solicitud:', error);
    res.status(500).json({ message: 'Error al asignar solicitud', error: error.message });
  }
};

// Eliminar solicitud
exports.eliminarSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    
    const solicitud = await SolicitudMedica.findByPk(id);
    
    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    await solicitud.update({ estado: 'cancelada' });

    res.json({ message: 'Solicitud cancelada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar solicitud:', error);
    res.status(500).json({ message: 'Error al eliminar solicitud', error: error.message });
  }
};

