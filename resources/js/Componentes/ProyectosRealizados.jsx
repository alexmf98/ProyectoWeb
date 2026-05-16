import "../Styles/Home.css";

import construccion1 from "../Imagenes/construccion/construccion1.jpg";
import construccion2 from "../Imagenes/construccion/construccion2.jpg";
import casa from "../Imagenes/construccion/casa.png";
import { usePage } from "@inertiajs/react";


export default function ProyectosRealizados() {

    const {imagen} = usePage().props;
    
    return (
        <>
            <div className="proyectosRealizados">

                <h1>
                    Proyectos realizados
                </h1>
                
                <div className="imagenesProyectos">

                {
                    imagen.map((dato)=>(

                        <div className="imagenProyecto">
                            <img src={dato.imagen} alt={dato.nombre} />

                            <div className="overlay">
                                {dato.localizacion}
                            </div>

                        </div>
                    ))
                }
                    
                </div>

            </div >
        </>
    )
}