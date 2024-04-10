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
        console.log(response.data);
        setHistorial(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerHistorial();
  }, []);


  return (
    <HistorialContext.Provider
      value={{
        historial,
      }}
    >
      {children}
    </HistorialContext.Provider>
  );
};

export default HistorialContext;
