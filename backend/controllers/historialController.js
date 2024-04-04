import HistorialPagos from "../models/HistorialPagos.js";
import Paciente from "../models/Paciente.js";

const guardarPago = async (req, res) => {
    try {
        const { clienteId, monto } = req.body;
        console.log("clienteId:", clienteId);
        console.log("Monto:", monto); // Add this log statement
        const pago = new HistorialPagos({
            cliente: clienteId,
            monto: monto
            // Otros campos si es necesario
        });
        await pago.save();
        res.status(201).json({ mensaje: 'Pago guardado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al guardar el pago' });
    }
};

const obtenerHistorialPagosCliente = async (req, res) => {
    try {
        const historialPago = await HistorialPagos.find();
        res.json(historialPago);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    guardarPago,
    obtenerHistorialPagosCliente
};
