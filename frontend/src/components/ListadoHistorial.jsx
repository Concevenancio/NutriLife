import { useState } from "react";
import useHistorial from "../hooks/useHistorial";
import ListaHistorial from "./ListaHistorial";
import usePacientes from "../hooks/usePacientes";

const ListadoHistorial = () => {
  const { historial } = useHistorial();
  const { pacientes } = usePacientes();

  if (!Array.isArray(pacientes)) {
    window.location.reload();
  }

  const [filtroNombre, setFiltroNombre] = useState("");
  const [fechasExpandidas, setFechasExpandidas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de elementos por página

  const formatearFecha = (fecha) => {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate().toString().padStart(2, "0");
    const mes = (fechaObj.getMonth() + 1).toString().padStart(2, "0");
    const año = fechaObj.getFullYear();
    return `${dia}-${mes}-${año}`;
  };

  const agruparPagosPorDia = (pagos) => {
    const pagosPorDia = {};
    pagos.forEach((item) => {
      const fecha = formatearFecha(item.fechaPago);
      if (!pagosPorDia[fecha]) {
        pagosPorDia[fecha] = [];
      }
      pagosPorDia[fecha].push(item);
    });
    return pagosPorDia;
  };

  const obtenerFechasOrdenadas = () => {
    return Object.keys(agruparPagosPorDia(historial))
      .sort((a, b) => {
        const fechaA = new Date(a);
        const fechaB = new Date(b);
        return fechaA - fechaB;
      })
      .reverse(); // Revertir el orden para obtener de la más reciente a la más antigua
  };

  const limpiarFiltroNombre = () => {
    setFiltroNombre("");
  };

  const totalPages = Math.ceil(
    Object.keys(agruparPagosPorDia(historial)).length / itemsPerPage
  );

  const filtrarPorNombre = (pagos) => {
    return pagos.filter((item) => {
      return item.clienteNombre
        .toLowerCase()
        .includes(filtroNombre.toLowerCase());
    });
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <h2 className="font-black text-3xl text-center mb-12">
        Historial de Pagos
      </h2>
      <div className="mb-4 mt-4 flex items-center justify-start mx-14 gap-9 relative">
        <div className="flex relative">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
            className="border border-gray-300 rounded-md p-2 pr-8 "
          />
          {filtroNombre && (
            <span
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 text-gray-500 cursor-pointer"
              onClick={limpiarFiltroNombre}
            >
              &#x2716;
            </span>
          )}
        </div>
      </div>

      {obtenerFechasOrdenadas().slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((fecha) => {
        const estaExpandida = fechasExpandidas.includes(fecha);
        const pagosDelDia = filtrarPorNombre(agruparPagosPorDia(historial)[fecha]);


          return (
            pagosDelDia.length > 0 && (
              <div key={fecha} className="">
                <h1
                  className="ps-6 cursor-pointer text-lg font-bold mt-4 mb-2"
                  onClick={() => {
                    setFechasExpandidas((prevFechasExpandidas) => {
                      if (estaExpandida) {
                        return prevFechasExpandidas.filter((f) => f !== fecha);
                      } else {
                        return [...prevFechasExpandidas, fecha];
                      }
                    });
                  }}
                >
                  Pagos del día {fecha}
                </h1>
                {estaExpandida &&
                  pagosDelDia.map((item, index) => (
                    <ListaHistorial
                      key={`${fecha}-${index}`}
                      historial={item}
                      mostrarEncabezado={index === 0}
                      paciente={pacientes.find((paciente) => paciente._id === item.clienteId) || pacientes.find((paciente) => paciente.nombre === item.clienteNombre)}

                    />
                  ))}
              </div>
            )
          );
        })}

      <div className="flex justify-between items-center mx-14 mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="bg-cyan-700 hover:bg-cyan-800 cursor-pointer text-white px-4 py-2 rounded-md"
        >
          Anterior
        </button>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="bg-cyan-700 hover:bg-cyan-800 cursor-pointer text-white px-4 py-2 rounded-md mb-4"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ListadoHistorial;
