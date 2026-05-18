import { router, usePage } from "@inertiajs/react";
import "../Styles/ImagenProyecto.css";
import { useAuth } from "../Hooks/useAuth";
import { useState } from "react";
export default function ImagenProyecto() {


    const { proyecto, imagenes } = usePage().props;
    const { isAdmin } = useAuth();
    const [ver, setVer] = useState(false);
    const [verDescripcion, setVerDescripcion] = useState(false);
    const [descripcion, setDescripcion] = useState("");
    const [nuevadescripcion, setNuevaDescripcion] = useState("");
    const [editarDescripcion, setEditarDescripcion] = useState(false);
    const [certificado, setCertificado] = useState("");
    const [fechaCertificado, setFechaCertificado] = useState("");
    const [formKey, setFormKey] = useState(0);

    const [id, setId] = useState("");

    const handleEliminar = (id) => {
        router.delete(`/eliminarImagen/${id}`)
    }

    const handleLimpiarCampos = () => {
        setVerDescripcion(false);
        setDescripcion("");
        setNuevaDescripcion("");
        setEditarDescripcion(false);
        setVer(false);
        setFechaCertificado("");
        setFormKey(prev => prev + 1);
    }

    const handleAñadir = () => {
        setVer(true);
    }

    const handleAñadirDescripcion = (id) => {
        setVerDescripcion(true);
        setId(id);
    }

    const ocultar = () => {
        setVer(false)
        setVerDescripcion(false);
        handleLimpiarCampos()
    }

    const handleEditarImagen = (e) => {

        e.preventDefault();

        router.put(`/editarimagen/${id}`, {
            descripcion: descripcion,
        });

        handleLimpiarCampos();
    }

    const handleEditarDescripcion = (id, descripcion) => {
        setId(id);
        setNuevaDescripcion(descripcion);
        setEditarDescripcion(true)
    }

    const handleNuevaDescripcion = (e) => {

        e.preventDefault();

        router.put(`/editarimagen/${id}`, {
            descripcion: nuevadescripcion,
        });

        handleLimpiarCampos();
    }

    const handleAceptarCertificado = (id) => {
        setId(id)
    }

    const handleCertificado = (e) => {

        e.preventDefault();

        router.post(`/crearcertificado`, {
            fecha_certificado: fechaCertificado,
            certificado: certificado,
            proyecto_imagen_id: id,
        });

        handleLimpiarCampos();
    }

    return (
        <>
            <h1>{proyecto.nombre}</h1>

            {
                isAdmin && 
                    <div className="btnAñadirCertificado">
                        <button onClick={handleAñadir}>Añadir Certificado</button>

                        {
                            ver &&
                            <form key={formKey} className="formularioImagenProyecto"
                                onSubmit={handleCertificado}
                            >
                                <label>Fecha</label>
                                <input type="date"
                                    value={fechaCertificado}
                                    onChange={(e) => setFechaCertificado(e.target.value)}
                                />

                                <label>Archivo</label>
                                <input type="file"
                                    onChange={(e) => setCertificado(e.target.files[0])}
                                />

                                <div className="botonesFormImagen">
                                    {
                                        imagenes.map((dato) => (

                                            <button type="submit"
                                                onClick={() => handleAceptarCertificado(dato.id)}
                                            >
                                                Aceptar
                                            </button>
                                        ))
                                    }
                                    <button type="button" onClick={ocultar}>Cancelar</button>
                                </div>
                            </form>
                        }
                    </div>
            }


            {
                verDescripcion &&
                <form className="formularioImagenDescripcion"
                    onSubmit={handleEditarImagen}
                >
                    <label htmlFor="descripcion">Descripcion</label>

                    <textarea id="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    >

                    </textarea>

                    <div className="botonesDescripcion">
                        <button type="submit">
                            Aceptar
                        </button>

                        <button type="button" onClick={ocultar}>
                            Cancelar
                        </button>
                    </div>
                </form>
            }

            {
                editarDescripcion &&
                <form className="formularioImagenDescripcion"
                    onSubmit={handleNuevaDescripcion}
                >
                    <label htmlFor="descripcion">Descripcion</label>

                    <textarea id="descripcion"
                        value={nuevadescripcion}
                        onChange={(e) => setNuevaDescripcion(e.target.value)}
                    >

                    </textarea>

                    <div className="botonesDescripcion">
                        <button type="submit">
                            Aceptar
                        </button>

                        <button type="button" onClick={ocultar}>
                            Cancelar
                        </button>
                    </div>
                </form>
            }

            <div className="galeria-imagenes">
                {imagenes.map((img) => (
                    <div key={img.id} className="tarjetaImagen">

                        <div className="tarjetaImagen-inner">

                            <div className="tarjetaImagen-front">
                                <img src={img.url} alt={proyecto.nombre} />
                            </div>

                            <div className="tarjetaImagen-back">

                                <label>Descripcion</label>
                                <p>
                                    {img.descripcion || "Sin descripción"}
                                </p>

                                {
                                    isAdmin &&
                                    <>
                                        <button onClick={() => handleEliminar(img.id)}>
                                            Eliminar
                                        </button>

                                        <button
                                            className="btnAñadirDescrip"
                                            onClick={() => handleAñadirDescripcion(img.id)}
                                        >
                                            Añadir descripción
                                        </button>

                                        <button onClick={() => handleEditarDescripcion(img.id, img.descripcion)}
                                        >
                                            Editar descripcion
                                        </button>
                                    </>
                                }

                            </div>

                        </div>

                    </div>
                ))}
            </div>

            <div className="tablaCertificados">
                <table>
                    <thead>
                        <tr>
                            <th>Fecha de certificacion</th>
                            <th>Certificado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            imagenes.map((img) => (

                                img.certificados.map((cert, index) => (

                                    <tr key={index}>
                                        <td>
                                            {cert.fecha_certificado}
                                        </td>

                                        <td>
                                            <a href={cert.certificado} download>
                                                Descargar
                                            </a>
                                        </td>
                                    </tr>

                                ))
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </>
    )
}