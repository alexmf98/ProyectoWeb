import { useState } from "react";
import "../Styles/Personal.css";
import ObraMenor from "./ObraMenor";
import Adecuacion from "./Adecuacion";
import Reforma from "./Reforma";
import Otros from "./Otros";

export default function Personal() {

    const [tipo, setTipo] = useState("");

    return (
        <>

            <div className="contenedorPersonal">

                <h1>Solicite su tipo de proyecto personal</h1>

                <form action="" className="tarjetaPersonal">

                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" placeholder="email" />

                    <select name="" id="" onChange={(e) => setTipo(e.target.value)}>

                        <option value="">Seleccione una opción</option>

                        <option value="obraMenor">Construccion de obra menor</option>

                        <option value="adecuacion">Adecuación</option>

                        <option value="reforma">Reforma</option>

                        <option value="otros">Otros...</option>
                    </select>

                    {
                        tipo === "obraMenor" &&
                        <ObraMenor />
                    }

                    {
                        tipo === 'adecuacion' &&
                        <Adecuacion />
                    }

                    {
                        tipo === "reforma" &&
                        <Reforma />
                    }

                    {
                        tipo === "otros" &&
                        <Otros />
                    }

                    <div className="botonesPersonal">

                        <button className="btnEnviar">Enviar</button>

                        <button className="btnCancelar">Cancelar</button>
                    </div>
                </form>


            </div>
        </>
    );
}