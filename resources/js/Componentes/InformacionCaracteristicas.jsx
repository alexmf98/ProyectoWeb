import "../Styles/Informacion.css";
import dumper from "../Imagenes/maquinaria/dumper.png";
import InformacionDisponibilidad from "./InformacionDisponibilidad";

export default function InformacionCaracteristicas() {
    return (
        <>
            <div className="tarjetaImagen">

                <img className="imagenMaquinaInformacion" src={dumper} alt="Dumper" />

            </div>

            <div className="tarjetaInformacion">
                <h2>Dumper</h2>

                <ul>
                    <h3>Caracteristicas</h3>
                    <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit nulla id architecto
                        voluptatem, numquam asperiores! Obcaecati sapiente libero dolor dolorum aliquid aliquam laborum
                        quos sint consequuntur, eveniet unde! Optio, cumque?
                    </li>

                    <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit nulla id architecto
                        voluptatem, numquam asperiores! Obcaecati sapiente libero dolor dolorum aliquid aliquam laborum
                        quos sint consequuntur, eveniet unde! Optio, cumque?
                    </li>
                </ul>
                
                <InformacionDisponibilidad />
            </div>
        </>
    );
}