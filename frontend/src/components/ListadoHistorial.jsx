import { useState, useEffect } from "react";
import useHistorial from "../hooks/useHistorial";
import ListaHistorial from "./ListaHistorial";
import { Link } from "react-router-dom";
import usePacientes from "../hooks/usePacientes";

const ListadoHistorial = () => {
  const { historial } = useHistorial();
  const { pacientes } = usePacientes();

  if (!Array.isArray(pacientes)) {
    window.location.reload();
  }

  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [fechasExpandidas, setFechasExpandidas] = useState([]);

  const formatearFecha = (fecha) => {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate().toString().padStart(2, "0");
    const mes = (fechaObj.getMonth() + 1).toString().padStart(2, "0");
    const año = fechaObj.getFullYear();
    return `${dia}-${mes}-${año}`;
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <div className="mb-4 mt-4 flex items-center justify-between mx-44">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
          className="border border-gray-300 rounded-md p-2 pr-8 "
        />
        <input
          type="date"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
          className="border border-gray-300 rounded-md p-2 pr-8 mr-4"
        />

        {(filtroFecha || filtroNombre) && (
          <span
            className="px-4 text-gray-500 cursor-pointer"
            onClick={() => {
              setFiltroFecha("");
              setFiltroNombre("");
            }}
          >
            &#x2716;
          </span>
        )}
      </div>

      {historial.map((item) => {
        const fecha = formatearFecha(item.fechaPago);
        const nombreCliente = item.clienteNombre.toLowerCase();
        if (
          (filtroFecha && filtroFecha !== fecha) ||
          (filtroNombre && !nombreCliente.includes(filtroNombre.toLowerCase()))
        )
          return null;
        const estaExpandida = fechasExpandidas.includes(fecha);

        return (
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
            {estaExpandida && <ListaHistorial historial={item} />}
          </div>
        );
      })}
    </div>
  );
};

export default ListadoHistorial;
