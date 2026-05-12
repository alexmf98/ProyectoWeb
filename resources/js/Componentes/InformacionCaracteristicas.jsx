import "../Styles/Informacion.css";
import InformacionDisponibilidad from "./InformacionDisponibilidad";
import { usePage } from "@inertiajs/react";

export default function InformacionCaracteristicas() {

    const {maquina, imagen} = usePage().props;

    return (
        <>

            <div className="tarjetaImagen">

                <img className="imagenMaquinaInformacion" 
                    src={imagen} 
                    alt={maquina.nombre} />

            </div>

            <div className="tarjetaInformacion">
                
                <h2>{maquina.nombre}</h2>

                <ul>
                    <h3>Caracteristicas</h3>
                    {maquina.caracteristicas}
                </ul>
                
                <InformacionDisponibilidad />
            </div>
        </>
    );
}