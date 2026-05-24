import { router, usePage } from "@inertiajs/react"
import "../Styles/ProyectoSolicitado.css";
import "../Styles/Errores.css";
import { useMemo, useState } from "react";

export default function ProyectoSolicitadoAdmin() {

    const { proyectoSolicitado } = usePage().props;
    // const {usuarios } = usePage().props;

    const [ver, setVer] = useState(false);
    const [id, setId] = useState(null);
    const [file, setFile] = useState("");
    const [verProyecto, setVerProyecto] = useState(false);
    const [user_id, setUserId] = useState(null);
    const [nombre, setNombre] = useState("");
    const [coste, setCoste] = useState(0);
    const [localizacion, setLocalizacion] = useState("");
    const [imagen, setImagen] = useState("");
    const [errores, setErrores] = useState({});
    const [filtroNombre, setFiltroNombre] = useState("");
    const [filtroEstado, setFiltroEstado] = useState("");

    const proyectosFiltrados = useMemo(() => {
        return proyectoSolicitado.filter((dato) => {
            const nombreCompleto = `${dato.user.name} ${dato.user.apellido}`.toLowerCase();
            const coincideNombre = filtroNombre === "" || nombreCompleto.includes(filtroNombre.toLowerCase());
            const coincideEstado = filtroEstado === "" || dato.estado === filtroEstado;
            return coincideNombre && coincideEstado;
        });
    }, [proyectoSolicitado, filtroNombre, filtroEstado]);

    const handleLimpiarFiltros = () => {
        setFiltroNombre("");
        setFiltroEstado("");
    };

    const [nombreUsuario, setNombreUsuario] = useState("");

    const validarPresupuesto = () => {
        const nuevosErrores = {};

        if (!file) {
            nuevosErrores.file = "Debe seleccionar un archivo";
        } else if (!/\.(pdf)$/i.test(file.name)) {
            nuevosErrores.file = "Solo se admite formato pdf";
        }

        return nuevosErrores;
    }

    const handlelimpiarCampos = () => {
        setNombre("");
        setCoste(0);
        setLocalizacion("");
        setImagen("");
        setUserId(null);
        setVerProyecto(false);
        setFile("");
        setVer(false);
    }

    const handleAceptar = (id) => {
        setVer(true);
        setId(id);
    }

    const handleAceptarProyecto = (nombreusuario, id) => {
        setVerProyecto(true);
        setNombreUsuario(nombreusuario)
        setUserId(id);
    }

    const handleCancelarPresupuesto = () => {
        setVer();
        setErrores({});
    }

    const handlePresupuesto = (e) => {

        e.preventDefault();

        const erroresValidacion = validarPresupuesto();

        if (Object.keys(erroresValidacion).length > 0) {
            setErrores(erroresValidacion);
            return;
        }

        setErrores({});

        router.put(`/proyectosSolicitados/${id}`, {
            presupuesto: file,
            estado: 'enviado',
        });

        handlelimpiarCampos();
    }

    const handleCancelar = (e) => {

        e.preventDefault();

        router.put(`/proyectosSolicitados/${id}`, {
            estado: 'rechazado',
        });
    }

    const handleAñadirProyecto = (e) => {

        e.preventDefault();

        const newFormData = new FormData();

        newFormData.append("user_id", user_id);
        newFormData.append("nombre", nombre);
        newFormData.append("coste", coste);
        newFormData.append("localizacion", localizacion);
        newFormData.append("imagen", imagen);
        newFormData.append("categoria", 'personal');


        router.post('/añadirproyecto', newFormData);

        handlelimpiarCampos();
    }

    return (
        <>
            <div className="filtrosProyectoSolicitado">
                <input
                    type="text"
                    placeholder="Buscar por usuario..."
                    value={filtroNombre}
                    onChange={(e) => setFiltroNombre(e.target.value)}
                />
                <select
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                >
                    <option value="">Todos los estados</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="aceptado">Aceptado</option>
                    <option value="rechazado">Rechazado</option>
                    <option value="realizado">Realizado</option>
                </select>
                <button type="button" onClick={handleLimpiarFiltros}>
                    Limpiar filtros
                </button>
            </div>

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
                                Estado
                            </th>
                            <th>
                                Usuario
                            </th>
                            <th colSpan={4}>
                                Accion
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {proyectosFiltrados.length > 0
                            ? proyectosFiltrados.map((dato, index) => (
                                <tr key={index}>
                                    <td data-label="Email">{dato.email}</td>
                                    <td data-label="Tipo">{dato.tipo}</td>
                                    <td data-label="Estado">{dato.estado}</td>
                                    <td data-label="Nombre Apellido">{dato.user.name + " " + dato.user.apellido}</td>

                                    <td data-label="Ver proyecto">
                                        {dato.estado === 'realizado' && dato.proyecto_id &&
                                            <button onClick={() => router.get(`/proyectoPersonalAdm`, { proyecto_id: dato.proyecto_id })}>
                                                Ver proyecto
                                            </button>
                                        }
                                    </td>

                                    <td data-label="Añadir">
                                        {dato.estado === 'aceptado' &&
                                            <button onClick={() => handleAceptarProyecto(dato.user.name, dato.user.id)}>
                                                Añadir Proyecto
                                            </button>
                                        }
                                        {dato.estado === 'pendiente' &&
                                            <button onClick={() => handleAceptar(dato.id)}>
                                                Añadir Presupuesto
                                            </button>
                                        }
                                    </td>

                                    <td data-label="Descarga">
                                        {dato.presupuesto_url &&
                                            <a className="btnDescargar" href={dato.presupuesto_url} download>
                                                Descargar
                                            </a>
                                        }
                                    </td>

                                    <td data-label="Cancelar">
                                        <form onSubmit={handleCancelar}>
                                            {dato.estado !== 'realizado' &&
                                                <button
                                                    className={dato.estado === 'rechazado' ? 'boton-desabilitado' : ""}
                                                    onClick={() => setId(dato.id)}
                                                >
                                                    Cancelar
                                                </button>
                                            }
                                        </form>
                                    </td>
                                </tr>
                            ))
                            : <tr><td colSpan={8}>No se encontraron resultados</td></tr>
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

                            {errores.file && <span className="mensajeError">{errores.file}</span>}

                            <button type="submit">Enviar</button>
                            <button onClick={handleCancelarPresupuesto}>Cancelar</button>
                        </form>
                    </div>
                }
            </div>

            <div className="formularioProyecto">
                {
                    verProyecto &&
                    <form onSubmit={handleAñadirProyecto}>

                        <h3>Proyecto para {nombreUsuario}</h3>

                        <label htmlFor="nombre">Nombre Proyecto</label>
                        <input type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            id="nombre" />

                        <label htmlFor="coste">Coste</label>
                        <input type="number"
                            id="coste"
                            value={coste}
                            onChange={(e) => setCoste(e.target.value)}
                        />

                        <label htmlFor="localizacion">Localización</label>
                        <input type="text"
                            id="localizacion"
                            value={localizacion}
                            onChange={(e) => setLocalizacion(e.target.value)}
                        />

                        <label htmlFor="imagen">Imagen</label>
                        <input type="file"
                            id="imagen"
                            onChange={(e) => setImagen(e.target.files[0])}
                        />

                        <button className="btnAceptarProyecto"
                            type="submit">
                            Aceptar
                        </button>

                        <button className="btnCancelarProyecto"
                            onClick={handlelimpiarCampos}
                        >

                            Cancelar

                        </button>

                    </form>
                }
            </div>
        </>
    )
}