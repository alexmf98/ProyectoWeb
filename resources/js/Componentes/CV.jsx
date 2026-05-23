import { router, usePage } from "@inertiajs/react"
import "../Styles/Cv.css";

export default function CV(){

    const {cv} = usePage().props;

    const handleEliminar = (e, id) =>{

        e.preventDefault();

        let confirmar = confirm("Desea eliminar el curriculum vitae de este usuario");

        if(confirmar){
            router.delete(`/eliminarcv/${id}`);
        }
    }

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

                            <th>
                                Accion
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                cv.map((dato)=>(
                                    <tr>
                                        <td data-label="Email">{dato.email}</td>

                                        <td data-label="CVitae">
                                            <a href={dato.cv} download>Descargar</a>
                                        </td>

                                        <td>
                                            <button
                                                type="button"
                                                onClick={(e)=>handleEliminar(e, dato.id)}
                                            >   
                                            
                                                Eliminar

                                            </button>
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