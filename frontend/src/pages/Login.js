import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    const success = await login(formData.email, formData.password);
    
    if (success) {
      navigate('/dashboard');
    }
    
    setCargando(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-shape shape-1"></div>
        <div className="auth-shape shape-2"></div>
        <div className="auth-shape shape-3"></div>
      </div>

      <div className="auth-content">
        <div className="auth-card">
          <div className="auth-logo">
            <div className="logo-circle">
              <span className="logo-emoji">🏥</span>
            </div>
            <h1>Cabeza de Algodón</h1>
            <p>Sistema de Gestión del Asilo</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>
            <p className="auth-subtitle">Ingresa tus credenciales para acceder</p>

            <div className="form-group">
              <label htmlFor="email">
                <Mail size={18} />
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="usuario@ejemplo.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <Lock size={18} />
                Contraseña
              </label>
              <div className="input-with-icon">
                <input
                  type={mostrarPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                >
                  {mostrarPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-block"
              disabled={cargando}
            >
              {cargando ? (
                <span>Iniciando sesión...</span>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Iniciar Sesión</span>
                </>
              )}
            </button>

            <div className="auth-footer">
              <p>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
            </div>
          </form>

          <div className="auth-demo-info">
            <div className="demo-badge">DEMO</div>
            <p><strong>Credenciales de Admin:</strong></p>
            <p>Email: ocabrerah99@gmail.com</p>
            <p>Contraseña: Admin2025!</p>
          </div>
        </div>

        <div className="auth-info">
          <h2>Bienvenido al Sistema</h2>
          <p>Gestiona de manera eficiente todas las operaciones del Asilo Cabeza de Algodón.</p>
          <div className="info-features">
            <div className="feature-item">
              <div className="feature-icon">📋</div>
              <div className="feature-text">
                <h3>Gestión Completa</h3>
                <p>Pacientes, visitas médicas y más</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💊</div>
              <div className="feature-text">
                <h3>Control Médico</h3>
                <p>Historial completo y medicamentos</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💰</div>
              <div className="feature-text">
                <h3>Administración Financiera</h3>
                <p>Caja, donaciones y reportes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="auth-page-footer">
        <p>&copy; 2025 Asilo Cabeza de Algodón - Todos los derechos reservados - O. Cabrera</p>
      </footer>
    </div>
  );
};

export default Login;

