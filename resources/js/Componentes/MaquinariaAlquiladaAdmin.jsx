import { router, usePage } from "@inertiajs/react"
import "../Styles/AlquiladaAdmin.css";
import { useState } from "react";

export default function MaquinariaAlquiladaAdmin() {

    const { alquileres } = usePage().props;

    const [historial_id, setHistorialId] = useState("");

    const transformarFecha = (fecha)=>{
        const f = new Date(fecha);

        const dia = f.getDate();
        const mes = f.getMonth() + 1;
        const anio = f.getFullYear();

        return dia + "/" + mes + "/" + anio
    }

    const handleCancelar = (e)=>{
        e.preventDefault();
        
        router.put(`/cancelarAlquilerAdmin/${historial_id}`,{
            is_cancelled: true,
        });
    }


    return (
        <>
            <div className="tablaEditAlquiladaAdmin">
                <table>
                    <thead>
                        <tr>
                            <th>
                                Fecha Inicio
                            </th>
                            <th>
                                Fecha Fin
                            </th>
                            <th>
                                Coste
                            </th>
                            <th>
                                Estado
                            </th>
                            <th>
                                Nombre
                            </th>
                            <th>
                                Apellido
                            </th>
                            <th>
                                Accion
                            </th>
                        </tr>
                       
                    </thead>
                    <tbody>
                        {
                            alquileres.map((dato)=>(
                                <tr>
                                    <td>
                                        {transformarFecha(dato.fecha_inicio)}
                                    </td>
                                    <td>
                                        {transformarFecha(dato.fecha_fin)}
                                    </td>
                                    <td>
                                        {dato.coste} €/dia
                                    </td>
                                    <td>
                                        {dato.is_cancelled ? 'Cancelado' : 'Alquilado'}
                                    </td>
                                    <td>
                                        {dato.user.name}
                                    </td>
                                    <td>
                                        {dato.user.apellido}
                                    </td>
                                    {
                                        !dato.is_cancelled &&
                                        <td>
                                            <form onSubmit={handleCancelar}>

                                                <button type="submit"
                                                    onClick={()=>setHistorialId(dato.id)}
                                                >
                                                    Cancelar
                                                
                                                </button>
                                            </form>
                                        </td>
                                    }
                                </tr>
                            ))
                        }

                    </tbody>
                </table>

            </div>
        </>
    )
}