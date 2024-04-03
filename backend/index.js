import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from "./config/db.js";
import nutriologoRoutes from './routes/nutriologoRoutes.js'
import pacienteRoutes from './routes/pacienteRoutes.js'
import obtenerCitas from './routes/citaRoutes.js'
<<<<<<< HEAD
import historialRoutes from './routes/historialRoutes.js'
//import pagosRoutes from './routes/pagosRoutes.js'
=======

>>>>>>> 37a0a3d03d94587b8fae78c5642d2b77c78c5fad

const app = express();
app.use(express.json());

dotenv.config();
conectarDB();

/*const dominiosPermitidos = [process.env.FRONTEND_URL || 'http://localhost:5173' || 'http://localhost:4000']

const corsOption = {
    origin: function(origin, callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){

            callback(null,true)
        }else{
            callback(new Error('No permitido por CORS'))
        }
    }
}

app.use(cors(corsOption));*/
app.use(cors());
app.use('/api/nutriologos', nutriologoRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/citas', obtenerCitas);
<<<<<<< HEAD
app.use('/api/historial-pagos', historialRoutes);
//app.use('/api/pagos', pagosRoutes);
=======

>>>>>>> 37a0a3d03d94587b8fae78c5642d2b77c78c5fad

const PORT = process.env.PORT || 4000
app.listen(PORT, ()=> {
    console.log(`Funcionando en puerto: ${PORT}`);
});