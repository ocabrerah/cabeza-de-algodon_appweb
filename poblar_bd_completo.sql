-- ============================================
-- POBLAR BASE DE DATOS - ASILO CABEZA DE ALGODÓN
-- Datos completos para demostración funcional
-- ============================================

-- Limpiar datos existentes (excepto el admin)
DELETE FROM "aplicacionMedicamentos" WHERE id IS NOT NULL;
DELETE FROM "medicamentos" WHERE id IS NOT NULL;
DELETE FROM "resultadosLaboratorio" WHERE id IS NOT NULL;
DELETE FROM "pruebasLaboratorio" WHERE id IS NOT NULL;
DELETE FROM "visitasMedicas" WHERE id IS NOT NULL;
DELETE FROM "solicitudesMedicas" WHERE id IS NOT NULL;
DELETE FROM "movimientosCaja" WHERE id IS NOT NULL;
DELETE FROM "fichasMedicas" WHERE id IS NOT NULL;
DELETE FROM "pacientes" WHERE id IS NOT NULL;
DELETE FROM "usuarios" WHERE email != 'ocabrerah99@gmail.com';

-- ============================================
-- 1. USUARIOS (diferentes roles)
-- ============================================

-- Usuario Admin (ya existe, pero actualizamos contraseña por si acaso)
UPDATE "usuarios" 
SET password = '$2a$10$DbBGQcxP/wfZTaEK3Q43YefwK3tO/m.SVfFkR0CWfgKCn67cAxPzC',
    validado = true,
    activo = true
WHERE email = 'ocabrerah99@gmail.com';

