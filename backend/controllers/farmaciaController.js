const { Medicamento, VisitaMedica, Paciente, Usuario } = require('../models');

// Obtener todos los medicamentos
exports.obtenerMedicamentos = async (req, res) => {
  try {
    const { estado, visitaId } = req.query;
    
    const where = {};
    if (estado) where.estado = estado;
    if (visitaId) where.visitaId = visitaId;

    const medicamentos = await Medicamento.findAll({
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

    res.json(medicamentos);
  } catch (error) {
    console.error('Error al obtener medicamentos:', error);
    res.status(500).json({ message: 'Error al obtener medicamentos', error: error.message });
  }
};

// Despachar medicamento
exports.despacharMedicamento = async (req, res) => {
  try {
    const { id } = req.params;
    const { fechaInicio, fechaFin } = req.body;
    
    const medicamento = await Medicamento.findByPk(id);
    
    if (!medicamento) {
      return res.status(404).json({ message: 'Medicamento no encontrado' });
    }

    await medicamento.update({
      estado: 'despachado',
      fechaInicio: fechaInicio || new Date(),
      fechaFin
    });

    res.json({
      message: 'Medicamento despachado exitosamente',
      medicamento
    });
  } catch (error) {
    console.error('Error al despachar medicamento:', error);
    res.status(500).json({ message: 'Error al despachar medicamento', error: error.message });
  }
};

// Actualizar medicamento
exports.actualizarMedicamento = async (req, res) => {
  try {
    const { id } = req.params;
    
    const medicamento = await Medicamento.findByPk(id);
    
    if (!medicamento) {
      return res.status(404).json({ message: 'Medicamento no encontrado' });
    }

    await medicamento.update(req.body);

    res.json({
      message: 'Medicamento actualizado exitosamente',
      medicamento
    });
  } catch (error) {
    console.error('Error al actualizar medicamento:', error);
    res.status(500).json({ message: 'Error al actualizar medicamento', error: error.message });
  }
};

