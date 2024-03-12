import { useState } from "react";

import Formulario from "../../components/Formulario";

const AdministrarPacientes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-screen-md w-full">
        <button
          type="button"
          className="bg-green-600 text-white font-bold uppercase mx-10 p-3 rounded-md mb-10 md:hidden"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          {mostrarFormulario ? "Ocultar Formulario" : "Mostrar Formulario"}
        </button>
        <div
          className={`${
            mostrarFormulario ? "block" : "hidden"
          } md:block md:w-full`}
        >
          <Formulario />
        </div>
      </div>
    </div>
  );
};

export default AdministrarPacientes;




