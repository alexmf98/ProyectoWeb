import { router, usePage } from "@inertiajs/react";
import "../Styles/ProyectoSolicitado.css";
import { useState } from "react";

export default function ProyectosSolicitados(){

    const {proyecto} = usePage().props;
    const [id, setId] = useState(null);

    const handleAceptar = (e)=>{
        e.preventDefault();

        router.put(`/proyectosSolicitados/${id}`,{
            estado: 'aceptado',
        }); 
    }

    const handleCancelar = (e)=>{
        e.preventDefault();

        router.put(`/proyectosSolicitados/${id}`,{
            estado: 'rechazado',
        }); 
    }
    
    return(
        <>
            <div className="tabla-container">
                <table>
                    <thead>
                        <tr>
                            <th>
                                Email de contacto
                            </th>

                            <th>
                                Tipo
                            </th>

                            <th>
                                Estado
                            </th>

                            <th>
                                Presupuesto
                            </th>

                            <th colSpan={2}>
                                Accion
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            proyecto.map((dato)=>(
                                <tr className={ dato.estado === "rechazado" ? "fila-deshabilitada" : ""}>
                                    
                                    <td>
                                        {dato.email}
                                    </td>

                                    <td>
                                        {dato.tipo}
                                    </td>

                                    <td>
                                        {dato.estado === 'enviado' ? 'aceptado' : dato.estado}
                                    </td>

                                    <td>
                                        {
                                            dato.estado !== 'pendiente' &&
                                                <a href={dato.presupuesto} download>Descargar</a>
                                        }
                                    </td>
                                    
                                    {
                                        dato.estado !== "realizado" &&
                                        <>
                                            <td>
                                                {
                                                    dato.estado !== 'pendiente' &&
                                                        <form onSubmit={handleAceptar}>
                                                        
                                                            <button className={dato.estado === "aceptado" ? "fila-deshabilitada" : ""}
                                                                onClick={()=>setId(dato.id)}>
                                                                Aceptar
                                                            </button>
                                                        
                                                        </form>
                                                }

                                            </td>

                                            <td>
                                                <form onSubmit={handleCancelar}>

                                                    <button
                                                        onClick={()=>setId(dato.id)}>
                                                        Cancelar
                                                    </button>
                                                
                                                </form>
                                            </td>
                                        </>
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}