const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

// ==================== MODELOS ====================

// Usuario
const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  rol: {
    type: DataTypes.ENUM('admin', 'medico', 'enfermero', 'farmacia', 'laboratorio', 'caja'),
    allowNull: false,
    defaultValue: 'enfermero'
  },
  telefono: {
    type: DataTypes.STRING(20)
  },
  especialidad: {
    type: DataTypes.STRING(100)
  },
  fotoPerfil: {
    type: DataTypes.TEXT
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  validado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'usuarios',
  timestamps: true
});

// Paciente
const Paciente = sequelize.define('Paciente', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  dpi: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false
  },
  fechaNacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  tipoSangre: {
    type: DataTypes.STRING(5)
  },
  sexo: {
    type: DataTypes.ENUM('M', 'F'),
    allowNull: false
  },
  direccion: {
    type: DataTypes.TEXT
  },
  telefono: {
    type: DataTypes.STRING(20)
  },
  nombreFamiliar: {
    type: DataTypes.STRING(100)
  },
  telefonoFamiliar: {
    type: DataTypes.STRING(20)
  },
  emailFamiliar: {
    type: DataTypes.STRING(100)
  },
  parentesco: {
    type: DataTypes.STRING(50)
  },
  fechaIngreso: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  motivoReclusión: {
    type: DataTypes.TEXT
  },
  psicopatologia: {
    type: DataTypes.TEXT
  },
  medicamentosCajon: {
    type: DataTypes.TEXT
  },
  alergias: {
    type: DataTypes.TEXT
  },
  antecedentesMedicos: {
    type: DataTypes.TEXT
  },
  fotoPaciente: {
    type: DataTypes.TEXT
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'pacientes',
  timestamps: true
});

// Solicitud Médica
const SolicitudMedica = sequelize.define('SolicitudMedica', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  fechaSolicitud: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  motivo: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  especialidadRequerida: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  prioridad: {
    type: DataTypes.ENUM('baja', 'media', 'alta', 'urgente'),
    defaultValue: 'media'
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'asignada', 'completada', 'cancelada'),
    defaultValue: 'pendiente'
  },
  observaciones: {
    type: DataTypes.TEXT
  },
  fechaAsignada: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'solicitudes_medicas',
  timestamps: true
});

// Visita Médica
const VisitaMedica = sequelize.define('VisitaMedica', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  fechaVisita: {
    type: DataTypes.DATE,
    allowNull: false
  },
  motivoVisita: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  diagnostico: {
    type: DataTypes.TEXT
  },
  observaciones: {
    type: DataTypes.TEXT
  },
  estado: {
    type: DataTypes.ENUM('programada', 'en_curso', 'completada', 'cancelada'),
    defaultValue: 'programada'
  },
  costoConsulta: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  }
}, {
  tableName: 'visitas_medicas',
  timestamps: true
});

// Examen Laboratorio
const ExamenLaboratorio = sequelize.define('ExamenLaboratorio', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nombreExamen: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  fechaSolicitud: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  fechaResultado: {
    type: DataTypes.DATE
  },
  resultado: {
    type: DataTypes.TEXT
  },
  archivoResultado: {
    type: DataTypes.TEXT
  },
  estado: {
    type: DataTypes.ENUM('solicitado', 'en_proceso', 'completado'),
    defaultValue: 'solicitado'
  },
  costo: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  }
}, {
  tableName: 'examenes_laboratorio',
  timestamps: true
});

// Medicamento
const Medicamento = sequelize.define('Medicamento', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nombreMedicamento: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  cantidad: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  dosis: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  frecuencia: {
    type: DataTypes.STRING(100)
  },
  duracion: {
    type: DataTypes.STRING(50)
  },
  instrucciones: {
    type: DataTypes.TEXT
  },
  fechaInicio: {
    type: DataTypes.DATE
  },
  fechaFin: {
    type: DataTypes.DATE
  },
  costo: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  estado: {
    type: DataTypes.ENUM('prescrito', 'despachado', 'completado'),
    defaultValue: 'prescrito'
  }
}, {
  tableName: 'medicamentos',
  timestamps: true
});

