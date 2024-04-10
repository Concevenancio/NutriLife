import mongoose from "mongoose";

const historialPagoSchema = mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paciente' 
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  monto: {
    type: Number,
    required: true  
  },

}); 

const HistorialPagos = mongoose.model('HistorialPagos', historialPagoSchema);

export default HistorialPagos
