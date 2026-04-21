import { router } from "@inertiajs/react";
import "../Styles/Alquiler.css";
export default function MaquinariaImg({ titulo, src, alt="Imagen no disponible"}) {

    const handleInformacion = () =>{
        
        router.get('/informacion');

    }

    return (


        <div className="imagenMaquina">
            <h3>{titulo}</h3>
            <img src={src} alt={alt} />

            <button onClick={handleInformacion}>Información</button>
        </div>


    );
}