/**
 * Página de Pacientes
 * @author Omar Cabrera
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlus, FiSearch, FiUser, FiEdit } from 'react-icons/fi';
import Layout from '../components/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Common.css';

const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPacientes();
  }, []);

  const loadPacientes = async () => {
    try {
      const response = await axios.get('/api/pacientes');
      if (response.data.success) {
        setPacientes(response.data.data);
      }
    } catch (error) {
      toast.error('Error al cargar pacientes');
    } finally {
      setLoading(false);
    }
  };

  const filteredPacientes = pacientes.filter(p =>
    `${p.nombre} ${p.apellido} ${p.numero_expediente}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="page">
        <div className="page-header">
          <div>
            <h1>Pacientes</h1>
            <p>Gestión de internos del asilo</p>
          </div>
          <button className="btn btn-primary">
            <FiPlus /> Nuevo Paciente
          </button>
        </div>

        <div className="filters-bar">
          <div className="search-box">
            <FiSearch />
            <input
              type="text"
              placeholder="Buscar paciente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Expediente</th>
                  <th>Nombre</th>
                  <th>Edad</th>
                  <th>Fecha Ingreso</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredPacientes.map((paciente) => (
                  <tr key={paciente.id}>
                    <td><strong>{paciente.numero_expediente}</strong></td>
                    <td>
                      <div className="user-cell">
                        <div className="avatar">
                          <FiUser />
                        </div>
                        <span>{paciente.nombre} {paciente.apellido}</span>
                      </div>
                    </td>
                    <td>{paciente.edad} años</td>
                    <td>{new Date(paciente.fecha_ingreso).toLocaleDateString('es-HN')}</td>
                    <td>
                      <Link to={`/pacientes/${paciente.id}`} className="btn-icon" title="Ver detalles">
                        <FiEdit />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredPacientes.length === 0 && (
              <div className="empty-state">
                <FiUser size={48} />
                <p>No se encontraron pacientes</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Pacientes;

