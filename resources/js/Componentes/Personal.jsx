import { useState } from "react";
import "../Styles/Personal.css";
import ObraMenor from "./ObraMenor";
import Adecuacion from "./Adecuacion";
import Reforma from "./Reforma";
import Otros from "./Otros";
import { useAuth } from "../Hooks/useAuth";
import { router } from "@inertiajs/react";

export default function Personal() {

    const [tipo, setTipo] = useState("");
    const [email, setEmail] = useState("");
    const [checkSeleccionado, setCheckSeleccionado] = useState([]);

    const {user} = useAuth();

    const handleCheck = (valor)=>{
        setCheckSeleccionado(valor);
    }

    const handleLimpiarCampos = () =>{
        setTipo("");
        setEmail("");
        setCheckSeleccionado([]);
    }

    const handleProyectoSolicitado = (e)=>{
        e.preventDefault();

        const opcionesString = Array.isArray(checkSeleccionado)
        ? checkSeleccionado.join()
        : checkSeleccionado; 

        console.log(opcionesString)

        router.post('/crearproyectosolicitado',{
            email: email,
            tipo: opcionesString,
            user_id: user.id,
        });

        handleLimpiarCampos();
    }

    return (
        <>
        {
            user &&
            <div className="contenedorPersonal">

                <h1>Solicite su tipo de proyecto personal</h1>

                <form onSubmit={handleProyectoSolicitado} className="tarjetaPersonal">

                    <label htmlFor="email">Email de contacto</label>
                    <input id="email" 
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />

                    <select value={tipo} onChange={(e) => setTipo(e.target.value)}>

                        <option value="">Seleccione una opción</option>

                        <option value="obraMenor">Construccion de obra menor</option>

                        <option value="adecuacion">Adecuación</option>

                        <option value="reforma">Reforma</option>

                        <option value="otros">Otros...</option>
                    </select>

                    {
                        tipo === "obraMenor" &&
                        <ObraMenor onChange={handleCheck} />
                    }

                    {
                        tipo === 'adecuacion' &&
                        <Adecuacion onChange={handleCheck}/>
                    }

                    {
                        tipo === "reforma" &&
                        <Reforma onChange={handleCheck}/>
                    }

                    {
                        tipo === "otros" &&
                        <Otros onChange={handleCheck}/>
                    }

                    <div className="botonesPersonal">

                        <button type="submit" className="btnEnviar">Enviar</button>

                        <button className="btnCancelar"
                                onClick={handleLimpiarCampos}
                                >
                                    Cancelar
                                </button>
                    </div>
                </form>


            </div>
        }
        </>
    );
}