-- Médico
INSERT INTO "usuarios" (id, nombre, email, password, rol, telefono, especialidad, activo, validado, "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid(), 'Dr. Carlos Méndez', 'medico@asilo.com', '$2a$10$DbBGQcxP/wfZTaEK3Q43YefwK3tO/m.SVfFkR0CWfgKCn67cAxPzC', 'medico', '2234-5678', 'Cardiología', true, true, NOW(), NOW());

-- Enfermero
INSERT INTO "usuarios" (id, nombre, email, password, rol, telefono, activo, validado, "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid(), 'María González', 'enfermero@asilo.com', '$2a$10$DbBGQcxP/wfZTaEK3Q43YefwK3tO/m.SVfFkR0CWfgKCn67cAxPzC', 'enfermero', '2234-5679', true, true, NOW(), NOW());

-- Farmacia
INSERT INTO "usuarios" (id, nombre, email, password, rol, telefono, activo, validado, "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid(), 'Juan Pérez', 'farmacia@asilo.com', '$2a$10$DbBGQcxP/wfZTaEK3Q43YefwK3tO/m.SVfFkR0CWfgKCn67cAxPzC', 'farmacia', '2234-5680', true, true, NOW(), NOW());

-- Caja
INSERT INTO "usuarios" (id, nombre, email, password, rol, telefono, activo, validado, "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid(), 'Ana Martínez', 'caja@asilo.com', '$2a$10$DbBGQcxP/wfZTaEK3Q43YefwK3tO/m.SVfFkR0CWfgKCn67cAxPzC', 'caja', '2234-5681', true, true, NOW(), NOW());

-- ============================================
-- 2. PACIENTES
-- ============================================

INSERT INTO "pacientes" (id, nombre, apellido, fechaNacimiento, sexo, dpi, direccion, telefono, contactoEmergencia, telefonoEmergencia, emailFamilia, tipoSangre, alergias, estado, "createdAt", "updatedAt")
VALUES 
  ('p1-uuid-111', 'José', 'García López', '1945-03-15', 'M', '1234567890101', 'Zona 1, Ciudad de Guatemala', '2345-6789', 'María García', '2345-6790', 'maria.garcia@email.com', 'O+', 'Penicilina', 'activo', NOW(), NOW()),
  ('p2-uuid-222', 'María', 'Rodríguez', '1940-07-22', 'F', '1234567890102', 'Zona 3, Ciudad de Guatemala', '2345-6791', 'Pedro Rodríguez', '2345-6792', 'pedro.rodriguez@email.com', 'A+', 'Ninguna', 'activo', NOW(), NOW()),
  ('p3-uuid-333', 'Pedro', 'Martínez', '1938-11-08', 'M', '1234567890103', 'Zona 5, Ciudad de Guatemala', '2345-6793', 'Ana Martínez', '2345-6794', 'ana.martinez@email.com', 'B+', 'Aspirina', 'activo', NOW(), NOW()),
  ('p4-uuid-444', 'Ana', 'López', '1942-05-30', 'F', '1234567890104', 'Zona 7, Ciudad de Guatemala', '2345-6795', 'Luis López', '2345-6796', 'luis.lopez@email.com', 'AB+', 'Ninguna', 'activo', NOW(), NOW()),
  ('p5-uuid-555', 'Carlos', 'Hernández', '1950-09-12', 'M', '1234567890105', 'Zona 10, Ciudad de Guatemala', '2345-6797', 'Rosa Hernández', '2345-6798', 'rosa.hernandez@email.com', 'O-', 'Mariscos', 'activo', NOW(), NOW());

-- ============================================
-- 3. FICHAS MÉDICAS
-- ============================================

INSERT INTO "fichasMedicas" (id, "pacienteId", peso, altura, presionArterial, frecuenciaCardiaca, temperatura, diagnostico, tratamiento, observaciones, "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid(), 'p1-uuid-111', 75.5, 1.70, '120/80', 72, 36.5, 'Hipertensión controlada', 'Enalapril 10mg cada 12 horas', 'Paciente estable, control mensual', NOW(), NOW()),
  (gen_random_uuid(), 'p2-uuid-222', 68.0, 1.60, '130/85', 75, 36.8, 'Diabetes tipo 2', 'Metformina 850mg cada 8 horas', 'Controlar niveles de glucosa', NOW(), NOW()),
  (gen_random_uuid(), 'p3-uuid-333', 82.0, 1.75, '140/90', 80, 37.0, 'Artritis reumatoide', 'Ibuprofeno 400mg cada 8 horas', 'Terapia física recomendada', NOW(), NOW()),
  (gen_random_uuid(), 'p4-uuid-444', 70.0, 1.65, '125/82', 70, 36.6, 'Osteoporosis', 'Calcio + Vitamina D diario', 'Evitar caídas', NOW(), NOW()),
  (gen_random_uuid(), 'p5-uuid-555', 78.5, 1.72, '118/78', 68, 36.4, 'Control de rutina', 'Sin medicación permanente', 'Estado general excelente', NOW(), NOW());

-- ============================================
-- 4. SOLICITUDES MÉDICAS
-- ============================================

INSERT INTO "solicitudesMedicas" (id, "pacienteId", tipo, prioridad, motivoConsulta, sintomas, especialidadRequerida, doctorReferido, estado, "fechaSolicitud", "fechaAgendada", observaciones, "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid(), 'p1-uuid-111', 'consulta', 'alta', 'Dolor en el pecho', 'Opresión torácica, sudoración', 'Cardiología', 'Dr. Juan Pérez', 'completada', NOW() - INTERVAL '5 days', NOW() - INTERVAL '3 days', 'Consulta realizada exitosamente', NOW(), NOW()),
  (gen_random_uuid(), 'p2-uuid-222', 'laboratorio', 'media', 'Control de glucosa', 'Sed excesiva, cansancio', 'Endocrinología', 'Dra. María López', 'en_proceso', NOW() - INTERVAL '2 days', NOW() + INTERVAL '1 day', 'Pendiente resultados de laboratorio', NOW(), NOW()),
  (gen_random_uuid(), 'p3-uuid-333', 'consulta', 'baja', 'Dolor en articulaciones', 'Rigidez matutina, inflamación', 'Reumatología', 'Dr. Carlos Méndez', 'pendiente', NOW(), NOW() + INTERVAL '5 days', 'Primera consulta con especialista', NOW(), NOW()),
  (gen_random_uuid(), 'p4-uuid-444', 'emergencia', 'urgente', 'Caída con dolor intenso', 'Dolor en cadera, imposibilidad de caminar', 'Traumatología', 'Dr. Roberto Gómez', 'completada', NOW() - INTERVAL '10 days', NOW() - INTERVAL '9 days', 'Atendida en urgencias', NOW(), NOW()),
  (gen_random_uuid(), 'p5-uuid-555', 'consulta', 'baja', 'Control de rutina anual', 'Sin síntomas', 'Medicina General', 'Dr. Carlos Méndez', 'agendada', NOW(), NOW() + INTERVAL '7 days', 'Chequeo preventivo', NOW(), NOW());

-- ============================================
-- 5. VISITAS MÉDICAS
-- ============================================

INSERT INTO "visitasMedicas" (id, "pacienteId", "solicitudId", "medicoId", "fechaVisita", tipo, motivoVisita, diagnostico, tratamiento, observaciones, recetaMedicamentos, ordenesLaboratorio, proximaVisita, estado, "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid(), 'p1-uuid-111', (SELECT id FROM "solicitudesMedicas" WHERE "pacienteId" = 'p1-uuid-111' LIMIT 1), (SELECT id FROM "usuarios" WHERE rol = 'medico' LIMIT 1), NOW() - INTERVAL '3 days', 'consulta', 'Dolor torácico', 'Angina de pecho estable', 'Nitroglicerina sublingual PRN', 'Electrocardiograma sin alteraciones significativas', '["Nitroglicerina 0.5mg sublingual PRN", "Enalapril 10mg c/12h"]', '["Perfil lipídico", "Troponinas"]', NOW() + INTERVAL '30 days', 'completada', NOW(), NOW()),
  (gen_random_uuid(), 'p2-uuid-222', (SELECT id FROM "solicitudesMedicas" WHERE "pacienteId" = 'p2-uuid-222' LIMIT 1), (SELECT id FROM "usuarios" WHERE rol = 'medico' LIMIT 1), NOW() - INTERVAL '1 day', 'laboratorio', 'Control diabético', 'Diabetes tipo 2 descompensada', 'Ajuste de dosis de Metformina', 'Hemoglobina glicosilada en 8.2%', '["Metformina 1000mg c/8h"]', '["Glucosa en ayunas", "HbA1c", "Creatinina"]', NOW() + INTERVAL '15 days', 'completada', NOW(), NOW()),
  (gen_random_uuid(), 'p4-uuid-444', (SELECT id FROM "solicitudesMedicas" WHERE "pacienteId" = 'p4-uuid-444' LIMIT 1), (SELECT id FROM "usuarios" WHERE rol = 'medico' LIMIT 1), NOW() - INTERVAL '9 days', 'emergencia', 'Caída con trauma', 'Fractura de cadera izquierda', 'Inmovilización y analgesia', 'Requiere evaluación quirúrgica', '["Tramadol 50mg c/8h", "Paracetamol 500mg c/6h"]', '["Radiografía de cadera AP y lateral"]', NOW() + INTERVAL '7 days', 'completada', NOW(), NOW());

-- ============================================
-- 6. MEDICAMENTOS
-- ============================================

INSERT INTO "medicamentos" (id, nombre, principioActivo, presentacion, concentracion, lote, "fechaVencimiento", cantidad, "cantidadMinima", precio, "precioFundacion", indicaciones, contraindicaciones, "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid(), 'Enalapril', 'Enalapril Maleato', 'Tableta', '10mg', 'LOT2024001', '2025-12-31', 500, 100, 2.50, 1.50, 'Hipertensión arterial', 'Embarazo, hipersensibilidad', NOW(), NOW()),
  (gen_random_uuid(), 'Metformina', 'Metformina Clorhidrato', 'Tableta', '850mg', 'LOT2024002', '2026-06-30', 800, 150, 1.80, 1.00, 'Diabetes tipo 2', 'Insuficiencia renal', NOW(), NOW()),
  (gen_random_uuid(), 'Ibuprofeno', 'Ibuprofeno', 'Tableta', '400mg', 'LOT2024003', '2025-08-31', 600, 120, 1.20, 0.70, 'Dolor e inflamación', 'Úlcera péptica activa', NOW(), NOW()),
  (gen_random_uuid(), 'Paracetamol', 'Paracetamol', 'Tableta', '500mg', 'LOT2024004', '2026-03-31', 1000, 200, 0.80, 0.40, 'Dolor y fiebre', 'Hepatopatía severa', NOW(), NOW()),
  (gen_random_uuid(), 'Tramadol', 'Tramadol Clorhidrato', 'Tableta', '50mg', 'LOT2024005', '2025-10-31', 300, 50, 3.50, 2.00, 'Dolor moderado a severo', 'Depresión respiratoria', NOW(), NOW()),
  (gen_random_uuid(), 'Nitroglicerina', 'Nitroglicerina', 'Sublingual', '0.5mg', 'LOT2024006', '2025-09-30', 150, 30, 5.00, 3.00, 'Angina de pecho', 'Hipotensión severa', NOW(), NOW()),
  (gen_random_uuid(), 'Calcio + Vitamina D', 'Carbonato de Calcio + Colecalciferol', 'Tableta', '600mg+400UI', 'LOT2024007', '2026-12-31', 400, 80, 2.00, 1.20, 'Osteoporosis', 'Hipercalcemia', NOW(), NOW()),
  (gen_random_uuid(), 'Omeprazol', 'Omeprazol', 'Cápsula', '20mg', 'LOT2024008', '2026-01-31', 450, 90, 1.50, 0.90, 'Reflujo gastroesofágico', 'Hipersensibilidad', NOW(), NOW());

-- ============================================
-- 7. APLICACIÓN DE MEDICAMENTOS
-- ============================================

INSERT INTO "aplicacionMedicamentos" (id, "pacienteId", "medicamentoId", dosis, frecuencia, via, "fechaInicio", "fechaFin", "horaAplicacion", aplicadoPor, observaciones, "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid(), 'p1-uuid-111', (SELECT id FROM "medicamentos" WHERE nombre = 'Enalapril' LIMIT 1), '10mg', 'Cada 12 horas', 'oral', NOW() - INTERVAL '30 days', NOW() + INTERVAL '60 days', '08:00', 'María González', 'Paciente tolera bien', NOW(), NOW()),
  (gen_random_uuid(), 'p2-uuid-222', (SELECT id FROM "medicamentos" WHERE nombre = 'Metformina' LIMIT 1), '850mg', 'Cada 8 horas', 'oral', NOW() - INTERVAL '60 days', NOW() + INTERVAL '30 days', '08:00', 'María González', 'Tomar con alimentos', NOW(), NOW()),
  (gen_random_uuid(), 'p3-uuid-333', (SELECT id FROM "medicamentos" WHERE nombre = 'Ibuprofeno' LIMIT 1), '400mg', 'Cada 8 horas', 'oral', NOW() - INTERVAL '15 days', NOW() + INTERVAL '15 days', '08:00', 'María González', 'Después de comidas', NOW(), NOW()),
  (gen_random_uuid(), 'p4-uuid-444', (SELECT id FROM "medicamentos" WHERE nombre = 'Calcio + Vitamina D' LIMIT 1), '1 tableta', 'Diario', 'oral', NOW() - INTERVAL '90 days', NOW() + INTERVAL '270 days', '09:00', 'María González', 'Tratamiento continuo', NOW(), NOW()),
  (gen_random_uuid(), 'p4-uuid-444', (SELECT id FROM "medicamentos" WHERE nombre = 'Tramadol' LIMIT 1), '50mg', 'Cada 8 horas', 'oral', NOW() - INTERVAL '9 days', NOW() + INTERVAL '5 days', '08:00', 'María González', 'Por dolor post-fractura', NOW(), NOW());

-- ============================================
-- 8. PRUEBAS DE LABORATORIO
-- ============================================

INSERT INTO "pruebasLaboratorio" (id, "pacienteId", "solicitudId", "visitaId", tipo, descripcion, "fechaSolicitud", "fechaRealizacion", estado, observaciones, "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid(), 'p1-uuid-111', (SELECT id FROM "solicitudesMedicas" WHERE "pacienteId" = 'p1-uuid-111' LIMIT 1), (SELECT id FROM "visitasMedicas" WHERE "pacienteId" = 'p1-uuid-111' LIMIT 1), 'sangre', 'Perfil lipídico completo', NOW() - INTERVAL '4 days', NOW() - INTERVAL '2 days', 'completado', 'Muestra tomada en ayunas', NOW(), NOW()),
  (gen_random_uuid(), 'p2-uuid-222', (SELECT id FROM "solicitudesMedicas" WHERE "pacienteId" = 'p2-uuid-222' LIMIT 1), (SELECT id FROM "visitasMedicas" WHERE "pacienteId" = 'p2-uuid-222' LIMIT 1), 'sangre', 'Glucosa en ayunas y HbA1c', NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day', 'completado', 'Control diabético', NOW(), NOW()),
  (gen_random_uuid(), 'p3-uuid-333', NULL, NULL, 'sangre', 'Factor reumatoide y PCR', NOW() - INTERVAL '1 day', NULL, 'pendiente', 'Pendiente de realizar', NOW(), NOW()),
  (gen_random_uuid(), 'p4-uuid-444', (SELECT id FROM "solicitudesMedicas" WHERE "pacienteId" = 'p4-uuid-444' LIMIT 1), (SELECT id FROM "visitasMedicas" WHERE "pacienteId" = 'p4-uuid-444' LIMIT 1), 'imagen', 'Radiografía de cadera', NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days', 'completado', 'Urgencia por trauma', NOW(), NOW());

-- ============================================
-- 9. RESULTADOS DE LABORATORIO
-- ============================================

INSERT INTO "resultadosLaboratorio" (id, "pruebaId", parametro, valor, "valorReferencia", unidad, estado, "fechaResultado", interpretacion, observaciones, "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid(), (SELECT id FROM "pruebasLaboratorio" WHERE "pacienteId" = 'p1-uuid-111' LIMIT 1), 'Colesterol Total', '220', '< 200', 'mg/dL', 'elevado', NOW() - INTERVAL '2 days', 'Hipercolesterolemia leve', 'Recomendar dieta', NOW(), NOW()),
  (gen_random_uuid(), (SELECT id FROM "pruebasLaboratorio" WHERE "pacienteId" = 'p1-uuid-111' LIMIT 1), 'LDL', '150', '< 100', 'mg/dL', 'elevado', NOW() - INTERVAL '2 days', 'Elevado', 'Considerar estatinas', NOW(), NOW()),
  (gen_random_uuid(), (SELECT id FROM "pruebasLaboratorio" WHERE "pacienteId" = 'p1-uuid-111' LIMIT 1), 'HDL', '45', '> 40', 'mg/dL', 'normal', NOW() - INTERVAL '2 days', 'Dentro de rango', '', NOW(), NOW()),
  (gen_random_uuid(), (SELECT id FROM "pruebasLaboratorio" WHERE "pacienteId" = 'p2-uuid-222' LIMIT 1), 'Glucosa en ayunas', '145', '70-100', 'mg/dL', 'elevado', NOW() - INTERVAL '1 day', 'Hiperglucemia', 'Ajustar tratamiento', NOW(), NOW()),
  (gen_random_uuid(), (SELECT id FROM "pruebasLaboratorio" WHERE "pacienteId" = 'p2-uuid-222' LIMIT 1), 'HbA1c', '8.2', '< 7', '%', 'elevado', NOW() - INTERVAL '1 day', 'Control diabético inadecuado', 'Ajustar dosis', NOW(), NOW());

-- ============================================
-- 10. MOVIMIENTOS DE CAJA
-- ============================================

INSERT INTO "movimientosCaja" (id, tipo, categoria, monto, descripcion, origen, "pacienteId", "fechaMovimiento", comprobante, estado, observaciones, "createdAt", "updatedAt")
VALUES 
  -- INGRESOS
  (gen_random_uuid(), 'ingreso', 'donacion', 5000.00, 'Donación mensual Fundación Ayuda', 'Fundación Ayuda Social', NULL, NOW() - INTERVAL '5 days', 'DON-2024-001', 'confirmado', 'Donación recurrente', NOW(), NOW()),
  (gen_random_uuid(), 'ingreso', 'cuota_familiar', 800.00, 'Cuota mensual - José García', 'Familia García', 'p1-uuid-111', NOW() - INTERVAL '3 days', 'CF-2024-001', 'confirmado', 'Pago puntual', NOW(), NOW()),
  (gen_random_uuid(), 'ingreso', 'cuota_familiar', 800.00, 'Cuota mensual - María Rodríguez', 'Familia Rodríguez', 'p2-uuid-222', NOW() - INTERVAL '2 days', 'CF-2024-002', 'confirmado', 'Pago puntual', NOW(), NOW()),
  (gen_random_uuid(), 'ingreso', 'cuota_familiar', 800.00, 'Cuota mensual - Ana López', 'Familia López', 'p4-uuid-444', NOW() - INTERVAL '1 day', 'CF-2024-003', 'confirmado', 'Pago puntual', NOW(), NOW()),
  (gen_random_uuid(), 'ingreso', 'donacion', 2000.00, 'Donación particular - Empresa XYZ', 'Empresa XYZ S.A.', NULL, NOW(), 'DON-2024-002', 'confirmado', 'Donación única', NOW(), NOW()),
  
  -- EGRESOS
  (gen_random_uuid(), 'egreso', 'servicio_medico', 350.00, 'Consulta cardiología - José García', 'Fundación Médica', 'p1-uuid-111', NOW() - INTERVAL '3 days', 'CONS-2024-001', 'pendiente_pago', 'Pendiente de pago a fundación', NOW(), NOW()),
  (gen_random_uuid(), 'egreso', 'medicamento', 125.00, 'Medicamentos - María Rodríguez', 'Farmacia Fundación', 'p2-uuid-222', NOW() - INTERVAL '2 days', 'MED-2024-001', 'pendiente_pago', 'Con descuento fundación', NOW(), NOW()),
  (gen_random_uuid(), 'egreso', 'laboratorio', 85.00, 'Pruebas de laboratorio - José García', 'Laboratorio Fundación', 'p1-uuid-111', NOW() - INTERVAL '2 days', 'LAB-2024-001', 'pendiente_pago', 'Perfil lipídico', NOW(), NOW()),
  (gen_random_uuid(), 'egreso', 'servicio_medico', 450.00, 'Emergencia traumatología - Ana López', 'Fundación Médica', 'p4-uuid-444', NOW() - INTERVAL '9 days', 'EMERG-2024-001', 'pagado', 'Atención urgente', NOW(), NOW()),
  (gen_random_uuid(), 'egreso', 'servicio_basico', 1200.00, 'Factura de luz - Octubre', 'EEGSA', NULL, NOW() - INTERVAL '7 days', 'ELEC-2024-10', 'pagado', 'Servicios básicos', NOW(), NOW()),
  (gen_random_uuid(), 'egreso', 'servicio_basico', 450.00, 'Factura de agua - Octubre', 'EMPAGUA', NULL, NOW() - INTERVAL '6 days', 'AGUA-2024-10', 'pagado', 'Servicios básicos', NOW(), NOW()),
  (gen_random_uuid(), 'egreso', 'alimentacion', 3500.00, 'Compra de alimentos - Semanal', 'Supermercado Central', NULL, NOW() - INTERVAL '4 days', 'ALI-2024-W42', 'pagado', 'Abastecimiento semanal', NOW(), NOW()),
  (gen_random_uuid(), 'egreso', 'medicamento', 280.00, 'Compra de medicamentos de stock', 'Farmacia Fundación', NULL, NOW() - INTERVAL '5 days', 'MED-2024-002', 'pagado', 'Reabastecimiento', NOW(), NOW());

-- ============================================
-- RESUMEN DE DATOS INSERTADOS
-- ============================================

-- Contar registros
DO $$
DECLARE
  count_usuarios INT;
  count_pacientes INT;
  count_fichas INT;
  count_solicitudes INT;
  count_visitas INT;
  count_medicamentos INT;
  count_aplicaciones INT;
  count_pruebas INT;
  count_resultados INT;
  count_movimientos INT;
BEGIN
  SELECT COUNT(*) INTO count_usuarios FROM "usuarios";
  SELECT COUNT(*) INTO count_pacientes FROM "pacientes";
  SELECT COUNT(*) INTO count_fichas FROM "fichasMedicas";
  SELECT COUNT(*) INTO count_solicitudes FROM "solicitudesMedicas";
  SELECT COUNT(*) INTO count_visitas FROM "visitasMedicas";
  SELECT COUNT(*) INTO count_medicamentos FROM "medicamentos";
  SELECT COUNT(*) INTO count_aplicaciones FROM "aplicacionMedicamentos";
  SELECT COUNT(*) INTO count_pruebas FROM "pruebasLaboratorio";
  SELECT COUNT(*) INTO count_resultados FROM "resultadosLaboratorio";
  SELECT COUNT(*) INTO count_movimientos FROM "movimientosCaja";
  
  RAISE NOTICE '============================================';
  RAISE NOTICE 'BASE DE DATOS POBLADA EXITOSAMENTE';
  RAISE NOTICE '============================================';
  RAISE NOTICE 'Usuarios: %', count_usuarios;
  RAISE NOTICE 'Pacientes: %', count_pacientes;
  RAISE NOTICE 'Fichas Médicas: %', count_fichas;
  RAISE NOTICE 'Solicitudes Médicas: %', count_solicitudes;
  RAISE NOTICE 'Visitas Médicas: %', count_visitas;
  RAISE NOTICE 'Medicamentos: %', count_medicamentos;
  RAISE NOTICE 'Aplicaciones de Medicamentos: %', count_aplicaciones;
  RAISE NOTICE 'Pruebas de Laboratorio: %', count_pruebas;
  RAISE NOTICE 'Resultados de Laboratorio: %', count_resultados;
  RAISE NOTICE 'Movimientos de Caja: %', count_movimientos;
  RAISE NOTICE '============================================';
  RAISE NOTICE 'CREDENCIALES DE ACCESO:';
  RAISE NOTICE 'Email: ocabrerah99@gmail.com';
  RAISE NOTICE 'Contraseña: Admin2025!';
  RAISE NOTICE '============================================';
END $$;

