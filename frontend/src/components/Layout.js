/**
 * Componente de Layout Principal
 * @author Omar Cabrera
 */

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, FiUsers, FiClipboard, FiActivity, FiFlask, FiPackage,
  FiDollarSign, FiFileText, FiSettings, FiLogOut, FiMenu, FiX, FiUser
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard', roles: ['admin', 'staff', 'empleado', 'medico', 'enfermero', 'laboratorista', 'farmaceutico'] },
    { path: '/pacientes', icon: FiUsers, label: 'Pacientes', roles: ['admin', 'staff', 'empleado', 'medico', 'enfermero'] },
    { path: '/solicitudes', icon: FiClipboard, label: 'Solicitudes', roles: ['admin', 'staff', 'empleado', 'medico', 'enfermero', 'fundacion'] },
    { path: '/visitas', icon: FiActivity, label: 'Visitas Médicas', roles: ['admin', 'medico', 'enfermero'] },
    { path: '/laboratorio', icon: FiFlask, label: 'Laboratorio', roles: ['admin', 'laboratorista', 'medico'] },
    { path: '/farmacia', icon: FiPackage, label: 'Farmacia', roles: ['admin', 'farmaceutico', 'medico'] },
    { path: '/caja', icon: FiDollarSign, label: 'Caja', roles: ['admin', 'staff'] },
    { path: '/reportes', icon: FiFileText, label: 'Reportes', roles: ['admin', 'staff'] },
    { path: '/usuarios', icon: FiSettings, label: 'Usuarios', roles: ['admin'] },
  ];

  const filteredMenu = menuItems.filter(item => 
    !item.roles || item.roles.includes(user?.rol)
  );

  return (
    <div className="layout">
      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth > 768) && (
          <motion.aside
            className="sidebar"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="sidebar-header">
              <div className="logo-container">
                <div className="logo-gradient">
                  <span className="logo-text">CA</span>
                </div>
                <div className="logo-info">
                  <h3>Cabeza de Algodón</h3>
                  <p>Sistema de Gestión</p>
                </div>
              </div>
            </div>

            <nav className="sidebar-nav">
              {filteredMenu.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => window.innerWidth <= 768 && setSidebarOpen(false)}
                  >
                    <Icon className="nav-icon" />
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        className="active-indicator"
                        layoutId="activeIndicator"
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="sidebar-footer">
              <div className="user-info">
                <div className="user-avatar">
                  <FiUser />
                </div>
                <div className="user-details">
                  <p className="user-name">{user?.nombre} {user?.apellido}</p>
                  <p className="user-role">{user?.rol}</p>
                </div>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                <FiLogOut />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="main-content">
        <header className="topbar">
          <button 
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <FiX /> : <FiMenu />}
          </button>

          <div className="topbar-actions">
            <div className="user-badge">
              <FiUser />
              <span>{user?.nombre}</span>
            </div>
          </div>
        </header>

        <main className="content">
          {children}
        </main>

        <footer className="footer">
          <p>© 2025 Asilo Cabeza de Algodón - Desarrollado por Omar Cabrera</p>
        </footer>
      </div>

      {/* Overlay para móviles */}
      {sidebarOpen && window.innerWidth <= 768 && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;

