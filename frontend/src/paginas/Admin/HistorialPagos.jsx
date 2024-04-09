import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useHistorial from "../../hooks/useHistorial";

const HistorialPagos = () => {
  const historialPagos = [
    {
      nombre: "Daniel Rodriguez",
      tipoPaquete: "Semanal",
      tipoPago: "Tarjeta",
      cantidad: 1200,
      fecha: "2024-04-05",
    },
  ];
  const { historial } = useHistorial
  console.log("historial", historial)
  
  //const {_id, cliente, monto, fecha } = historial

 //console.log(cliente)

  const pagosPorFecha = historialPagos.reduce((acc, pago) => {
    const fecha = pago.fecha;
    if (!acc[fecha]) {
      acc[fecha] = [];
    }
    acc[fecha].push(pago);
    return acc;
  }, {});

  const fechasOrdenadas = Object.keys(pagosPorFecha).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  const [fechasExpandidas, setFechasExpandidas] = useState([]);
  const [filtroFecha, setFiltroFecha] = useState("");
  const [indiceFechas, setIndiceFechas] = useState(0);

  const fechasMostradas = fechasOrdenadas.slice(
    indiceFechas,
    indiceFechas + 10
  );

  const handleAvanzar = () => {
    if (indiceFechas + 10 < fechasOrdenadas.length) {
      setIndiceFechas(indiceFechas + 10);
    }
  };

  const handleRetroceder = () => {
    if (indiceFechas - 10 >= 0) {
      setIndiceFechas(indiceFechas - 10);
    }
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <div className="mb-4 mt-4 flex items-center justify-center">
        <input
          type="date"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
          className="border border-gray-300 rounded-md p-2 pr-8"
        />
        {filtroFecha && (
          <span
            className=" px-4 text-gray-500 cursor-pointer"
            onClick={() => setFiltroFecha("")}
          >
            &#x2716;
          </span>
        )}
      </div>

      {fechasMostradas.map((fecha) => {
        if (filtroFecha && filtroFecha !== fecha) return null;
        const estaExpandida = fechasExpandidas.includes(fecha);
        return (
          <div key={fecha} className="px-4">
            {/* Aplicar padding aquí */}
            <h1
              className="cursor-pointer text-lg font-bold mt-4 mb-2"
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
            {estaExpandida && (
              <ul>
                <table className="w-full text-sm text-left text-gray-700">
                  <tbody>
                    <tr className="bg-green-800 text-white">
                      <th className="px-6 py-3">Nombre</th>
                      <th className="px-6 py-3">Tipo de Paquete</th>
                      <th className="px-6 py-3">Tipo de Pago</th>
                      <th className="px-6 py-3">Cantidad</th>
                      <th className="px-6 py-3">Fecha</th>
                    </tr>
                    {pagosPorFecha[fecha].map((pago, index) => (
                      <tr className="bg-white hover:bg-gray-200" key={index}>
                        <td className="px-6 py-4 font-medium whitespace-nowrap">
                          {pago.nombre}
                        </td>
                        <td className="px-6 py-4">{pago.tipoPaquete}</td>
                        <td className="px-6 py-4">{pago.tipoPago}</td>
                        <td className="px-6 py-4">{pago.cantidad}</td>
                        <td className="px-6 py-4">{pago.fecha}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ul>
            )}
          </div>
        );
      })}
      {fechasOrdenadas.length > 10 && (
        <div className="mt-4 flex justify-between p-4">
          {/* Aplicar padding aquí */}
          <button
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
            onClick={handleRetroceder}
          >
            Retroceder
          </button>
          <button
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
            onClick={handleAvanzar}
          >
            Avanzar
          </button>
        </div>
      )}
    </div>
  );
};

export default HistorialPagos;
