import { router, usePage } from "@inertiajs/react";
import "../Styles/OcultarMaquinaria.css";

export default function OcultarMaquinaria(){

    const {maquinas} = usePage().props;

    const handleOcultar = (e,id) =>{
       e.preventDefault();
      
        router.put(`/ocultarmaquina/${id}`,{
            'show_maquina': false,
        });
    }

    const handleMostrar = (e,id) =>{
        e.preventDefault();
       
         router.put(`/ocultarmaquina/${id}`,{
             'show_maquina': true,
         });
    }

    return(
        <>
            <div className="imagenesMaquinaria">
            
                            {
                                maquinas.map((dato) => (
                                    <>
                                        <div className="imagenMaquina">
                                        
                                            <img src={dato.imagen} alt="" />

                                            <div className="imagenMaquinaBoton">

                                                <form>
                                                    {
                                                        dato.show_maquina &&
                                                            <button onClick={(e)=>handleOcultar(e, dato.id)}>
                                                            Ocultar 
                                                            </button>
                                                    }
                                                    {
                                                        !dato.show_maquina &&
                                                            <button onClick={(e)=>handleMostrar(e, dato.id)}>
                                                                Mostrar
                                                            </button>
                                                    }

                                                </form>
                                            </div>
                                        </div>
                                    </>
                                ))
                            }
            
                        </div>
        </>
    )
}