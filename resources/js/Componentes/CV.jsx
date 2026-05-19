import { router, usePage } from "@inertiajs/react"
import "../Styles/Cv.css";

export default function CV(){

    const {cv} = usePage().props;

    return(
        <>
            
            <div className="tablaCv">
                <table>
                    <thead>
                        <tr>
                            <th>
                                Email de contacto
                            </th>
                            <th>
                                CVitae
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                cv.map((dato)=>(
                                    <tr>
                                        <td>{dato.email}</td>

                                        <td>
                                            <a href={dato.cv} download>Descargar</a>
                                        </td>
                                    </tr>
                                ))
                            }
                    </tbody>
                </table>
            </div>
        </>
    )
}