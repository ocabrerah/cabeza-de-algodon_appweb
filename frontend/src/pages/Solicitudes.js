import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { FiClipboard } from 'react-icons/fi';
import './Common.css';

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSolicitudes();
  }, []);

  const loadSolicitudes = async () => {
    try {
      const response = await axios.get('/api/solicitudes');
      if (response.data.success) {
        setSolicitudes(response.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="page">
        <div className="page-header">
          <div>
            <h1>Solicitudes Médicas</h1>
            <p>Gestión de solicitudes y referencias</p>
          </div>
        </div>

        {loading ? (
          <div className="loading-container"><div className="loader"></div></div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Especialidad</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.length === 0 ? (
                  <tr><td colSpan="4"><div className="empty-state"><FiClipboard size={48} /><p>No hay solicitudes</p></div></td></tr>
                ) : (
                  solicitudes.map(sol => (
                    <tr key={sol.id}>
                      <td>{sol.paciente_nombre} {sol.paciente_apellido}</td>
                      <td>{sol.especialidad_nombre}</td>
                      <td><span className={`badge badge-${sol.estado === 'pendiente' ? 'warning' : 'success'}`}>{sol.estado}</span></td>
                      <td>{new Date(sol.fecha_solicitud).toLocaleDateString('es-HN')}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Solicitudes;

