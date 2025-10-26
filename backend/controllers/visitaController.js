const { VisitaMedica, Paciente, Usuario, SolicitudMedica, ExamenLaboratorio, Medicamento } = require('../models');

// Obtener todas las visitas
exports.obtenerVisitas = async (req, res) => {
  try {
    const { estado, pacienteId, medicoId } = req.query;
    
    const where = {};
    if (estado) where.estado = estado;
    if (pacienteId) where.pacienteId = pacienteId;
    if (medicoId) where.medicoId = medicoId;

    const visitas = await VisitaMedica.findAll({
      where,
      include: [
        { model: Paciente, as: 'paciente' },
        { model: Usuario, as: 'medico', attributes: ['nombre', 'especialidad'] },
        { model: SolicitudMedica, as: 'solicitud' },
        { model: ExamenLaboratorio, as: 'examenes' },
        { model: Medicamento, as: 'medicamentos' }
      ],
      order: [['fechaVisita', 'DESC']]
    });

    res.json(visitas);
  } catch (error) {
    console.error('Error al obtener visitas:', error);
    res.status(500).json({ message: 'Error al obtener visitas', error: error.message });
  }
};

// Obtener una visita
exports.obtenerVisita = async (req, res) => {
  try {
    const { id } = req.params;
    
    const visita = await VisitaMedica.findByPk(id, {
      include: [
        { model: Paciente, as: 'paciente' },
        { model: Usuario, as: 'medico', attributes: ['nombre', 'especialidad'] },
        { model: SolicitudMedica, as: 'solicitud' },
        { model: ExamenLaboratorio, as: 'examenes' },
        { model: Medicamento, as: 'medicamentos' }
      ]
    });

    if (!visita) {
      return res.status(404).json({ message: 'Visita no encontrada' });
    }

    res.json(visita);
  } catch (error) {
    console.error('Error al obtener visita:', error);
    res.status(500).json({ message: 'Error al obtener visita', error: error.message });
  }
};

// Crear visita desde solicitud
exports.crearVisita = async (req, res) => {
  try {
    const { solicitudId, fechaVisita, motivoVisita, costoConsulta } = req.body;
    
    // Verificar solicitud
    const solicitud = await SolicitudMedica.findByPk(solicitudId);
    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    // Crear visita
    const visita = await VisitaMedica.create({
      solicitudId,
      pacienteId: solicitud.pacienteId,
      medicoId: req.usuario.id,
      fechaVisita,
      motivoVisita: motivoVisita || solicitud.motivo,
      costoConsulta: costoConsulta || 0,
      estado: 'programada'
    });

    // Actualizar solicitud
    await solicitud.update({ estado: 'completada' });

    // Recargar con relaciones
    const visitaCompleta = await VisitaMedica.findByPk(visita.id, {
      include: [
        { model: Paciente, as: 'paciente' },
        { model: Usuario, as: 'medico', attributes: ['nombre', 'especialidad'] },
        { model: SolicitudMedica, as: 'solicitud' }
      ]
    });

    res.status(201).json({
      message: 'Visita creada exitosamente',
      visita: visitaCompleta
    });
  } catch (error) {
    console.error('Error al crear visita:', error);
    res.status(500).json({ message: 'Error al crear visita', error: error.message });
  }
};

// Actualizar visita
exports.actualizarVisita = async (req, res) => {
  try {
    const { id } = req.params;
    
    const visita = await VisitaMedica.findByPk(id);
    
    if (!visita) {
      return res.status(404).json({ message: 'Visita no encontrada' });
    }

    await visita.update(req.body);

    const visitaActualizada = await VisitaMedica.findByPk(id, {
      include: [
        { model: Paciente, as: 'paciente' },
        { model: Usuario, as: 'medico', attributes: ['nombre', 'especialidad'] },
        { model: ExamenLaboratorio, as: 'examenes' },
        { model: Medicamento, as: 'medicamentos' }
      ]
    });

    res.json({
      message: 'Visita actualizada exitosamente',
      visita: visitaActualizada
    });
  } catch (error) {
    console.error('Error al actualizar visita:', error);
    res.status(500).json({ message: 'Error al actualizar visita', error: error.message });
  }
};

// Agregar examen a visita
exports.agregarExamen = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombreExamen, descripcion, costo } = req.body;
    
    const visita = await VisitaMedica.findByPk(id);
    if (!visita) {
      return res.status(404).json({ message: 'Visita no encontrada' });
    }

    const examen = await ExamenLaboratorio.create({
      visitaId: id,
      nombreExamen,
      descripcion,
      costo: costo || 0,
      estado: 'solicitado'
    });

    res.status(201).json({
      message: 'Examen agregado exitosamente',
      examen
    });
  } catch (error) {
    console.error('Error al agregar examen:', error);
    res.status(500).json({ message: 'Error al agregar examen', error: error.message });
  }
};

// Agregar medicamento a visita
exports.agregarMedicamento = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombreMedicamento, cantidad, dosis, frecuencia, duracion, instrucciones, costo } = req.body;
    
    const visita = await VisitaMedica.findByPk(id);
    if (!visita) {
      return res.status(404).json({ message: 'Visita no encontrada' });
    }

    const medicamento = await Medicamento.create({
      visitaId: id,
      nombreMedicamento,
      cantidad,
      dosis,
      frecuencia,
      duracion,
      instrucciones,
      costo: costo || 0,
      estado: 'prescrito'
    });

    res.status(201).json({
      message: 'Medicamento agregado exitosamente',
      medicamento
    });
  } catch (error) {
    console.error('Error al agregar medicamento:', error);
    res.status(500).json({ message: 'Error al agregar medicamento', error: error.message });
  }
};

