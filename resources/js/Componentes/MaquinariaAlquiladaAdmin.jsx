import { router, usePage } from "@inertiajs/react"
import "../Styles/AlquiladaAdmin.css";
import { useMemo, useState } from "react";

export default function MaquinariaAlquiladaAdmin() {

    const { alquileres } = usePage().props;

    const [historial_id, setHistorialId] = useState("");

    const [filtro, setFiltro] = useState("");

    const hoy = new Date();
    hoy.setHours(0,0,0,0);

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

    const alquileresFiltrados = useMemo(() => {
        if(!filtro) return alquileres;

        return alquileres.filter(dato =>
            dato.maquinaria.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
            dato.user.name.toLowerCase().includes(filtro.toLowerCase()) ||
            dato.user.apellido.toLowerCase().includes(filtro.toLowerCase()) ||
            (dato.is_cancelled ? 'cancelado' : 'alquilado').includes(filtro.toLowerCase()) ||
            transformarFecha(dato.fecha_inicio).includes(filtro) ||
            transformarFecha(dato.fecha_fin).includes(filtro)
        );
    }, [alquileres, filtro]);

    const capitalizar = (str) => {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    return (
        <>
            <div className="buscadorAlquiladaAdmin">
                <input
                    type="text"
                    placeholder="Buscar por máquina, usuario, estado o fecha"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                />
            </div>
            <div className="tablaEditAlquiladaAdmin">
                <table>
                    <thead>
                        <tr>
                            <th>
                                Nombre maquina
                            </th>
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
                            alquileresFiltrados.map((dato)=>(
                                <tr key={dato.id}>
                                    <td data-label="Nombre maquina">
                                        {dato.maquinaria.nombre}
                                    </td>
                                    <td data-label="Fecha inicio">
                                        {transformarFecha(dato.fecha_inicio)}
                                    </td>
                                    <td data-label="Fecha fin">
                                        {transformarFecha(dato.fecha_fin)}
                                    </td>
                                    <td data-label="Coste">
                                        {dato.coste} €
                                    </td>
                                    <td data-label="Estado">
                                        {dato.is_cancelled ? 'Cancelado' : 'Alquilado'}
                                    </td>
                                    <td data-label="Nombre">
                                        {capitalizar(dato.user.name)}
                                    </td>
                                    <td data-label="Apellido">
                                        {capitalizar(dato.user.apellido)}
                                    </td>
                                    {!dato.is_cancelled && new Date(dato.fecha_fin) >= hoy
                                    ? <td>
                                        <form onSubmit={handleCancelar}>
                                            <button type="submit" onClick={() => setHistorialId(dato.id)}>
                                                Cancelar
                                            </button>
                                        </form>
                                    </td>
                                    : <td></td> 
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