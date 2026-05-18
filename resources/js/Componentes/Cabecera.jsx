import { Link, router } from "@inertiajs/react";
import "../Styles/Cabecera.css";
import "../Styles/Login.css";
import cs from "../Imagenes/logo/logo_sarmiento.svg";

import { useAuth } from "../Hooks/useAuth";
import { use, useEffect, useState } from "react";

export default function Cabecera() {

    const { user, isAdmin, trabajador } = useAuth();

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
                    <Link href={'/obracivil'}>Obra civíl</Link>

                    <Link href={'/obrapublica'}>Obra pública</Link>

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

                            <div>
                               <p>Login: {user?.name}</p> 
                            </div>

                            {
                                isAdmin &&
                                <>
                                    <Link href={'/editarUsuarios'}>Editar Usuario</Link>
                                    <Link href={'/añadirmaquina'}>Añadir Maquinaria</Link>
                                    <Link href={'/añadirproyecto'}>Añadir Proyecto</Link>
                                    <Link href={'/maquinariaAlquilada'}>Maquinaria Alquilada</Link>
                                    <Link href={'/proyectoPersonalAdm'}>Ver Proyectos</Link>

                                    <Link href={'/maquinaria'}>Ver maquinaria</Link>

                                    <Link href={'/proyectosSolicitados'}>Ver Proyectos Solicitados</Link>
                                    <Link href={'/facturacionproyecto'}>Facturación Proyecto</Link>
                                    <Link href={'/facturamaquinaria'}>Facturación Maquinaria</Link>
                                    <Link href={'/trabajador'}>Nominas</Link>
                                    <Link href={'/edicion'}>Modo edicion</Link>
                                    <Link>CVitae</Link>
                                </>  
                            }
                                {!isAdmin && !trabajador &&
                                    <>
                                        <Link href={'/historialProyectos'} >Historial Proyectos</Link>

                                        <Link href={'proyectoSolicitado'}>Mis proyectos solicitados</Link>
                                    
                                        <Link href={'/historialmaquinaria'}>Historial Alquileres</Link>
                                    </>
                                }

                                {
                                    trabajador && 
                                        <>
                                            <Link href={'/nomina'}>Nomina</Link>
                                            <Link href={'/proyectotrabajador'}>Proyectos </Link>
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