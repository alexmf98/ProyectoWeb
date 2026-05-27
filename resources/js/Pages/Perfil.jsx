import { router } from "@inertiajs/react";
import { useAuth } from "../Hooks/useAuth";
import "../Styles/Perfil.css";

export default function Perfil() {

    const { nombre, email, user, dni, fecha_nacimiento } = useAuth();

    const handleEdit = () =>{
        router.get('/editPerfil');
    }

    const handleDesactivar = () =>{
        const confirmado =  confirm("¿Desea desactivar su cuenta?")

        if (confirmado) {
            router.post(`/desactivarPerfil/${user.id}`);
        }
    }

    const handleFecha = (fecha)=>{
        const f = new Date(fecha);

        const dia = f.getDate();
        const mes = f.getMonth() + 1;
        const año = f.getFullYear();

        return dia + "/" + mes + "/" + año
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

                {
                    user.role === 'trabajador' &&
                    <>
                    
                        <div className="campoPerfil">
                            <span className="etiqueta">DNI</span>
                            <span className="valor">{dni}</span>
                        </div>

                        <div className="campoPerfil">
                            <span className="etiqueta">Fecha Nacimiento</span>
                            <span className="valor">{handleFecha(fecha_nacimiento)}</span>
                        </div>
                    </>
                }

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