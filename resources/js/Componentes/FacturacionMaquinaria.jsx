import { router, usePage } from "@inertiajs/react"
import "../Styles/FacturaMaquina.css";
import { useState } from "react";

export default function FacturacionMaquinaria() {

    const { historial } = usePage().props;
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");


    function handleSumaCoste() {

        let total = 0;

        historial.map((dato) => (
            total += Number(dato.coste)
        ))

        return total;
    }

    const handleFacturacion = (e)=>{

        e.preventDefault();
        
        router.get('/facturamaquinaria',{
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin,
        })
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

                    <label>Fecha Fin</label>
                    <input type="date"
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                    />


                    <button>Buscar</button>
                </form>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Nombre maquina</th>
                        <th>Coste</th>
                        <th>Fecha Alquiler</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        historial.map((dato) => (

                            <tr>
                                <td>{dato.maquinaria.nombre}</td>

                                <td>{dato.coste} €</td>

                                <td>
                                    {dato.fecha_inicio} / {dato.fecha_fin}
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


        </>
    )
}