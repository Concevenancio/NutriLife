import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Formulario = () => {
  const { state } = useLocation();
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccionDeEntrega, setDireccionDeEntrega] = useState("");
  const [ejercicio, setEjercicio] = useState("");
  const [padecimiento, setPadecimiento] = useState("");
  const [alergias, setAlergias] = useState("");
  const [tipopaquete, setTipopaquete] = useState("");
  const [especial, setEspecial] = useState("");
  const [mesa, setMesa] = useState("");
  const [fecha, setFecha] = useState("");
  const [noconsume, setNoConsume] = useState("");
  const [formadepago, setFormadepago] = useState("");
  const [diasadeber, setDiasADeber] = useState("0");
  const [fechaproxcita, setFechaProxCita] = useState("");
  const [pago, setPago] = useState("");
  const [id, setId] = useState(null);
  const [userState] = useState(state?.paciente || "");

  const [alerta, setAlerta] = useState({});

  const { guardarPaciente, paciente } = usePacientes();

  useEffect(() => {
    if (userState) {
      console.log("entre", userState);
      setNombre(userState.nombre);
      setTelefono(userState.telefono);
      setDireccionDeEntrega(userState.direccionDeEntrega);
      setEjercicio(userState.ejercicio);
      setPadecimiento(userState.padecimiento);
      setAlergias(userState.alergias);
      setTipopaquete(userState.tipopaquete);
      setFormadepago(userState.formadepago);
      setPago(userState.pago);
      setEspecial(userState.especial);
      setMesa(userState.mesa);
      setNoConsume(userState.noconsume);
      setDiasADeber(userState.diasadeber);
      setFecha(userState.fecha);
      setFechaProxCita(userState.fechaproxcita);

      setId(userState._id);
    }
  }, [userState]);

  useEffect(() => {
    if (paciente?.nombre) {
      setNombre(paciente.nombre);
      setTelefono(paciente.telefono);
      setDireccionDeEntrega(paciente.direccionDeEntrega);
      setEjercicio(paciente.ejercicio);
      setPadecimiento(paciente.padecimiento);
      setAlergias(paciente.alergias);
      setTipopaquete(paciente.tipopaquete);
      setFormadepago(paciente.formadepago);
      setPago(paciente.pago);
      setEspecial(paciente.especial);
      setMesa(paciente.mesa);
      setNoConsume(paciente.noconsume);
      setDiasADeber(paciente.diasadeber);
      setFecha(paciente.fecha);
      setProxCita(paciente.fechaproxcita);

      setId(paciente._id);
    }
  }, [paciente]);

  const handleTelefonoChange = (e) => {
    const inputTelefono = e.target.value;
    // Remover todos los caracteres no numéricos del valor del input
    const telefonoNumerico = inputTelefono.replace(/\D/g, "");
    // Formatear el número de teléfono agregando guiones
    let telefonoFormateado = "";
    if (telefonoNumerico.length <= 10) {
      telefonoFormateado = telefonoNumerico.replace(
        /(\d{3})(\d{1,3})?(\d{1,4})?/,
        (_, p1, p2, p3) => (p2 ? `${p1}-${p2}${p3 ? `-${p3}` : ""}` : p1)
      );
    } else {
      // Si el número de teléfono es mayor de 10 dígitos, solo mostrar los primeros 10 dígitos
      telefonoFormateado = telefonoNumerico
        .substring(0, 10)
        .replace(/(\d{3})(\d{1,3})?(\d{1,4})?/, (_, p1, p2, p3) =>
          p2 ? `${p1}-${p2}${p3 ? `-${p3}` : ""}` : p1
        );
    }
    // Actualizar el estado del teléfono con el nuevo valor formateado
    setTelefono(telefonoFormateado);
  };
  const handlePagoChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, ""); // Remueve todos los caracteres que no son números
    setPago(numericValue); // Actualiza el estado solo con los números
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    //Validar Formulario
    if (
      [
        nombre,
        telefono,
        direccionDeEntrega,
        ejercicio,
        padecimiento,
        alergias,
        fecha,
        fechaproxcita,
        tipopaquete,
        formadepago,
        pago,
        especial,
        mesa,
        diasadeber,
        noconsume,
      ].includes("")
    ) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    guardarPaciente({
      nombre,
      telefono,
      direccionDeEntrega,
      ejercicio,
      padecimiento,
      alergias,
      fecha,
      fechaproxcita,
      tipopaquete,
      formadepago,
      pago,
      especial,
      mesa,
      diasadeber,
      noconsume,
      id,
    });
    setAlerta({
      msg: "Guardado Correctamente",
    });

    setNombre("");
    setTelefono("");
    setEjercicio("");
    setPadecimiento("");
    setDireccionDeEntrega("");
    setAlergias("");
    setFecha("");
    setTipopaquete("");
    setFormadepago("");
    setPago("");
    setEspecial("");
    setMesa("");
    setNoConsume("");
    setDiasADeber("");
    setFechaProxCita("");
    setId("");
  };

  const { msg } = alerta;
  return (
    <>
      <h2 className="font-black text-3xl text-center">
        Administrador de Pacientes
      </h2>
      <p className="text-xl text-center mt-5 mb-10">
        Añadir y administrar{" "}
        <span className=" text-green-600 font-bold"> Pacientes</span>
      </p>

      {msg && <Alerta alerta={alerta} />}

      <Link to="/admin">
        <button
          type="button"
          className="py-2 px-4 bg-green-700 jus hover:bg-green-800 text-white uppercase font-medium rounded-lg mb-5"
        >
          Regresar
        </button>
      </Link>

      <form
        className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md "
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label
            htmlFor="nombre"
            className=" uppercase text-gray-700 font-bold"
          >
            Nombre del Paciente:
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre del Paciente"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="nombre"
            className=" uppercase text-gray-700 font-bold"
          >
            Telefono del Paciente:
          </label>
          <input
            id="telefono"
            type="text"
            placeholder="Telefono del Paciente"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={telefono}
            onChange={handleTelefonoChange}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="direccionDeEntrega"
            className=" uppercase text-gray-700 font-bold"
          >
            Direccion De Entrega del Paciente:
          </label>
          <input
            id="direccionDeEntrega"
            type="text"
            placeholder="Direccion De Entrega"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={direccionDeEntrega}
            onChange={(e) => setDireccionDeEntrega(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="ejercicio"
            className=" uppercase text-gray-700 font-bold"
          >
            Ejercicio:
          </label>
          <textarea
            id="ejercicio"
            type="text"
            placeholder="Ejercicio"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={ejercicio}
            onChange={(e) => setEjercicio(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="padecimiento"
            className=" uppercase text-gray-700 font-bold"
          >
            Padecimiento:
          </label>
          <textarea
            id="padecimiento"
            type="text"
            placeholder="Padecimiento del Paciente"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={padecimiento}
            onChange={(e) => setPadecimiento(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="alergias"
            className=" uppercase text-gray-700 font-bold"
          >
            Alergias:
          </label>
          <textarea
            id="alergias"
            placeholder="Alergias del Paciente"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={alergias}
            onChange={(e) => setAlergias(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="noconsume"
            className=" uppercase text-gray-700 font-bold"
          >
            Alimentos que no consume:
          </label>
          <textarea
            id="noconsume"
            placeholder="Alimentos que no consume el Paciente"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={noconsume}
            onChange={(e) => setNoConsume(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="fecha" className=" uppercase text-gray-700 font-bold">
            Fecha de Alta:
          </label>
          <input
            id="fecha"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="fechaproxcita"
            className=" uppercase text-gray-700 font-bold"
          >
            Proxima Cita:
          </label>
          <input
            id="fechaproxcita"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fechaproxcita}
            onChange={(e) => setFechaProxCita(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="tipopaquete"
            className="uppercase text-gray-700 font-bold"
          >
            Tipo de Paquete:
          </label>
          <select
            id="tipopaquete"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={tipopaquete}
            onChange={(e) => setTipopaquete(e.target.value)}
          >
            <option value="">Selecciona el Paquete</option>
            <option value="Dia">Día</option>
            <option value="Semana">Semana</option>
            <option value="Mes">Mes</option>
          </select>
        </div>

        <div className="mb-5">
          <label
            htmlFor="formadepago"
            className="uppercase text-gray-700 font-bold"
          >
            Forma de pago:
          </label>
          <select
            id="formadepago"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={formadepago}
            onChange={(e) => setFormadepago(e.target.value)}
          >
            <option value="">Selecciona la forma de pago</option>
            <option value="Tarjeta">Tarjeta</option>
            <option value="Effectivo">Effectivo</option>
          </select>
        </div>
        <div className="mb-5">
          <label htmlFor="pago" className=" uppercase text-gray-700 font-bold">
            Pago del Paciente:
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 font-medium">$</span>
            </span>
            <input
              id="pago"
              type="text"
              placeholder="Monto"
              className="pl-8 border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={pago}
              onChange={handlePagoChange} // Cambiado a handlePagoChange
            />
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="especial"
            className=" uppercase text-gray-700 font-bold"
          >
            Especial:
          </label>
          <input
            id="especial"
            type="text"
            placeholder="Especial"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={especial}
            onChange={(e) => setEspecial(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="mesa" className="uppercase text-gray-700 font-bold">
            Mesa
          </label>
          <select
            id="mesa"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={mesa}
            onChange={(e) => setMesa(e.target.value)}
          >
            <option value="">Selecciona Mesa</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
          </select>
        </div>

        <div className="mb-5">
          <label
            htmlFor="diasadeber"
            className=" uppercase text-gray-700 font-bold"
          >
            Dias a deber:
          </label>
          <input
            id="diasadeber"
            type="text"
            placeholder="Dias que le debo al Paciente"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={diasadeber}
            onChange={(e) => setDiasADeber(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className=" bg-green-600 w-full p-3 text-white uppercase font-bold hover:bg-green-700 cursor-pointer transition-colors rounded-md"
          value={id ? "Guardar Cambios" : "Agregar Paciente"}
        />
      </form>
    </>
  );
};

export default Formulario;
