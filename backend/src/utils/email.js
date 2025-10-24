/**
 * Utilidades para Envío de Correos Electrónicos
 * @author Omar Cabrera
 */

const nodemailer = require('nodemailer');

// Configurar transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Enviar correo de bienvenida
const sendWelcomeEmail = async (userEmail, userName, tempPassword) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: userEmail,
    subject: '🏥 Bienvenido al Sistema Asilo Cabeza de Algodón',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .credentials { background: white; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏥 Asilo Cabeza de Algodón</h1>
            <p>Sistema de Gestión Médica</p>
          </div>
          <div class="content">
            <h2>¡Bienvenido/a ${userName}!</h2>
            <p>Su cuenta ha sido creada exitosamente en nuestro sistema. A continuación encontrará sus credenciales de acceso:</p>
            
            <div class="credentials">
              <p><strong>📧 Email:</strong> ${userEmail}</p>
              <p><strong>🔑 Contraseña Temporal:</strong> ${tempPassword}</p>
            </div>
            
            <p>⚠️ <strong>Importante:</strong> Por motivos de seguridad, le recomendamos cambiar su contraseña en el primer inicio de sesión.</p>
            
            <a href="${process.env.FRONTEND_URL}/login" class="button">Iniciar Sesión</a>
            
            <p>Si tiene alguna pregunta o necesita ayuda, no dude en contactarnos.</p>
          </div>
          <div class="footer">
            <p>© 2025 Asilo Cabeza de Algodón - Desarrollado por Omar Cabrera</p>
            <p>Todos los derechos reservados</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error al enviar correo:', error);
    return { success: false, error: error.message };
  }
};

// Enviar notificación de solicitud médica
const sendSolicitudNotification = async (familiarEmail, pacienteNombre, medicoEspecialidad, motivo) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: familiarEmail,
    subject: '🏥 Notificación de Solicitud Médica',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-box { background: white; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏥 Asilo Cabeza de Algodón</h1>
            <p>Notificación Médica</p>
          </div>
          <div class="content">
            <h2>Solicitud Médica Creada</h2>
            <p>Le informamos que se ha creado una solicitud médica para su familiar:</p>
            
            <div class="info-box">
              <p><strong>👤 Paciente:</strong> ${pacienteNombre}</p>
              <p><strong>👨‍⚕️ Especialidad:</strong> ${medicoEspecialidad}</p>
              <p><strong>📋 Motivo:</strong> ${motivo}</p>
              <p><strong>📅 Fecha:</strong> ${new Date().toLocaleDateString('es-HN')}</p>
            </div>
            
            <p>El paciente será atendido por un especialista de la fundación. Le notificaremos cuando se asigne la cita.</p>
            
            <p>Estamos comprometidos con el cuidado y bienestar de su familiar.</p>
          </div>
          <div class="footer">
            <p>© 2025 Asilo Cabeza de Algodón - Desarrollado por Omar Cabrera</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error al enviar correo:', error);
    return { success: false, error: error.message };
  }
};

// Enviar recordatorio de pago
const sendPaymentReminder = async (familiarEmail, pacienteNombre, monto, detalles) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: familiarEmail,
    subject: '💰 Recordatorio de Pago - Asilo Cabeza de Algodón',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .amount { background: white; padding: 20px; text-align: center; font-size: 24px; color: #667eea; font-weight: bold; margin: 20px 0; border-radius: 5px; }
          .details { background: white; padding: 20px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏥 Asilo Cabeza de Algodón</h1>
            <p>Estado de Cuenta</p>
          </div>
          <div class="content">
            <h2>Recordatorio de Pago</h2>
            <p>Estimado familiar de ${pacienteNombre},</p>
            <p>Le recordamos que tiene un saldo pendiente por los siguientes servicios:</p>
            
            <div class="amount">
              Total: L. ${monto.toFixed(2)}
            </div>
            
            <div class="details">
              <h3>Detalles:</h3>
              ${detalles}
            </div>
            
            <p>Para más información o realizar su pago, puede comunicarse con nosotros.</p>
          </div>
          <div class="footer">
            <p>© 2025 Asilo Cabeza de Algodón - Desarrollado por Omar Cabrera</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error al enviar correo:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendWelcomeEmail,
  sendSolicitudNotification,
  sendPaymentReminder
};

