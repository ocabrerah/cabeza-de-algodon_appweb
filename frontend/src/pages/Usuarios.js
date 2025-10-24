import React from 'react';
import Layout from '../components/Layout';
import './Common.css';

const Usuarios = () => {
  return (
    <Layout>
      <div className="page">
        <div className="page-header">
          <div>
            <h1>Gestión de Usuarios</h1>
            <p>Administración de usuarios y permisos</p>
          </div>
        </div>
        <div className="empty-state" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p>Módulo de usuarios disponible (Solo Administradores)</p>
        </div>
      </div>
    </Layout>
  );
};

export default Usuarios;

