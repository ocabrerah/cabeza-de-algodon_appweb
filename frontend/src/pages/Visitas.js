import React from 'react';
import Layout from '../components/Layout';
import './Common.css';

const Visitas = () => {
  return (
    <Layout>
      <div className="page">
        <div className="page-header">
          <div>
            <h1>Visitas Médicas</h1>
            <p>Fichas médicas y consultas</p>
          </div>
        </div>
        <div className="empty-state" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p>Módulo de visitas médicas disponible</p>
        </div>
      </div>
    </Layout>
  );
};

export default Visitas;

