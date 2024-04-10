import { useNavigate } from "react-router-dom";
import useHistorial from "../hooks/useHistorial";
 
const ListaHistorial = ({ historial }) => {
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
    <>
      <tr className="border-b">
        <td className="border px-2 py-1">{clienteNombre}</td>
        <td className="border px-2 py-1 hidden xl:table-cell">{monto}</td>
        <td className="border px-2 py-1 text-center ">
          {formatearFecha(fechaPago)}
        </td>
        <td className="border px-2 py-1 text-center">
          <button
            type="button"
            className="py-0.5 px-2 bg-green-700 hover:bg-green-800 text-white uppercase font-medium rounded-md"
          >
            Editar
          </button>
        </td>
        <td className="border px-2 py-1 text-center">
          <button
            type="button"
            className="py-0.5 px-2 bg-red-700 hover:bg-red-800 text-white uppercase font-medium rounded-md"
            onClick={() => eliminarPago(_id)}
          >
            Eliminar
          </button>
        </td>
      </tr>
    </>
  );
};

export default ListaHistorial;
