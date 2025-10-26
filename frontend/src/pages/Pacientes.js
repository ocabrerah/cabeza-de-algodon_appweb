import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockPacientes } from '../data/mockData';
import toast from 'react-hot-toast';
import './Pages.css';

const Pacientes = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [pacienteEditando, setPacienteEditando] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    dpi: '',
    fechaNacimiento: '',
    tipoSangre: '',
    sexo: 'M',
    telefono: '',
    direccion: '',
    nombreFamiliar: '',
    telefonoFamiliar: '',
    emailFamiliar: '',
    parentesco: '',
    fechaIngreso: new Date().toISOString().split('T')[0],
    motivoReclusión: '',
    psicopatologia: '',
    medicamentosCajon: '',
    alergias: '',
    antecedentesMedicos: ''
  });

  useEffect(() => {
    cargarPacientes();
  }, []);

  const cargarPacientes = () => {
    setPacientes(mockPacientes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pacienteEditando) {
      toast.success('Paciente actualizado exitosamente (Demo)');
    } else {
      toast.success('Paciente registrado exitosamente (Demo)');
    }
    setModalAbierto(false);
    resetForm();
  };

  const handleEditar = (paciente) => {
    setPacienteEditando(paciente);
    setFormData(paciente);
    setModalAbierto(true);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Está seguro de desactivar este paciente?')) {
      toast.success('Paciente desactivado exitosamente (Demo)');
    }
  };

  const resetForm = () => {
    setPacienteEditando(null);
    setFormData({
      nombre: '',
      dpi: '',
      fechaNacimiento: '',
      tipoSangre: '',
      sexo: 'M',
      telefono: '',
      direccion: '',
      nombreFamiliar: '',
      telefonoFamiliar: '',
      emailFamiliar: '',
      parentesco: '',
      fechaIngreso: new Date().toISOString().split('T')[0],
      motivoReclusión: '',
      psicopatologia: '',
      medicamentosCajon: '',
      alergias: '',
      antecedentesMedicos: ''
    });
  };

  const pacientesFiltrados = pacientes.filter(p => 
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.dpi.includes(busqueda)
  );

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1>Gestión de Pacientes</h1>
            <p>Administración del registro de pacientes del asilo</p>
          </div>
          <Button 
            variant="primary" 
            icon={<Plus size={20} />}
            onClick={() => { resetForm(); setModalAbierto(true); }}
          >
            Nuevo Paciente
          </Button>
        </div>

        <Card>
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Buscar por nombre o DPI..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>DPI</th>
                  <th>Edad</th>
                  <th>Tipo Sangre</th>
                  <th>Familiar</th>
                  <th>Fecha Ingreso</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pacientesFiltrados.map((paciente) => (
                  <tr key={paciente.id}>
                    <td><strong>{paciente.nombre}</strong></td>
                    <td>{paciente.dpi}</td>
                    <td>{new Date().getFullYear() - new Date(paciente.fechaNacimiento).getFullYear()} años</td>
                    <td>{paciente.tipoSangre}</td>
                    <td>{paciente.nombreFamiliar}</td>
                    <td>{new Date(paciente.fechaIngreso).toLocaleDateString()}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon btn-info" onClick={() => navigate(`/pacientes/${paciente.id}`)}>
                          <Eye size={16} />
                        </button>
                        <button className="btn-icon btn-warning" onClick={() => handleEditar(paciente)}>
                          <Edit size={16} />
                        </button>
                        <button className="btn-icon btn-danger" onClick={() => handleEliminar(paciente.id)}>
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

        <Modal
          isOpen={modalAbierto}
          onClose={() => setModalAbierto(false)}
          title={pacienteEditando ? 'Editar Paciente' : 'Nuevo Paciente'}
          size="large"
        >
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Información Personal</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Nombre Completo *</label>
                  <input type="text" value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>DPI *</label>
                  <input type="text" value={formData.dpi} onChange={(e) => setFormData({...formData, dpi: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Fecha Nacimiento *</label>
                  <input type="date" value={formData.fechaNacimiento} onChange={(e) => setFormData({...formData, fechaNacimiento: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Tipo Sangre</label>
                  <select value={formData.tipoSangre} onChange={(e) => setFormData({...formData, tipoSangre: e.target.value})}>
                    <option value="">Seleccionar</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Sexo *</label>
                  <select value={formData.sexo} onChange={(e) => setFormData({...formData, sexo: e.target.value})} required>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input type="tel" value={formData.telefono} onChange={(e) => setFormData({...formData, telefono: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label>Dirección</label>
                <textarea value={formData.direccion} onChange={(e) => setFormData({...formData, direccion: e.target.value})} rows="2"></textarea>
              </div>
            </div>

            <div className="form-section">
              <h3>Información del Familiar</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Nombre del Familiar</label>
                  <input type="text" value={formData.nombreFamiliar} onChange={(e) => setFormData({...formData, nombreFamiliar: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Teléfono Familiar</label>
                  <input type="tel" value={formData.telefonoFamiliar} onChange={(e) => setFormData({...formData, telefonoFamiliar: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Email Familiar</label>
                  <input type="email" value={formData.emailFamiliar} onChange={(e) => setFormData({...formData, emailFamiliar: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Parentesco</label>
                  <input type="text" value={formData.parentesco} onChange={(e) => setFormData({...formData, parentesco: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Información Médica</h3>
              <div className="form-group">
                <label>Fecha de Ingreso *</label>
                <input type="date" value={formData.fechaIngreso} onChange={(e) => setFormData({...formData, fechaIngreso: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Motivo de Reclusión</label>
                <textarea value={formData.motivoReclusión} onChange={(e) => setFormData({...formData, motivoReclusión: e.target.value})} rows="3"></textarea>
              </div>
              <div className="form-group">
                <label>Psicopatología</label>
                <textarea value={formData.psicopatologia} onChange={(e) => setFormData({...formData, psicopatologia: e.target.value})} rows="3"></textarea>
              </div>
              <div className="form-group">
                <label>Medicamentos de Cajón</label>
                <textarea value={formData.medicamentosCajon} onChange={(e) => setFormData({...formData, medicamentosCajon: e.target.value})} rows="3"></textarea>
              </div>
              <div className="form-group">
                <label>Alergias</label>
                <textarea value={formData.alergias} onChange={(e) => setFormData({...formData, alergias: e.target.value})} rows="2"></textarea>
              </div>
              <div className="form-group">
                <label>Antecedentes Médicos</label>
                <textarea value={formData.antecedentesMedicos} onChange={(e) => setFormData({...formData, antecedentesMedicos: e.target.value})} rows="3"></textarea>
              </div>
            </div>

            <div className="modal-actions">
              <Button type="button" variant="secondary" onClick={() => setModalAbierto(false)}>Cancelar</Button>
              <Button type="submit" variant="primary">{pacienteEditando ? 'Actualizar' : 'Guardar'}</Button>
            </div>
          </form>
        </Modal>
      </div>
    </Layout>
  );
};

export default Pacientes;

