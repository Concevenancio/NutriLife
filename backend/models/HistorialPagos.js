import mongoose from "mongoose";

const historialPagoSchema = mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paciente' // Referencia al modelo de cliente
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  monto: {
    type: Number,
    required: true  
  },
  pago: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paciente.pago'
  }
  // Otros campos que necesites
}); 

const HistorialPagos = mongoose.model('HistorialPagos', historialPagoSchema);

export default HistorialPagos
