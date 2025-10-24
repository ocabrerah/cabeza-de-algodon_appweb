/**
 * Controlador de Reportes
 * @author Omar Cabrera
 */

const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');
const { Document, Packer, Paragraph, TextRun, Table, TableCell, TableRow } = require('docx');
const { pool } = require('../config/database');
const path = require('path');
const fs = require('fs');

class ReporteController {
  // Reporte de costos por cita de paciente (PDF)
  static async costoCitaPaciente(req, res) {
    try {
      const { paciente_id, formato } = req.query;

      // Obtener datos
      const query = `
        SELECT v.*, m.nombre as medico_nombre, m.apellido as medico_apellido,
          e.nombre as especialidad_nombre,
          p.nombre as paciente_nombre, p.apellido as paciente_apellido, p.numero_expediente,
          (SELECT COALESCE(SUM(costo), 0) FROM examenes_laboratorio WHERE visita_medica_id = v.id) as costo_examenes,
          (SELECT COALESCE(SUM(costo_total), 0) FROM prescripciones WHERE visita_medica_id = v.id) as costo_medicamentos
        FROM visitas_medicas v
        LEFT JOIN medicos m ON v.medico_id = m.id
        LEFT JOIN especialidades e ON m.especialidad_id = e.id
        LEFT JOIN pacientes p ON v.paciente_id = p.id
        WHERE v.paciente_id = ? AND v.estado = 'completada'
        ORDER BY v.fecha_visita DESC
      `;
      const [visitas] = await pool.execute(query, [paciente_id]);

      if (formato === 'pdf') {
        return await ReporteController.generatePDF(req, res, 'costos_cita', visitas);
      } else if (formato === 'excel') {
        return await ReporteController.generateExcel(req, res, 'costos_cita', visitas);
      } else if (formato === 'word') {
        return await ReporteController.generateWord(req, res, 'costos_cita', visitas);
      }

      res.json({ success: true, data: visitas });
    } catch (error) {
      console.error('Error en reporte:', error);
      res.status(500).json({ success: false, message: 'Error al generar reporte' });
    }
  }

  // Reporte de ficha médica del paciente
  static async fichaMedicaPaciente(req, res) {
    try {
      const { paciente_id, formato } = req.query;

      const query = `
        SELECT p.*,
          (SELECT GROUP_CONCAT(CONCAT(nombre, ' ', apellido) SEPARATOR ', ') 
           FROM familiares WHERE paciente_id = p.id) as familiares
        FROM pacientes p
        WHERE p.id = ?
      `;
      const [pacienteData] = await pool.execute(query, [paciente_id]);

      const historialQuery = `
        SELECT v.*, m.nombre as medico_nombre, m.apellido as medico_apellido,
          e.nombre as especialidad_nombre
        FROM visitas_medicas v
        LEFT JOIN medicos m ON v.medico_id = m.id
        LEFT JOIN especialidades e ON m.especialidad_id = e.id
        WHERE v.paciente_id = ? AND v.estado = 'completada'
        ORDER BY v.fecha_visita DESC
      `;
      const [historial] = await pool.execute(historialQuery, [paciente_id]);

      const data = {
        paciente: pacienteData[0],
        historial
      };

      if (formato === 'pdf') {
        return await ReporteController.generatePDF(req, res, 'ficha_medica', data);
      } else if (formato === 'excel') {
        return await ReporteController.generateExcel(req, res, 'ficha_medica', data);
      } else if (formato === 'word') {
        return await ReporteController.generateWord(req, res, 'ficha_medica', data);
      }

      res.json({ success: true, data });
    } catch (error) {
      console.error('Error en reporte:', error);
      res.status(500).json({ success: false, message: 'Error al generar reporte' });
    }
  }

  // Reporte de cobros por paciente
  static async cobrosPaciente(req, res) {
    try {
      const { paciente_id, fecha_inicio, fecha_fin } = req.query;

      const query = `
        SELECT m.*, c.paciente_id, p.nombre as paciente_nombre, p.apellido as paciente_apellido
        FROM movimientos_cuenta m
        LEFT JOIN cuentas_paciente c ON m.cuenta_id = c.id
        LEFT JOIN pacientes p ON c.paciente_id = p.id
        WHERE c.paciente_id = ? AND DATE(m.fecha_movimiento) BETWEEN ? AND ?
        ORDER BY m.fecha_movimiento DESC
      `;
      const [movimientos] = await pool.execute(query, [paciente_id, fecha_inicio, fecha_fin]);

      res.json({ success: true, data: movimientos });
    } catch (error) {
      console.error('Error en reporte:', error);
      res.status(500).json({ success: false, message: 'Error al generar reporte' });
    }
  }

