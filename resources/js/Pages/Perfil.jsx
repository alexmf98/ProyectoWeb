import { router } from "@inertiajs/react";
import { useAuth } from "../Hooks/useAuth";
import "../Styles/Perfil.css";

export default function Perfil() {

    const { nombre, email, user } = useAuth();

    const handleEdit = () =>{
        router.get('/editPerfil');
    }

    const handleDesactivar = () =>{
        const confirmado =  confirm("¿Desea desactivar su cuenta?")

        if (confirmado) {
            router.post(`/desactivarPerfil/${user.id}`);
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

                        {
                            user.role !== 'administrador' &&
                            
                            <button onClick={handleDesactivar} 
                            
                                className="btnEliminar">Desactivar
                            
                            </button>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}