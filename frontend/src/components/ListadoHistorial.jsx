import { useState, useEffect } from "react";
import useHistorial from "../hooks/useHistorial";
import ListaHistorial from "./ListaHistorial";
import { Link } from "react-router-dom";

const ListadoHistorial = () => {
    const { historial } = useHistorial();
    //console.log("historial", historial) 
    

    return (
        <div className="container mx-auto md:pl-4 lg:pl-8">
        <h2 className="font-black text-3xl text-center mb-5">
          Listado de <span className="text-green-800 font-bold"> Historial </span>
        </h2>
            <>
                {historial.length === 0 ? (
                    <div className="text-center">
                        <h2 className="font-black text-3xl mb-5">
                            No hay historial de pagos
                        </h2>
                        <p className="text-xl mb-50">
                            Comienza agregando historial de pagos y
                            <span className="text-green-600 font-bold">
                                {" "}
                                aparecerán en este lugar
                            </span>
                        </p>
                    </div>
                ) : (
                    <table className="w-full border-collapse border border-gray-300 mb-4 ">
                        <thead className="bg-gray-200">
                            <tr className="text-center">
                                <th className="px-4 py-2 text-center">Nombre</th>
                                <th className="px-4 py-2 text-center hidden xl:table-cell">
                                    Pago
                                </th>
                                <th className="px-4 py-2 text-center hidden xl:table-cell">
                                    Fecha
                                </th>
                                <th className="px-4 py-2 text-center">Editar</th>
                                <th className="px-4 py-2 text-center">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historial.map((item) => (
                                <ListaHistorial key={item._id} historial={item} />
                            ))}
                        </tbody>
                    </table>
                )}
            </>
        </div>
    );
};

export default ListadoHistorial;
