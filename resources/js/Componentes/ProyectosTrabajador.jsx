import { usePage } from "@inertiajs/react"
import "../Styles/ProyectosTrabajador.css";

export default function ProyectosTrabajador(){

    const {proyectos} = usePage().props;

    console.log(proyectos)
    return(
        <>
            <div className="tarjetaProyectoTrabajador">
                <table>
                    <thead>
                        <tr>
                            <th>
                                Proyectos participante
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            proyectos.map((dato)=>(
                                <tr>
                                    <td>{dato.proyecto.nombre}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}