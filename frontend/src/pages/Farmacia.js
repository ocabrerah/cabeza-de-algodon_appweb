import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import { Check } from 'lucide-react';
import { farmaciaAPI } from '../services/api';
import toast from 'react-hot-toast';
import './Pages.css';

const Farmacia = () => {
  const [medicamentos, setMedicamentos] = useState([]);

  useEffect(() => {
    cargarMedicamentos();
  }, []);

  const cargarMedicamentos = async () => {
    try {
      const response = await farmaciaAPI.obtenerMedicamentos({});
      setMedicamentos(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDespachar = async (id) => {
    try {
      await farmaciaAPI.despachar(id, { fechaInicio: new Date() });
      toast.success('Medicamento despachado');
      cargarMedicamentos();
    } catch (error) {
      toast.error('Error al despachar');
    }
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1>Gestión de Farmacia</h1>
            <p>Control de medicamentos prescritos</p>
          </div>
        </div>

        <Card>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Medicamento</th>
                  <th>Dosis</th>
                  <th>Duración</th>
                  <th>Costo</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {medicamentos.map((med) => (
                  <tr key={med.id}>
                    <td><strong>{med.visita?.paciente?.nombre}</strong></td>
                    <td>{med.nombreMedicamento}</td>
                    <td>{med.dosis} - {med.frecuencia}</td>
                    <td>{med.duracion}</td>
                    <td>Q{med.costo}</td>
                    <td><span className={`badge badge-${med.estado}`}>{med.estado}</span></td>
                    <td>
                      {med.estado === 'prescrito' && (
                        <Button variant="success" size="small" icon={<Check size={16} />} onClick={() => handleDespachar(med.id)}>
                          Despachar
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Farmacia;

