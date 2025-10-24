import React from 'react';
import Layout from '../components/Layout';
import './Common.css';

const Caja = () => {
  return (
    <Layout>
      <div className="page">
        <div className="page-header">
          <div>
            <h1>Caja y Finanzas</h1>
            <p>Gestión de entradas, salidas y donaciones</p>
          </div>
        </div>
        <div className="empty-state" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p>Módulo de caja disponible</p>
        </div>
      </div>
    </Layout>
  );
};

export default Caja;

