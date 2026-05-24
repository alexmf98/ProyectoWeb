import { router, usePage } from "@inertiajs/react"
import "../Styles/FacturaMaquina.css";
import "../Styles/Errores.css";
import { useState } from "react";

export default function FacturacionMaquinaria() {

    const { historial } = usePage().props;
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [errores, setErrores] = useState({});

    const validarBuscador = () => {
        const nuevosErrores = {};
    
        if(!fechaInicio){
            nuevosErrores.fechaInicio = "Debe seleccionar una fecha de inicio";
        }
    
        if(!fechaFin){
            nuevosErrores.fechaFin = "Debe seleccionar una fecha de fin";
        }

        return nuevosErrores;
    }

    function handleSumaCoste() {

        let total = 0;

        historial.map((dato) => (
            total += Number(dato.coste)
        ))

        return total;
    }

    const handleFacturacion = (e)=>{

        e.preventDefault();

        const erroresValidacion = validarBuscador();

        if(Object.keys(erroresValidacion).length > 0){
            setErrores(erroresValidacion);
            return;
        }

        setErrores({});
        
        router.get('/facturamaquinaria',{
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin,
        })
    }

    const handleLimpiarCampos = () =>{
        router.get('/facturamaquinaria', {}, {replace: true})
    }

    return (
        <>
            <div className="fechaMaquinaria">
                <form onSubmit={handleFacturacion}>
                    <label>Fecha inicio</label>
                    <input type="date"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                    />

                {errores.fechaInicio && <span className="mensajeError">{errores.fechaInicio}</span>}

                    <label>Fecha Fin</label>
                    <input type="date"
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                    />
                
                {errores.fechaFin && <span className="mensajeError">{errores.fechaFin}</span>}


                    <button>Buscar</button>

                    <button type="button" onClick={handleLimpiarCampos}>Cancelar</button>
                </form>
            </div>

            <div className="tablafacturamaquinaria">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre maquina</th>
                            <th>Coste</th>
                            <th>Fecha Alquiler</th>
                            <th>Cliente</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            historial.map((dato) => (

                                <tr>
                                    <td data-label="Nombre maquina">{dato.maquinaria.nombre}</td>

                                    <td data-label="Coste">{dato.coste} €</td>

                                    <td data-label="Fecha">
                                        {dato.fecha_inicio} - {dato.fecha_fin}
                                    </td>
                                    <td>
                                        {dato.user.name} {dato.user.apellido}
                                    </td>
                                </tr>
                            ))
                        }
                        <tr>
                            <td></td>
                            <td>Total: {handleSumaCoste()} €</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </>
    )
}