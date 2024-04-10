import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const HistorialContext = createContext();

export const HistorialProvider = ({ children }) => {
  const [historial, setHistorial] = useState([]);


  useEffect(() => {
    const obtenerHistorial = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await clienteAxios.get("/historial-pagos", config); // Cambio en esta línea
        //console.log(response.data);
        setHistorial(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerHistorial();
  }, []);

  const guardarPagos = async ({ id, nombre, anticipo, formadepago }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
  
      const data = {
        id, nombre, anticipo, formadepago
      };
  
      const response = await clienteAxios.post("/historial-pagos/almacenar", data, config);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <HistorialContext.Provider
      value={{
        historial,
        guardarPagos
      }}
    >
      {children}
    </HistorialContext.Provider>
  );
};

export default HistorialContext;
