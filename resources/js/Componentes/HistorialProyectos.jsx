import { router, usePage } from "@inertiajs/react"
import "../Styles/HistorialProyectoUser.css";

export default function HistorialProyectos() {
    const { historial } = usePage().props;
    
    const handleVerImagenes = (id) => {

        router.get(`/verimagenes/${id}`)
    
    }
  
    return (
        <>
    
            <div className="tarjeta-historial-proyecto">
                {
                    historial.map((dato) => (
                        <div className="tarjeta-proyecto">

                            <div className="tarjeta-proyecto-fila">
                                <img src={dato.proyecto.imagen} alt="No diponible" />
                            </div>

                            <div className="tarjeta-proyecto-fila">
                                <label>Nombre Proyecto</label>
                                <p>{dato.proyecto.nombre}</p>
                            </div>

                            <div className="tarjeta-proyecto-fila">
                                <label>Coste</label>
                                <p>{dato.proyecto.coste}€</p>
                            </div>

                            <div className="tarjeta-proyecto-fila">
                                <label>Localizacion</label>
                                <p>{dato.proyecto.localizacion}</p>
                            </div>

                            <div className="boton-proyecto-fila">
                                <button onClick={() => handleVerImagenes(dato.proyecto.id)}>Ver imagenes</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}