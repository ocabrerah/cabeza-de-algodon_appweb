import React from 'react';
import Layout from '../components/Layout';
import './Common.css';

const Reportes = () => {
  return (
    <Layout>
      <div className="page">
        <div className="page-header">
          <div>
            <h1>Reportes</h1>
            <p>Generación de reportes en PDF, Word y Excel</p>
          </div>
        </div>
        <div className="empty-state" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p>Módulo de reportes disponible</p>
        </div>
      </div>
    </Layout>
  );
};

export default Reportes;

