import { router } from "@inertiajs/react";
import "../Styles/Alquiler.css";
import { useAuth } from "../Hooks/useAuth";
export default function MaquinariaImg({id, titulo, src, alt="Imagen no disponible"}) {

    const {isAdmin} = useAuth();  

    const handleInformacion = () =>{
        
        router.get(`/informacion/${id}`);

    }
    
    const detalleMaquina = ()=>{
        router.get(`/detallemaquina/${id}`)
    }

    return (


        <div className="imagenMaquina">
            <h3>{titulo}</h3>
            <img src={src} alt={alt} />

            <div className="imagenMaquinaBoton">

                <button onClick={handleInformacion}>Información</button>
                {
                    isAdmin &&
                        <button onClick={detalleMaquina}>
                            Editar
                        </button>
                }
            </div>
        </div>


    );
}