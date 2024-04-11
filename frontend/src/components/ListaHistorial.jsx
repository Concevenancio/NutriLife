import { useNavigate } from "react-router-dom";
import useHistorial from "../hooks/useHistorial";

const ListaHistorial = ({ historial, mostrarEncabezado }) => {
  const { eliminarPago } = useHistorial();
  const { _id, clienteNombre, fechaPago, monto, formaPago } = historial;
  const navigate = useNavigate();

  const formatearFecha = (fechaPago) => {
    const nuevaFecha = new Date(fechaPago);
    const diferenciaMinutos = nuevaFecha.getTimezoneOffset();
    nuevaFecha.setMinutes(nuevaFecha.getMinutes() + diferenciaMinutos);
    const opcionesFecha = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    let fechaFormateada = nuevaFecha.toLocaleDateString("es-MX", opcionesFecha);
    fechaFormateada = fechaFormateada.replace(/^\w/, (c) => c.toUpperCase());
    return fechaFormateada;
  };

  return (
    <table className="w-full text-sm text-center text-gray-700">
      <tbody>
        {mostrarEncabezado && (
          <tr className="bg-green-800 text-white">
            <th className="px-6 py-3 w-1/4">Nombre</th>
            <th className="px-6 py-3 w-1/4">Pago</th>
            <th className="px-6 py-3 w-1/4">Fecha</th>
            <th className="px-6 py-3 w-1/8">Editar</th>
            <th className="px-6 py-3 w-1/8">Eliminar</th>
          </tr>
        )}
        <tr className="bg-white hover:bg-gray-200">
          <td className="px-6 py-4 font-medium whitespace-nowrap w-1/4">
            {clienteNombre}
          </td>
          <td className="px-6 py-4 w-1/4">{monto}</td>
          <td className="px-6 py-4 w-1/4">{formatearFecha(fechaPago)}</td>
          <td className="px-6 py-4 text-center w-1/8">
            <button
              type="button"
              className="py-0.5 px-2 bg-green-700 hover:bg-green-800 text-white uppercase font-medium rounded-md"
            >
              Editar
            </button>
          </td>
          <td className="px-6 py-4 text-center w-1/8">
            <button
              type="button"
              className="py-0.5 px-2 bg-red-700 hover:bg-red-800 text-white uppercase font-medium rounded-md"
              onClick={() => eliminarPago(_id)}
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
  
};

export default ListaHistorial;