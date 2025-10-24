/**
 * Página de Dashboard
 * @author Omar Cabrera
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiActivity, FiDollarSign, FiTrendingUp, FiCalendar, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    pacientes: 0,
    solicitudes_pendientes: 0,
    visitas_hoy: 0,
    ingresos_mes: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Cargar datos simulados (puedes implementar endpoints específicos)
      const [pacientesRes, solicitudesRes] = await Promise.all([
        axios.get('/api/pacientes'),
        axios.get('/api/solicitudes?estado=pendiente')
      ]);

      setStats({
        pacientes: pacientesRes.data.data?.length || 0,
        solicitudes_pendientes: solicitudesRes.data.data?.length || 0,
        visitas_hoy: 0,
        ingresos_mes: 0
      });
    } catch (error) {
      console.error('Error al cargar dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: 'Total Pacientes',
      value: stats.pacientes,
      icon: FiUsers,
      color: 'primary',
      trend: '+12%'
    },
    {
      title: 'Solicitudes Pendientes',
      value: stats.solicitudes_pendientes,
      icon: FiCalendar,
      color: 'warning',
      trend: '5 nuevas'
    },
    {
      title: 'Visitas Hoy',
      value: stats.visitas_hoy,
      icon: FiActivity,
      color: 'success',
      trend: '3 programadas'
    },
    {
      title: 'Ingresos del Mes',
      value: `L. ${stats.ingresos_mes.toLocaleString()}`,
      icon: FiDollarSign,
      color: 'info',
      trend: '+8%'
    }
  ];

  return (
    <Layout>
      <div className="dashboard-page">
        <div className="page-header">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>Dashboard</h1>
            <p>Bienvenido, {user?.nombre} {user?.apellido}</p>
          </motion.div>
        </div>

        {loading ? (
          <div className="dashboard-loading">
            <div className="loader"></div>
            <p>Cargando información...</p>
          </div>
        ) : (
          <>
            <div className="stats-grid">
              {statsCards.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  className={`stat-card stat-${stat.color}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="stat-icon">
                    <stat.icon />
                  </div>
                  <div className="stat-content">
                    <p className="stat-title">{stat.title}</p>
                    <h3 className="stat-value">{stat.value}</h3>
                    <span className="stat-trend">
                      <FiTrendingUp /> {stat.trend}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="dashboard-content">
              <motion.div
                className="info-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="info-icon">
                  <FiAlertCircle />
                </div>
                <div className="info-content">
                  <h3>Sistema Operativo</h3>
                  <p>
                    El sistema está funcionando correctamente. 
                    Todos los módulos están disponibles y operativos.
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;

