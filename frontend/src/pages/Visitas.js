import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import { visitasAPI } from '../services/api';
import './Pages.css';

const Visitas = () => {
  const [visitas, setVisitas] = useState([]);

  useEffect(() => {
    cargarVisitas();
  }, []);

  const cargarVisitas = async () => {
    try {
      const response = await visitasAPI.obtenerTodas({});
      setVisitas(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1>Visitas Médicas</h1>
            <p>Historial de visitas y consultas médicas</p>
          </div>
        </div>

        <Card>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Médico</th>
                  <th>Fecha</th>
                  <th>Motivo</th>
                  <th>Diagnóstico</th>
                  <th>Estado</th>
                  <th>Costo</th>
                </tr>
              </thead>
              <tbody>
                {visitas.map((visita) => (
                  <tr key={visita.id}>
                    <td><strong>{visita.paciente?.nombre}</strong></td>
                    <td>{visita.medico?.nombre}</td>
                    <td>{new Date(visita.fechaVisita).toLocaleDateString()}</td>
                    <td>{visita.motivoVisita?.substring(0, 30)}...</td>
                    <td>{visita.diagnostico?.substring(0, 30) || 'Pendiente'}...</td>
                    <td><span className={`badge badge-${visita.estado}`}>{visita.estado}</span></td>
                    <td>Q{visita.costoConsulta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Visitas;

