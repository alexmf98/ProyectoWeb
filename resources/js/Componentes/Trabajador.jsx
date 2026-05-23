import { router, usePage } from "@inertiajs/react"
import "../Styles/Trabajador.css";
import "../Styles/Errores.css";

import { useState } from "react";

export default function Trabajador(){

    const {proyectos, trabajador, nominas} = usePage().props;

    const [fecha_nomina, setFechaNomina] = useState("");
    const [nomina, setNomina] = useState("");
    const [proyecto_id, setProyectoId] = useState("");
    const [user_id, setUserId] = useState("");
    const [formKey, setFormKey] = useState(0);
    const [errores, setErrores] = useState({});
    const [verNominas, setVerNominas] = useState(false);
    const [editando, setEditando] = useState(false);

    const [idEditar, setIdEditar] = useState("");
    const [fechaEditar, setFechaEditar] = useState("");
    const [nominaEditar, setNominaEditar] = useState("");
    const [proyectoEditar, setProyectoEditar] = useState("");
    const [userEditar, setUserEditar] = useState("");

    const validar = () => {
        const nuevosErrores = {};
    
        if(!fecha_nomina){
            nuevosErrores.fecha_nomina = "Debe seleccionar una fecha";
        }
    
        if(!nomina){
            nuevosErrores.nomina = "Debe seleccionar un archivo";
        }else if(!/\.(pdf)$/i.test(nomina.name)){
            nuevosErrores.nomina = "Solo se admite formato pdf";
        }
    
        if(!proyecto_id){
            nuevosErrores.proyecto_id = "Debe seleccionar un proyecto";
        }
    
        if(!user_id){
            nuevosErrores.user_id = "Debe seleccionar un trabajador";
        }
    
        return nuevosErrores;
    }

    const editarFecha = (fecha)=>{
        const f = new Date(fecha);

        const dia = f.getDate();
        const mes = f.getMonth() + 1;
        const año = f.getFullYear();
        
        return dia + "/" + mes + "/" + año

    }

    const handleNomina = (e)=>{
        e.preventDefault();

        const erroresValidacion = validar();

        if(Object.keys(erroresValidacion).length > 0){
            setErrores(erroresValidacion);
            return;
        }

        setErrores({});

        const newFormData = new FormData();

        newFormData.append('fecha_nomina', fecha_nomina);
        newFormData.append('nomina', nomina);
        newFormData.append('proyecto_id', proyecto_id);
        newFormData.append('user_id', user_id);

        router.post('/trabajador', newFormData);

        handleLimpiarCampos();
    }
    
    const handleLimpiarCampos = ()=>{
        setFechaNomina("");
        setNomina("");
        setProyectoId("");
        setUserId("");
        setFormKey(prev => prev + 1);
    }

    const handleVerNominas = () =>{
        setVerNominas(true);
    }
    const handleOcultarNomina = ()=>{
        setVerNominas(false);
    }

    const handleEditar = (dato) => {
        setIdEditar(dato.id);
        const fecha = new Date(dato.fecha_nomina);
        const año = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(fecha.getDate()).padStart(2, '0');
        setFechaEditar(`${año}-${mes}-${dia}`);
        
        setProyectoEditar(dato.proyecto_id);
        setUserEditar(dato.user_id);
        setEditando(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    
    const handleGuardarEditar = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('fecha_nomina', fechaEditar);
        formData.append('proyecto_id', proyectoEditar);
        formData.append('user_id', userEditar);
    
        if(nominaEditar instanceof File){
            formData.append('nomina', nominaEditar);
        }
    
        router.put(`/editnomina/${idEditar}`, formData, {
            onSuccess: () => {
                setEditando(false);
                setIdEditar("");
            }
        });
    }
    
    const handleCancelarEditar = () => {
        setEditando(false);
        setIdEditar("");
    }

    const handleEliminarNomina = (id)=>{

        let confirmar = confirm("Desea eliminar la nomina de este trabajador")

        if(confirmar){
            router.delete(`/eliminarnomina/${id}`);
        }
    }

    return(
        <>

            {
                !editando &&

                <div className="tarjetaTrabajador">
                    <form key={formKey} onSubmit={handleNomina}>
                        <label>Fecha nomina</label>
                        <input type="date" 
                                value={fecha_nomina}
                                onChange={(e)=>setFechaNomina(e.target.value)}
                                />

                        {errores.fecha_nomina && <span className="mensajeError">{errores.fecha_nomina}</span>}          


                        <label>Nomina</label>
                        <input type="file" 
                                onChange={(e)=>setNomina(e.target.files[0])}
                        />

                        {errores.nomina && <span className="mensajeError">{errores.nomina}</span>}


                        <label>Proyecto</label>

                        <select value={proyecto_id} onChange={(e)=>setProyectoId(e.target.value)}>
                            <option value="">Seleccione un opción</option>
                            {
                                proyectos.map((dato)=>(
                                    <option key={dato.id} value={dato.id}>{dato.nombre}</option>
                                ))
                            }
                        </select>

                        {errores.proyecto_id && <span className="mensajeError">{errores.proyecto_id}</span>}


                        <label>Trabajador</label>

                        <select value={user_id} onChange={(e)=>setUserId(e.target.value)}>
                            <option value="">Seleccione un opción</option>
                            {
                                trabajador.map((dato)=>(
                                    <option key={dato.id} value={dato.id}>{dato.name}</option>
                                    
                                ))
                            }
                        </select>

                        {errores.user_id && <span className="mensajeError">{errores.user_id}</span>}

                        <button type="submit">Crear</button>
                    </form>
                </div>
            }

            {editando &&
                <div className="tarjetaTrabajador">
                    <form onSubmit={handleGuardarEditar}>
                        <label>Fecha nomina</label>
                        <input type="date"
                            value={fechaEditar}
                            onChange={(e) => setFechaEditar(e.target.value)}
                        />

                        <label>Nomina (dejar vacío para mantener la actual)</label>
                        <input type="file"
                            onChange={(e) => setNominaEditar(e.target.files[0])}
                        />

                        <label>Proyecto</label>
                        <select value={proyectoEditar} onChange={(e) => setProyectoEditar(e.target.value)}>
                            <option value="">Seleccione una opción</option>
                            {proyectos.map((dato) => (
                                <option key={dato.id} value={dato.id}>{dato.nombre}</option>
                            ))}
                        </select>

                        <label>Trabajador</label>
                        <select value={userEditar} onChange={(e) => setUserEditar(e.target.value)}>
                            <option value="">Seleccione una opción</option>
                            {trabajador.map((dato) => (
                                <option key={dato.id} value={dato.id}>{dato.name}</option>
                            ))}
                        </select>

                        <button type="submit">Guardar</button>
                        <button type="button" onClick={handleCancelarEditar}>Cancelar</button>
                    </form>
                    </div>
            }
                    
            <div className="btnNominaMandada">
                {
                    !verNominas && 
                        <button
                            className="btnVerNominas"
                            type="button"
                            onClick={handleVerNominas}
                        >
                            Ver nominas 
                        </button>
                }

                {
                    verNominas &&
                        <button
                        className="btnOcultarNominas"
                        type="button"
                        onClick={handleOcultarNomina}
                        >
                        Ocultar nominas
                    </button>

                
                }
            </div>

            <div className="tablaNominas">
                {
                    verNominas &&
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        Trabajador
                                    </th>
                                    <th>
                                        Fecha nomina
                                    </th>
                                    <th>
                                        Nomina
                                    </th>
                                    <th colSpan={2}>
                                        Accion
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    nominas.map((dato, index)=>(

                                        <tr key={index}>
                                            <td>
                                                {dato.nombre} {dato.apellido}
                                            </td>
                                            <td>
                                                {editarFecha(dato.fecha_nomina)}
                                            </td>
                                            <td>
                                                <a href={dato.nomina} download>Descargar</a>
                                            </td>

                                            <td>
                                            <button 
                                                className="btnEditarNomina"
                                                onClick={() => handleEditar(dato)}>
                                                Editar
                                            </button>
                                            </td>

                                            <td>
                                                <button
                                                    className="btnEliminarNomina"
                                                    type="button"
                                                    onClick={()=>handleEliminarNomina(dato.id)}
                                                >

                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                }
            </div>
        
        </>
    )
}