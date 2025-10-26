import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Configurar axios para incluir el token en todas las peticiones
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      cargarPerfil();
    } else {
      setCargando(false);
    }
  }, []);

  const cargarPerfil = async () => {
    try {
      const response = await axios.get('/auth/perfil');
      setUsuario(response.data);
    } catch (error) {
      console.error('Error al cargar perfil:', error);
      logout();
    } finally {
      setCargando(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      const { token, usuario: usuarioData } = response.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUsuario(usuarioData);
      
      toast.success(`¡Bienvenido(a) ${usuarioData.nombre}!`);
      return true;
    } catch (error) {
      const mensaje = error.response?.data?.message || 'Error al iniciar sesión';
      toast.error(mensaje);
      console.error('Error en login:', error);
      return false;
    }
  };

  const register = async (datosRegistro) => {
    try {
      await axios.post('/auth/registro', datosRegistro);
      toast.success('Registro exitoso. Se ha enviado un email de confirmación');
      return true;
    } catch (error) {
      const mensaje = error.response?.data?.message || 'Error al registrar usuario';
      toast.error(mensaje);
      console.error('Error en registro:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUsuario(null);
    toast.success('Sesión cerrada exitosamente');
  };

  const actualizarPerfil = async (datos) => {
    try {
      const response = await axios.put('/auth/perfil', datos);
      setUsuario(response.data.usuario);
      toast.success('Perfil actualizado exitosamente');
      return true;
    } catch (error) {
      const mensaje = error.response?.data?.message || 'Error al actualizar perfil';
      toast.error(mensaje);
      console.error('Error al actualizar perfil:', error);
      return false;
    }
  };

  const value = {
    usuario,
    cargando,
    login,
    register,
    logout,
    actualizarPerfil
  };

  return (
    <AuthContext.Provider value={value}>
      {!cargando && children}
    </AuthContext.Provider>
  );
};

