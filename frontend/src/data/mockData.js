// Datos mockeados para la versión demo

export const mockPacientes = [
  {
    id: '1',
    nombre: 'José García López',
    apellido: 'García López',
    fechaNacimiento: '1945-03-15',
    edad: 79,
    sexo: 'M',
    dpi: '1234567890101',
    direccion: 'Zona 1, Ciudad de Guatemala',
    telefono: '2345-6789',
    contactoEmergencia: 'María García',
    telefonoEmergencia: '2345-6790',
    emailFamilia: 'maria.garcia@email.com',
    tipoSangre: 'O+',
    alergias: 'Penicilina',
    estado: 'activo',
    diagnostico: 'Hipertensión controlada',
    tratamiento: 'Enalapril 10mg cada 12 horas'
  },
  {
    id: '2',
    nombre: 'María Rodríguez',
    apellido: 'Rodríguez',
    fechaNacimiento: '1940-07-22',
    edad: 84,
    sexo: 'F',
    dpi: '1234567890102',
    direccion: 'Zona 3, Ciudad de Guatemala',
    telefono: '2345-6791',
    contactoEmergencia: 'Pedro Rodríguez',
    telefonoEmergencia: '2345-6792',
    emailFamilia: 'pedro.rodriguez@email.com',
    tipoSangre: 'A+',
    alergias: 'Ninguna',
    estado: 'activo',
    diagnostico: 'Diabetes tipo 2',
    tratamiento: 'Metformina 850mg cada 8 horas'
  },
  {
    id: '3',
    nombre: 'Pedro Martínez',
    apellido: 'Martínez',
    fechaNacimiento: '1938-11-08',
    edad: 86,
    sexo: 'M',
    dpi: '1234567890103',
    direccion: 'Zona 5, Ciudad de Guatemala',
    telefono: '2345-6793',
    contactoEmergencia: 'Ana Martínez',
    telefonoEmergencia: '2345-6794',
    emailFamilia: 'ana.martinez@email.com',
    tipoSangre: 'B+',
    alergias: 'Aspirina',
    estado: 'activo',
    diagnostico: 'Artritis reumatoide',
    tratamiento: 'Ibuprofeno 400mg cada 8 horas'
  },
  {
    id: '4',
    nombre: 'Ana López',
    apellido: 'López',
    fechaNacimiento: '1942-05-30',
    edad: 82,
    sexo: 'F',
    dpi: '1234567890104',
    direccion: 'Zona 7, Ciudad de Guatemala',
    telefono: '2345-6795',
    contactoEmergencia: 'Luis López',
    telefonoEmergencia: '2345-6796',
    emailFamilia: 'luis.lopez@email.com',
    tipoSangre: 'AB+',
    alergias: 'Ninguna',
    estado: 'activo',
    diagnostico: 'Osteoporosis',
    tratamiento: 'Calcio + Vitamina D diario'
  },
  {
    id: '5',
    nombre: 'Carlos Hernández',
    apellido: 'Hernández',
    fechaNacimiento: '1950-09-12',
    edad: 74,
    sexo: 'M',
    dpi: '1234567890105',
    direccion: 'Zona 10, Ciudad de Guatemala',
    telefono: '2345-6797',
    contactoEmergencia: 'Rosa Hernández',
    telefonoEmergencia: '2345-6798',
    emailFamilia: 'rosa.hernandez@email.com',
    tipoSangre: 'O-',
    alergias: 'Mariscos',
    estado: 'activo',
    diagnostico: 'Control de rutina',
    tratamiento: 'Sin medicación permanente'
  }
];

export const mockSolicitudes = [
  {
    id: '1',
    pacienteId: '1',
    paciente: mockPacientes[0],
    tipo: 'consulta',
    prioridad: 'alta',
    motivoConsulta: 'Dolor en el pecho',
    sintomas: 'Opresión torácica, sudoración',
    especialidadRequerida: 'Cardiología',
    doctorReferido: 'Dr. Juan Pérez',
    estado: 'completada',
    fechaSolicitud: '2025-10-21',
    fechaAgendada: '2025-10-23',
    observaciones: 'Consulta realizada exitosamente'
  },
  {
    id: '2',
    pacienteId: '2',
    paciente: mockPacientes[1],
    tipo: 'laboratorio',
    prioridad: 'media',
    motivoConsulta: 'Control de glucosa',
    sintomas: 'Sed excesiva, cansancio',
    especialidadRequerida: 'Endocrinología',
    doctorReferido: 'Dra. María López',
    estado: 'en_proceso',
    fechaSolicitud: '2025-10-24',
    fechaAgendada: '2025-10-27',
    observaciones: 'Pendiente resultados de laboratorio'
  },
  {
    id: '3',
    pacienteId: '3',
    paciente: mockPacientes[2],
    tipo: 'consulta',
    prioridad: 'baja',
    motivoConsulta: 'Dolor en articulaciones',
    sintomas: 'Rigidez matutina, inflamación',
    especialidadRequerida: 'Reumatología',
    doctorReferido: 'Dr. Carlos Méndez',
    estado: 'pendiente',
    fechaSolicitud: '2025-10-26',
    fechaAgendada: '2025-10-31',
    observaciones: 'Primera consulta con especialista'
  }
];

