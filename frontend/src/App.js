/**
 * Componente Principal de la Aplicación
 * @author Omar Cabrera
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Páginas
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Pacientes from './pages/Pacientes';
import PacienteDetalle from './pages/PacienteDetalle';
import Solicitudes from './pages/Solicitudes';
import Visitas from './pages/Visitas';
import VisitaDetalle from './pages/VisitaDetalle';
import Laboratorio from './pages/Laboratorio';
import Farmacia from './pages/Farmacia';
import Caja from './pages/Caja';
import Reportes from './pages/Reportes';
import Usuarios from './pages/Usuarios';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#333',
                borderRadius: '10px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              },
              success: {
                iconTheme: {
                  primary: '#4caf50',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#f44336',
                  secondary: '#fff',
                },
              },
            }}
          />
          
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            
            <Route path="/pacientes" element={
              <PrivateRoute>
                <Pacientes />
              </PrivateRoute>
            } />
            
            <Route path="/pacientes/:id" element={
              <PrivateRoute>
                <PacienteDetalle />
              </PrivateRoute>
            } />
            
            <Route path="/solicitudes" element={
              <PrivateRoute>
                <Solicitudes />
              </PrivateRoute>
            } />
            
            <Route path="/visitas" element={
              <PrivateRoute>
                <Visitas />
              </PrivateRoute>
            } />
            
            <Route path="/visitas/:id" element={
              <PrivateRoute>
                <VisitaDetalle />
              </PrivateRoute>
            } />
            
            <Route path="/laboratorio" element={
              <PrivateRoute>
                <Laboratorio />
              </PrivateRoute>
            } />
            
            <Route path="/farmacia" element={
              <PrivateRoute>
                <Farmacia />
              </PrivateRoute>
            } />
            
            <Route path="/caja" element={
              <PrivateRoute>
                <Caja />
              </PrivateRoute>
            } />
            
            <Route path="/reportes" element={
              <PrivateRoute>
                <Reportes />
              </PrivateRoute>
            } />
            
            <Route path="/usuarios" element={
              <PrivateRoute roles={['admin']}>
                <Usuarios />
              </PrivateRoute>
            } />
            
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

