import { useAuth } from "../Hooks/useAuth";
import { router } from "@inertiajs/react";
import { useState } from "react";
import Trabajar from "../Componentes/Trabajar";
import Personal from "../Componentes/Personal";

export default function Contactenos() {

    const { user } = useAuth();
    const [opcion, setOpcion] = useState(null);

    const handleOpcion = (opcionElegida) => {
        if(opcionElegida === 'proyecto' && !user){
            
            router.get('/crearcuenta');
            return;
        }
        setOpcion(opcionElegida);
    }

    return (
        <>
            {!opcion &&
                <div className="contenedorOpcion">
                    <h1>¿Qué deseas hacer?</h1>
                    <div className="botonesOpcion">
                        <button onClick={() => handleOpcion('cv')}>
                            Enviar Curriculum
                        </button>
                        <button onClick={() => handleOpcion('proyecto')}>
                            Solicitar Proyecto Personal
                        </button>
                    </div>
                </div>
            }

            {opcion === 'cv' && <Trabajar />}
            {opcion === 'proyecto' && <Personal />}

            {opcion &&
                <button className="btnVolverContacto" onClick={() => setOpcion(null)}>
                    Volver
                </button>
            }
        </>
    );
}