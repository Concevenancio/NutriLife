import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const HistorialContext = createContext();

export const HistorialProvider = ({ children }) => {
  const [historial, setHistorial] = useState([]);
  const { auth } = useAuth();

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

        const { dataHistorial } = await clienteAxios("/historial-pagos", config);
        console.log(dataHistorial)
        setHistorial(dataHistorial);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerHistorial();
  }, [auth]);


return (
    <HistorialContext.Provider
      value={{
        historial,
        obtenerHistorial,
      }}
    >
      {children}
    </HistorialContext.Provider>
  );
};


export default HistorialContext;