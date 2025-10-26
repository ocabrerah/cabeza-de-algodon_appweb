import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, User, Phone, Briefcase, Eye, EyeOff } from 'lucide-react';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmarPassword: '',
    telefono: '',
    rol: 'enfermero',
    especialidad: ''
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

    if (formData.password !== formData.confirmarPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    setCargando(true);

    const { confirmarPassword, ...datosRegistro } = formData;
    const success = await register(datosRegistro);
    
    if (success) {
      setTimeout(() => {
        navigate('/login');
      }, 2000);
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
        <div className="auth-card register-card">
          <div className="auth-logo">
            <div className="logo-circle">
              <span className="logo-emoji">🏥</span>
            </div>
            <h1>Cabeza de Algodón</h1>
            <p>Registro de Nuevo Usuario</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">
                  <User size={18} />
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Juan Pérez"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefono">
                  <Phone size={18} />
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="+502 1234-5678"
                />
              </div>
            </div>

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

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="rol">
                  <Briefcase size={18} />
                  Rol
                </label>
                <select
                  id="rol"
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                  required
                >
                  <option value="enfermero">Enfermero</option>
                  <option value="medico">Médico</option>
                  <option value="farmacia">Farmacia</option>
                  <option value="laboratorio">Laboratorio</option>
                  <option value="caja">Caja</option>
                </select>
              </div>

              {formData.rol === 'medico' && (
                <div className="form-group">
                  <label htmlFor="especialidad">
                    <Briefcase size={18} />
                    Especialidad
                  </label>
                  <input
                    type="text"
                    id="especialidad"
                    name="especialidad"
                    value={formData.especialidad}
                    onChange={handleChange}
                    placeholder="Cardiología, Geriatría, etc."
                  />
                </div>
              )}
            </div>

            <div className="form-row">
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
                    minLength="6"
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

              <div className="form-group">
                <label htmlFor="confirmarPassword">
                  <Lock size={18} />
                  Confirmar Contraseña
                </label>
                <input
                  type={mostrarPassword ? 'text' : 'password'}
                  id="confirmarPassword"
                  name="confirmarPassword"
                  value={formData.confirmarPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-block"
              disabled={cargando}
            >
              {cargando ? 'Registrando...' : 'Crear Cuenta'}
            </button>

            <div className="auth-footer">
              <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
            </div>
          </form>
        </div>
      </div>

      <footer className="auth-page-footer">
        <p>&copy; 2025 Asilo Cabeza de Algodón - O. Cabrera</p>
      </footer>
    </div>
  );
};

export default Register;

