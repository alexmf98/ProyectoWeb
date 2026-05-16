import { router, usePage } from "@inertiajs/react"
import "../Styles/ProyectoSolicitado.css";
import { useState } from "react";

export default function ProyectoSolicitadoAdmin() {

    const { proyectoSolicitado } = usePage().props;

    const [ver, setVer] = useState(false);
    const [id, setId] = useState(null);
    const [file, setFile] = useState("");

    const handleAceptar = (id) => {
        setVer(true);
        setId(id);
    }

    const handleCancelarPresupuesto = () => {
        setVer();
    }

    const handlePresupuesto = (e) => {

        e.preventDefault();

        router.put(`/proyectosSolicitados/${id}`, {
            presupuesto: file,
            estado: 'enviado',
        });
    }

    const handleCancelar = (e) => {

        e.preventDefault();

        router.put(`/proyectosSolicitados/${id}`, {
            estado: 'rechazado',
        });
    }

    return (
        <>
            <h1>Proyecto solicitado</h1>

            <div className="tabla-container">
                <table>
                    <thead>
                        <tr>
                            <th>
                                Email de contacto
                            </th>
                            <th>
                                Tipo de obra
                            </th>
                            <th>
                                Presupuesto
                            </th>
                            <th>
                                Estado
                            </th>
                            <th>
                                Usuario
                            </th>
                            <th colSpan={2}>
                                Accion
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            proyectoSolicitado.map((dato) => (

                                <tr>
                                    
                                    <td>
                                        {dato.email}
                                    </td>
                                    <td>
                                        {dato.tipo}
                                    </td>
                                    <td>
                                        <a href={dato.presupuesto_url} download>Descargar</a>
                                    </td>
                                    <td>
                                        {dato.estado === 'enviado' ? dato.estado : dato.estado}
                                    </td>
                                    <td>
                                        {dato.user.name + " " + dato.user.apellido}
                                    </td>
                                    
                                    <td className={dato.estado === 'aceptado' ? 'fila-deshabilitada' : ""}>

                                        <button className={dato.estado === 'rechazado' ? 'boton-desabilitado' : ""}
                                            onClick={() => handleAceptar(dato.id)}>Aceptar o Añdir proyecto</button>

                                    </td>
                                    
                                    <td>
                                        <form onSubmit={handleCancelar}>

                                            <button onClick={() => setId(dato.id)}>Cancelar</button>
                                        </form>
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <div>
                {
                    ver &&

                    <div className="formularioPresupuesto">
                        <form onSubmit={handlePresupuesto}>

                            <label htmlFor="presupuesto">Presupuesto</label>
                            <input type="file" onChange={(e) => setFile(e.target.files[0])} />

                            <button type="submit">Enviar</button>
                            <button onClick={handleCancelarPresupuesto}>Cancelar</button>
                        </form>
                    </div>
                }
            </div>
        </>
    )
}