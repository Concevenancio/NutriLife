import HistorialPagos from "../models/HistorialPagos.js";

const guardarPago = async (req, res) => {
    try {
        const { clienteId, monto } = req.body;
        console.log("clienteId:", clienteId); // Add this log statement
        const pago = new HistorialPagos({
            cliente: clienteId,
            monto
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
        const { clienteId } = req.params;
        const historialPagos = await HistorialPagos.find({ cliente: clienteId }).populate('cliente');
        res.json(historialPagos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el historial de pagos del cliente' });
    }
};

export {
    guardarPago,
    obtenerHistorialPagosCliente
};
