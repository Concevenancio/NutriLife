  import { useNavigate } from "react-router-dom";
  import useHistorial from "../hooks/useHistorial";
import usePacientes from "../hooks/usePacientes";

  const ListaHistorial = ({ historial, mostrarEncabezado, paciente }) => {
    //console.log("paciente", paciente);
    const { eliminarPago } = useHistorial();
    const { setEdicion } = usePacientes();
    const { tipopaquete, fechainiciopaquete, fechavencimiento } =
      paciente;

    const { _id, clienteNombre, fechaPago, monto, formaPago, deudanetaHisto} = historial;

    const navigate = useNavigate();

    const handleEditar = () => {
      setEdicion(paciente);
      navigate("/admin/Formulario", { state: { paciente } });
    };

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

    const formatearHora = (fechaPago) => {
      const nuevaFecha = new Date(fechaPago);
      const hora = nuevaFecha.getHours().toString().padStart(2, "0");
      const minutos = nuevaFecha.getMinutes().toString().padStart(2, "0");
      return `${hora}:${minutos}`;
    };

    return (
      <table className="w-full  text-base text-center text-gray-700">
        <tbody>
          {mostrarEncabezado && (
            <tr className="bg-green-800 text-white">
              <th className="px-6 py-3 ">Nombre</th>
              <th className="px-6 py-3 ">Paquete</th>
              <th className="px-6 py- 3 ">Método de Pago</th>
              <th className="px-6 py-3 ">Monto</th>
              <th className="px-6 py-3 ">Hora de Pago</th>
              <th className="px-6 py-3 ">Resta</th>
              <th className="px-6 py-3 ">Inicio</th>
              <th className="px-6 py-3 ">Vencimiento</th>
              <th className="px-6 py-3 ">Eliminar</th>
            </tr>
          )}
          <tr className="bg-white hover:bg-gray-200"
          onDoubleClick={handleEditar}>
            <td className="px-6 py-4 font-semibold">{clienteNombre}</td>
            <td className="px-6 py-4">{tipopaquete}</td>
            <td className="px-6 py-4">{formaPago}</td>
            <td className="px-6 py-4">${monto}</td>
            <td className="px-6 py-4">{formatearHora(fechaPago)} hrs</td>
            <td className="px-6 py-4">${deudanetaHisto}</td>
            <td className="px-6 py-4">
              {formatearFecha(fechainiciopaquete)}
            </td>
            <td className="px-6 py-4">
              {formatearFecha(fechavencimiento)}
            </td>
            <td className="px-6 py-4 text-center">
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
