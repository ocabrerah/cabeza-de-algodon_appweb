/**
 * Script de Base de Datos - Sistema Asilo de Ancianos "Cabeza de Algodón"
 * 
 * @author Omar Cabrera
 * @copyright 2025 - Todos los derechos reservados
 */

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS asilo_cabeza_algodon CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE asilo_cabeza_algodon;

-- ============================================================================
-- TABLAS DE USUARIOS Y AUTENTICACIÓN
-- ============================================================================

-- Tabla de usuarios
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'staff', 'empleado', 'medico', 'enfermero', 'laboratorista', 'farmaceutico', 'fundacion') NOT NULL,
    telefono VARCHAR(20),
    activo BOOLEAN DEFAULT true,
    email_verificado BOOLEAN DEFAULT false,
    token_verificacion VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_conexion TIMESTAMP NULL,
    creado_por INT,
    INDEX idx_email (email),
    INDEX idx_rol (rol),
    INDEX idx_activo (activo)
) ENGINE=InnoDB;

-- ============================================================================
-- TABLAS DE PACIENTES
-- ============================================================================

-- Tabla de pacientes/internos
CREATE TABLE pacientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    numero_expediente VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    edad INT,
    genero ENUM('Masculino', 'Femenino', 'Otro') NOT NULL,
    tipo_sangre VARCHAR(5),
    direccion TEXT,
    ciudad VARCHAR(100),
    departamento VARCHAR(100),
    telefono_emergencia VARCHAR(20),
    foto_url VARCHAR(255),
    fecha_ingreso DATE NOT NULL,
    motivo_ingreso TEXT,
    psicopatologia TEXT,
    medicamentos_regulares TEXT,
    alergias TEXT,
    observaciones TEXT,
    activo BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    creado_por INT,
    INDEX idx_expediente (numero_expediente),
    INDEX idx_nombre (nombre, apellido),
    INDEX idx_activo (activo)
) ENGINE=InnoDB;

-- Tabla de familiares responsables
CREATE TABLE familiares (
    id INT PRIMARY KEY AUTO_INCREMENT,
    paciente_id INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    relacion VARCHAR(50) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(150),
    direccion TEXT,
    es_responsable BOOLEAN DEFAULT false,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE,
    INDEX idx_paciente (paciente_id),
    INDEX idx_responsable (es_responsable)
) ENGINE=InnoDB;

-- ============================================================================
-- TABLAS DE MÉDICOS Y ESPECIALIDADES
-- ============================================================================

-- Tabla de especialidades médicas
CREATE TABLE especialidades (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    descripcion TEXT,
    activo BOOLEAN DEFAULT true
) ENGINE=InnoDB;

-- Tabla de médicos de la fundación
CREATE TABLE medicos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    especialidad_id INT NOT NULL,
    numero_colegiado VARCHAR(50),
    telefono VARCHAR(20),
    email VARCHAR(150),
    pertenece_fundacion BOOLEAN DEFAULT true,
    costo_consulta DECIMAL(10,2),
    activo BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    FOREIGN KEY (especialidad_id) REFERENCES especialidades(id),
    INDEX idx_especialidad (especialidad_id),
    INDEX idx_activo (activo)
) ENGINE=InnoDB;

-- ============================================================================
-- TABLAS DE SOLICITUDES Y VISITAS MÉDICAS
-- ============================================================================

-- Tabla de solicitudes médicas
CREATE TABLE solicitudes_medicas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    paciente_id INT NOT NULL,
    medico_general_id INT,
    especialidad_solicitada_id INT NOT NULL,
    motivo TEXT NOT NULL,
    enfermero_asignado_id INT,
    estado ENUM('pendiente', 'programada', 'completada', 'cancelada') DEFAULT 'pendiente',
    prioridad ENUM('baja', 'media', 'alta', 'urgente') DEFAULT 'media',
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_programada DATETIME,
    medico_asignado_id INT,
    observaciones TEXT,
    creado_por INT,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE,
    FOREIGN KEY (medico_general_id) REFERENCES medicos(id),
    FOREIGN KEY (especialidad_solicitada_id) REFERENCES especialidades(id),
    FOREIGN KEY (enfermero_asignado_id) REFERENCES usuarios(id),
    FOREIGN KEY (medico_asignado_id) REFERENCES medicos(id),
    INDEX idx_paciente (paciente_id),
    INDEX idx_estado (estado),
    INDEX idx_fecha (fecha_solicitud)
) ENGINE=InnoDB;

