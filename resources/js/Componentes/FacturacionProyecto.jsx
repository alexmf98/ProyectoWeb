import "../Styles/FacturaProyecto.css";
import "../Styles/Errores.css";
import { router, usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";

export default function FacturacionProyecto() {

    const { proyectos, facturacion } = usePage().props;

    const [fecha_facturacion, setFechaFacturacion] = useState("");
    const [factura, setFactura] = useState("");
    const [proyecto_id, setProyectoId] = useState(null);
    const [añadirFactura, setAñadirFactura] = useState(false); 
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [nuevaFactura, setNuevaFactura] = useState(false);
    const [nombreProyecto, setNombreProyecto] = useState("");
    const [nuevaFechaFactura, setNuevaFechaFactura] = useState("");
    const [filtroNombre, setFiltroNombre] = useState("");
    const [editar, setEditar] = useState(false);
    const [facturaEditar, setFacturaEditar] = useState("");

    const [errores, setErrores] = useState({});

    const facturacionFiltrada = useMemo(() => {
        if(!filtroNombre) return facturacion;
        return facturacion.filter(dato => 
            dato.proyecto_id.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
        );
    }, [facturacion, filtroNombre]);

    const validarBuscador = () => {
        const nuevosErrores = {};
    
        if(!fechaInicio){
            nuevosErrores.fechaInicio = "Debe seleccionar una fecha de inicio";
        }
    
        if(!fechaFin){
            nuevosErrores.fechaFin = "Debe seleccionar una fecha de fin";
        }
    
        if(fechaInicio && fechaFin && fechaInicio > fechaFin){
            nuevosErrores.fechaFin = "La fecha fin no puede ser anterior a la fecha inicio";
        }
    
        return nuevosErrores;
    }
    
    const validarFactura = () => {
        const nuevosErrores = {};
    
        if(!proyecto_id){
            nuevosErrores.proyecto_id = "Debe seleccionar un proyecto";
        }
    
        if(!fecha_facturacion){
            nuevosErrores.fecha_facturacion = "Debe seleccionar una fecha";
        }
    
        if(!factura){
            nuevosErrores.factura = "Debe seleccionar un archivo";
        }else if(!/\.(pdf)$/i.test(factura.name)){
            nuevosErrores.factura = "Solo se admite formato pdf";
        }
    
        return nuevosErrores;
    }

    const validarNuevaFactura = () =>{
        const nuevosErrores = {};

        if(!nuevaFechaFactura){
            nuevosErrores.nuevaFechaFactura = "Debe seleccionar una fecha";
        }

        if(!factura){
            nuevosErrores.factura = "Debe seleccionar un archivo";
        }else if(!/\.(pdf)$/i.test(factura.name)){
            nuevosErrores.factura = "Solo se admite formato pdf";
        }
    
        return nuevosErrores;
    }

    const validarFacturaEditada = () =>{
        const nuevosErrores = {};

        if(!nuevaFechaFactura){
            nuevosErrores.nuevaFechaFactura = "Debe seleccionar una fecha";
        }
    
        return nuevosErrores;
    }

    const handleLimpiarCampos = () =>{
        setFechaFacturacion("");
        setFactura("");
        setProyectoId(null);
        setAñadirFactura(false);
        setNuevaFactura(false);
        setNuevaFechaFactura("");
        setEditar(false)

        router.get('facturacionproyecto', {}, {replace: true})
    }

    const handleFactura = (e)=> {

        e.preventDefault();

        const erroresValidacion = validarFactura();

        if(Object.keys(erroresValidacion).length > 0){
            setErrores(erroresValidacion);
            return;
        }

        setErrores({});

        const formData = new FormData();

        formData.append('fecha_facturacion', fecha_facturacion);
        formData.append('factura', factura);
        formData.append('proyecto_id', proyecto_id);

        router.post('/facturacionproyecto', formData);

        handleLimpiarCampos();
    }

    const handleAñadirFactura = () => {
        setAñadirFactura(!añadirFactura);
    }
    
    const handleFacturacion = (e) =>{

        e.preventDefault();

        const erroresValidacion = validarBuscador();

        if(Object.keys(erroresValidacion).length > 0){
            setErrores(erroresValidacion);
            return;
        }

        setErrores({});
        
        router.get('/facturacionproyecto',{
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin,
        });
    }

    const handlesubir = () =>{

        window.scrollTo({top: 0, behavior: "smooth"});
    }
    const handleNuevaFactura = (id, nombreProyecto, factura)=>{
        setNuevaFactura(true);
        setProyectoId(id);
        setNombreProyecto(nombreProyecto);
        setFactura(factura);
        setEditar(false); 
        handlesubir()
    }

    const handleEnviarNuevaFactura = (e)=>{
        e.preventDefault();

        const erroresValidacion = validarNuevaFactura();

        if(Object.keys(erroresValidacion).length > 0){
            setErrores(erroresValidacion);
            return;
        }

        setErrores({});

        const formData = new FormData();

        formData.append('fecha_facturacion', nuevaFechaFactura);
        formData.append('factura', factura);
        formData.append('proyecto_id', proyecto_id);

        router.post('/facturacionproyecto', formData);

        handleLimpiarCampos();
    }
   
    const handleEditarNuevaFactura = (id, nombre,fecha_factura, factura) =>{
        setProyectoId(id);
        setNombreProyecto(nombre)
        const [dia, mes, año] = fecha_factura.split('/');
        setNuevaFechaFactura(`${año}-${mes}-${dia}`);
        setFacturaEditar(factura);
        setEditar(true);
        setNuevaFactura(false);
        handlesubir();
        setErrores({});
    }
    
    const handleEnviarEditarNuevaFactura = (e) =>{

        e.preventDefault();

        const erroresValidacion = validarFacturaEditada();

        if(Object.keys(erroresValidacion).length > 0){
            setErrores(erroresValidacion);
            return;
        }

        setErrores({});

        const formData = new FormData();

        if(facturaEditar instanceof File){
            formData.append('factura', facturaEditar);  
        }

        formData.append('fecha_facturacion', nuevaFechaFactura);
        formData.append('factura', facturaEditar);

        router.put(`/editarfactura/${proyecto_id}`, formData);

        handleLimpiarCampos();
    }

    const handleEliminar = (id) =>{
        const confirmar = confirm("Desea eliminar esta factura");

        if(confirmar){
            router.delete(`/eliminarfactura/${id}`);
        }
    }

    return (
        <>
            
            <div className="buscardorFecha">
                <form onSubmit={handleFacturacion}>

                    <label>Fecha inicio</label>
                    <input type="date"
                        value={fechaInicio}
                        onChange={(e)=>setFechaInicio(e.target.value)}
                    />
                    
                    {errores.fechaInicio && <span className="mensajeError">{errores.fechaInicio}</span>}
                    
                    <label>Fecha Fin</label>
                    <input type="date"
                        value={fechaFin}
                        onChange={(e)=>setFechaFin(e.target.value)}
                    />

                    {errores.fechaFin && <span className="mensajeError">{errores.fechaFin}</span>}

                    <button>Buscar</button>

                    <button type="button" onClick={handleLimpiarCampos}>Cancelar</button>
                </form>

                <input 
                    type="text"
                    placeholder="Buscar por proyecto..."
                    value={filtroNombre}
                    onChange={(e) => setFiltroNombre(e.target.value)}
                />
            </div>

            {
                nuevaFactura && 
                    <div  className="contenedorNuevaFactura">
                        <form
                            className="nuevafacturaProyecto" 
                            onSubmit={handleEnviarNuevaFactura}>
                            <label htmlFor="nombre">Nombre Proyecto</label>
                            <input type="text"
                                    value={nombreProyecto}
                            />

                            <label htmlFor="fecha">Fecha facturación</label>
                            <input type="date" 
                                    onChange={(e)=>setNuevaFechaFactura(e.target.value)}
                            />

                            {errores.nuevaFechaFactura && <span className="mensajeError">{errores.nuevaFechaFactura}</span>}


                            <label htmlFor="proyecto">Factura</label>
                            <input type="file" 
                                    onChange={(e)=>setFactura(e.target.files[0])}
                            />

                            {errores.factura && <span className="mensajeError">{errores.factura}</span>}


                            <button
                                type="submit"
                            >
                                Aceptar
                            </button>

                            <button
                                type="button"
                                onClick={handleLimpiarCampos}
                            >
                                Cancelar
                            </button>
                        </form>
                    </div>
            }

            {
                editar && 

                    <div  className="contenedorNuevaFactura">
                        <form
                            className="nuevafacturaProyecto" 
                            onSubmit={handleEnviarEditarNuevaFactura}>
                            <label htmlFor="nombre">Nombre Proyecto a editar</label>
                            <input type="text"
                                    value={nombreProyecto}
                            />

                            <label htmlFor="fecha">Fecha facturación</label>
                            <input type="date" 
                                    value={nuevaFechaFactura}
                                    onChange={(e)=>setNuevaFechaFactura(e.target.value)}
                            />

                            {errores.nuevaFechaFactura && <span className="mensajeError">{errores.nuevaFechaFactura}</span>}


                            <label htmlFor="proyecto">Factura</label>
                            <input type="file" 
                                    
                                    onChange={(e)=>setFacturaEditar(e.target.files[0])}
                            />


                            <button
                                type="submit"
                            >
                                Aceptar
                            </button>

                            <button
                                type="button"
                                onClick={handleLimpiarCampos}
                            >
                                Cancelar
                            </button>
                        </form>
                </div>
            }

            <div className="tablafacturaproyecto">
                
                    <table>
                        <thead>
                            <tr>
                                <th>Proyecto</th>
                                <th>Fecha Facturación</th>
                                <th>Factura</th>
                                <th colSpan={3}>Accion</th>
                            </tr>
                        </thead>

                        <tbody>
                        {facturacionFiltrada.map((dato, index) => {
                            const esPrimeroDelProyecto = facturacionFiltrada.findIndex(
                                d => d.proyecto_id.id === dato.proyecto_id.id
                            ) === index;

                            return (
                                <tr key={index}>
                                    <td>{dato.proyecto_id.nombre}</td>
                                    <td>{dato.fecha_facturacion}</td>
                                    <td>
                                        <a 
                                            className="btndescargarFactura"
                                            href={dato.factura} 
                                            download>
                                                Descargar
                                        </a>
                                    </td>
                                    
                                    <td>
                                        {esPrimeroDelProyecto &&
                                            <button
                                                className="btnAñadirNuevaFactura"
                                                type="button"
                                                onClick={() => handleNuevaFactura(
                                                    dato.proyecto_id.id,
                                                    dato.proyecto_id.nombre
                                                )}
                                            >
                                                Añadir nueva factura
                                            </button>
                                        }
                                    </td>

                                    <td>
                                       
                                        <button 
                                            type="button"
                                            className="btnEditarNuevaFactura"
                                            onClick={()=>handleEditarNuevaFactura(
                                                dato.id,
                                                dato.proyecto_id.nombre,
                                                dato.fecha_facturacion,
                                                dato.factura_nombre,
                                            )}
                                            >
                                                Editar
                                        </button>
                                    </td>

                                    <td>
                                        <button
                                            className="btnEliminarNuevaFactura"
                                            onClick={()=>handleEliminar(dato.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
            </div>

            <div className="botonAñadirFactura">
                <button onClick={handleAñadirFactura}>{añadirFactura ? 'Cancelar' :  'Añadir facturacion'}</button>
            </div>

            {
                añadirFactura &&
                <div className="tarjetaproyectofactura">
                
                <form onSubmit={handleFactura}>
                    <label>Nombre Proyecto

                    <select onChange={(e)=>setProyectoId(e.target.value)}>
                        <option value="">Seleccione una opción </option>
                        {
                            proyectos.map((dato)=>(
                                <option value={dato.id}>{dato.nombre}</option>
                            ))
                        }
                    </select>

                    {errores.proyecto_id && <span className="mensajeError">{errores.proyecto_id}</span>}

                    </label>


                    <label>Fecha facturación
                    <input type="date"
                            value={fecha_facturacion}
                            onChange={(e)=>setFechaFacturacion(e.target.value)}
                    />
                    </label>

                    {errores.fecha_facturacion && <span className="mensajeError">{errores.fecha_facturacion}</span>}

                    
                    <label>Factura
                        <input type="file"
                            
                                onChange={(e) => setFactura(e.target.files[0])}
                                />
                        </label>
                        {errores.factura && <span className="mensajeError">{errores.factura}</span>}

                    <button type="submit">Crear</button>
                </form>
            </div>}
        </>
    );
}