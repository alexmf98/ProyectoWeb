import { router, usePage } from "@inertiajs/react"
import "../Styles/Nomina.css";
import { useState } from "react";

export default function Nomina(){

    const {nomina} = usePage().props;

    const [fecha_inicio, setFechaInicio] = useState("");
    const [fecha_fin, setFechaFin] = useState("")

    const handleBuscar = (e) =>{

        e.preventDefault();

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

                    <label htmlFor="fechaFin">Fecha Fin</label>
                    <input type="date" 
                            id="fechaFin"
                            onChange={(e)=>setFechaFin(e.target.value)}
                            />

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