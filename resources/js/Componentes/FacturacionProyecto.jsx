import "../Styles/FacturaProyecto.css";
import "../Styles/Errores.css";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function FacturacionProyecto() {

    const { proyectos, facturacion } = usePage().props;

    const [fecha_facturacion, setFechaFacturacion] = useState("");
    const [factura, setFactura] = useState("");
    const [proyecto_id, setProyectoId] = useState(null);
    const [añadirFactura, setAñadirFactura] = useState(false); 
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

    const [errores, setErrores] = useState({});

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

    const handleLimpiarCampos = () =>{
        setFechaFacturacion("");
        setFactura("");
        setProyectoId(null);
        setAñadirFactura(false);

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

        // router.post('/facturacionproyecto', formData,{
        //     forceFormData: true,
        // });
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
            </div>

            <div className="tablafacturaproyecto">
                
                    <table>
                        <thead>
                            <tr>
                                <th>Proyecto</th>
                                <th>Fecha Facturación</th>
                                <th>Factura</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                facturacion.map((dato)=>(
                                    <tr>
                                        <td>
                                            {dato.proyecto_id.nombre}
                                        </td>
                                        <td>
                                            {dato.fecha_facturacion}
                                        </td>
                                        <td>
                                            <a href={dato.factura} download>Descargar</a>
                                        </td>
                                    </tr>
                                ))
                            }
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

// import "../Styles/FacturaProyecto.css";
// import { router, usePage } from "@inertiajs/react";
// import { useState } from "react";

// export default function FacturacionProyecto() {

//     const { proyectos, facturacion } = usePage().props;

//     const [fecha_facturacion, setFechaFacturacion] = useState("");
//     const [factura, setFactura] = useState("");
//     const [proyecto_id, setProyectoId] = useState(null);
//     const [añadirFactura, setAñadirFactura] = useState(false);
//     const [paginaActual, setPaginaActual] = useState(1);

//     const porPagina = 3;
//     const totalPaginas = Math.ceil(facturacion.length / porPagina);

//     // Calculamos los índices
//     const indiceInicio = (paginaActual - 1) * porPagina;
//     const indiceFin    = indiceInicio + porPagina;
//     const datosPagina  = facturacion.slice(indiceInicio, indiceFin);

//     const handleFactura = (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('fecha_facturacion', fecha_facturacion);
//         formData.append('factura', factura);
//         formData.append('proyecto_id', proyecto_id);
//         router.post('/facturacionproyecto', formData);
//     }

//     return (
//         <>
//             <div className="tablafacturaproyecto">
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Proyecto</th>
//                             <th>Fecha Facturación</th>
//                             <th>Factura</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {datosPagina.map((dato) => (
//                             <tr key={dato.id}>
//                                 <td>{dato.proyecto_id.nombre}</td>
//                                 <td>{dato.fecha_facturacion}</td>
//                                 <td><a href={dato.factura} download>Descargar</a></td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>

//                 {/* Paginación */}
//                 <div className="paginacion">
//                     <button
//                         onClick={() => setPaginaActual(p => p - 1)}
//                         disabled={paginaActual === 1}
//                     >
//                         ‹
//                     </button>

//                     {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
//                         <button
//                             key={num}
//                             onClick={() => setPaginaActual(num)}
//                             className={paginaActual === num ? 'activo' : ''}
//                         >
//                             {num}
//                         </button>
//                     ))}

//                     <button
//                         onClick={() => setPaginaActual(p => p + 1)}
//                         disabled={paginaActual === totalPaginas}
//                     >
//                         ›
//                     </button>
//                 </div>
//             </div>

//             {
//                 añadirFactura &&
//                 <div className="tarjetaproyectofactura">
                
//                 <form onSubmit={handleFactura}>
//                     <label>Nombre Proyecto

//                     <select onChange={(e)=>setProyectoId(e.target.value)}>
//                         <option value="">Seleccione una opción </option>
//                         {
//                             proyectos.map((dato)=>(
//                                 <option value={dato.id}>{dato.nombre}</option>
//                             ))
//                         }
//                     </select>
//                     </label>


//                     <label>Fecha facturación
//                     <input type="date"
//                             value={fecha_facturacion}
//                             onChange={(e)=>setFechaFacturacion(e.target.value)}
//                     />
//                     </label>
                    
//                     <label>Factura
//                         <input type="file"
                            
//                                 onChange={(e) => setFactura(e.target.files[0])}
//                                 />
//                         </label>

//                     <button type="submit">Crear</button>
//                 </form>
//             </div>}
//         </>
//     );
// }