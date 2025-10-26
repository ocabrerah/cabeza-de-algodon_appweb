-- Script para poblar la base de datos con datos de prueba
-- Asilo Cabeza de Algodón

-- Limpiar datos existentes (excepto admin)
DELETE FROM medicamentos;
DELETE FROM examenes_laboratorio;
DELETE FROM visitas_medicas;
DELETE FROM solicitudes_medicas;
DELETE FROM cuentas_pacientes;
DELETE FROM transacciones WHERE "pacienteId" IS NOT NULL;
DELETE FROM pacientes;
DELETE FROM usuarios WHERE email != 'ocabrerah99@gmail.com';

-- USUARIOS (Contraseña para todos: Test123!)
INSERT INTO usuarios (id, nombre, email, password, rol, telefono, especialidad, activo, validado, "createdAt", "updatedAt") VALUES
('a1111111-1111-1111-1111-111111111111', 'Dr. Carlos Méndez', 'carlos.mendez@asilo.com', '$2a$10$rZ5Ym8N6QqXYLx.vqN5GduEKzYxH6gO3hP3vHZxQvJQzKJm8YOUZS', 'medico', '2234-5678', 'Geriatría', true, true, NOW(), NOW()),
('a2222222-2222-2222-2222-222222222222', 'Dra. Ana López', 'ana.lopez@asilo.com', '$2a$10$rZ5Ym8N6QqXYLx.vqN5GduEKzYxH6gO3hP3vHZxQvJQzKJm8YOUZS', 'medico', '2234-5679', 'Cardiología', true, true, NOW(), NOW()),
('a3333333-3333-3333-3333-333333333333', 'Enf. María García', 'maria.garcia@asilo.com', '$2a$10$rZ5Ym8N6QqXYLx.vqN5GduEKzYxH6gO3hP3vHZxQvJQzKJm8YOUZS', 'enfermero', '2234-5680', NULL, true, true, NOW(), NOW()),
('a4444444-4444-4444-4444-444444444444', 'Farm. Pedro Ruiz', 'pedro.ruiz@asilo.com', '$2a$10$rZ5Ym8N6QqXYLx.vqN5GduEKzYxH6gO3hP3vHZxQvJQzKJm8YOUZS', 'farmacia', '2234-5681', NULL, true, true, NOW(), NOW()),
('a5555555-5555-5555-5555-555555555555', 'Caja. Laura Díaz', 'laura.diaz@asilo.com', '$2a$10$rZ5Ym8N6QqXYLx.vqN5GduEKzYxH6gO3hP3vHZxQvJQzKJm8YOUZS', 'caja', '2234-5682', NULL, true, true, NOW(), NOW());

-- PACIENTES
INSERT INTO pacientes (id, nombre, dpi, "fechaNacimiento", "tipoSangre", sexo, telefono, direccion, "nombreFamiliar", "telefonoFamiliar", "emailFamiliar", parentesco, "fechaIngreso", "motivoReclusión", psicopatologia, "medicamentosCajon", alergias, "antecedentesMedicos", activo, "createdAt", "updatedAt") VALUES
('b1111111-1111-1111-1111-111111111111', 'María Elena González Pérez', '1234567890101', '1940-03-15', 'O+', 'F', '1234-5678', 'Zona 1, Ciudad de Guatemala', 'Juan González', '8765-4321', 'juan.gonzalez@email.com', 'Hijo', '2023-01-10', 'Requiere cuidados geriátricos especializados. Familia no puede brindar atención 24/7', 'Alzheimer leve en fase inicial', 'Paracetamol 500mg c/8hrs, Vitamina B12, Omeprazol 20mg', 'Penicilina', 'Hipertensión arterial controlada, Diabetes tipo 2, Osteoporosis', true, NOW(), NOW()),
('b2222222-2222-2222-2222-222222222222', 'José Antonio Pérez Rodríguez', '1234567890102', '1938-07-22', 'A+', 'M', '2345-6789', 'Zona 5, Ciudad de Guatemala', 'Ana Pérez', '7654-3210', 'ana.perez@email.com', 'Hija', '2023-02-15', 'Necesita atención médica permanente por condiciones cardíacas', 'Ninguna', 'Aspirina 100mg, Enalapril 10mg', 'Ninguna conocida', 'Insuficiencia cardíaca grado II, Artritis reumatoide', true, NOW(), NOW()),
('b3333333-3333-3333-3333-333333333333', 'Carmen Rosa López de Martínez', '1234567890103', '1945-11-08', 'B+', 'F', '3456-7890', 'Zona 10, Ciudad de Guatemala', 'Pedro López', '6543-2109', 'pedro.lopez@email.com', 'Sobrino', '2023-03-20', 'Cuidados especializados post ACV', 'Depresión moderada en tratamiento', 'Sertralina 50mg, Calcio + Vit D', 'Ninguna', 'ACV isquémico hace 6 meses, Hipertensión arterial', true, NOW(), NOW()),
('b4444444-4444-4444-4444-444444444444', 'Roberto Carlos Hernández', '1234567890104', '1942-05-30', 'AB+', 'M', '4567-8901', 'Zona 7, Mixco', 'Sofía Hernández', '5432-1098', 'sofia.hernandez@email.com', 'Hija', '2023-05-12', 'Movilidad reducida, requiere fisioterapia constante', 'Ninguna', 'Ibuprofeno 400mg SOS, Glucosamina', 'Sulfonamidas', 'Fractura de cadera, Artrosis severa', true, NOW(), NOW()),
('b5555555-5555-5555-5555-555555555555', 'Luisa Fernanda Morales', '1234567890105', '1944-09-18', 'O-', 'F', '5678-9012', 'Zona 11, Mixco', 'Carlos Morales', '4321-0987', 'carlos.morales@email.com', 'Hijo', '2023-07-25', 'Cuidados post operatorios y rehabilitación', 'Ninguna', 'Atorvastatina 20mg, Metformina 850mg', 'Yodo', 'Diabetes tipo 2, Dislipidemia, Hipotiroidismo', true, NOW(), NOW());

