import "../Styles/Alquiler.css";
export default function MaquinariaImg({ titulo, src, alt="Imagen no disponible"}) {
    return (


        <div className="imagenMaquina">
            <h3>{titulo}</h3>
            <img src={src} alt={alt} />

            <button>Información</button>
        </div>


    );
}