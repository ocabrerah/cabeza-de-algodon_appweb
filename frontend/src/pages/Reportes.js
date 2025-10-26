import React, { useState } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import { FileText, Download } from 'lucide-react';
import { reportesAPI } from '../services/api';
import toast from 'react-hot-toast';
import './Pages.css';
import './Reportes.css';

const Reportes = () => {
  const [filtros, setFiltros] = useState({
    fechaInicio: '',
    fechaFin: '',
    pacienteId: '',
    formato: 'pdf'
  });

  const generarReporte = async (tipo) => {
    try {
      toast.success('Generando reporte...');
      // Aquí se implementaría la descarga real del archivo
      console.log('Generando reporte:', tipo, filtros);
    } catch (error) {
      toast.error('Error al generar reporte');
    }
  };

  const reportesDisponibles = [
    {
      titulo: 'Costos por Paciente',
      descripcion: 'Detalle de costos médicos por paciente',
      tipo: 'costos-paciente',
      icon: '💰'
    },
    {
      titulo: 'Ficha Médica',
      descripcion: 'Historial médico completo del paciente',
      tipo: 'ficha-medica',
      icon: '📋'
    },
    {
      titulo: 'Cobros por Paciente',
      descripcion: 'Reporte de cobros y pagos',
      tipo: 'cobros-paciente',
      icon: '💳'
    },
    {
      titulo: 'Pagos a Fundación',
      descripcion: 'Resumen de pagos realizados',
      tipo: 'pagos-fundacion',
      icon: '🏥'
    },
    {
      titulo: 'Entradas y Donaciones',
      descripcion: 'Reporte de ingresos',
      tipo: 'entradas',
      icon: '💵'
    },
    {
      titulo: 'Exámenes Médicos',
      descripcion: 'Historial de exámenes por paciente',
      tipo: 'examenes',
      icon: '🔬'
    },
    {
      titulo: 'Medicamentos Aplicados',
      descripcion: 'Registro de medicamentos',
      tipo: 'medicamentos',
      icon: '💊'
    }
  ];

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1>Reportes y Estadísticas</h1>
            <p>Generación de informes del sistema</p>
          </div>
        </div>

        <Card title="Filtros de Búsqueda">
          <div className="form-grid">
            <div className="form-group">
              <label>Fecha Inicio</label>
              <input 
                type="date" 
                value={filtros.fechaInicio}
                onChange={(e) => setFiltros({...filtros, fechaInicio: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Fecha Fin</label>
              <input 
                type="date" 
                value={filtros.fechaFin}
                onChange={(e) => setFiltros({...filtros, fechaFin: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Formato</label>
              <select value={filtros.formato} onChange={(e) => setFiltros({...filtros, formato: e.target.value})}>
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="word">Word</option>
              </select>
            </div>
          </div>
        </Card>

        <div className="reportes-grid">
          {reportesDisponibles.map((reporte) => (
            <Card key={reporte.tipo} className="reporte-card">
              <div className="reporte-icon">{reporte.icon}</div>
              <h3>{reporte.titulo}</h3>
              <p>{reporte.descripcion}</p>
              <Button 
                variant="primary" 
                icon={<Download size={18} />}
                onClick={() => generarReporte(reporte.tipo)}
              >
                Generar
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Reportes;
