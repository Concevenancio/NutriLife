import { useNavigate } from "react-router-dom";
import usePacientes from "../hooks/usePacientes";

const Paciente = ({ paciente }) => {
  const { setEdicion, eliminarPaciente } = usePacientes();
  const { _id, nombre, telefono, tipopaquete, mesa, fecha } = paciente;
  const navigate = useNavigate();

  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha);
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

  const handleEditar = () => {
    setEdicion(paciente);
    navigate("/admin", { state: { paciente } });
  }

  return (
    <>
      <tr className="border-b">
        <td className="border px-2 py-1">{nombre}</td>
        <td className="border px-2 py-1 hidden xl:table-cell">{telefono}</td>
        <td className="border px-2 py-1 hidden xl:table-cell">{tipopaquete}</td>
        <td className="border px-2 py-1 hidden xl:table-cell">{mesa}</td>
        <td className="border px-2 py-1 text-center hidden xl:table-cell">
          {formatearFecha(fecha)}
        </td>
        <td className="border px-2 py-1 text-center">
          <button
            type="button"
            className="py-0.5 px-2 bg-green-700 hover:bg-green-800 text-white uppercase font-medium rounded-md"
            onClick={handleEditar}
          >
            Editar
          </button>
        </td>
        <td className="border px-2 py-1 text-center">
          <button
            type="button"
            className="py-0.5 px-2 bg-red-700 hover:bg-red-800 text-white uppercase font-medium rounded-md"
            onClick={() => eliminarPaciente(_id)}
          >
            Eliminar
          </button>
        </td>
      </tr>
    </>
  );
};

export default Paciente;
