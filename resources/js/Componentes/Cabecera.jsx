import { Link } from "@inertiajs/react";
import "../Styles/Cabecera.css";

export default function Cabecera(){

    
    return(
        <div className="cabeceraHome">
            <Link href={'/home'}>Inicio</Link>
            
            <Link href={'/alquileres'}>Alquileres</Link>
            
            <Link href={'/trabajar'}>Trabaja con nosotros</Link>
            
            <div className="proyectos">
            
                <Link href={'/proyectos'}>Proyectos</Link>
                
                <div className="subProyectos">
                    <Link href={'/restauracion'}>Restauración</Link>
                    
                    <Link href={'/adecuacion'}>Adecuación</Link>
                    
                    <Link href={'/personal'}>Personal</Link>
                </div>
            </div>
            
            <Link href={'/contactenos'}>Contactenos</Link>
            
            <Link href={'iniciar'}>Iniciar Sesion</Link>
        </div>
    );
}