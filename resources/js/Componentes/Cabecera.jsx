import { Link } from "@inertiajs/react";
import "../Styles/Cabecera.css";

export default function Cabecera(){
    return(
        <div className="cabeceraHome">
            <Link href={'/home'}>Inicio</Link>
            <Link href={'/alquileres'}>Alquileres</Link>
            <Link href={'/trabajar'}>Trabaja con nosotros</Link>
            <Link href={'/proyectos'}>Proyectos</Link>
            <Link href={'/contactenos'}>Contactenos</Link>
            <Link href={'iniciar'}>Iniciar Sesion</Link>
        </div>
    );
}