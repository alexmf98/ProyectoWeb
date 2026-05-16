import { usePage } from "@inertiajs/react"
import "../Styles/FacturaMaquina.css";

export default function FacturacionMaquinaria(){

    const {historial} = usePage().props;



    function handleSumaCoste(){

        let total = 0;

        historial.map((dato)=>(
            total += Number(dato.coste)
        ))

        return total;
    }

    return(
        <>
            <div className="fechaMaquinaria">
                <form>
                    <label>Fecha inicio</label>
                    <input type="date" />

                    <label>Fecha fin</label>
                    <input type="date" />

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
                       historial.map((dato)=>(
                           
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