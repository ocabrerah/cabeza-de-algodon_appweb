const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');
const { Paciente, VisitaMedica, ExamenLaboratorio, Medicamento, CuentaPaciente, Transaccion, Usuario } = require('../models');
const { Op } = require('sequelize');

// Reporte de costos por visita/paciente
exports.reporteCostosPaciente = async (req, res) => {
  try {
    const { pacienteId, formato } = req.query;
    
    const paciente = await Paciente.findByPk(pacienteId);
    if (!paciente) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    const visitas = await VisitaMedica.findAll({
      where: { pacienteId },
      include: [
        { model: ExamenLaboratorio, as: 'examenes' },
        { model: Medicamento, as: 'medicamentos' },
        { model: Usuario, as: 'medico', attributes: ['nombre', 'especialidad'] }
      ]
    });

    const data = {
      paciente,
      visitas: visitas.map(v => ({
        fecha: v.fechaVisita,
        medico: v.medico?.nombre,
        especialidad: v.medico?.especialidad,
        costoConsulta: v.costoConsulta,
        examenes: v.examenes,
        medicamentos: v.medicamentos,
        totalExamenes: v.examenes.reduce((sum, e) => sum + parseFloat(e.costo || 0), 0),
        totalMedicamentos: v.medicamentos.reduce((sum, m) => sum + parseFloat(m.costo || 0), 0),
        total: parseFloat(v.costoConsulta || 0) + 
               v.examenes.reduce((sum, e) => sum + parseFloat(e.costo || 0), 0) +
               v.medicamentos.reduce((sum, m) => sum + parseFloat(m.costo || 0), 0)
      }))
    };

    if (formato === 'pdf') {
      return generarPDF(res, 'Reporte de Costos por Paciente', data);
    } else if (formato === 'excel') {
      return generarExcel(res, 'Reporte de Costos', data);
    }

    res.json(data);
  } catch (error) {
    console.error('Error al generar reporte:', error);
    res.status(500).json({ message: 'Error al generar reporte', error: error.message });
  }
};

// Reporte de ficha médica
exports.reporteFichaMedica = async (req, res) => {
  try {
    const { pacienteId, formato } = req.query;
    
    const paciente = await Paciente.findByPk(pacienteId, {
      include: [
        {
          model: VisitaMedica,
          as: 'visitas',
          include: [
            { model: Usuario, as: 'medico' },
            { model: ExamenLaboratorio, as: 'examenes' },
            { model: Medicamento, as: 'medicamentos' }
          ]
        }
      ]
    });

    if (!paciente) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    if (formato === 'pdf') {
      return generarPDF(res, 'Ficha Médica', { paciente });
    }

    res.json({ paciente });
  } catch (error) {
    console.error('Error al generar reporte:', error);
    res.status(500).json({ message: 'Error al generar reporte', error: error.message });
  }
};

// Reporte de cobros por paciente
exports.reporteCobrosPaciente = async (req, res) => {
  try {
    const { pacienteId, fechaInicio, fechaFin, formato } = req.query;
    
    const where = { pacienteId };
    if (fechaInicio && fechaFin) {
      where.createdAt = {
        [Op.between]: [new Date(fechaInicio), new Date(fechaFin)]
      };
    }

    const cuentas = await CuentaPaciente.findAll({
      where,
      include: [{ model: Paciente, as: 'paciente' }]
    });

    const transacciones = await Transaccion.findAll({
      where: {
        pacienteId,
        tipo: 'ingreso',
        ...(fechaInicio && fechaFin ? {
          fecha: {
            [Op.between]: [new Date(fechaInicio), new Date(fechaFin)]
          }
        } : {})
      }
    });

    const data = { cuentas, transacciones };

    if (formato === 'excel') {
      return generarExcel(res, 'Reporte de Cobros', data);
    }

    res.json(data);
  } catch (error) {
    console.error('Error al generar reporte:', error);
    res.status(500).json({ message: 'Error al generar reporte', error: error.message });
  }
};

// Reporte de pagos a fundación
exports.reportePagosFundacion = async (req, res) => {
  try {
    const { fechaInicio, fechaFin, formato } = req.query;
    
    const where = {
      categoria: { [Op.in]: ['consulta', 'laboratorio', 'farmacia'] }
    };

    if (fechaInicio && fechaFin) {
      where.fecha = {
        [Op.between]: [new Date(fechaInicio), new Date(fechaFin)]
      };
    }

    const transacciones = await Transaccion.findAll({
      where,
      include: [{ model: Paciente, as: 'paciente' }]
    });

    const resumen = {
      totalConsultas: transacciones.filter(t => t.categoria === 'consulta').reduce((sum, t) => sum + parseFloat(t.monto), 0),
      totalLaboratorio: transacciones.filter(t => t.categoria === 'laboratorio').reduce((sum, t) => sum + parseFloat(t.monto), 0),
      totalFarmacia: transacciones.filter(t => t.categoria === 'farmacia').reduce((sum, t) => sum + parseFloat(t.monto), 0)
    };

    const data = { transacciones, resumen };

    if (formato === 'pdf') {
      return generarPDF(res, 'Reporte de Pagos a Fundación', data);
    }

    res.json(data);
  } catch (error) {
    console.error('Error al generar reporte:', error);
    res.status(500).json({ message: 'Error al generar reporte', error: error.message });
  }
};

// Reporte de donaciones y cobros
exports.reporteEntradas = async (req, res) => {
  try {
    const { fechaInicio, fechaFin, formato } = req.query;
    
    const where = { tipo: 'ingreso' };
    if (fechaInicio && fechaFin) {
      where.fecha = {
        [Op.between]: [new Date(fechaInicio), new Date(fechaFin)]
      };
    }

    const transacciones = await Transaccion.findAll({ where });

    const resumen = {
      totalDonaciones: transacciones.filter(t => t.categoria === 'donacion').reduce((sum, t) => sum + parseFloat(t.monto), 0),
      totalCuotas: transacciones.filter(t => t.categoria === 'cuota_mensual').reduce((sum, t) => sum + parseFloat(t.monto), 0),
      total: transacciones.reduce((sum, t) => sum + parseFloat(t.monto), 0)
    };

    const data = { transacciones, resumen };

    if (formato === 'excel') {
      return generarExcel(res, 'Reporte de Entradas', data);
    }

    res.json(data);
  } catch (error) {
    console.error('Error al generar reporte:', error);
    res.status(500).json({ message: 'Error al generar reporte', error: error.message });
  }
};

// Funciones auxiliares para generar archivos
function generarPDF(res, titulo, data) {
  const doc = new PDFDocument();
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${titulo}.pdf"`);
  
  doc.pipe(res);
  
  doc.fontSize(20).text(titulo, { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(JSON.stringify(data, null, 2));
  
  doc.end();
}

function generarExcel(res, titulo, data) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(titulo);
  
  worksheet.columns = [
    { header: 'Dato', key: 'dato', width: 30 },
    { header: 'Valor', key: 'valor', width: 50 }
  ];
  
  // Agregar datos (esto es un ejemplo básico, ajustar según necesidad)
  Object.entries(data).forEach(([key, value]) => {
    worksheet.addRow({ dato: key, valor: JSON.stringify(value) });
  });
  
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename="${titulo}.xlsx"`);
  
  return workbook.xlsx.write(res).then(() => {
    res.end();
  });
}

module.exports = exports;

