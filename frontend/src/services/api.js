import axios from 'axios';

// Usar rutas relativas porque el proxy está configurado en package.json
const API_URL = '/api';

// Configurar axios
axios.defaults.baseURL = API_URL;

// Interceptor para incluir el token en todas las peticiones
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API de Pacientes
export const pacientesAPI = {
  obtenerTodos: (params) => axios.get('/pacientes', { params }),
  obtenerPorId: (id) => axios.get(`/pacientes/${id}`),
  crear: (datos) => axios.post('/pacientes', datos),
  actualizar: (id, datos) => axios.put(`/pacientes/${id}`, datos),
  eliminar: (id) => axios.delete(`/pacientes/${id}`),
  obtenerEstadisticas: (id) => axios.get(`/pacientes/${id}/estadisticas`)
};

// API de Solicitudes
export const solicitudesAPI = {
  obtenerTodas: (params) => axios.get('/solicitudes', { params }),
  obtenerPorId: (id) => axios.get(`/solicitudes/${id}`),
  crear: (datos) => axios.post('/solicitudes', datos),
  actualizar: (id, datos) => axios.put(`/solicitudes/${id}`, datos),
  asignar: (id, datos) => axios.put(`/solicitudes/${id}/asignar`, datos),
  eliminar: (id) => axios.delete(`/solicitudes/${id}`)
};

// API de Visitas
export const visitasAPI = {
  obtenerTodas: (params) => axios.get('/visitas', { params }),
  obtenerPorId: (id) => axios.get(`/visitas/${id}`),
  crear: (datos) => axios.post('/visitas', datos),
  actualizar: (id, datos) => axios.put(`/visitas/${id}`, datos),
  agregarExamen: (id, datos) => axios.post(`/visitas/${id}/examenes`, datos),
  agregarMedicamento: (id, datos) => axios.post(`/visitas/${id}/medicamentos`, datos)
};

// API de Farmacia
export const farmaciaAPI = {
  obtenerMedicamentos: (params) => axios.get('/farmacia/medicamentos', { params }),
  despachar: (id, datos) => axios.put(`/farmacia/medicamentos/${id}/despachar`, datos),
  actualizar: (id, datos) => axios.put(`/farmacia/medicamentos/${id}`, datos)
};

// API de Laboratorio
export const laboratorioAPI = {
  obtenerExamenes: (params) => axios.get('/laboratorio/examenes', { params }),
  actualizarResultado: (id, datos) => axios.put(`/laboratorio/examenes/${id}/resultado`, datos),
  actualizarEstado: (id, datos) => axios.put(`/laboratorio/examenes/${id}/estado`, datos)
};

// API de Caja
export const cajaAPI = {
  obtenerTransacciones: (params) => axios.get('/caja/transacciones', { params }),
  crearTransaccion: (datos) => axios.post('/caja/transacciones', datos),
  obtenerCuentas: (params) => axios.get('/caja/cuentas', { params }),
  actualizarCuenta: (datos) => axios.post('/caja/cuentas', datos),
  registrarPago: (id, datos) => axios.post(`/caja/cuentas/${id}/pago`, datos),
  obtenerResumen: (params) => axios.get('/caja/resumen', { params })
};

// API de Usuarios
export const usuariosAPI = {
  obtenerTodos: (params) => axios.get('/usuarios', { params }),
  obtenerPorId: (id) => axios.get(`/usuarios/${id}`),
  crear: (datos) => axios.post('/usuarios', datos),
  actualizar: (id, datos) => axios.put(`/usuarios/${id}`, datos),
  eliminar: (id) => axios.delete(`/usuarios/${id}`),
  resetearPassword: (id, datos) => axios.put(`/usuarios/${id}/resetear-password`, datos)
};

// API de Reportes
export const reportesAPI = {
  costosPaciente: (params) => axios.get('/reportes/costos-paciente', { params }),
  fichaMedica: (params) => axios.get('/reportes/ficha-medica', { params }),
  cobrosPaciente: (params) => axios.get('/reportes/cobros-paciente', { params }),
  pagosFundacion: (params) => axios.get('/reportes/pagos-fundacion', { params }),
  entradas: (params) => axios.get('/reportes/entradas', { params })
};

export default axios;

