import "../Styles/Alquiler.css";
import dumper from "../Imagenes/maquinaria/dumper.png";
import fresadora from "../Imagenes/maquinaria/fresadora.png";
import retroexcavadora from "../Imagenes/maquinaria/retroexcavadora.png";
import MaquinariaImg from "../Componentes/MaquinariaImg";
export default function Alquiler() {
    return (
        <>
            <h1>Alquileres</h1>

            <div className="contenedorAlquiler">
                <input type="text" placeholder="Buscar..." />
                <button>Buscar</button>
            </div>


            <div className="imagenesMaquinaria">
                <div className="imagenMaquina">
                    <MaquinariaImg titulo={"Dumper"} src={dumper} alt={"Imagen 1"} />
                </div>
                <div className="imagenMaquina">
                    <MaquinariaImg titulo={""} src={fresadora} alt={"Imagen 2"} />
                </div>

                <div className="imagenMaquina">
                    
                    <MaquinariaImg titulo={""} src={retroexcavadora} alt={"Imagen 3"} />
                
                </div>

                <div className="imagenMaquina">

                    <MaquinariaImg titulo={""} src={""} alt={"Imagen 4"} />
                
                </div>

                <div className="imagenMaquina">
                
                    <MaquinariaImg titulo={""} src={""} alt={"Imagen 5"} />
                
                </div>

                <div className="imagenMaquina">

                    <MaquinariaImg titulo={""} src={""} alt={"Imagen 6"} />
                
                </div>

            </div>

        </>
    );
}