// Transacción Financiera
const Transaccion = sequelize.define('Transaccion', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  tipo: {
    type: DataTypes.ENUM('ingreso', 'egreso'),
    allowNull: false
  },
  categoria: {
    type: DataTypes.ENUM('donacion', 'cuota_mensual', 'consulta', 'laboratorio', 'farmacia', 'servicios', 'otros'),
    allowNull: false
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  referencia: {
    type: DataTypes.STRING(100)
  },
  donante: {
    type: DataTypes.STRING(200)
  },
  metodoPago: {
    type: DataTypes.ENUM('efectivo', 'transferencia', 'cheque', 'tarjeta'),
    defaultValue: 'efectivo'
  }
}, {
  tableName: 'transacciones',
  timestamps: true
});

// Cuenta Paciente
const CuentaPaciente = sequelize.define('CuentaPaciente', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  mes: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  anio: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cuotaMensual: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  totalConsultas: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  totalLaboratorio: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  totalFarmacia: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  pagado: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  saldo: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'pagado', 'vencido'),
    defaultValue: 'pendiente'
  }
}, {
  tableName: 'cuentas_pacientes',
  timestamps: true
});

// ==================== RELACIONES ====================

// Usuario - SolicitudMedica (médico solicitante)
Usuario.hasMany(SolicitudMedica, { foreignKey: 'medicoSolicitanteId', as: 'solicitudesCreadas' });
SolicitudMedica.belongsTo(Usuario, { foreignKey: 'medicoSolicitanteId', as: 'medicoSolicitante' });

// Usuario - SolicitudMedica (enfermero asignado)
Usuario.hasMany(SolicitudMedica, { foreignKey: 'enfermeroId', as: 'solicitudesAsignadas' });
SolicitudMedica.belongsTo(Usuario, { foreignKey: 'enfermeroId', as: 'enfermero' });

// Usuario - VisitaMedica (médico tratante)
Usuario.hasMany(VisitaMedica, { foreignKey: 'medicoId', as: 'visitasRealizadas' });
VisitaMedica.belongsTo(Usuario, { foreignKey: 'medicoId', as: 'medico' });

// Paciente - SolicitudMedica
Paciente.hasMany(SolicitudMedica, { foreignKey: 'pacienteId', as: 'solicitudes' });
SolicitudMedica.belongsTo(Paciente, { foreignKey: 'pacienteId', as: 'paciente' });

// Paciente - VisitaMedica
Paciente.hasMany(VisitaMedica, { foreignKey: 'pacienteId', as: 'visitas' });
VisitaMedica.belongsTo(Paciente, { foreignKey: 'pacienteId', as: 'paciente' });

// SolicitudMedica - VisitaMedica
SolicitudMedica.hasOne(VisitaMedica, { foreignKey: 'solicitudId', as: 'visita' });
VisitaMedica.belongsTo(SolicitudMedica, { foreignKey: 'solicitudId', as: 'solicitud' });

// VisitaMedica - ExamenLaboratorio
VisitaMedica.hasMany(ExamenLaboratorio, { foreignKey: 'visitaId', as: 'examenes' });
ExamenLaboratorio.belongsTo(VisitaMedica, { foreignKey: 'visitaId', as: 'visita' });

// VisitaMedica - Medicamento
VisitaMedica.hasMany(Medicamento, { foreignKey: 'visitaId', as: 'medicamentos' });
Medicamento.belongsTo(VisitaMedica, { foreignKey: 'visitaId', as: 'visita' });

// Paciente - CuentaPaciente
Paciente.hasMany(CuentaPaciente, { foreignKey: 'pacienteId', as: 'cuentas' });
CuentaPaciente.belongsTo(Paciente, { foreignKey: 'pacienteId', as: 'paciente' });

// Paciente - Transaccion
Paciente.hasMany(Transaccion, { foreignKey: 'pacienteId', as: 'transacciones' });
Transaccion.belongsTo(Paciente, { foreignKey: 'pacienteId', as: 'paciente' });

module.exports = {
  sequelize,
  Usuario,
  Paciente,
  SolicitudMedica,
  VisitaMedica,
  ExamenLaboratorio,
  Medicamento,
  Transaccion,
  CuentaPaciente
};

