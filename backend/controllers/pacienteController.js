const { Paciente, VisitaMedica, SolicitudMedica, Usuario } = require('../models');
const { Op } = require('sequelize');

// Obtener todos los pacientes
exports.obtenerPacientes = async (req, res) => {
  try {
    const { search, activo } = req.query;
    
    const where = {};
    
    if (search) {
      where[Op.or] = [
        { nombre: { [Op.iLike]: `%${search}%` } },
        { dpi: { [Op.iLike]: `%${search}%` } }
      ];
    }
    
    if (activo !== undefined) {
      where.activo = activo === 'true';
    }

    const pacientes = await Paciente.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });

    res.json(pacientes);
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    res.status(500).json({ message: 'Error al obtener pacientes', error: error.message });
  }
};

// Obtener un paciente
exports.obtenerPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    
    const paciente = await Paciente.findByPk(id, {
      include: [
        {
          model: VisitaMedica,
          as: 'visitas',
          include: [{ model: Usuario, as: 'medico', attributes: ['nombre', 'especialidad'] }],
          order: [['fechaVisita', 'DESC']]
        },
        {
          model: SolicitudMedica,
          as: 'solicitudes',
          include: [
            { model: Usuario, as: 'medicoSolicitante', attributes: ['nombre'] },
            { model: Usuario, as: 'enfermero', attributes: ['nombre'] }
          ],
          order: [['createdAt', 'DESC']]
        }
      ]
    });

    if (!paciente) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    res.json(paciente);
  } catch (error) {
    console.error('Error al obtener paciente:', error);
    res.status(500).json({ message: 'Error al obtener paciente', error: error.message });
  }
};

// Crear paciente
exports.crearPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.create(req.body);
    
    res.status(201).json({
      message: 'Paciente registrado exitosamente',
      paciente
    });
  } catch (error) {
    console.error('Error al crear paciente:', error);
    res.status(500).json({ message: 'Error al crear paciente', error: error.message });
  }
};

// Actualizar paciente
exports.actualizarPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    
    const paciente = await Paciente.findByPk(id);
    
    if (!paciente) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    await paciente.update(req.body);

    res.json({
      message: 'Paciente actualizado exitosamente',
      paciente
    });
  } catch (error) {
    console.error('Error al actualizar paciente:', error);
    res.status(500).json({ message: 'Error al actualizar paciente', error: error.message });
  }
};

// Eliminar paciente (desactivar)
exports.eliminarPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    
    const paciente = await Paciente.findByPk(id);
    
    if (!paciente) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    await paciente.update({ activo: false });

    res.json({ message: 'Paciente desactivado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar paciente:', error);
    res.status(500).json({ message: 'Error al eliminar paciente', error: error.message });
  }
};

// Obtener estadísticas del paciente
exports.obtenerEstadisticas = async (req, res) => {
  try {
    const { id } = req.params;
    
    const paciente = await Paciente.findByPk(id);
    
    if (!paciente) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    const totalVisitas = await VisitaMedica.count({ where: { pacienteId: id } });
    const visitasCompletadas = await VisitaMedica.count({ 
      where: { pacienteId: id, estado: 'completada' } 
    });
    const solicitudesPendientes = await SolicitudMedica.count({ 
      where: { pacienteId: id, estado: 'pendiente' } 
    });

    res.json({
      totalVisitas,
      visitasCompletadas,
      solicitudesPendientes
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ message: 'Error al obtener estadísticas', error: error.message });
  }
};

