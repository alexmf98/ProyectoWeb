import { router, usePage } from "@inertiajs/react";
import "../Styles/ImagenProyecto.css";
import "../Styles/Errores.css";
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

    const [errores, setErrores] = useState("");

    const [id, setId] = useState("");

    const validarDescripcion = () => {
        const nuevosErrores = {};
    
        if(!descripcion.trim()){
            nuevosErrores.descripcion = "La descripcion no puede estar vacia";
        }
    
        return nuevosErrores;
    }

    const validarNuevaDescripcion = () => {
        const nuevosErrores = {};
    
        if(!nuevadescripcion.trim()){
            nuevosErrores.descripcion = "La descripcion no puede estar vacia";
        }
    
        return nuevosErrores;
    }
    
    const validarCertificado = () => {
        const nuevosErrores = {};
    
        if(!fechaCertificado){
            nuevosErrores.fechaCertificado = "Debe de seleccionar una fecha";
        }
    
        if(!certificado){
            nuevosErrores.certificado = "Seleccione un certificado";
        }else if(!/\.(pdf)$/i.test(certificado.name)){
            nuevosErrores.certificado = "Formato valido pdf";
        }
    
        return nuevosErrores;
    }

    const handleEliminar = (id) => {
        let confirmar = confirm("Desea eliminar la imagen");

        if(confirmar){
            router.delete(`/eliminarImagen/${id}`)
        }
    }

    const handleLimpiarCampos = () => {
        setVerDescripcion(false);
        setDescripcion("");
        setNuevaDescripcion("");
        setEditarDescripcion(false);
        setVer(false);
        setFechaCertificado("");
        setErrores({});
        setFormKey(prev => prev + 1);
    }

    const handleAñadir = (id) => {
        setId(id);
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

        const erroresValidacion = validarDescripcion();

        if(Object.keys(erroresValidacion).length > 0){
            setErrores(erroresValidacion);

            return
        }

        setErrores({});

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

        const erroresValidacion = validarNuevaDescripcion();

        if(Object.keys(erroresValidacion).length > 0){
            setErrores(erroresValidacion);

            return
        }

        setErrores({});

        router.put(`/editarimagen/${id}`, {
            descripcion: nuevadescripcion,
        });

        handleLimpiarCampos();
    }

    // const handleAceptarCertificado = (id) => {
    //     setId(id)
    // }

    const handleCertificado = (e) => {

        e.preventDefault();

        const erroresValidacion = validarCertificado();

        if(Object.keys(erroresValidacion).length > 0){
            setErrores(erroresValidacion);

            return
        }

        setErrores({});

        router.post(`/crearcertificado`, {
            fecha_certificado: fechaCertificado,
            certificado: certificado,
            proyecto_imagen_id: id,
        });


        handleLimpiarCampos();
    }

    const hayCertificados = imagenes.some(
        (img) => img.certificados.length > 0
    );
    
    return (
        <>
            <h1>{proyecto.nombre}</h1>
       
            {
                isAdmin && 
                    <div className="btnAñadirCertificado">
                        

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

                                {errores.fechaCertificado && <span className="mensajeError">{errores.fechaCertificado}</span>}

                                <label>Archivo</label>
                                <input type="file"
                                    onChange={(e) => setCertificado(e.target.files[0])}
                                />

                                {errores.certificado && <span className="mensajeError">{errores.certificado}</span>}

                                <div className="botonesFormImagen">
                                    <button type="submit">
                                        Aceptar
                                    </button>

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
                    />

                    {errores.descripcion && <span className="mensajeError">{errores.descripcion}</span>}

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
                    />

                    {errores.descripcion && <span className="mensajeError">{errores.descripcion}</span>}

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

                                        <button
                                            onClick={() => handleAñadir(img.id)}
                                        >
                                            Añadir certificado
                                        </button>
                                    </>
                                }

                            </div>

                        </div>

                    </div>
                ))}
            </div>
        
        {
            hayCertificados &&
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
        }
            
        </>
    )
}