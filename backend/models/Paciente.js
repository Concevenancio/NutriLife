import mongoose from "mongoose";

const pacienteSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },  
    telefono: {
      type: String,
      required: true,
    },
    direccionDeEntrega: {
      type: String,
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
    noconsume:{
      type: String,
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    fechaproxcita:{
      type: Date,
      required: true,
      default:Date.now(),
    },
    fechavencimiento:{
      type: String,
      required: true,
      default:Date.now(),
    },
    tipopaquete: {
      type: String,
      enum: ['Semana 1', 'Semana 2', 'Semana 3'],
      required: true,
    },
    formadepago:{
      type: String,
      enum: ['Tarjeta', 'Effectivo'],
      required: true,
    },
    pago:{
      type: String,
      required: true,
    },
    especial: {
      type: String,
      enum:['Si', 'No'],
      required: true,
    },
    mesa:{
      type: String,
      enum: ['A', 'B', 'C', 'D', 'E', 'F'],
      required: true,
    },

    diasadeber: {
      type: String,
      required: true,
    },
    nutriologo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nutriologo",
    },
  },
  {
    timestamps: true,
  }
);

const Paciente = mongoose.model("Paciente", pacienteSchema);

export default Paciente;