-- Tabla de visitas médicas (fichas médicas por visita)
CREATE TABLE visitas_medicas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    solicitud_id INT,
    paciente_id INT NOT NULL,
    medico_id INT NOT NULL,
    fecha_visita DATETIME NOT NULL,
    motivo_visita TEXT NOT NULL,
    sintomas TEXT,
    examen_fisico TEXT,
    diagnostico TEXT,
    observaciones_medicas TEXT,
    tratamiento TEXT,
    proxima_cita DATE,
    costo_consulta DECIMAL(10,2),
    estado ENUM('programada', 'en_curso', 'completada', 'cancelada') DEFAULT 'programada',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (solicitud_id) REFERENCES solicitudes_medicas(id),
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES medicos(id),
    INDEX idx_paciente (paciente_id),
    INDEX idx_medico (medico_id),
    INDEX idx_fecha (fecha_visita)
) ENGINE=InnoDB;

-- ============================================================================
-- TABLAS DE LABORATORIO
-- ============================================================================

-- Tabla de tipos de exámenes
CREATE TABLE tipos_examenes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    costo DECIMAL(10,2),
    tiempo_resultados INT COMMENT 'Tiempo en horas',
    activo BOOLEAN DEFAULT true
) ENGINE=InnoDB;

-- Tabla de exámenes de laboratorio
CREATE TABLE examenes_laboratorio (
    id INT PRIMARY KEY AUTO_INCREMENT,
    visita_medica_id INT NOT NULL,
    tipo_examen_id INT NOT NULL,
    fecha_solicitud DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_realizacion DATETIME,
    fecha_resultados DATETIME,
    estado ENUM('solicitado', 'en_proceso', 'completado') DEFAULT 'solicitado',
    resultados TEXT,
    archivo_resultados VARCHAR(255),
    observaciones TEXT,
    laboratorista_id INT,
    costo DECIMAL(10,2),
    FOREIGN KEY (visita_medica_id) REFERENCES visitas_medicas(id) ON DELETE CASCADE,
    FOREIGN KEY (tipo_examen_id) REFERENCES tipos_examenes(id),
    FOREIGN KEY (laboratorista_id) REFERENCES usuarios(id),
    INDEX idx_visita (visita_medica_id),
    INDEX idx_estado (estado)
) ENGINE=InnoDB;

-- ============================================================================
-- TABLAS DE FARMACIA
-- ============================================================================

-- Tabla de medicamentos
CREATE TABLE medicamentos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    presentacion VARCHAR(100),
    concentracion VARCHAR(50),
    precio_unitario DECIMAL(10,2),
    stock INT DEFAULT 0,
    stock_minimo INT DEFAULT 10,
    activo BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_codigo (codigo),
    INDEX idx_nombre (nombre)
) ENGINE=InnoDB;

-- Tabla de prescripciones/recetas
CREATE TABLE prescripciones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    visita_medica_id INT NOT NULL,
    medicamento_id INT NOT NULL,
    dosis VARCHAR(100) NOT NULL,
    frecuencia VARCHAR(100) NOT NULL,
    duracion VARCHAR(100) NOT NULL,
    cantidad INT NOT NULL,
    indicaciones TEXT,
    fecha_prescripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('pendiente', 'entregado', 'cancelado') DEFAULT 'pendiente',
    fecha_entrega DATETIME,
    entregado_por INT,
    costo_total DECIMAL(10,2),
    FOREIGN KEY (visita_medica_id) REFERENCES visitas_medicas(id) ON DELETE CASCADE,
    FOREIGN KEY (medicamento_id) REFERENCES medicamentos(id),
    FOREIGN KEY (entregado_por) REFERENCES usuarios(id),
    INDEX idx_visita (visita_medica_id),
    INDEX idx_estado (estado)
) ENGINE=InnoDB;

