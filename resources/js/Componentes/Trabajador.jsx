import { router, usePage } from "@inertiajs/react"
import "../Styles/Trabajador.css";
import "../Styles/Errores.css";

import { useState } from "react";

export default function Trabajador(){

    const {proyectos, trabajador} = usePage().props;

    const [fecha_nomina, setFechaNomina] = useState("");
    const [nomina, setNomina] = useState("");
    const [proyecto_id, setProyectoId] = useState("");
    const [user_id, setUserId] = useState("");
    const [formKey, setFormKey] = useState(0);
    const [errores, setErrores] = useState({});

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

    return(
        <>
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
                                <option value={dato.id}>{dato.nombre}</option>
                            ))
                        }
                    </select>

                    {errores.proyecto_id && <span className="mensajeError">{errores.proyecto_id}</span>}


                    <label>Trabajador</label>

                    <select value={user_id} onChange={(e)=>setUserId(e.target.value)}>
                        <option value="">Seleccione un opción</option>
                        {
                            trabajador.map((dato)=>(
                                <option value={dato.id}>{dato.name}</option>
                                
                            ))
                        }
                    </select>

                    {errores.user_id && <span className="mensajeError">{errores.user_id}</span>}

                    <button type="submit">Crear</button>
                </form>
            </div>
        </>
    )
}