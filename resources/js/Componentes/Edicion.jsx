import { router, usePage } from "@inertiajs/react"
import { useState } from "react";

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
            <h1>Edicion</h1>

            <h1>Proyectos realizados</h1>

            <table>
                <thead>
                    <tr>
                        <th>Nombre Proyecto</th>
                        <th>Localizacion</th>
                        <th>Mostrar(seleccionar máximo 3)</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        proyecto.map((dato) => (
                            <tr>
                                <td>{dato.nombre}</td>
                                <td>{dato.localizacion}</td>
                                <td>
                                    <form onSubmit={(e) => handleShowImagen(e, dato.id)}>

                                        <button type="submit">
                                            Mostrar
                                        </button>

                                    </form>
                                </td>
                                {
                                    dato.show_home &&
                                    <td>
                                        <form onSubmit={(e) => handleOcultarImagen(e, dato.id)}>

                                            <button type="submit">
                                                Ocultar
                                            </button>

                                        </form>
                                    </td>
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <h1>Empresas Colaboradoras</h1>

            <h1>Informacion de empresa</h1>
        </>
    )
}