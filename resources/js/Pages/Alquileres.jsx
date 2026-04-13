import "../Styles/Alquiler.css";

export default function Alquiler(){
    return(
        <>
            <h1>Alquileres</h1>

            <div className="contenedorAlquiler">
                <input type="text" placeholder="Buscar..."/>
                <button>Buscar</button>
            </div>

            <div className="imagenesMaquinaria">
                    <div className="imagenMaquina1">
                        <img src="" alt="Maquina 1" />

                        <button>Informacion</button>
                    </div>

                    <div className="imagenMaquina2">
                        <img src="" alt="Maquina 2" />

                        <button>Informacion</button>
                    </div>

                    <div className="imagenMaquina3">
                        <img src="" alt="Maquina 3" />

                        <button>Informacion</button>
                    </div>

                    <div className="imagenMaquina4">
                        <img src="" alt="Maquina 4" />

                        <button>Informacion</button>
                    </div>

                    <div className="imagenMaquina5">
                        <img src="" alt="Maquina 5" />

                        <button>Informacion</button>
                    </div>

                    <div className="imagenMaquina6">
                        <img src="" alt="Maquina 6" />

                        <button>Informacion</button>
                    </div>

                </div>
        </>
    );
}