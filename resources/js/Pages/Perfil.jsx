import { useAuth } from "../Hooks/useAuth";
import "../Styles/Perfil.css";

export default function Perfil() {

    const { nombre, email } = useAuth();

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
                        <button className="btnEditar">Editar</button>

                        

                        <button className="btnEliminar">Eliminar</button>
                    </div>
                </div>
            </div>
        </>
    );
}