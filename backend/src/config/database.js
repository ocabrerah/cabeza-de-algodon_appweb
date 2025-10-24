/**
 * Configuración de la Base de Datos MySQL
 * Sistema Asilo de Ancianos "Cabeza de Algodón"
 * 
 * @author Omar Cabrera
 * @copyright 2025 - Todos los derechos reservados
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuración del pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'asilo_cabeza_algodon',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Función para probar la conexión
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conexión exitosa a la base de datos MySQL');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error.message);
    return false;
  }
};

// Función para ejecutar queries con manejo de errores
const executeQuery = async (query, params = []) => {
  try {
    const [results] = await pool.execute(query, params);
    return { success: true, data: results };
  } catch (error) {
    console.error('Error en query:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = {
  pool,
  testConnection,
  executeQuery
};

