import "../Styles/FacturaProyecto.css";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function FacturacionProyecto() {

    const { proyectos, facturacion } = usePage().props;

    const [fecha_facturacion, setFechaFacturacion] = useState("");
    const [factura, setFactura] = useState("");
    const [proyecto_id, setProyectoId] = useState(null);
    const [añadirFactura, setAñadirFactura] = useState(false); 

    const handleFactura = (e)=> {

        e.preventDefault();

        const formData = new FormData();

        formData.append('fecha_facturacion', fecha_facturacion);
        formData.append('factura', factura);
        formData.append('proyecto_id', proyecto_id);

        // router.post('/facturacionproyecto', formData,{
        //     forceFormData: true,
        // });
        router.post('/facturacionproyecto', formData);
    }

    const handleAñadirFactura = () => {
        setAñadirFactura(!añadirFactura);
    }
    
    return (
        <>

            <div className="buscardorFecha">
                <form >

                    <label>Fecha inicio</label>
                    <input type="date"/>

                    <label>Fecha Fin</label>
                    <input type="date"/>

                    <button>Buscar</button>
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
                    </label>


                    <label>Fecha facturación
                    <input type="date"
                            value={fecha_facturacion}
                            onChange={(e)=>setFechaFacturacion(e.target.value)}
                    />
                    </label>
                    
                    <label>Factura
                        <input type="file"
                            
                                onChange={(e) => setFactura(e.target.files[0])}
                                />
                        </label>

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