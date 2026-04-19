import { router } from "@inertiajs/react";
import { useAuth } from "../Hooks/useAuth";
import "../Styles/Perfil.css";
import { useState } from "react";

export default function Perfil() {

    const { nombre, email } = useAuth();

    const handleEdit = () =>{
        router.get('/editPerfil');
    }

    const handleEliminar = () =>{
        const confirmado =  confirm("¿Desea eliminar su cuenta?")

        if (confirmado) {
            router.post('/eliminarPerfil');
        }
    }


    return (
        <>
            <div className="contenedorPerfil">
                <div className="tarjetaPerfil">

                <div className="campoPerfil">
                    <span className="etiqueta">Nombre</span>
                    <span className="valor">{nombre}</span>
                </div>

                <div className="campoPerfil">
                    <span className="etiqueta">Email</span>
                    <span className="valor">{email}</span>
                </div>

                    <div className="botonesPerfil">
                        <button onClick={handleEdit} className="btnEditar">Editar</button>

                        
                        <button onClick={handleEliminar} className="btnEliminar">Eliminar</button>
                    </div>
                </div>
            </div>
        </>
    );
}