import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { Plus } from 'lucide-react';
import { solicitudesAPI, pacientesAPI, usuariosAPI } from '../services/api';
import toast from 'react-hot-toast';
import './Pages.css';

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [enfermeros, setEnfermeros] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [formData, setFormData] = useState({
    pacienteId: '',
    motivo: '',
    especialidadRequerida: '',
    prioridad: 'media',
    observaciones: '',
    enfermeroId: ''
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [solResponse, pacResponse, enfResponse] = await Promise.all([
        solicitudesAPI.obtenerTodas({}),
        pacientesAPI.obtenerTodos({ activo: true }),
        usuariosAPI.obtenerTodos({ rol: 'enfermero' })
      ]);
      setSolicitudes(solResponse.data);
      setPacientes(pacResponse.data);
      setEnfermeros(enfResponse.data);
    } catch (error) {
      toast.error('Error al cargar datos');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await solicitudesAPI.crear(formData);
      toast.success('Solicitud creada exitosamente');
      setModalAbierto(false);
      cargarDatos();
    } catch (error) {
      toast.error('Error al crear solicitud');
    }
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1>Solicitudes Médicas</h1>
            <p>Gestión de solicitudes de atención médica</p>
          </div>
          <Button variant="primary" icon={<Plus size={20} />} onClick={() => setModalAbierto(true)}>
            Nueva Solicitud
          </Button>
        </div>

        <Card>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Motivo</th>
                  <th>Especialidad</th>
                  <th>Prioridad</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map((sol) => (
                  <tr key={sol.id}>
                    <td><strong>{sol.paciente?.nombre}</strong></td>
                    <td>{sol.motivo?.substring(0, 50)}...</td>
                    <td>{sol.especialidadRequerida}</td>
                    <td><span className={`badge badge-${sol.prioridad}`}>{sol.prioridad}</span></td>
                    <td><span className={`badge badge-${sol.estado}`}>{sol.estado}</span></td>
                    <td>{new Date(sol.fechaSolicitud).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Modal isOpen={modalAbierto} onClose={() => setModalAbierto(false)} title="Nueva Solicitud" size="medium">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Paciente *</label>
              <select value={formData.pacienteId} onChange={(e) => setFormData({...formData, pacienteId: e.target.value})} required>
                <option value="">Seleccionar paciente</option>
                {pacientes.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Motivo *</label>
              <textarea value={formData.motivo} onChange={(e) => setFormData({...formData, motivo: e.target.value})} rows="3" required></textarea>
            </div>
            <div className="form-group">
              <label>Especialidad Requerida *</label>
              <input type="text" value={formData.especialidadRequerida} onChange={(e) => setFormData({...formData, especialidadRequerida: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Prioridad</label>
              <select value={formData.prioridad} onChange={(e) => setFormData({...formData, prioridad: e.target.value})}>
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
                <option value="urgente">Urgente</option>
              </select>
            </div>
            <div className="form-group">
              <label>Enfermero Asignado</label>
              <select value={formData.enfermeroId} onChange={(e) => setFormData({...formData, enfermeroId: e.target.value})}>
                <option value="">Seleccionar enfermero</option>
                {enfermeros.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
              </select>
            </div>
            <div className="modal-actions">
              <Button type="button" variant="secondary" onClick={() => setModalAbierto(false)}>Cancelar</Button>
              <Button type="submit" variant="primary">Crear</Button>
            </div>
          </form>
        </Modal>
      </div>
    </Layout>
  );
};

export default Solicitudes;

