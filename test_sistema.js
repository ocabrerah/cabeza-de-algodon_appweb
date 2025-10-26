// Script de prueba completo del sistema
const axios = require('axios');
const bcrypt = require('bcryptjs');

const BASE_URL = 'http://localhost:5000/api';
const TEST_EMAIL = 'ocabrerah99@gmail.com';
const TEST_PASSWORD = 'Admin2025!';

console.log('🔍 INICIANDO PRUEBAS DEL SISTEMA...\n');

async function probarSistema() {
  try {
    // 1. Probar health check
    console.log('1️⃣ Probando Health Check...');
    const health = await axios.get('http://localhost:5000/api/health');
    console.log('✅ Health Check OK:', health.data.status);
    console.log('');

    // 2. Probar login
    console.log('2️⃣ Probando Login...');
    console.log(`   Email: ${TEST_EMAIL}`);
    console.log(`   Password: ${TEST_PASSWORD}`);
    
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: TEST_EMAIL,
      password: TEST_PASSWORD
    });
    
    console.log('✅ Login exitoso');
    console.log('   Token recibido:', loginResponse.data.token ? 'SÍ' : 'NO');
    console.log('   Usuario:', loginResponse.data.usuario.nombre);
    console.log('   Rol:', loginResponse.data.usuario.rol);
    console.log('');

    const token = loginResponse.data.token;

    // 3. Probar obtener perfil
    console.log('3️⃣ Probando Obtener Perfil...');
    const perfilResponse = await axios.get(`${BASE_URL}/auth/perfil`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Perfil obtenido');
    console.log('   Nombre:', perfilResponse.data.nombre);
    console.log('   Email:', perfilResponse.data.email);
    console.log('');

    // 4. Probar obtener pacientes
    console.log('4️⃣ Probando Obtener Pacientes...');
    const pacientesResponse = await axios.get(`${BASE_URL}/pacientes`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Pacientes obtenidos');
    console.log('   Total:', pacientesResponse.data.length);
    if (pacientesResponse.data.length > 0) {
      console.log('   Primer paciente:', pacientesResponse.data[0].nombre);
    }
    console.log('');

    // 5. Probar obtener solicitudes
    console.log('5️⃣ Probando Obtener Solicitudes...');
    const solicitudesResponse = await axios.get(`${BASE_URL}/solicitudes`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Solicitudes obtenidas');
    console.log('   Total:', solicitudesResponse.data.length);
    console.log('');

    // 6. Probar obtener resumen de caja
    console.log('6️⃣ Probando Resumen de Caja...');
    const cajaResponse = await axios.get(`${BASE_URL}/caja/resumen`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Resumen de caja obtenido');
    console.log('   Balance:', cajaResponse.data.balance || 0);
    console.log('');

    console.log('═══════════════════════════════════════');
    console.log('✅✅✅ TODAS LAS PRUEBAS PASARON ✅✅✅');
    console.log('═══════════════════════════════════════');
    console.log('');
    console.log('🎯 EL BACKEND ESTÁ FUNCIONANDO CORRECTAMENTE');
    console.log('');
    console.log('📝 Si el login en el navegador no funciona:');
    console.log('   1. Verifica que el frontend esté en puerto 3000');
    console.log('   2. Limpia la caché del navegador (Ctrl+Shift+R)');
    console.log('   3. Abre la consola del navegador (F12)');
    console.log('   4. Busca errores en la pestaña Console');
    console.log('');

  } catch (error) {
    console.error('❌ ERROR EN LAS PRUEBAS:');
    console.error('');
    
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Mensaje:', error.response.data.message || error.response.data);
      console.error('   URL:', error.config.url);
    } else if (error.request) {
      console.error('   No se recibió respuesta del servidor');
      console.error('   ¿Está el backend corriendo en puerto 5000?');
    } else {
      console.error('   Error:', error.message);
    }
    console.error('');
    console.error('🔧 SOLUCIÓN:');
    console.error('   1. Verifica que el backend esté corriendo: cd backend && npm run dev');
    console.error('   2. Verifica que PostgreSQL esté activo: docker ps | grep postgres');
    console.error('   3. Verifica la base de datos: docker exec -it postgres-asilo psql -U postgres -d cabeza_algodon_db -c "SELECT COUNT(*) FROM usuarios"');
  }
}

probarSistema();

