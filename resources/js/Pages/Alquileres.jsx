import "../Styles/Alquiler.css";
import dumper from "../Imagenes/maquinaria/dumper.png";
import fresadora from "../Imagenes/maquinaria/fresadora.png";
import retroexcavadora from "../Imagenes/maquinaria/retroexcavadora.png";
import MaquinariaImg from "../Componentes/MaquinariaImg";
export default function Alquiler() {
    return (
        <>

            <div className="contenedorAlquiler">
                <input type="text" placeholder="Buscar..." />
                <button>Buscar</button>
            </div>


           <div className="imagenesMaquinaria">

                <MaquinariaImg titulo={"Dumper"} src={dumper} alt={"Imagen dumper"} />

                <MaquinariaImg titulo={"Fresadora"} src={fresadora} alt={"Imagen fresadora"} />

                <MaquinariaImg titulo={"Retroexcavadora"} src={retroexcavadora} alt={"Imagen retroexcavadora"} />

                <MaquinariaImg titulo={""} src={""} />

                <MaquinariaImg titulo={""} src={""} />

                <MaquinariaImg titulo={""} src={""} />
           </div>
        </>
    );
}