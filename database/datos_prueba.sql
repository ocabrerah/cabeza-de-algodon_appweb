-- Datos de prueba para el sistema Cabeza de Algodón
-- Ejecutar después de que el backend haya creado las tablas

-- El usuario admin ya se crea automáticamente al iniciar el backend
-- Email: ocabrerah99@gmail.com
-- Password: Admin2025!

-- Usuarios de prueba (las contraseñas están hasheadas con bcrypt - password: "Test123!")
-- Nota: El backend debe estar corriendo para que las tablas existan

-- Pacientes de prueba
INSERT INTO pacientes (id, nombre, dpi, "fechaNacimiento", "tipoSangre", sexo, telefono, direccion, "nombreFamiliar", "telefonoFamiliar", "emailFamiliar", parentesco, "fechaIngreso", "motivoReclusión", psicopatologia, "medicamentosCajon", alergias, "antecedentesMedicos", activo, "createdAt", "updatedAt") VALUES
('550e8400-e29b-41d4-a716-446655440001', 'María Elena González', '1234567890101', '1940-03-15', 'O+', 'F', '1234-5678', 'Zona 1, Ciudad', 'Juan González', '8765-4321', 'juan@email.com', 'Hijo', '2023-01-10', 'Cuidados geriátricos', 'Alzheimer leve', 'Paracetamol, Vitaminas', 'Penicilina', 'Hipertensión, Diabetes tipo 2', true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440002', 'José Antonio Pérez', '1234567890102', '1938-07-22', 'A+', 'M', '2345-6789', 'Zona 5, Ciudad', 'Ana Pérez', '7654-3210', 'ana@email.com', 'Hija', '2023-02-15', 'Necesita atención permanente', 'Ninguna', 'Aspirina', 'Ninguna conocida', 'Artritis, Problemas cardíacos', true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440003', 'Carmen Rosa López', '1234567890103', '1945-11-08', 'B+', 'F', '3456-7890', 'Zona 10, Ciudad', 'Pedro López', '6543-2109', 'pedro@email.com', 'Sobrino', '2023-03-20', 'Cuidados especializados', 'Depresión', 'Antidepresivos', 'Ninguna', 'Hipertensión', true, NOW(), NOW());

-- Comentario: Los usuarios adicionales se pueden crear desde la interfaz web
-- Comentario: Las solicitudes, visitas, medicamentos, etc. se crean durante el uso del sistema

COMMIT;

