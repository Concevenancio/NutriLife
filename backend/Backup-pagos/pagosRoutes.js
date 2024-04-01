import express from "express";

import {
    crearPago,
    obtenerHistorialPagosController,
} from "../controllers/pagosController.js";

const router = express.Router();

router.post('/crear-pago', crearPago); // Ruta para crear un pago
router.get('/historial-pagos', obtenerHistorialPagosController); // Ruta para obtener todos los pagos

export default router;