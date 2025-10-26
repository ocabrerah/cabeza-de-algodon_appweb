import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Card from '../components/Card';
import { pacientesAPI } from '../services/api';
import { User, Phone, Mail, Calendar, Activity, FileText, ClipboardList } from 'lucide-react';
import './Pages.css';

const PacienteDetalle = () => {
  const { id } = useParams();
  const [paciente, setPaciente] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarPaciente();
  }, [id]);

  const cargarPaciente = async () => {
    try {
      const response = await pacientesAPI.obtenerPorId(id);
      setPaciente(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setCargando(false);
    }
  };

  if (cargando) return <Layout><div className="loading">Cargando...</div></Layout>;
  if (!paciente) return <Layout><div>Paciente no encontrado</div></Layout>;

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <h1>Ficha del Paciente</h1>
        </div>

        <div className="detalle-grid">
          <Card title="Información Personal" className="detalle-card">
            <div className="info-item">
              <User size={20} />
              <div>
                <label>Nombre Completo</label>
                <p>{paciente.nombre}</p>
              </div>
            </div>
            <div className="info-item">
              <Calendar size={20} />
              <div>
                <label>DPI</label>
                <p>{paciente.dpi}</p>
              </div>
            </div>
            <div className="info-item">
              <Activity size={20} />
              <div>
                <label>Edad / Tipo Sangre</label>
                <p>{new Date().getFullYear() - new Date(paciente.fechaNacimiento).getFullYear()} años - {paciente.tipoSangre}</p>
              </div>
            </div>
          </Card>

          <Card title="Contacto Familiar" className="detalle-card">
            <div className="info-item">
              <User size={20} />
              <div>
                <label>Familiar</label>
                <p>{paciente.nombreFamiliar} ({paciente.parentesco})</p>
              </div>
            </div>
            <div className="info-item">
              <Phone size={20} />
              <div>
                <label>Teléfono</label>
                <p>{paciente.telefonoFamiliar}</p>
              </div>
            </div>
            <div className="info-item">
              <Mail size={20} />
              <div>
                <label>Email</label>
                <p>{paciente.emailFamiliar}</p>
              </div>
            </div>
          </Card>

          <Card title="Información Médica" className="detalle-card full-width">
            <div className="info-section">
              <h4><FileText size={18} /> Motivo de Reclusión</h4>
              <p>{paciente.motivoReclusión || 'No especificado'}</p>
            </div>
            <div className="info-section">
              <h4><Activity size={18} /> Psicopatología</h4>
              <p>{paciente.psicopatologia || 'Ninguna registrada'}</p>
            </div>
            <div className="info-section">
              <h4><ClipboardList size={18} /> Medicamentos de Cajón</h4>
              <p>{paciente.medicamentosCajon || 'Ninguno'}</p>
            </div>
          </Card>

          <Card title="Historial de Visitas" className="detalle-card full-width">
            {paciente.visitas && paciente.visitas.length > 0 ? (
              <div className="visitas-list">
                {paciente.visitas.map((visita) => (
                  <div key={visita.id} className="visita-item">
                    <div className="visita-fecha">{new Date(visita.fechaVisita).toLocaleDateString()}</div>
                    <div className="visita-info">
                      <strong>{visita.medico?.nombre}</strong> - {visita.medico?.especialidad}
                      <p>{visita.diagnostico || visita.motivoVisita}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No hay visitas registradas</p>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PacienteDetalle;

