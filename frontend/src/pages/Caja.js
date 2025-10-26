import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { cajaAPI } from '../services/api';
import toast from 'react-hot-toast';
import './Pages.css';

const Caja = () => {
  const [transacciones, setTransacciones] = useState([]);
  const [resumen, setResumen] = useState({ ingresos: 0, egresos: 0, balance: 0 });
  const [modalAbierto, setModalAbierto] = useState(false);
  const [formData, setFormData] = useState({
    tipo: 'ingreso',
    categoria: 'donacion',
    monto: '',
    descripcion: '',
    metodoPago: 'efectivo'
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [transResponse, resResponse] = await Promise.all([
        cajaAPI.obtenerTransacciones({}),
        cajaAPI.obtenerResumen({})
      ]);
      setTransacciones(transResponse.data);
      setResumen(resResponse.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await cajaAPI.crearTransaccion(formData);
      toast.success('Transacción registrada');
      setModalAbierto(false);
      cargarDatos();
    } catch (error) {
      toast.error('Error al registrar');
    }
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1>Gestión de Caja</h1>
            <p>Control de ingresos y egresos</p>
          </div>
          <Button variant="primary" icon={<Plus size={20} />} onClick={() => setModalAbierto(true)}>
            Nueva Transacción
          </Button>
        </div>

        <div className="stats-grid" style={{ marginBottom: '32px' }}>
          <Card className="stat-card stat-success">
            <div className="stat-icon"><TrendingUp size={32} /></div>
            <div className="stat-content">
              <h3>Ingresos</h3>
              <p className="stat-value">Q{resumen.ingresos.toLocaleString()}</p>
            </div>
          </Card>
          <Card className="stat-card stat-danger">
            <div className="stat-icon"><TrendingDown size={32} /></div>
            <div className="stat-content">
              <h3>Egresos</h3>
              <p className="stat-value">Q{resumen.egresos.toLocaleString()}</p>
            </div>
          </Card>
          <Card className="stat-card stat-primary">
            <div className="stat-icon"><TrendingUp size={32} /></div>
            <div className="stat-content">
              <h3>Balance</h3>
              <p className="stat-value">Q{resumen.balance.toLocaleString()}</p>
            </div>
          </Card>
        </div>

        <Card title="Historial de Transacciones">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Tipo</th>
                  <th>Categoría</th>
                  <th>Descripción</th>
                  <th>Monto</th>
                  <th>Método</th>
                </tr>
              </thead>
              <tbody>
                {transacciones.map((t) => (
                  <tr key={t.id}>
                    <td>{new Date(t.fecha).toLocaleDateString()}</td>
                    <td><span className={`badge ${t.tipo === 'ingreso' ? 'badge-completada' : 'badge-cancelada'}`}>{t.tipo}</span></td>
                    <td>{t.categoria}</td>
                    <td>{t.descripcion}</td>
                    <td><strong>Q{t.monto}</strong></td>
                    <td>{t.metodoPago}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Modal isOpen={modalAbierto} onClose={() => setModalAbierto(false)} title="Nueva Transacción">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tipo *</label>
              <select value={formData.tipo} onChange={(e) => setFormData({...formData, tipo: e.target.value})} required>
                <option value="ingreso">Ingreso</option>
                <option value="egreso">Egreso</option>
              </select>
            </div>
            <div className="form-group">
              <label>Categoría *</label>
              <select value={formData.categoria} onChange={(e) => setFormData({...formData, categoria: e.target.value})} required>
                <option value="donacion">Donación</option>
                <option value="cuota_mensual">Cuota Mensual</option>
                <option value="servicios">Servicios</option>
                <option value="otros">Otros</option>
              </select>
            </div>
            <div className="form-group">
              <label>Monto *</label>
              <input type="number" step="0.01" value={formData.monto} onChange={(e) => setFormData({...formData, monto: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Descripción *</label>
              <textarea value={formData.descripcion} onChange={(e) => setFormData({...formData, descripcion: e.target.value})} rows="3" required></textarea>
            </div>
            <div className="form-group">
              <label>Método de Pago</label>
              <select value={formData.metodoPago} onChange={(e) => setFormData({...formData, metodoPago: e.target.value})}>
                <option value="efectivo">Efectivo</option>
                <option value="transferencia">Transferencia</option>
                <option value="cheque">Cheque</option>
                <option value="tarjeta">Tarjeta</option>
              </select>
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

export default Caja;

