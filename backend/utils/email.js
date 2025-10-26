const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'ocabrerah99@gmail.com',
    pass: process.env.EMAIL_PASSWORD || ''
  }
});

const enviarEmailBienvenida = async (email, nombre, password) => {
  try {
    const mailOptions = {
      from: `"Asilo Cabeza de Algodón" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '¡Bienvenido al Sistema Cabeza de Algodón!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">¡Bienvenido(a) ${nombre}!</h2>
          <p>Su cuenta ha sido creada exitosamente en el sistema del Asilo Cabeza de Algodón.</p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Contraseña temporal:</strong> ${password}</p>
          </div>
          <p style="color: #e74c3c;"><strong>Por favor, cambie su contraseña después de iniciar sesión por primera vez.</strong></p>
          <p>Puede acceder al sistema en: <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}">${process.env.FRONTEND_URL || 'http://localhost:3000'}</a></p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="font-size: 12px; color: #7f8c8d;">Este es un correo automático, por favor no responda a este mensaje.</p>
          <p style="font-size: 12px; color: #7f8c8d;">© 2025 Asilo Cabeza de Algodón - Todos los derechos reservados - O. Cabrera</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email de bienvenida enviado a:', email);
    return true;
  } catch (error) {
    console.error('❌ Error al enviar email:', error.message);
    return false;
  }
};

const enviarNotificacionSolicitud = async (emailFamiliar, nombrePaciente, nombreMedico, especialidad, motivo) => {
  try {
    const mailOptions = {
      from: `"Asilo Cabeza de Algodón" <${process.env.EMAIL_USER}>`,
      to: emailFamiliar,
      subject: `Actualización Médica - ${nombrePaciente}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">Notificación de Atención Médica</h2>
          <p>Estimado familiar,</p>
          <p>Le informamos que <strong>${nombrePaciente}</strong> ha sido referido para atención médica especializada.</p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Médico tratante:</strong> ${nombreMedico}</p>
            <p><strong>Especialidad:</strong> ${especialidad}</p>
            <p><strong>Motivo:</strong> ${motivo}</p>
          </div>
          <p>Mantendremos informado sobre el progreso de la atención.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="font-size: 12px; color: #7f8c8d;">© 2025 Asilo Cabeza de Algodón - O. Cabrera</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Notificación enviada a:', emailFamiliar);
    return true;
  } catch (error) {
    console.error('❌ Error al enviar notificación:', error.message);
    return false;
  }
};

module.exports = { enviarEmailBienvenida, enviarNotificacionSolicitud };

