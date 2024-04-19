import express from 'express'
import fileUpload from 'express-fileupload';
import {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente,
} from '../controllers/pacienteController.js'
import checkAuth from '../middleware/authMiddleware.js'

const router = express.Router();

router
.route('/')
.post(checkAuth, agregarPaciente)
.get(checkAuth, obtenerPacientes)

router
    .route('/:id')
    .get(checkAuth, obtenerPaciente)
    .put(checkAuth,
        fileUpload({
            useTempFiles : true,
            tempFileDir: './uploads'
        })
        , actualizarPaciente)
    .delete(checkAuth, eliminarPaciente)

export default router;