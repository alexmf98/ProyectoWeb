import { router, usePage } from "@inertiajs/react"
import "../Styles/HistorialMaquinariaUser.css";
import { useState } from "react";

export default function HistorialMaquinaria(){

    const {historial} = usePage().props;

    const [id, setId] = useState("");

    const botonCancelar = (id) => {
        setId(id);
    }

    const handleCancelar = (e)=>{
        
        e.preventDefault();

        router.put(`/cancelarAlquiler/${id}`, {
            is_cancelled: true,
        });
    }
   
    return(
        <div className="historial-container">

            <div className="historial-grid">
                {historial.map((dato) => (
                    <div className={dato.is_cancelled ? "historial-card_cancelado" : "historial-card"} 
                            key={dato.id}>

                        <div className="historial-card-imagen">
                            <img src={dato.maquinaria.imagen} alt={dato.nombre} />
                        </div>

                        <div className="historial-card-body">
                            <h2 className="historial-card-nombre">{dato.nombre}</h2>

                            <div className="historial-fechas">
                                <div className="historial-fecha">
                                    <span className="historial-fecha-label">Fecha inicio</span>
                                    <span className="historial-fecha-valor">{dato.fecha_inicio}</span>
                                </div>
                                <div className="historial-fecha-separador">→</div>
                                <div className="historial-fecha">
                                    <span className="historial-fecha-label">Fecha fin</span>
                                    <span className="historial-fecha-valor">{dato.fecha_fin}</span>
                                </div>
                            </div>

                            <div className={"historial-card-footer"}>
                                <span className="historial-coste">{dato.coste} €</span>
                                <span className={dato.is_cancelled ? "historial-badge_cancelado" : "historial-badge"}>
                                    {dato.is_cancelled ? "Cancelado" : "Alquilado"}
                                </span>

                                <div>
                                    <form onSubmit={handleCancelar}>
                                        <button onClick={()=>botonCancelar(dato.id)}>
                                            Cancelar
                                        </button>

                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}