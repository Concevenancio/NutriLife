import express from 'express'
import {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente,
    prueba,
} from '../controllers/pacienteController.js'
import checkAuth from '../middleware/authMiddleware.js'

const router = express.Router();

router
.route('/')
.post(checkAuth, agregarPaciente)
.get(checkAuth, obtenerPacientes)
.get(checkAuth, prueba)

router
    .route('/:id')
    .get(checkAuth, obtenerPaciente)
    .put(checkAuth, actualizarPaciente)
    .delete(checkAuth, eliminarPaciente)

export default router;