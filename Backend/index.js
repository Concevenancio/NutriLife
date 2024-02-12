import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import nutriologoRoutes from "./routes/nutriologoRoutes.js";
import pacientesRoutes from "./routes/pacienteRoutes.js";
import contadorRoutes from "./routes/contadorRoutes.js"

/*----------MIDDLEWARES------------ */
const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

app.use("/api/Nutriologo", nutriologoRoutes);
app.use("/api/Pacientes", pacientesRoutes);
app.use("api/Contador", contadorRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>{
    console.log(`Port: ${PORT}`);
});