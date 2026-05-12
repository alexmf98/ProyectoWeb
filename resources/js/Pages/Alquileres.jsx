import "../Styles/Alquiler.css";
import MaquinariaImg from "../Componentes/MaquinariaImg";
export default function Alquiler({ maquinas }) {

    return (
        <>

            <div className="contenedorAlquiler">
                <input type="text" placeholder="Buscar..." />
                <button>Buscar</button>
            </div>


            <div className="imagenesMaquinaria">

                {
                    maquinas.map((dato) => (
                        <>

                            <MaquinariaImg
                                id={dato.id}
                                titulo={dato.nombre}
                                src={dato.imagen}
                                alt={dato.nombre} />

                        </>
                    ))
                }

            </div>
        </>
    );
}