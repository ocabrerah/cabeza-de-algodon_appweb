import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Stethoscope,
  Pill,
  Wallet,
  FileText,
  UserCog,
  Menu,
  X,
  User
} from 'lucide-react';
import './Layout.css';

const Layout = ({ children }) => {
  // Usuario demo fijo
  const usuario = {
    nombre: 'Administrador Demo',
    email: 'admin@demo.com',
    rol: 'admin',
    fotoPerfil: null
  };

  const location = useLocation();
  const [sidebarAbierto, setSidebarAbierto] = useState(true);

  // Todos los menús disponibles (versión demo)
  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/pacientes', icon: Users, label: 'Pacientes' },
    { path: '/solicitudes', icon: ClipboardList, label: 'Solicitudes' },
    { path: '/visitas', icon: Stethoscope, label: 'Visitas Médicas' },
    { path: '/farmacia', icon: Pill, label: 'Farmacia' },
    { path: '/caja', icon: Wallet, label: 'Caja' },
    { path: '/reportes', icon: FileText, label: 'Reportes' },
    { path: '/usuarios', icon: UserCog, label: 'Usuarios' }
  ];

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarAbierto ? 'abierto' : 'cerrado'}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">🏥</div>
            {sidebarAbierto && (
              <div className="logo-text">
                <h2>Cabeza de Algodón</h2>
                <span>Sistema de Gestión</span>
              </div>
            )}
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const activo = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${activo ? 'activo' : ''}`}
                title={!sidebarAbierto ? item.label : ''}
              >
                <Icon size={20} />
                {sidebarAbierto && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button
            className="nav-item"
            onClick={() => setSidebarAbierto(!sidebarAbierto)}
            title={sidebarAbierto ? 'Contraer' : 'Expandir'}
          >
            {sidebarAbierto ? <X size={20} /> : <Menu size={20} />}
            {sidebarAbierto && <span>Contraer</span>}
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <button
              className="menu-toggle"
              onClick={() => setSidebarAbierto(!sidebarAbierto)}
            >
              <Menu size={24} />
            </button>
            <h1 className="page-title">
              {menuItems.find(item => item.path === location.pathname)?.label || 'Asilo Cabeza de Algodón'}
            </h1>
          </div>

          <div className="header-right">
            <div className="user-menu">
              <Link to="/mi-perfil" className="user-info">
                <div className="user-avatar">
                  {usuario?.fotoPerfil ? (
                    <img src={usuario.fotoPerfil} alt={usuario.nombre} />
                  ) : (
                    <User size={20} />
                  )}
                </div>
                <div className="user-details">
                  <span className="user-name">{usuario?.nombre}</span>
                  <span className="user-role">DEMO</span>
                </div>
              </Link>
            </div>
          </div>
        </header>

        {/* Contenido de la página */}
        <main className="page-content">
          {children}
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>&copy; 2025 Asilo Cabeza de Algodón - Todos los derechos reservados - O. Cabrera</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;

