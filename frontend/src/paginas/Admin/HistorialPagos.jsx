import { useState } from "react";
const HistorialPagos = () => {
  // Supongamos que tienes una lista de pagos
  const historialPagos = [
    {
      nombre: "Daniel Rodriguez",
      tipoPaquete: "Semanal",
      tipoPago: "Tarjeta",
      cantidad: 1200,
      fecha: "2024-04-05",
    },
    {
      nombre: "Sara Lopez",
      tipoPaquete: "Mensual",
      tipoPago: "Efectivo",
      cantidad: 4500,
      fecha: "2024-04-05",
    },
    {
      nombre: "Juan Martinez",
      tipoPaquete: "Mensual",
      tipoPago: "Efectivo",
      cantidad: 3900,
      fecha: "2024-04-04",
    },
    {
      nombre: "María Suarez",
      tipoPaquete: "Mensual",
      tipoPago: "Efectivo",
      cantidad: 4200,
      fecha: "2024-04-04",
    },
    {
      nombre: "Carlos Gomez",
      tipoPaquete: "Mensual",
      tipoPago: "Efectivo",
      cantidad: 4100,
      fecha: "2024-04-03",
    },
    {
      nombre: "Laura Sánchez",
      tipoPaquete: "Mensual",
      tipoPago: "Efectivo",
      cantidad: 4800,
      fecha: "2024-04-03",
    },
    {
      nombre: "Andrés Ramirez",
      tipoPaquete: "Mensual",
      tipoPago: "Efectivo",
      cantidad: 4400,
      fecha: "2024-04-02",
    },
    {
      nombre: "Ana Hernandez",
      tipoPaquete: "Mensual",
      tipoPago: "Efectivo",
      cantidad: 4000,
      fecha: "2024-04-02",
    },
    {
      nombre: "Pedro Castro",
      tipoPaquete: "Mensual",
      tipoPago: "Efectivo",
      cantidad: 4300,
      fecha: "2024-04-01",
    },
    {
      nombre: "Julia Diaz",
      tipoPaquete: "Mensual",
      tipoPago: "Efectivo",
      cantidad: 4100,
      fecha: "2024-04-01",
    },
    {
      nombre: "Miguel Torres",
      tipoPaquete: "Mensual",
      tipoPago: "Efectivo",
      cantidad: 4100,
      fecha: "2024-03-31",
    },
    {
      nombre: "Luis Paredes",
      tipoPaquete: "Mensual",
      tipoPago: "Efectivo",
      cantidad: 4200,
      fecha: "2024-03-31",
    },
    {
      nombre: "Fernanda Navarro",
      tipoPaquete: "Mensual",
      tipoPago: "Efectivo",
      cantidad: 4000,
      fecha: "2024-03-30",
    },
    {
      nombre: "Mariana Rojas",
      tipoPaquete: "Mensual",
      tipoPago: "Efectivo",
      cantidad: 4400,
      fecha: "2024-03-30",
    },
    {
      nombre: "Daniel Rodriguez",
      tipoPaquete: "Semanal",
      tipoPago: "Tarjeta",
      cantidad: 1200,
      fecha: "2024-03-29",
    },
    {
      nombre: "Sara Lopez",
      tipoPaquete: "Mensual",
      tipoPago: "Efectivo",
      cantidad: 4500,
      fecha: "2024-03-29",
    },
    {
      nombre: "Juan Martinez",
      tipoPaquete: "Mensual",
      tipoPago: "Efectivo",
      cantidad: 3900,
      fecha: "2024-03-28",
    },
    {
      nombre: "María Suarez",
      tipoPaquete: "Mensual",
      tipoPago: "Efectivo",
      cantidad: 4200,
      fecha: "2024-03-28",
    },
    {
      nombre: "Carlos Gomez",
      tipoPaquete: "Mensual",
      tipoPago: "Efectivo",
      cantidad: 4100,
      fecha: "2024-03-27",
    },
    {
      nombre: "Laura Sánchez",
      tipoPaquete: "Mensual",
      tipoPago: "Efectivo",
      cantidad: 4800,
      fecha: "2024-03-27",
    },
    {
      nombre: "Andrés Ramirez",
      tipoPaquete: "Mensual",
      tipoPago: "Efectivo",
      cantidad: 4400,
      fecha: "2024-03-26",
    },
    {
      nombre: "Ana Hernandez",
      tipoPaquete: "Mensual",
      tipoPago: "Efectivo",
      cantidad: 4000,
      fecha: "2024-03-26",
    },
    {
      nombre: "Pedro Castro",
      tipoPaquete: "Mensual",
      tipoPago: "Efectivo",
      cantidad: 4300,
      fecha: "2024-03-25",
    },
    {
      nombre: "Julia Diaz",
      tipoPaquete: "Mensual",
      tipoPago: "Efectivo",
      cantidad: 4100,
      fecha: "2024-03-25",
    },
    {
      nombre: "Miguel Torres",
      tipoPaquete: "Mensual",
      tipoPago: "Efectivo",
      cantidad: 4100,
      fecha: "2024-03-24",
    },
    {
      nombre: "Luis Paredes",
      tipoPaquete: "Mensual",
      tipoPago: "Efectivo",
      cantidad: 4200,
      fecha: "2024-03-24",
    },
    {
      nombre: "Fernanda Navarro",
      tipoPaquete: "Mensual",
      tipoPago: "Efectivo",
      cantidad: 4000,
      fecha: "2024-03-23",
    },
    {
      nombre: "Mariana Rojas",
      tipoPaquete: "Mensual",
      tipoPago: "Efectivo",
      cantidad: 4400,
      fecha: "2024-03-23",
    },
    // Continúa con más registros aquí
  ];

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
        <div key={fecha} className="px-4"> {/* Aplicar padding aquí */}
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
      <div className="mt-4 flex justify-between p-4"> {/* Aplicar padding aquí */}
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

export default HistorialPagos;