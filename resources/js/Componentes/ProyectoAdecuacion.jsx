import { usePage } from "@inertiajs/react";
import "../Styles/Adecuacion.css";

export default function ProyectoAdecuacion() {

    const { adecuacion } = usePage().props;

    
    return (
        <>
            <div className="contenedorAdecuacion">

                {
                    adecuacion.map((dato) => (
                        <div className="tarjeta" key={dato.id}>
                            <div className="tarjeta-inner">
                                <div className="tarjeta-front">
                                    <img src={dato.imagen} alt={dato.nombre} />
                                </div>
                                <div className="tarjeta-back">
                                    <div className="tarjeta-personal-fila">
                                        <label>Nombre</label>
                                        <p>{dato.nombre}</p>
                                    </div>
                                    <div className="tarjeta-personal-fila">
                                        <label>Coste</label>
                                        <p>{dato.coste} €</p>
                                    </div>
                                    <div className="tarjeta-personal-fila">
                                        <label>Localización</label>
                                        <p>{dato.localizacion}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }


            </div>
        </>
    )
}