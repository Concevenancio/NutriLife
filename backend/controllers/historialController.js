import HistorialPagos from "../models/HistorialPagos.js";
import Paciente from "../models/Paciente.js";

const guardarPago = async (req, res) => {
    try {
      const { id, nombre, anticipo, formadepago} = req.body;
      const pago = new HistorialPagos({
        clienteId: id,
        clienteNombre: nombre,
        monto: anticipo,
        formaPago: formadepago 
      });
      await pago.save();
      res.status(201).json({ mensaje: 'Pago guardado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al guardar el pago' });
    }
  };

const obtenerHistorial = async (req, res) => {
    try {
        const historialPago = await HistorialPagos.find();
        res.json(historialPago);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    guardarPago,
    obtenerHistorial
};
