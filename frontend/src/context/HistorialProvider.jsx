import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const HistorialContext = createContext();

export const HistorialProvider =({children}) =>{
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
    
            const { data } = await clienteAxios("/historial-pagos", config);
            setHistorial(data);
          } catch (error) {
            console.log(error);
          }
        };
        obtenerHistorial();
      }, [auth]);

      

}




export default HistorialContext;