-- ============================================================================
-- TABLAS DE FINANZAS
-- ============================================================================

-- Tabla de cuentas por paciente
CREATE TABLE cuentas_paciente (
    id INT PRIMARY KEY AUTO_INCREMENT,
    paciente_id INT NOT NULL,
    familiar_responsable_id INT,
    cuota_mensual DECIMAL(10,2) NOT NULL DEFAULT 0,
    saldo_pendiente DECIMAL(10,2) DEFAULT 0,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE,
    FOREIGN KEY (familiar_responsable_id) REFERENCES familiares(id),
    INDEX idx_paciente (paciente_id)
) ENGINE=InnoDB;

-- Tabla de movimientos de cuenta
CREATE TABLE movimientos_cuenta (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cuenta_id INT NOT NULL,
    tipo ENUM('cargo', 'abono') NOT NULL,
    concepto VARCHAR(255) NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    saldo_anterior DECIMAL(10,2),
    saldo_nuevo DECIMAL(10,2),
    referencia_id INT COMMENT 'ID de visita, examen, prescripción',
    referencia_tipo VARCHAR(50) COMMENT 'Tipo de referencia',
    fecha_movimiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    creado_por INT,
    FOREIGN KEY (cuenta_id) REFERENCES cuentas_paciente(id) ON DELETE CASCADE,
    INDEX idx_cuenta (cuenta_id),
    INDEX idx_fecha (fecha_movimiento)
) ENGINE=InnoDB;

-- Tabla de donaciones
CREATE TABLE donaciones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo_donante ENUM('empresa_internacional', 'empresa_nacional', 'gobierno', 'particular') NOT NULL,
    nombre_donante VARCHAR(200) NOT NULL,
    identificacion VARCHAR(50),
    monto DECIMAL(10,2) NOT NULL,
    moneda VARCHAR(10) DEFAULT 'HNL',
    fecha_donacion DATE NOT NULL,
    metodo_pago VARCHAR(50),
    numero_recibo VARCHAR(50) UNIQUE,
    concepto TEXT,
    observaciones TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    registrado_por INT,
    INDEX idx_fecha (fecha_donacion),
    INDEX idx_tipo (tipo_donante)
) ENGINE=InnoDB;

-- Tabla de gastos operativos
CREATE TABLE gastos_operativos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    categoria VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    fecha_gasto DATE NOT NULL,
    proveedor VARCHAR(200),
    numero_factura VARCHAR(50),
    metodo_pago VARCHAR(50),
    observaciones TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    registrado_por INT,
    INDEX idx_fecha (fecha_gasto),
    INDEX idx_categoria (categoria)
) ENGINE=InnoDB;

-- Tabla de pagos a la fundación
CREATE TABLE pagos_fundacion (
    id INT PRIMARY KEY AUTO_INCREMENT,
    periodo_inicio DATE NOT NULL,
    periodo_fin DATE NOT NULL,
    total_consultas DECIMAL(10,2) DEFAULT 0,
    total_laboratorio DECIMAL(10,2) DEFAULT 0,
    total_medicamentos DECIMAL(10,2) DEFAULT 0,
    total_pagar DECIMAL(10,2) NOT NULL,
    descuento DECIMAL(10,2) DEFAULT 0,
    monto_pagado DECIMAL(10,2) DEFAULT 0,
    estado ENUM('pendiente', 'parcial', 'pagado') DEFAULT 'pendiente',
    fecha_pago DATE,
    metodo_pago VARCHAR(50),
    numero_referencia VARCHAR(100),
    observaciones TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    creado_por INT,
    INDEX idx_estado (estado),
    INDEX idx_fecha (fecha_creacion)
) ENGINE=InnoDB;

-- ============================================================================
-- TABLAS DE AUDITORÍA
-- ============================================================================

