import express  from "express";
import { guardarPago, 
    obtenerHistorial }
    from "../controllers/historialController.js";


const router = express.Router();

// Ruta para guardar un nuevo pago
router.post('/almacenar', guardarPago);

// Ruta para obtener el historial de pagos de un cliente
router.get('/', obtenerHistorial);

export default router;
