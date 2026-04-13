import "../Styles/Home.css";
import logo from "../Imagenes/logo/construccion.png";
import construccion1 from "../Imagenes/construccion/construccion1.jpg";
import construccion2 from "../Imagenes/construccion/construccion2.jpg";
import casa from "../Imagenes/construccion/casa.png";
import leroy from "../Imagenes/colaboradora/leroy.png";
import martillo from "../Imagenes/colaboradora/martillo.png";
import media from "../Imagenes/colaboradora/media.png";

export default function Home(){
    return(
        <>
            <h1 className="tituloEmpresa">Historia de la empresa</h1>
            
            <div className="historiaEmpresa">
                
                <div className="fotoEmpresa">
                    <img src={logo} alt="Foto no disponible" />
                </div>
                
                <div className="textoEmpresa">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                    Nulla distinctio cumque ducimus reprehenderit alias, laboriosam 
                    fugit veniam esse corporis odit at quos, quasi nemo quisquam laudantium 
                    iste delectus! Nisi, odit?

                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur dolorum 
                    architecto qui debitis facere maxime id totam, laborum atque, numquam saepe 
                    illum, corrupti quod. Aliquam at sequi sit qui facilis.
                </div>
            </div>

            <div className="proyectosRealizados">

                    <h1>
                        Proyectos realizados
                    </h1>
                    <div className="imagenesProyectos">
                        
                        <div className="imagen1Proyecto">
                            <img src={construccion1} alt="Imagen 1" />
                        </div>

                        <div className="imagen2Proyecto">
                            <img src={construccion2} alt="Imagen 2" />
                        </div>
                        
                        <div className="imagen3Proyecto">
                            <img src={casa} alt="Imagen 3" />
                        </div>
                    </div>
                
            </div>

            <div className="empresasColaboradoras">
                <h3>
                    Empresas Colaboradoras
                </h3>
                
                <div className="fotosColaboradoras">
                    <div className="imagen1Colaboradora">
                        <img src={leroy} alt="" />
                    </div>

                    <div className="imagen2Colaboradora">
                        <img src={martillo} alt="" />
                    </div>
                    
                    <div className="imagen3Colaboradora">
                        <img src={media} alt="" />
                    </div>

                </div>
            </div>
        </>
    );
}