import "../Styles/Home.css";

export default function Home(){
    return(
        <>
            <h1 className="tituloEmpresa">Historia de la empresa</h1>
            
            <div className="historiaEmpresa">
                
                <div className="fotoEmpresa">
                    <img src="" alt="Foto no disponible" />
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
                            <img src="" alt="Imagen 1" />
                        </div>

                        <div className="imagen2Proyecto">
                            <img src="" alt="Imagen 2" />
                        </div>
                        
                        <div className="imagen3Proyecto">
                            <img src="" alt="Imagen 3" />
                        </div>
                    </div>
                
            </div>

            <div className="empresasColaboradoras">
                <div>
                    Empresas Colaboradoras
                </div>
            </div>
        </>
    );
}