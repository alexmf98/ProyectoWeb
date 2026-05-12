import { Link, router } from "@inertiajs/react";
import "../Styles/Cabecera.css";
import "../Styles/Login.css";
import cs from "../Imagenes/logo/logo_sarmiento.svg";

import { useAuth } from "../Hooks/useAuth";
import { useEffect, useState } from "react";

export default function Cabecera() {

    const { user, isAdmin } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () =>{
        router.post('/logout');
    }

    const toogleMenu = () =>{
        setMenuOpen(!menuOpen);
    }

    useEffect(()=>{
        setMenuOpen(false);
    },[user])

    return (
        <div className="cabeceraHome">

            <img src={cs} alt="Construcciones Sarmiento" />

            <Link href={'/home'}>Inicio</Link>

            {/* <Link href={'/trabajar'}>Trabaja con nosotros</Link> */}

            <div className="proyectos">

                <Link href={'/proyectos'}>Proyectos</Link>

                <div className="subProyectos">
                    <Link href={'/restauracion'}>Restauración</Link>

                    <Link href={'/adecuacion'}>Adecuación</Link>

                    {/* <Link href={'/personal'}>Personal</Link> */}
                </div>
            </div>

            <Link href={'/alquileres'}>Alquileres</Link>

            <Link href={'/contactenos'}>Contactenos</Link>

            <div className="login">
                {user ? (
                    <div className="menuHamburguesa">
                        <button onClick={toogleMenu} className="botonHamburguesa">
                            &#9776;
                        </button>

                        { menuOpen && (
                            <div className="submenus">

                            {
                                isAdmin &&
                                <>
                                    <Link href={'/editarUsuarios'}>Editar Usuario</Link>
                                    <Link>Editar información de página</Link>
                                    <Link href={'/añadirmaquina'}>Añadir Maquinaria</Link>
                                    <Link href={'/añadirproyecto'}>Añadir Proyecto</Link>
                                    <Link>Maquinaria Alquilada</Link>
                                    <Link>Ver Proyectos Personales</Link>

                                    <Link>Ver Proyectos Solicitados</Link>
                                    <Link>Facturación</Link>
                                    
                                </>  
                            }
                                {!isAdmin &&
                                    <>
                                        <Link>Historial Proyectos</Link>
                                    
                                        <Link>Historial Alquileres</Link>
                                    </>
                                }
                                
                                <Link href={'/perfil'}>Perfil</Link>
                                
                                <button className="btnCerrarSesion" onClick={handleLogout}>
                                    Cerrar Sesión
                                </button>
                                {/* <Link>Cerrar Sesión</Link> */}
                            </div>
                        )}
                    </div>
                ) : (
                    <Link href={'/login'}>Iniciar Sesión</Link>
                )}
            </div>

        </div>
    );
}