import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import nutriologoRoutes from "./routes/nutriologoRoutes.js";

/*----------MIDDLEWARES------------ */
const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

app.use("/api/Nutriologo", nutriologoRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>{
    console.log(`Port: ${PORT}`);
});