import "../Styles/Alquiler.css";
import MaquinariaImg from "../Componentes/MaquinariaImg";
import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
export default function Alquiler({ maquinas }) {

    const [busqueda, setBusqueda] = useState("");

    useEffect(()=>{

        const timeout = setTimeout(()=>{
            router.get('/alquileres' , busqueda ? {nombre: busqueda} : {},
            {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                });
        }, 400);
        
        return () => clearTimeout(timeout);

    },[busqueda]);

    return (
        <>

            <div className="contenedorAlquiler">
               
                    <input type="text" 
                    placeholder="Buscar..."
                    value={busqueda}
                    onChange={(e)=>setBusqueda(e.target.value)}
                    />

                    {/* <button type="submit">Buscar</button> */}
            </div>

            
            <div className="imagenesMaquinaria">

                {
                    maquinas.map((dato) => (
                        <>

                            <MaquinariaImg
                                id={dato.id}
                                titulo={dato.nombre}
                                src={dato.imagen}
                                alt={dato.nombre} />

                        </>
                    ))
                }

            </div>
        </>
    );
}