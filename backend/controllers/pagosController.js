/* import Pagos from '../models/Pagos.js';
import obtenerHistorialPagos from '../queries/obtenerHistorialPagos.js';

const crearPago = async (req,res) => {
const pagos = new Pagos(req.body);
try {
    const pagoGuardado = await pagos.save();
    res.json(pagoGuardado)
} catch (error) {
    console.log(error);
}
};

const obtenerHistorialPagosController = async (req, res) => {
    try {
      // Obtener el historial de pagos
      const historialPagos = await obtenerHistorialPagos();
  
      // Si hay resultados, enviarlos en la respuesta
      if (historialPagos.length > 0) {
        res.status(200).json({
          success: true,
          data: historialPagos
        });
      } else {
        // Si no hay resultados, enviar un mensaje de error
        res.status(404).json({
          success: false,
          message: "No se encontraron datos de historial de pagos."
        });
      }
    } catch (error) {
      // Si ocurre un error, enviar un mensaje de error con el estado 500
      console.error("Error al obtener el historial de pagos:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener el historial de pagos. Por favor, inténtalo de nuevo más tarde."
      });
    }
  };
/* 
    try {
        const pagos = await Pagos.find();

    res.json(pagos);
    } catch (error) {
        res.status(500).json({message: 'Error al obtener pagos'})
    }
} */


/*export {
    crearPago,
    obtenerHistorialPagosController
} */