  // Reporte de donaciones y cobros
  static async entradas(req, res) {
    try {
      const { fecha_inicio, fecha_fin } = req.query;

      const donacionesQuery = `
        SELECT * FROM donaciones 
        WHERE fecha_donacion BETWEEN ? AND ?
        ORDER BY fecha_donacion DESC
      `;
      const [donaciones] = await pool.execute(donacionesQuery, [fecha_inicio, fecha_fin]);

      const cobrosQuery = `
        SELECT m.*, p.nombre as paciente_nombre, p.apellido as paciente_apellido
        FROM movimientos_cuenta m
        LEFT JOIN cuentas_paciente c ON m.cuenta_id = c.id
        LEFT JOIN pacientes p ON c.paciente_id = p.id
        WHERE m.tipo = 'abono' AND DATE(m.fecha_movimiento) BETWEEN ? AND ?
        ORDER BY m.fecha_movimiento DESC
      `;
      const [cobros] = await pool.execute(cobrosQuery, [fecha_inicio, fecha_fin]);

      res.json({ success: true, data: { donaciones, cobros } });
    } catch (error) {
      console.error('Error en reporte:', error);
      res.status(500).json({ success: false, message: 'Error al generar reporte' });
    }
  }

  // Generar PDF
  static async generatePDF(req, res, tipo, data) {
    const doc = new PDFDocument({ margin: 50 });
    const filename = `reporte_${tipo}_${Date.now()}.pdf`;
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
    doc.pipe(res);

    // Encabezado
    doc.fontSize(20).text('Asilo de Ancianos "Cabeza de Algodón"', { align: 'center' });
    doc.fontSize(12).text('Sistema de Gestión Médica', { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text(`Reporte: ${tipo.replace('_', ' ').toUpperCase()}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(10).text(`Generado: ${new Date().toLocaleString('es-HN')}`, { align: 'right' });
    doc.moveDown(2);

    // Contenido según tipo
    if (tipo === 'costos_cita' && Array.isArray(data)) {
      doc.fontSize(12).text(`Paciente: ${data[0]?.paciente_nombre} ${data[0]?.paciente_apellido}`);
      doc.fontSize(10).text(`Expediente: ${data[0]?.numero_expediente}`);
      doc.moveDown();

      data.forEach((visita, index) => {
        const costoTotal = parseFloat(visita.costo_consulta || 0) + 
                          parseFloat(visita.costo_examenes || 0) + 
                          parseFloat(visita.costo_medicamentos || 0);

        doc.fontSize(11).text(`${index + 1}. ${new Date(visita.fecha_visita).toLocaleDateString('es-HN')}`);
        doc.fontSize(9).text(`   Médico: ${visita.medico_nombre} ${visita.medico_apellido} - ${visita.especialidad_nombre}`);
        doc.text(`   Consulta: L. ${parseFloat(visita.costo_consulta || 0).toFixed(2)}`);
        doc.text(`   Exámenes: L. ${parseFloat(visita.costo_examenes || 0).toFixed(2)}`);
        doc.text(`   Medicamentos: L. ${parseFloat(visita.costo_medicamentos || 0).toFixed(2)}`);
        doc.text(`   Total: L. ${costoTotal.toFixed(2)}`, { bold: true });
        doc.moveDown();
      });
    }

    // Pie de página
    doc.fontSize(8).text('© 2025 - Desarrollado por Omar Cabrera', { align: 'center' });
    
    doc.end();
  }

  // Generar Excel
  static async generateExcel(req, res, tipo, data) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte');

    // Encabezado
    worksheet.mergeCells('A1:E1');
    worksheet.getCell('A1').value = 'Asilo de Ancianos "Cabeza de Algodón"';
    worksheet.getCell('A1').font = { size: 16, bold: true };
    worksheet.getCell('A1').alignment = { horizontal: 'center' };

    if (tipo === 'costos_cita' && Array.isArray(data)) {
      worksheet.addRow([]);
      worksheet.addRow(['Fecha', 'Médico', 'Especialidad', 'Consulta', 'Exámenes', 'Medicamentos', 'Total']);
      
      data.forEach(visita => {
        const costoTotal = parseFloat(visita.costo_consulta || 0) + 
                          parseFloat(visita.costo_examenes || 0) + 
                          parseFloat(visita.costo_medicamentos || 0);

        worksheet.addRow([
          new Date(visita.fecha_visita).toLocaleDateString('es-HN'),
          `${visita.medico_nombre} ${visita.medico_apellido}`,
          visita.especialidad_nombre,
          parseFloat(visita.costo_consulta || 0),
          parseFloat(visita.costo_examenes || 0),
          parseFloat(visita.costo_medicamentos || 0),
          costoTotal
        ]);
      });
    }

    const filename = `reporte_${tipo}_${Date.now()}.xlsx`;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    await workbook.xlsx.write(res);
    res.end();
  }

  // Generar Word
  static async generateWord(req, res, tipo, data) {
    const doc = new Document({
      sections: [{
        children: [
          new Paragraph({
            text: 'Asilo de Ancianos "Cabeza de Algodón"',
            heading: 'Heading1',
            alignment: 'center'
          }),
          new Paragraph({
            text: `Reporte: ${tipo.replace('_', ' ').toUpperCase()}`,
            heading: 'Heading2',
            alignment: 'center'
          }),
          new Paragraph({ text: '' }),
          new Paragraph({
            text: `Generado: ${new Date().toLocaleString('es-HN')}`
          })
        ]
      }]
    });

    const filename = `reporte_${tipo}_${Date.now()}.docx`;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    const buffer = await Packer.toBuffer(doc);
    res.send(buffer);
  }
}

module.exports = ReporteController;

