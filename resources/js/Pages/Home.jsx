import "../Styles/Home.css";
import leroy from "../Imagenes/colaboradora/leroy.png";
import martillo from "../Imagenes/colaboradora/martillo.png";
import media from "../Imagenes/colaboradora/media.png";
import HistoariaEmpresa from "../Componentes/HistoriaEmpresa";
import ProyectosRealizados from "../Componentes/ProyectosRealizados";
import EmpresaColaboradora from "../Componentes/EmpresaColaboradora";

export default function Home() {
   
    return (
        <>
            <HistoariaEmpresa>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Nulla distinctio cumque ducimus reprehenderit alias, laboriosam
                fugit veniam esse corporis odit at quos, quasi nemo quisquam laudantium
                iste delectus! Nisi, odit?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur dolorum
                architecto qui debitis facere maxime id totam, laborum atque, numquam saepe
                illum, corrupti quod. Aliquam at sequi sit qui facilis.
            </HistoariaEmpresa>

            <ProyectosRealizados />
            


            <EmpresaColaboradora>
                <img src={leroy} alt="Leroy Merlin" />
                <img src={media} alt="Media Markt" />
                <img src={martillo} alt="Constructora" />
                
                <img src={leroy} alt="Leroy Merlin" />
                <img src={media} alt="Media Markt" />
                <img src={martillo} alt="Constructora" />


            </EmpresaColaboradora>



        </>
    );
}