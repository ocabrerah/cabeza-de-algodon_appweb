const { ExamenLaboratorio, VisitaMedica, Paciente, Usuario } = require('../models');

// Obtener todos los exámenes
exports.obtenerExamenes = async (req, res) => {
  try {
    const { estado, visitaId } = req.query;
    
    const where = {};
    if (estado) where.estado = estado;
    if (visitaId) where.visitaId = visitaId;

    const examenes = await ExamenLaboratorio.findAll({
      where,
      include: [
        {
          model: VisitaMedica,
          as: 'visita',
          include: [
            { model: Paciente, as: 'paciente' },
            { model: Usuario, as: 'medico', attributes: ['nombre'] }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(examenes);
  } catch (error) {
    console.error('Error al obtener exámenes:', error);
    res.status(500).json({ message: 'Error al obtener exámenes', error: error.message });
  }
};

// Actualizar resultado de examen
exports.actualizarResultado = async (req, res) => {
  try {
    const { id } = req.params;
    const { resultado, archivoResultado } = req.body;
    
    const examen = await ExamenLaboratorio.findByPk(id);
    
    if (!examen) {
      return res.status(404).json({ message: 'Examen no encontrado' });
    }

    await examen.update({
      resultado,
      archivoResultado,
      fechaResultado: new Date(),
      estado: 'completado'
    });

    res.json({
      message: 'Resultado actualizado exitosamente',
      examen
    });
  } catch (error) {
    console.error('Error al actualizar resultado:', error);
    res.status(500).json({ message: 'Error al actualizar resultado', error: error.message });
  }
};

// Actualizar estado de examen
exports.actualizarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    
    const examen = await ExamenLaboratorio.findByPk(id);
    
    if (!examen) {
      return res.status(404).json({ message: 'Examen no encontrado' });
    }

    await examen.update({ estado });

    res.json({
      message: 'Estado actualizado exitosamente',
      examen
    });
  } catch (error) {
    console.error('Error al actualizar estado:', error);
    res.status(500).json({ message: 'Error al actualizar estado', error: error.message });
  }
};

