import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import { Users, ClipboardList, Stethoscope, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { mockPacientes, mockSolicitudes, mockVisitas, calcularResumenCaja } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  const [estadisticas, setEstadisticas] = useState({
    totalPacientes: 0,
    solicitudesPendientes: 0,
    visitasHoy: 0,
    ingresos: 0,
    egresos: 0,
    balance: 0
  });
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = () => {
    const resumenCaja = calcularResumenCaja();
    const solicitudesPendientes = mockSolicitudes.filter(s => s.estado === 'pendiente' || s.estado === 'en_proceso');
    
    setEstadisticas({
      totalPacientes: mockPacientes.length,
      solicitudesPendientes: solicitudesPendientes.length,
      visitasHoy: 2,
      ingresos: resumenCaja.ingresos,
      egresos: resumenCaja.egresos,
      balance: resumenCaja.balance
    });
  };

  const datosGrafico = [
    { mes: 'Ene', ingresos: 45000, egresos: 32000 },
    { mes: 'Feb', ingresos: 52000, egresos: 35000 },
    { mes: 'Mar', ingresos: 48000, egresos: 38000 },
    { mes: 'Abr', ingresos: 61000, egresos: 42000 },
    { mes: 'May', ingresos: 55000, egresos: 39000 },
    { mes: 'Jun', ingresos: 67000, egresos: 45000 }
  ];

  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Resumen General</h1>
          <p>Vista panorámica del estado del asilo</p>
        </div>

        {/* Estadísticas principales */}
        <div className="stats-grid">
          <Card className="stat-card stat-primary">
            <div className="stat-icon">
              <Users size={32} />
            </div>
            <div className="stat-content">
              <h3>Pacientes Activos</h3>
              <p className="stat-value">{estadisticas.totalPacientes}</p>
              <span className="stat-label">Total en el asilo</span>
            </div>
          </Card>

          <Card className="stat-card stat-warning">
            <div className="stat-icon">
              <ClipboardList size={32} />
            </div>
            <div className="stat-content">
              <h3>Solicitudes Pendientes</h3>
              <p className="stat-value">{estadisticas.solicitudesPendientes}</p>
              <span className="stat-label">Por asignar</span>
            </div>
          </Card>

          <Card className="stat-card stat-info">
            <div className="stat-icon">
              <Stethoscope size={32} />
            </div>
            <div className="stat-content">
              <h3>Visitas Hoy</h3>
              <p className="stat-value">{estadisticas.visitasHoy}</p>
              <span className="stat-label">Programadas</span>
            </div>
          </Card>

          <Card className="stat-card stat-success">
            <div className="stat-icon">
              <DollarSign size={32} />
            </div>
            <div className="stat-content">
              <h3>Balance</h3>
              <p className="stat-value">Q{estadisticas.balance.toLocaleString()}</p>
              <span className="stat-label">Ingresos - Egresos</span>
            </div>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="dashboard-charts">
          <Card title="Ingresos vs Egresos (Últimos 6 meses)">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={datosGrafico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ingresos" fill="#27ae60" name="Ingresos" />
                <Bar dataKey="egresos" fill="#e74c3c" name="Egresos" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Tendencia Mensual">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={datosGrafico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ingresos" stroke="#27ae60" strokeWidth={2} name="Ingresos" />
                <Line type="monotone" dataKey="egresos" stroke="#e74c3c" strokeWidth={2} name="Egresos" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Alertas */}
        <Card title="Alertas y Notificaciones" className="alerts-card">
          <div className="alert-item alert-warning">
            <AlertCircle size={20} />
            <div>
              <h4>Solicitudes Pendientes</h4>
              <p>Hay {estadisticas.solicitudesPendientes} solicitudes médicas esperando asignación</p>
            </div>
          </div>
          <div className="alert-item alert-info">
            <TrendingUp size={20} />
            <div>
              <h4>Balance Positivo</h4>
              <p>El balance del mes es positivo: Q{estadisticas.balance.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;

