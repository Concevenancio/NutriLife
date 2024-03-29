import { useState } from "react";
import usePacientes from "../hooks/usePacientes";
import ListaPaciente from "./ListaPacientes";
import { Link } from "react-router-dom";

const ListadoPacientes = () => {
  const { pacientes } = usePacientes();
  const [busqueda, setBusqueda] = useState("");
  const [indice, setIndice] = useState(0);
  const [mostrarTodos, setMostrarTodos] = useState(false);

  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
    setIndice(0);
    setMostrarTodos(false);
  };

  const handleMostrarTodos = () => {
    setMostrarTodos(true);
  };

  const handleAvanzar = () => {
    if (indice + 5 < pacientesFiltrados.length) {
      setIndice(indice + 5);
    }
  };

  const handleRetroceder = () => {
    if (indice - 5 >= 0) {
      setIndice(indice - 5);
    }
  };

  const pacientesFiltrados = pacientes.filter((paciente) =>
    paciente.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const pacientesMostrados = mostrarTodos
    ? pacientesFiltrados
    : pacientesFiltrados.slice(indice, indice + 10);

  return (
    <div className="container mx-auto md:pl-4 lg:pl-8">
      <h2 className="font-black text-3xl text-center mb-2">
        Listado de Pacientes
      </h2>
      <p className="text-xl mb-50 text-center">
        Administrar Pacientes y
        <span className=" text-green-600 font-bold"> Citas</span>
      </p>
      <div className="flex justify-between items-center my-6">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="border border-gray-300 px-4 py-2 rounded-md mr-2 w-5/2"
          value={busqueda}
          onChange={handleBusquedaChange}
        />
        {busqueda && (
          <button
            onClick={handleMostrarTodos}
            className="bg-cyan-700 hover:bg-cyan-800 cursor-pointer text-white px-4 py-1 rounded-md"
          >
            Mostrar Todos
          </button>
        )}
        <Link to="/admin">
          <button
            type="button"
            className="py-2 px-4 bg-blue-700 hover:bg-green-800 text-white uppercase font-medium rounded-lg"
          >
            Crear Paciente
          </button>
        </Link>
      </div>
      {pacientesMostrados.length ? (
        <>
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <thead className="bg-gray-200">
              <tr className="text-center">
                <th className="px-4 py-2 text-center">Nombre</th>
                <th className="px-4 py-2 text-center hidden xl:table-cell">
                  Telefono
                </th>
                <th className="px-4 py-2 text-center hidden xl:table-cell">
                  Tipopaquete
                </th>
                <th className="px-4 py-2 text-center hidden xl:table-cell">
                  Mesa
                </th>
                <th className="px-4 py-2 text-center hidden xl:table-cell">
                  Fecha
                </th>
                <th className="px-4 py-2 text-center">Editar</th>
                <th className="px-4 py-2 text-center">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {pacientesMostrados.map((paciente) => (
                <ListaPaciente key={paciente._id} paciente={paciente} />
              ))}
            </tbody>
          </table>
          {!mostrarTodos && (
            <div className="flex justify-between items-center">
              <button
                onClick={handleRetroceder}
                disabled={indice === 0}
                className="bg-cyan-700 hover:bg-cyan-800 cursor-pointer text-white px-4 py-2 rounded-md"
              >
                Retroceder
              </button>
              <p className="text-center mb-4">
                Total de Resultados {pacientesFiltrados.length}
              </p>
              <button
                onClick={handleAvanzar}
                disabled={indice + 10 >= pacientesFiltrados.length}
                className="bg-cyan-700 hover:bg-cyan-800 cursor-pointer text-white px-4 py-2 rounded-md"
              >
                Avanzar
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center">
          <h2 className="font-black text-3xl mb-5">
            No hay pacientes en registro
          </h2>
          <p className="text-xl mb-50">
            Comienza agregando pacientes y
            <span className=" text-green-600 font-bold">
              {" "}
              aparecerán en este lugar
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ListadoPacientes;
