const { Transaccion, CuentaPaciente, Paciente, VisitaMedica, ExamenLaboratorio, Medicamento } = require('../models');
const { Op } = require('sequelize');

// Obtener todas las transacciones
exports.obtenerTransacciones = async (req, res) => {
  try {
    const { tipo, categoria, fechaInicio, fechaFin } = req.query;
    
    const where = {};
    if (tipo) where.tipo = tipo;
    if (categoria) where.categoria = categoria;
    
    if (fechaInicio && fechaFin) {
      where.fecha = {
        [Op.between]: [new Date(fechaInicio), new Date(fechaFin)]
      };
    }

    const transacciones = await Transaccion.findAll({
      where,
      include: [{ model: Paciente, as: 'paciente' }],
      order: [['fecha', 'DESC']]
    });

    res.json(transacciones);
  } catch (error) {
    console.error('Error al obtener transacciones:', error);
    res.status(500).json({ message: 'Error al obtener transacciones', error: error.message });
  }
};

// Crear transacción
exports.crearTransaccion = async (req, res) => {
  try {
    const transaccion = await Transaccion.create(req.body);
    
    res.status(201).json({
      message: 'Transacción registrada exitosamente',
      transaccion
    });
  } catch (error) {
    console.error('Error al crear transacción:', error);
    res.status(500).json({ message: 'Error al crear transacción', error: error.message });
  }
};

// Obtener cuentas de pacientes
exports.obtenerCuentasPacientes = async (req, res) => {
  try {
    const { estado, pacienteId } = req.query;
    
    const where = {};
    if (estado) where.estado = estado;
    if (pacienteId) where.pacienteId = pacienteId;

    const cuentas = await CuentaPaciente.findAll({
      where,
      include: [{ model: Paciente, as: 'paciente' }],
      order: [['anio', 'DESC'], ['mes', 'DESC']]
    });

    res.json(cuentas);
  } catch (error) {
    console.error('Error al obtener cuentas:', error);
    res.status(500).json({ message: 'Error al obtener cuentas', error: error.message });
  }
};

// Crear/actualizar cuenta de paciente
exports.actualizarCuentaPaciente = async (req, res) => {
  try {
    const { pacienteId, mes, anio } = req.body;
    
    // Buscar cuenta existente
    let cuenta = await CuentaPaciente.findOne({
      where: { pacienteId, mes, anio }
    });

    // Calcular totales
    const visitas = await VisitaMedica.findAll({
      where: {
        pacienteId,
        fechaVisita: {
          [Op.and]: [
            { [Op.gte]: new Date(anio, mes - 1, 1) },
            { [Op.lt]: new Date(anio, mes, 1) }
          ]
        }
      }
    });

    const totalConsultas = visitas.reduce((sum, v) => sum + parseFloat(v.costoConsulta || 0), 0);

    const examenes = await ExamenLaboratorio.findAll({
      include: [{
        model: VisitaMedica,
        as: 'visita',
        where: { pacienteId }
      }],
      where: {
        fechaSolicitud: {
          [Op.and]: [
            { [Op.gte]: new Date(anio, mes - 1, 1) },
            { [Op.lt]: new Date(anio, mes, 1) }
          ]
        }
      }
    });

    const totalLaboratorio = examenes.reduce((sum, e) => sum + parseFloat(e.costo || 0), 0);

    const medicamentos = await Medicamento.findAll({
      include: [{
        model: VisitaMedica,
        as: 'visita',
        where: { pacienteId }
      }],
      where: {
        createdAt: {
          [Op.and]: [
            { [Op.gte]: new Date(anio, mes - 1, 1) },
            { [Op.lt]: new Date(anio, mes, 1) }
          ]
        }
      }
    });

    const totalFarmacia = medicamentos.reduce((sum, m) => sum + parseFloat(m.costo || 0), 0);

    const cuotaMensual = req.body.cuotaMensual || 0;
    const total = parseFloat(cuotaMensual) + totalConsultas + totalLaboratorio + totalFarmacia;
    const pagado = req.body.pagado || 0;
    const saldo = total - pagado;

    if (cuenta) {
      await cuenta.update({
        cuotaMensual,
        totalConsultas,
        totalLaboratorio,
        totalFarmacia,
        total,
        pagado,
        saldo,
        estado: saldo > 0 ? 'pendiente' : 'pagado'
      });
    } else {
      cuenta = await CuentaPaciente.create({
        pacienteId,
        mes,
        anio,
        cuotaMensual,
        totalConsultas,
        totalLaboratorio,
        totalFarmacia,
        total,
        pagado,
        saldo,
        estado: saldo > 0 ? 'pendiente' : 'pagado'
      });
    }

    res.json({
      message: 'Cuenta actualizada exitosamente',
      cuenta
    });
  } catch (error) {
    console.error('Error al actualizar cuenta:', error);
    res.status(500).json({ message: 'Error al actualizar cuenta', error: error.message });
  }
};

// Registrar pago
exports.registrarPago = async (req, res) => {
  try {
    const { id } = req.params;
    const { montoPago, metodoPago } = req.body;
    
    const cuenta = await CuentaPaciente.findByPk(id, {
      include: [{ model: Paciente, as: 'paciente' }]
    });
    
    if (!cuenta) {
      return res.status(404).json({ message: 'Cuenta no encontrada' });
    }

    const nuevoPagado = parseFloat(cuenta.pagado) + parseFloat(montoPago);
    const nuevoSaldo = parseFloat(cuenta.total) - nuevoPagado;

    await cuenta.update({
      pagado: nuevoPagado,
      saldo: nuevoSaldo,
      estado: nuevoSaldo <= 0 ? 'pagado' : 'pendiente'
    });

    // Registrar transacción
    await Transaccion.create({
      tipo: 'ingreso',
      categoria: 'cuota_mensual',
      monto: montoPago,
      descripcion: `Pago cuenta ${cuenta.mes}/${cuenta.anio} - ${cuenta.paciente.nombre}`,
      pacienteId: cuenta.pacienteId,
      metodoPago: metodoPago || 'efectivo'
    });

    res.json({
      message: 'Pago registrado exitosamente',
      cuenta
    });
  } catch (error) {
    console.error('Error al registrar pago:', error);
    res.status(500).json({ message: 'Error al registrar pago', error: error.message });
  }
};

// Obtener resumen financiero
exports.obtenerResumen = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.query;
    
    const where = {};
    if (fechaInicio && fechaFin) {
      where.fecha = {
        [Op.between]: [new Date(fechaInicio), new Date(fechaFin)]
      };
    }

    const ingresos = await Transaccion.sum('monto', {
      where: { ...where, tipo: 'ingreso' }
    }) || 0;

    const egresos = await Transaccion.sum('monto', {
      where: { ...where, tipo: 'egreso' }
    }) || 0;

    const balance = ingresos - egresos;

    const cuentasPendientes = await CuentaPaciente.sum('saldo', {
      where: { estado: 'pendiente' }
    }) || 0;

    res.json({
      ingresos,
      egresos,
      balance,
      cuentasPendientes
    });
  } catch (error) {
    console.error('Error al obtener resumen:', error);
    res.status(500).json({ message: 'Error al obtener resumen', error: error.message });
  }
};

