import "../Styles/Personal.css";

export default function Personal(){
    return(
        <>

            <div className="contenedorPersonal">

                <h1>Solicite su tipo de proyecto personal</h1>

                    <form action="" className="tarjetaPersonal">
                    
                    <select name="" id="">
                        <option value="">Seleccione una opción</option>
                    
                        <option value="">Construccion de obra menor</option>
                    
                        <option value="">Adecuación</option>
                    
                        <option value="">Reforma</option>
                    
                        <option value="">Otros...</option>
                    </select>

                    <textarea className="textAreaPersonal" 
                    name="" id="" placeholder="Especifique el tipo de proyecto que desea realizar">

                    </textarea>

                        <div className="botonesPersonal">

                            <button className="btnEnviar">Enviar</button>

                            <button className="btnCancelar">Cancelar</button>
                        </div>

                    </form>
                

            </div>
        </>
    );
}