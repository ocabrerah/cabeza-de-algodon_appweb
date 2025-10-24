import React from 'react';
import Layout from '../components/Layout';
import './Common.css';

const Farmacia = () => {
  return (
    <Layout>
      <div className="page">
        <div className="page-header">
          <div>
            <h1>Farmacia</h1>
            <p>Gestión de medicamentos y prescripciones</p>
          </div>
        </div>
        <div className="empty-state" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p>Módulo de farmacia disponible</p>
        </div>
      </div>
    </Layout>
  );
};

export default Farmacia;

