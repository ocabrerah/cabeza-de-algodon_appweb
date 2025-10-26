import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { usuariosAPI } from '../services/api';
import toast from 'react-hot-toast';
import './Pages.css';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'enfermero',
    telefono: '',
    especialidad: ''
  });

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const response = await usuariosAPI.obtenerTodos({});
      setUsuarios(response.data);
    } catch (error) {
      toast.error('Error al cargar usuarios');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (usuarioEditando) {
        await usuariosAPI.actualizar(usuarioEditando.id, formData);
        toast.success('Usuario actualizado');
      } else {
        await usuariosAPI.crear(formData);
        toast.success('Usuario creado');
      }
      setModalAbierto(false);
      cargarUsuarios();
    } catch (error) {
      toast.error('Error al guardar');
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Desactivar este usuario?')) {
      try {
        await usuariosAPI.eliminar(id);
        toast.success('Usuario desactivado');
        cargarUsuarios();
      } catch (error) {
        toast.error('Error al eliminar');
      }
    }
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1>Gestión de Usuarios</h1>
            <p>Administración de usuarios del sistema</p>
          </div>
          <Button variant="primary" icon={<Plus size={20} />} onClick={() => setModalAbierto(true)}>
            Nuevo Usuario
          </Button>
        </div>

        <Card>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Especialidad</th>
                  <th>Teléfono</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td><strong>{usuario.nombre}</strong></td>
                    <td>{usuario.email}</td>
                    <td><span className="badge badge-completada">{usuario.rol}</span></td>
                    <td>{usuario.especialidad || '-'}</td>
                    <td>{usuario.telefono || '-'}</td>
                    <td><span className={`badge ${usuario.activo ? 'badge-completada' : 'badge-cancelada'}`}>
                      {usuario.activo ? 'Activo' : 'Inactivo'}
                    </span></td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon btn-warning" onClick={() => { setUsuarioEditando(usuario); setFormData(usuario); setModalAbierto(true); }}>
                          <Edit size={16} />
                        </button>
                        <button className="btn-icon btn-danger" onClick={() => handleEliminar(usuario.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Modal isOpen={modalAbierto} onClose={() => setModalAbierto(false)} title={usuarioEditando ? 'Editar Usuario' : 'Nuevo Usuario'}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre *</label>
              <input type="text" value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required disabled={usuarioEditando} />
            </div>
            {!usuarioEditando && (
              <div className="form-group">
                <label>Contraseña *</label>
                <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
              </div>
            )}
            <div className="form-group">
              <label>Rol *</label>
              <select value={formData.rol} onChange={(e) => setFormData({...formData, rol: e.target.value})} required>
                <option value="enfermero">Enfermero</option>
                <option value="medico">Médico</option>
                <option value="farmacia">Farmacia</option>
                <option value="laboratorio">Laboratorio</option>
                <option value="caja">Caja</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {formData.rol === 'medico' && (
              <div className="form-group">
                <label>Especialidad</label>
                <input type="text" value={formData.especialidad} onChange={(e) => setFormData({...formData, especialidad: e.target.value})} />
              </div>
            )}
            <div className="form-group">
              <label>Teléfono</label>
              <input type="tel" value={formData.telefono} onChange={(e) => setFormData({...formData, telefono: e.target.value})} />
            </div>
            <div className="modal-actions">
              <Button type="button" variant="secondary" onClick={() => setModalAbierto(false)}>Cancelar</Button>
              <Button type="submit" variant="primary">Guardar</Button>
            </div>
          </form>
        </Modal>
      </div>
    </Layout>
  );
};

export default Usuarios;

