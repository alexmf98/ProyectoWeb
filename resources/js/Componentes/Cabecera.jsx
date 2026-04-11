import { Link } from "@inertiajs/react";
import "../Styles/Cabecera.css";

export default function Cabecera(){
    return(
        <div className="cabeceraHome">
            <Link href={'/home'}>Inicio</Link>
            <Link>Ejemplo</Link>
        </div>
    );
}