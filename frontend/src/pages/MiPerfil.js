import React, { useState } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import { Camera, User, Mail, Phone, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';
import './Pages.css';
import './MiPerfil.css';

const MiPerfil = () => {
  // Usuario demo fijo
  const usuario = {
    nombre: 'Administrador Demo',
    email: 'admin@demo.com',
    rol: 'admin',
    telefono: '1234-5678',
    especialidad: null,
    fotoPerfil: null
  };

  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({
    nombre: usuario?.nombre || '',
    telefono: usuario?.telefono || '',
    especialidad: usuario?.especialidad || '',
    fotoPerfil: usuario?.fotoPerfil || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Perfil actualizado exitosamente (Demo)');
    setEditando(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({...formData, fotoPerfil: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <h1>Mi Perfil</h1>
          <p>Gestiona tu información personal</p>
        </div>

        <div className="perfil-container">
          <Card className="perfil-card">
            <div className="perfil-header">
              <div className="perfil-foto-container">
                <div className="perfil-foto">
                  {formData.fotoPerfil ? (
                    <img src={formData.fotoPerfil} alt={formData.nombre} />
                  ) : (
                    <User size={48} />
                  )}
                </div>
                {editando && (
                  <label className="perfil-foto-cambiar">
                    <Camera size={20} />
                    <input type="file" accept="image/*" onChange={handleFileChange} style={{display: 'none'}} />
                  </label>
                )}
              </div>
              <div className="perfil-info">
                <h2>{usuario?.nombre}</h2>
                <p className="badge badge-completada">{usuario?.rol}</p>
              </div>
            </div>

            {editando ? (
              <form onSubmit={handleSubmit} className="perfil-form">
                <div className="form-group">
                  <label><User size={18} /> Nombre</label>
                  <input type="text" value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label><Phone size={18} /> Teléfono</label>
                  <input type="tel" value={formData.telefono} onChange={(e) => setFormData({...formData, telefono: e.target.value})} />
                </div>
                {usuario?.rol === 'medico' && (
                  <div className="form-group">
                    <label><Briefcase size={18} /> Especialidad</label>
                    <input type="text" value={formData.especialidad} onChange={(e) => setFormData({...formData, especialidad: e.target.value})} />
                  </div>
                )}
                <div className="modal-actions">
                  <Button type="button" variant="secondary" onClick={() => setEditando(false)}>Cancelar</Button>
                  <Button type="submit" variant="primary">Guardar Cambios</Button>
                </div>
              </form>
            ) : (
              <div className="perfil-detalles">
                <div className="info-item">
                  <Mail size={20} />
                  <div>
                    <label>Email</label>
                    <p>{usuario?.email}</p>
                  </div>
                </div>
                <div className="info-item">
                  <Phone size={20} />
                  <div>
                    <label>Teléfono</label>
                    <p>{usuario?.telefono || 'No especificado'}</p>
                  </div>
                </div>
                {usuario?.rol === 'medico' && usuario?.especialidad && (
                  <div className="info-item">
                    <Briefcase size={20} />
                    <div>
                      <label>Especialidad</label>
                      <p>{usuario.especialidad}</p>
                    </div>
                  </div>
                )}
                <Button variant="primary" onClick={() => setEditando(true)} style={{marginTop: '24px'}}>
                  Editar Perfil
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default MiPerfil;