-- SOLICITUDES MÉDICAS
INSERT INTO solicitudes_medicas (id, "fechaSolicitud", motivo, "especialidadRequerida", prioridad, estado, observaciones, "fechaAsignada", "pacienteId", "medicoSolicitanteId", "enfermeroId", "createdAt", "updatedAt") VALUES
('c1111111-1111-1111-1111-111111111111', '2025-10-20 08:30:00', 'Control de presión arterial elevada. Paciente reporta mareos matutinos', 'Cardiología', 'alta', 'completada', 'Paciente estable pero requiere ajuste de medicación', '2025-10-21 10:00:00', 'b1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 'a3333333-3333-3333-3333-333333333333', NOW(), NOW()),
('c2222222-2222-2222-2222-222222222222', '2025-10-22 14:15:00', 'Dolor en articulaciones. Dificultad para caminar', 'Geriatría', 'media', 'asignada', 'Programar para revisión general', '2025-10-27 09:00:00', 'b2222222-2222-2222-2222-222222222222', 'a1111111-1111-1111-1111-111111111111', 'a3333333-3333-3333-3333-333333333333', NOW(), NOW()),
('c3333333-3333-3333-3333-333333333333', '2025-10-25 09:45:00', 'Revisión mensual de tratamiento antidepresivo', 'Geriatría', 'baja', 'pendiente', 'Control rutinario', NULL, 'b3333333-3333-3333-3333-333333333333', 'a1111111-1111-1111-1111-111111111111', 'a3333333-3333-3333-3333-333333333333', NOW(), NOW());

-- VISITAS MÉDICAS
INSERT INTO visitas_medicas (id, "fechaVisita", "motivoVisita", diagnostico, observaciones, estado, "costoConsulta", "pacienteId", "medicoId", "solicitudId", "createdAt", "updatedAt") VALUES
('d1111111-1111-1111-1111-111111111111', '2025-10-21 10:00:00', 'Control de presión arterial elevada. Paciente reporta mareos matutinos', 'Hipertensión arterial descontrolada. Se ajusta tratamiento antihipertensivo', 'Paciente consciente, orientado. Presión arterial 160/95 mmHg. Se aumenta dosis de Enalapril. Control en 15 días', 'completada', 250.00, 'b1111111-1111-1111-1111-111111111111', 'a2222222-2222-2222-2222-222222222222', 'c1111111-1111-1111-1111-111111111111', NOW(), NOW()),
('d2222222-2222-2222-2222-222222222222', '2025-10-18 15:30:00', 'Control rutinario diabetes. Revisión de niveles de glucosa', 'Diabetes tipo 2 controlada. Mantener tratamiento actual', 'Glucosa en ayunas 118 mg/dl. HbA1c 6.8%. Buen control metabólico. Continuar con Metformina 850mg c/12hrs', 'completada', 250.00, 'b5555555-5555-5555-5555-555555555555', 'a1111111-1111-1111-1111-111111111111', NULL, NOW(), NOW()),
('d3333333-3333-3333-3333-333333333333', '2025-10-15 11:00:00', 'Dolor lumbar intenso. Dificultad para movilizarse', 'Lumbalgia mecánica. Artrosis lumbar', 'Se prescribe analgesia y fisioterapia. Reposo relativo. Evitar cargar peso', 'completada', 250.00, 'b4444444-4444-4444-4444-444444444444', 'a1111111-1111-1111-1111-111111111111', NULL, NOW(), NOW());

-- EXÁMENES DE LABORATORIO
INSERT INTO examenes_laboratorio (id, "nombreExamen", descripcion, "fechaSolicitud", "fechaResultado", resultado, "archivoResultado", estado, costo, "visitaId", "createdAt", "updatedAt") VALUES
('e1111111-1111-1111-1111-111111111111', 'Química Sanguínea Completa', 'Glucosa, Creatinina, Urea, Colesterol, Triglicéridos', '2025-10-21 10:30:00', '2025-10-22 14:00:00', 'Glucosa: 125 mg/dl, Creatinina: 1.1 mg/dl, Urea: 38 mg/dl, Colesterol Total: 198 mg/dl, Triglicéridos: 165 mg/dl. Valores dentro de rangos aceptables', NULL, 'completado', 180.00, 'd1111111-1111-1111-1111-111111111111', NOW(), NOW()),
('e2222222-2222-2222-2222-222222222222', 'Hemograma Completo', 'Biometría hemática completa', '2025-10-18 15:45:00', '2025-10-19 10:00:00', 'Hb: 13.2 g/dl, Hto: 39.5%, Leucocitos: 7,200/mm3, Plaquetas: 245,000/mm3. Sin alteraciones significativas', NULL, 'completado', 120.00, 'd2222222-2222-2222-2222-222222222222', NOW(), NOW()),
('e3333333-3333-3333-3333-333333333333', 'Radiografía de Columna Lumbar', 'RX simple AP y lateral', '2025-10-15 11:30:00', '2025-10-16 09:00:00', 'Signos de artrosis lumbar L4-L5 y L5-S1. Disminución del espacio intervertebral. No fracturas', NULL, 'completado', 200.00, 'd3333333-3333-3333-3333-333333333333', NOW(), NOW());

-- MEDICAMENTOS
INSERT INTO medicamentos (id, "nombreMedicamento", cantidad, dosis, frecuencia, duracion, instrucciones, "fechaInicio", "fechaFin", costo, estado, "visitaId", "createdAt", "updatedAt") VALUES
('f1111111-1111-1111-1111-111111111111', 'Enalapril', '30 tabletas', '20mg', 'Cada 12 horas', '30 días', 'Tomar una tableta cada 12 horas con las comidas. No suspender sin indicación médica', '2025-10-21', '2025-11-20', 85.00, 'despachado', 'd1111111-1111-1111-1111-111111111111', NOW(), NOW()),
('f2222222-2222-2222-2222-222222222222', 'Aspirina', '30 tabletas', '100mg', 'Cada 24 horas', '30 días', 'Tomar una tableta al día en la mañana con alimentos', '2025-10-21', '2025-11-20', 45.00, 'despachado', 'd1111111-1111-1111-1111-111111111111', NOW(), NOW()),
('f3333333-3333-3333-3333-333333333333', 'Metformina', '60 tabletas', '850mg', 'Cada 12 horas', '30 días', 'Tomar con las comidas principales. Tomar con abundante agua', '2025-10-18', '2025-11-17', 95.00, 'despachado', 'd2222222-2222-2222-2222-222222222222', NOW(), NOW()),
('f4444444-4444-4444-4444-444444444444', 'Ibuprofeno', '20 tabletas', '400mg', 'Cada 8 horas', '10 días', 'Tomar solo si hay dolor. No exceder 3 tabletas al día. Tomar con alimentos', '2025-10-15', '2025-10-25', 35.00, 'despachado', 'd3333333-3333-3333-3333-333333333333', NOW(), NOW()),
('f5555555-5555-5555-5555-555555555555', 'Paracetamol', '30 tabletas', '500mg', 'Cada 8 horas', '15 días', 'Tomar si hay dolor o fiebre. Máximo 4 gramos al día', '2025-10-15', '2025-10-30', 28.00, 'despachado', 'd3333333-3333-3333-3333-333333333333', NOW(), NOW());

-- TRANSACCIONES FINANCIERAS
INSERT INTO transacciones (id, tipo, categoria, monto, fecha, descripcion, referencia, donante, "metodoPago", "pacienteId", "createdAt", "updatedAt") VALUES
('g1111111-1111-1111-1111-111111111111', 'ingreso', 'donacion', 15000.00, '2025-10-01', 'Donación mensual de Fundación Ayuda Social', 'DON-2025-001', 'Fundación Ayuda Social', 'transferencia', NULL, NOW(), NOW()),
('g2222222-2222-2222-2222-222222222222', 'ingreso', 'donacion', 8000.00, '2025-10-05', 'Donación de Empresa Textiles S.A.', 'DON-2025-002', 'Empresa Textiles S.A.', 'cheque', NULL, NOW(), NOW()),
('g3333333-3333-3333-3333-333333333333', 'ingreso', 'cuota_mensual', 2500.00, '2025-10-10', 'Cuota mensual octubre 2025', 'CUOTA-OCT-2025', NULL, 'efectivo', 'b1111111-1111-1111-1111-111111111111', NOW(), NOW()),
('g4444444-4444-4444-4444-444444444444', 'ingreso', 'cuota_mensual', 2500.00, '2025-10-10', 'Cuota mensual octubre 2025', 'CUOTA-OCT-2025', NULL, 'transferencia', 'b2222222-2222-2222-2222-222222222222', NOW(), NOW()),
('g5555555-5555-5555-5555-555555555555', 'egreso', 'servicios', 3200.00, '2025-10-15', 'Pago de servicio eléctrico octubre 2025', 'ELEC-OCT-2025', NULL, 'transferencia', NULL, NOW(), NOW()),
('g6666666-6666-6666-6666-666666666666', 'egreso', 'servicios', 1800.00, '2025-10-15', 'Pago de servicio de agua octubre 2025', 'AGUA-OCT-2025', NULL, 'transferencia', NULL, NOW(), NOW()),
('g7777777-7777-7777-7777-777777777777', 'ingreso', 'cuota_mensual', 2500.00, '2025-10-12', 'Cuota mensual octubre 2025', 'CUOTA-OCT-2025', NULL, 'efectivo', 'b3333333-3333-3333-3333-333333333333', NOW(), NOW());

-- CUENTAS DE PACIENTES
INSERT INTO cuentas_pacientes (id, mes, anio, "cuotaMensual", "totalConsultas", "totalLaboratorio", "totalFarmacia", total, pagado, saldo, estado, "pacienteId", "createdAt", "updatedAt") VALUES
('h1111111-1111-1111-1111-111111111111', 10, 2025, 2500.00, 250.00, 180.00, 130.00, 3060.00, 2500.00, 560.00, 'pendiente', 'b1111111-1111-1111-1111-111111111111', NOW(), NOW()),
('h2222222-2222-2222-2222-222222222222', 10, 2025, 2500.00, 250.00, 120.00, 95.00, 2965.00, 2500.00, 465.00, 'pendiente', 'b5555555-5555-5555-5555-555555555555', NOW(), NOW()),
('h3333333-3333-3333-3333-333333333333', 10, 2025, 2500.00, 250.00, 200.00, 63.00, 3013.00, 2500.00, 513.00, 'pendiente', 'b4444444-4444-4444-4444-444444444444', NOW(), NOW()),
('h4444444-4444-4444-4444-444444444444', 10, 2025, 2500.00, 0.00, 0.00, 0.00, 2500.00, 2500.00, 0.00, 'pagado', 'b2222222-2222-2222-2222-222222222222', NOW(), NOW()),
('h5555555-5555-5555-5555-555555555555', 10, 2025, 2500.00, 0.00, 0.00, 0.00, 2500.00, 2500.00, 0.00, 'pagado', 'b3333333-3333-3333-3333-333333333333', NOW(), NOW());

-- Resumen
SELECT 'Base de datos poblada exitosamente' as mensaje;
SELECT 'Usuarios creados: ' || COUNT(*) FROM usuarios;
SELECT 'Pacientes creados: ' || COUNT(*) FROM pacientes;
SELECT 'Solicitudes creadas: ' || COUNT(*) FROM solicitudes_medicas;
SELECT 'Visitas creadas: ' || COUNT(*) FROM visitas_medicas;
SELECT 'Exámenes creados: ' || COUNT(*) FROM examenes_laboratorio;
SELECT 'Medicamentos creados: ' || COUNT(*) FROM medicamentos;
SELECT 'Transacciones creadas: ' || COUNT(*) FROM transacciones;
SELECT 'Cuentas creadas: ' || COUNT(*) FROM cuentas_pacientes;