-- Tabla de logs del sistema
CREATE TABLE logs_sistema (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    accion VARCHAR(100) NOT NULL,
    modulo VARCHAR(50) NOT NULL,
    descripcion TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    INDEX idx_usuario (usuario_id),
    INDEX idx_fecha (fecha),
    INDEX idx_modulo (modulo)
) ENGINE=InnoDB;

-- ============================================================================
-- INSERTAR DATOS INICIALES
-- ============================================================================

-- Insertar especialidades médicas comunes
INSERT INTO especialidades (nombre, descripcion) VALUES
('Medicina General', 'Atención médica general'),
('Cardiología', 'Especialista en corazón y sistema circulatorio'),
('Neurología', 'Especialista en sistema nervioso'),
('Geriatría', 'Especialista en atención de adultos mayores'),
('Psiquiatría', 'Especialista en salud mental'),
('Oftalmología', 'Especialista en ojos y visión'),
('Traumatología', 'Especialista en huesos y articulaciones'),
('Endocrinología', 'Especialista en hormonas y diabetes'),
('Nefrología', 'Especialista en riñones'),
('Neumología', 'Especialista en pulmones y respiración');

-- Insertar tipos de exámenes comunes
INSERT INTO tipos_examenes (codigo, nombre, descripcion, costo, tiempo_resultados) VALUES
('HEMO001', 'Hemograma Completo', 'Análisis completo de células sanguíneas', 150.00, 24),
('GLUC001', 'Glucosa en Sangre', 'Medición de niveles de glucosa', 80.00, 2),
('COLE001', 'Perfil Lipídico', 'Colesterol total, HDL, LDL, Triglicéridos', 200.00, 24),
('ORIN001', 'Examen General de Orina', 'Análisis físico, químico y microscópico', 100.00, 12),
('CREA001', 'Creatinina', 'Función renal', 90.00, 24),
('ELEC001', 'Electrolitos', 'Sodio, Potasio, Cloro', 150.00, 24),
('TIRO001', 'Perfil Tiroideo', 'TSH, T3, T4', 300.00, 48),
('HEPA001', 'Perfil Hepático', 'Función del hígado', 250.00, 24),
('RAYOX001', 'Rayos X', 'Radiografía simple', 200.00, 24),
('ECG001', 'Electrocardiograma', 'Estudio del corazón', 150.00, 1);

-- Insertar medicamentos comunes
INSERT INTO medicamentos (codigo, nombre, descripcion, presentacion, concentracion, precio_unitario, stock) VALUES
('MED001', 'Paracetamol', 'Analgésico y antipirético', 'Tabletas', '500mg', 2.50, 500),
('MED002', 'Ibuprofeno', 'Antiinflamatorio', 'Tabletas', '400mg', 3.00, 400),
('MED003', 'Losartán', 'Antihipertensivo', 'Tabletas', '50mg', 5.00, 300),
('MED004', 'Metformina', 'Antidiabético', 'Tabletas', '850mg', 4.00, 350),
('MED005', 'Atorvastatina', 'Reductor de colesterol', 'Tabletas', '20mg', 8.00, 200),
('MED006', 'Omeprazol', 'Protector gástrico', 'Cápsulas', '20mg', 3.50, 300),
('MED007', 'Enalapril', 'Antihipertensivo', 'Tabletas', '10mg', 4.50, 250),
('MED008', 'Levotiroxina', 'Hormona tiroidea', 'Tabletas', '100mcg', 6.00, 200),
('MED009', 'Amoxicilina', 'Antibiótico', 'Cápsulas', '500mg', 5.00, 150),
('MED010', 'Loratadina', 'Antihistamínico', 'Tabletas', '10mg', 2.00, 300);

-- Insertar usuario administrador por defecto
-- Contraseña: Admin2025! (debe ser cambiada)
INSERT INTO usuarios (nombre, apellido, email, password, rol, activo, email_verificado) VALUES
('Administrador', 'Sistema', 'admin@asilocabezaalgodon.com', '$2a$10$XQwJl5qOxN3JmH5rLKwmVuHZhPG.xqF9p7P5PmYx6YvGH4KrZPYmC', 'admin', true, true);

-- ============================================================================
-- FIN DEL SCRIPT
-- ============================================================================