export const mockVisitas = [
  {
    id: '1',
    pacienteId: '1',
    paciente: mockPacientes[0],
    medicoId: '1',
    medico: 'Dr. Juan Pérez',
    fechaVisita: '2025-10-23',
    tipo: 'consulta',
    motivoVisita: 'Dolor torácico',
    diagnostico: 'Angina de pecho estable',
    tratamiento: 'Nitroglicerina sublingual PRN',
    observaciones: 'Electrocardiograma sin alteraciones significativas',
    recetaMedicamentos: 'Nitroglicerina 0.5mg sublingual PRN, Enalapril 10mg c/12h',
    ordenesLaboratorio: 'Perfil lipídico, Troponinas',
    proximaVisita: '2025-11-23',
    estado: 'completada'
  },
  {
    id: '2',
    pacienteId: '2',
    paciente: mockPacientes[1],
    medicoId: '2',
    medico: 'Dra. María López',
    fechaVisita: '2025-10-25',
    tipo: 'laboratorio',
    motivoVisita: 'Control diabético',
    diagnostico: 'Diabetes tipo 2 descompensada',
    tratamiento: 'Ajuste de dosis de Metformina',
    observaciones: 'Hemoglobina glicosilada en 8.2%',
    recetaMedicamentos: 'Metformina 1000mg c/8h',
    ordenesLaboratorio: 'Glucosa en ayunas, HbA1c, Creatinina',
    proximaVisita: '2025-11-10',
    estado: 'completada'
  }
];

export const mockMedicamentos = [
  {
    id: '1',
    nombre: 'Enalapril',
    principioActivo: 'Enalapril Maleato',
    presentacion: 'Tableta',
    concentracion: '10mg',
    lote: 'LOT2024001',
    fechaVencimiento: '2025-12-31',
    cantidad: 500,
    cantidadMinima: 100,
    precio: 2.50,
    precioFundacion: 1.50,
    indicaciones: 'Hipertensión arterial',
    contraindicaciones: 'Embarazo, hipersensibilidad'
  },
  {
    id: '2',
    nombre: 'Metformina',
    principioActivo: 'Metformina Clorhidrato',
    presentacion: 'Tableta',
    concentracion: '850mg',
    lote: 'LOT2024002',
    fechaVencimiento: '2026-06-30',
    cantidad: 800,
    cantidadMinima: 150,
    precio: 1.80,
    precioFundacion: 1.00,
    indicaciones: 'Diabetes tipo 2',
    contraindicaciones: 'Insuficiencia renal'
  },
  {
    id: '3',
    nombre: 'Ibuprofeno',
    principioActivo: 'Ibuprofeno',
    presentacion: 'Tableta',
    concentracion: '400mg',
    lote: 'LOT2024003',
    fechaVencimiento: '2025-08-31',
    cantidad: 600,
    cantidadMinima: 120,
    precio: 1.20,
    precioFundacion: 0.70,
    indicaciones: 'Dolor e inflamación',
    contraindicaciones: 'Úlcera péptica activa'
  },
  {
    id: '4',
    nombre: 'Paracetamol',
    principioActivo: 'Paracetamol',
    presentacion: 'Tableta',
    concentracion: '500mg',
    lote: 'LOT2024004',
    fechaVencimiento: '2026-03-31',
    cantidad: 1000,
    cantidadMinima: 200,
    precio: 0.80,
    precioFundacion: 0.40,
    indicaciones: 'Dolor y fiebre',
    contraindicaciones: 'Hepatopatía severa'
  },
  {
    id: '5',
    nombre: 'Tramadol',
    principioActivo: 'Tramadol Clorhidrato',
    presentacion: 'Tableta',
    concentracion: '50mg',
    lote: 'LOT2024005',
    fechaVencimiento: '2025-10-31',
    cantidad: 300,
    cantidadMinima: 50,
    precio: 3.50,
    precioFundacion: 2.00,
    indicaciones: 'Dolor moderado a severo',
    contraindicaciones: 'Depresión respiratoria'
  }
];

