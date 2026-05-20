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
    const [errores, setErrores] = useState({});

    const {user} = useAuth();

    const validar = () => {

        const nuevosErrores = {}

        if(!email.trim()){
            nuevosErrores.email = "El email no puede estar vacio"
        }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            nuevosErrores.email = "Formato de email no es correcto"
        }

        if(!tipo){
            nuevosErrores.tipo = "Debe de seleccionar un tipo"
        }

        if(checkSeleccionado.length === 0){
            nuevosErrores.checkSeleccionado = "Debe de elegir un tipo de opción"
        }

        return nuevosErrores;
    }

    const handleCheck = (valor)=>{
        setCheckSeleccionado(valor);
    }

    const handleLimpiarCampos = () =>{
        setTipo("");
        setEmail("");
        setCheckSeleccionado([]);
        setErrores({});
    }

    const handleProyectoSolicitado = (e)=>{
        e.preventDefault();

        const erroresValidacion = validar();

        if(Object.keys(erroresValidacion).length > 0){
            setErrores(erroresValidacion);

            return
        }

        setErrores({});

        const opcionesString = Array.isArray(checkSeleccionado)
        ? checkSeleccionado.join()
        : checkSeleccionado; 

        

        router.post('/crearproyectosolicitado',{
            email: email,
            tipo: opcionesString,
            user_id: user.id,
        }, {
            onSuccess: () => handleLimpiarCampos()
        });

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

                    {errores.email && <span className="mensajeError">{errores.email}</span>}

                    <select value={tipo} onChange={(e) => setTipo(e.target.value)}>

                        <option value="">Seleccione una opción</option>

                        <option value="obraMenor">Construccion de obra menor</option>

                        <option value="adecuacion">Adecuación</option>

                        <option value="reforma">Reforma</option>

                        <option value="otros">Otros...</option>
                    </select>

                    {errores.tipo && <span className="mensajeError">{errores.tipo}</span>}

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

                    {errores.checkSeleccionado && <span className="mensajeError">{errores.checkSeleccionado}</span>}

                    <div className="botonesPersonal">

                        <button type="submit" className="btnEnviar">Enviar</button>

                        <button className="btnCancelar"
                                type="button"
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