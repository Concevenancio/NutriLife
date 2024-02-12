import mongoose from "mongoose";
import Nutriologo from "./Nutriologo.js";

const pacientesSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    peso: {
        type: Number,
        required: true,
    },
    estatura: {
        type: Number,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
    },
    anos: {
        type: Number,
        required: true,
    },
    ejercicio: {
        type: String,
        required: true,
    },
    padecimiento: {
        type: String,
        required: true,
    },
    alergias: {
        type: String,
        required: true,
    },
    alimentosNoConsume: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    cuandoEmpieza: {
        type: Date,
        required: true,
    },
    proximaCita: {
        type: Date,
        required: true,
    },
    tipoPaquete: {
        type: String,
        enum: ['semana', 'mensualidad', 'dia'],
        required: true,
    },
    formaPago: {
        type: String,
        enum: ['efectivo', 'tarjeta'],
        required: true,
    },
    especial: {
        type: String,
        required: true,
    },
    mesa: {
        type: String,
        enum: ['a', 'b', 'c', 'd', 'e', 'f'],
        required: true,
    },
    adeudos: {
        type: Number,
        default: 0,
    },
    nutriologo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nutriologo',
        required: true,
    },
},
{
    timestamps: true,
});

const Paciente = mongoose.model('Paciente', pacientesSchema);

export default Paciente;
