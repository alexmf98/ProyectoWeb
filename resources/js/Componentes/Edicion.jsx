import { router, usePage } from "@inertiajs/react"
import AñadirEmpresaColaboradora from "../Componentes/AñadirEmpresaColaboradora";

import "../Styles/Edicion.css";
import InformacionEmpresa from "./InformacionEmpresa";

export default function Edicion() {

    const { proyecto } = usePage().props;

    const handleShowImagen = (e, id) => {

        e.preventDefault();

        router.put(`/mostrarimagen/${id}`, {
            show_home: true,
        });
    }

    const handleOcultarImagen = (e, id) => {

        e.preventDefault();

        router.put(`/mostrarimagen/${id}`, {
            show_home: false,
        });
    }

    return (
        <>

            <div className="edicionContainer">
                <h1>Proyectos realizados</h1>

                <div className="tablaEdicion">
                    <table>
                        <thead> 
                            <tr>
                                <th>Nombre Proyecto</th>
                                <th>Localizacion</th>
                                <th colSpan={2}>Mostrar(seleccionar máximo 3)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {proyecto.map((dato) => (
                                <tr key={dato.id}>
                                    <td data-label="Nombre">{dato.nombre}</td>
                                    <td data-label="Localización">{dato.localizacion}</td>
                                    <td>
                                        <button className="btnMostrar" onClick={(e) => handleShowImagen(e, dato.id)}>
                                            Mostrar
                                        </button>
                                    </td>
                                    {dato.show_home && (
                                        <td>
                                            <button className="btnOcultar" onClick={(e) => handleOcultarImagen(e, dato.id)}>
                                                Ocultar
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <AñadirEmpresaColaboradora />

                <InformacionEmpresa />

            </div>            
        </>
    )
}