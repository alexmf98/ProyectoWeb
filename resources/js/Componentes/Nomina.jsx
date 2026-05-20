import { router, usePage } from "@inertiajs/react"
import "../Styles/Nomina.css";
import "../Styles/Errores.css";
import { useState } from "react";

export default function Nomina(){

    const {nomina} = usePage().props;

    const [fecha_inicio, setFechaInicio] = useState("");
    const [fecha_fin, setFechaFin] = useState("")
    const [errores, setErrores] = useState("");

    const validar = () =>{

        const nuevosErrores = {}

        if(!fecha_inicio.trim()){
            nuevosErrores.fecha_inicio = "Debe seleccionar una fecha de inicio";
        }

        if(!fecha_fin.trim()){
            nuevosErrores.fecha_fin = "Debe seleccionar una fecha de fin";
        }

        return nuevosErrores;
    }

    const handleBuscar = (e) =>{

        e.preventDefault();

        const erroresValidacion = validar();

        if(Object.keys(erroresValidacion).length > 0){
            setErrores(erroresValidacion);
            return;
        }

        setErrores({});

        router.get('/nomina', {
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
        });
    }

    const handleLimpiarCampos = () =>{
        router.get('/nomina', {}, {replace: true})
    }

    return(
        <>
            <div className="buscadorfechanomina">
                <form onSubmit={handleBuscar}>
                    <label htmlFor="fechaInicio">Fecha Inicio</label>
                    <input type="date" 
                            id="fechaInicio"
                            onChange={(e)=>setFechaInicio(e.target.value)}
                            />

                    {errores.fecha_inicio && <span className="mensajeError">{errores.fecha_inicio}</span>}

                    <label htmlFor="fechaFin">Fecha Fin</label>
                    <input type="date" 
                            id="fechaFin"
                            onChange={(e)=>setFechaFin(e.target.value)}
                            />
                    
                    {errores.fecha_fin && <span className="mensajeError">{errores.fecha_fin}</span>}

                    <button type="submit">Buscar</button>

                    <button type="button" onClick={handleLimpiarCampos}>Cancelar</button>
                </form>
            </div>


            <div className="tablaNomina">
                <table>
                    <thead>
                        <tr>
                            <th>Fecha nomina</th>
                            <th>Nomina</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            nomina.map((dato)=>(
                                <tr>
                                    <td>{dato.fecha_nomina}</td>

                                    <td><a href={dato.nomina} download>Descargar</a></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}