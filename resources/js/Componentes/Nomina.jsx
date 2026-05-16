import { usePage } from "@inertiajs/react"
import "../Styles/Nomina.css";

export default function Nomina(){

    const {nomina} = usePage().props;

    return(
        <>
            <h1>Nomina</h1>

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