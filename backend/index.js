import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from "./config/db.js";
import nutriologoRoutes from './routes/nutriologoRoutes.js'
import pacienteRoutes from './routes/pacienteRoutes.js'

const app = express();
app.use(express.json());

dotenv.config();
conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL || 'http://localhost:5173']

const corsOption = {
    origin: function(origin, callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){

            callback(null,true)
        }else{
            callback(new Error('No permitido por CORS'))
        }
    }
}

app.use(cors(corsOption));

app.use('/api/nutriologos', nutriologoRoutes);
app.use('/api/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 4000
app.listen(PORT, ()=> {
    console.log(`Funcionando en puerto: ${PORT}`);
});