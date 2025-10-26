import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Páginas
import Dashboard from './pages/Dashboard';
import Pacientes from './pages/Pacientes';
import PacienteDetalle from './pages/PacienteDetalle';
import Solicitudes from './pages/Solicitudes';
import Visitas from './pages/Visitas';
import Farmacia from './pages/Farmacia';
import Caja from './pages/Caja';
import Reportes from './pages/Reportes';
import Usuarios from './pages/Usuarios';
import MiPerfil from './pages/MiPerfil';

function App() {
  return (
    <Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#2c3e50',
            border: '1px solid #dfe6e9',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          },
          success: {
            iconTheme: {
              primary: '#27ae60',
              secondary: '#fff'
            }
          },
          error: {
            iconTheme: {
              primary: '#e74c3c',
              secondary: '#fff'
            }
          }
        }}
      />
      <Routes>
        {/* VERSION DEMO - TODAS LAS RUTAS PÚBLICAS */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/pacientes/:id" element={<PacienteDetalle />} />
        <Route path="/solicitudes" element={<Solicitudes />} />
        <Route path="/visitas" element={<Visitas />} />
        <Route path="/farmacia" element={<Farmacia />} />
        <Route path="/caja" element={<Caja />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/mi-perfil" element={<MiPerfil />} />
        
        {/* Redirección por defecto al Dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;

