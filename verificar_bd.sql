-- Verificar datos en la base de datos
SELECT 'USUARIOS' as tabla, COUNT(*) as total FROM "usuarios"
UNION ALL
SELECT 'PACIENTES', COUNT(*) FROM "pacientes"
UNION ALL
SELECT 'FICHAS MEDICAS', COUNT(*) FROM "fichasMedicas"
UNION ALL
SELECT 'SOLICITUDES', COUNT(*) FROM "solicitudesMedicas"
UNION ALL
SELECT 'VISITAS', COUNT(*) FROM "visitasMedicas"
UNION ALL
SELECT 'MEDICAMENTOS', COUNT(*) FROM "medicamentos"
UNION ALL
SELECT 'APLICACIONES', COUNT(*) FROM "aplicacionMedicamentos"
UNION ALL
SELECT 'PRUEBAS LAB', COUNT(*) FROM "pruebasLaboratorio"
UNION ALL
SELECT 'RESULTADOS LAB', COUNT(*) FROM "resultadosLaboratorio"
UNION ALL
SELECT 'MOVIMIENTOS CAJA', COUNT(*) FROM "movimientosCaja";

-- Mostrar datos de usuario admin
SELECT '---USUARIO ADMIN---' as info;
SELECT nombre, email, rol, validado, activo FROM "usuarios" WHERE email = 'ocabrerah99@gmail.com';

