// queries/obtenerHistorialPagos.js

import Pagos from "../models/Pagos.js";
import Paciente from "../models/Paciente.js";

const obtenerHistorialPagos = async () => {
  try {
    // Obtener todos los pagos
    const pagos = await Pagos.find();

    // Mapear los pagos para agregar los datos de pacientes
    const historialPagos = await Promise.all(pagos.map(async (pago) => {
      // Buscar el paciente asociado a este pago y traer solo los campos necesarios
      const paciente = await Paciente.findById(pago.paciente, 'formadepago tipopaquete');

      // Si se encuentra el paciente, agregar los campos necesarios
      if (paciente) {
        return {
          pago: pago.pago,
          formadepago: paciente.formadepago,
          tipopaquete: paciente.tipopaquete
        };
      } else {
        // Si no se encuentra el paciente, devolver null o manejar de otra manera
        return null;
      }
    }));

    // Filtrar resultados nulos (pueden ocurrir si no se encuentra el paciente)
    const resultadosFiltrados = historialPagos.filter(resultado => resultado !== null);

    return resultadosFiltrados;
  } catch (error) {
    console.error("Error al obtener el historial de pagos:", error);
    throw error;
  }
};

export default obtenerHistorialPagos;
