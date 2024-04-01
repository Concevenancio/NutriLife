import mongoose from "mongoose";

const pagosSchema = mongoose.Schema(
    {
        tipo: {
            type: String,
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        },
        descripcion:{
            type: String,
            required: true,
        },
        fecha: {
            type: Date,
            default: Date.now
        },
        paciente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Paciente"
          }
    });

const Pagos = mongoose.model('Pagos', pagosSchema);

export default Pagos;