export const mockMovimientosCaja = [
  {
    id: '1',
    tipo: 'ingreso',
    categoria: 'donacion',
    monto: 5000.00,
    descripcion: 'Donación mensual Fundación Ayuda',
    origen: 'Fundación Ayuda Social',
    pacienteId: null,
    fechaMovimiento: '2025-10-21',
    comprobante: 'DON-2024-001',
    estado: 'confirmado',
    observaciones: 'Donación recurrente'
  },
  {
    id: '2',
    tipo: 'ingreso',
    categoria: 'cuota_familiar',
    monto: 800.00,
    descripcion: 'Cuota mensual - José García',
    origen: 'Familia García',
    pacienteId: '1',
    fechaMovimiento: '2025-10-23',
    comprobante: 'CF-2024-001',
    estado: 'confirmado',
    observaciones: 'Pago puntual'
  },
  {
    id: '3',
    tipo: 'ingreso',
    categoria: 'cuota_familiar',
    monto: 800.00,
    descripcion: 'Cuota mensual - María Rodríguez',
    origen: 'Familia Rodríguez',
    pacienteId: '2',
    fechaMovimiento: '2025-10-24',
    comprobante: 'CF-2024-002',
    estado: 'confirmado',
    observaciones: 'Pago puntual'
  },
  {
    id: '4',
    tipo: 'egreso',
    categoria: 'servicio_medico',
    monto: 350.00,
    descripcion: 'Consulta cardiología - José García',
    origen: 'Fundación Médica',
    pacienteId: '1',
    fechaMovimiento: '2025-10-23',
    comprobante: 'CONS-2024-001',
    estado: 'pendiente_pago',
    observaciones: 'Pendiente de pago a fundación'
  },
  {
    id: '5',
    tipo: 'egreso',
    categoria: 'medicamento',
    monto: 125.00,
    descripcion: 'Medicamentos - María Rodríguez',
    origen: 'Farmacia Fundación',
    pacienteId: '2',
    fechaMovimiento: '2025-10-24',
    comprobante: 'MED-2024-001',
    estado: 'pendiente_pago',
    observaciones: 'Con descuento fundación'
  },
  {
    id: '6',
    tipo: 'egreso',
    categoria: 'servicio_basico',
    monto: 1200.00,
    descripcion: 'Factura de luz - Octubre',
    origen: 'EEGSA',
    pacienteId: null,
    fechaMovimiento: '2025-10-19',
    comprobante: 'ELEC-2024-10',
    estado: 'pagado',
    observaciones: 'Servicios básicos'
  },
  {
    id: '7',
    tipo: 'egreso',
    categoria: 'servicio_basico',
    monto: 450.00,
    descripcion: 'Factura de agua - Octubre',
    origen: 'EMPAGUA',
    pacienteId: null,
    fechaMovimiento: '2025-10-20',
    comprobante: 'AGUA-2024-10',
    estado: 'pagado',
    observaciones: 'Servicios básicos'
  },
  {
    id: '8',
    tipo: 'egreso',
    categoria: 'alimentacion',
    monto: 3500.00,
    descripcion: 'Compra de alimentos - Semanal',
    origen: 'Supermercado Central',
    pacienteId: null,
    fechaMovimiento: '2025-10-22',
    comprobante: 'ALI-2024-W42',
    estado: 'pagado',
    observaciones: 'Abastecimiento semanal'
  }
];

export const mockUsuarios = [
  {
    id: '1',
    nombre: 'Administrador Demo',
    email: 'admin@demo.com',
    rol: 'admin',
    telefono: '1234-5678',
    especialidad: null,
    activo: true,
    validado: true
  },
  {
    id: '2',
    nombre: 'Dr. Carlos Méndez',
    email: 'medico@demo.com',
    rol: 'medico',
    telefono: '2234-5678',
    especialidad: 'Cardiología',
    activo: true,
    validado: true
  },
  {
    id: '3',
    nombre: 'María González',
    email: 'enfermero@demo.com',
    rol: 'enfermero',
    telefono: '2234-5679',
    especialidad: null,
    activo: true,
    validado: true
  },
  {
    id: '4',
    nombre: 'Juan Pérez',
    email: 'farmacia@demo.com',
    rol: 'farmacia',
    telefono: '2234-5680',
    especialidad: null,
    activo: true,
    validado: true
  }
];

export const calcularResumenCaja = () => {
  const ingresos = mockMovimientosCaja
    .filter(m => m.tipo === 'ingreso')
    .reduce((sum, m) => sum + m.monto, 0);
  
  const egresos = mockMovimientosCaja
    .filter(m => m.tipo === 'egreso')
    .reduce((sum, m) => sum + m.monto, 0);
  
  return {
    ingresos,
    egresos,
    balance: ingresos - egresos
  };
};

