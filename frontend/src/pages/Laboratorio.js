import React from 'react';
import Layout from '../components/Layout';
import './Common.css';

const Laboratorio = () => {
  return (
    <Layout>
      <div className="page">
        <div className="page-header">
          <div>
            <h1>Laboratorio Clínico</h1>
            <p>Gestión de exámenes y resultados</p>
          </div>
        </div>
        <div className="empty-state" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p>Módulo de laboratorio disponible</p>
        </div>
      </div>
    </Layout>
  );
};

export default Laboratorio;

