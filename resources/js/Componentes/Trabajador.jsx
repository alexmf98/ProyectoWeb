import { router, usePage } from "@inertiajs/react"
import "../Styles/Trabajador.css";
import { useState } from "react";

export default function Trabajador(){

    const {proyectos, trabajador} = usePage().props;

    const [fecha_nomina, setFechaNomina] = useState("");
    const [nomina, setNomina] = useState("");
    const [proyecto_id, setProyectoId] = useState("");
    const [user_id, setUserId] = useState("");
    const [formKey, setFormKey] = useState(0);

    const handleNomina = (e)=>{
        e.preventDefault();

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

                    <label>Nomina</label>
                    <input type="file" 
                            onChange={(e)=>setNomina(e.target.files[0])}
                    />

                    <label>Proyecto</label>

                    <select value={proyecto_id} onChange={(e)=>setProyectoId(e.target.value)}>
                        <option value="">Seleccione un opción</option>
                        {
                            proyectos.map((dato)=>(
                                <option value={dato.id}>{dato.nombre}</option>
                            ))
                        }
                    </select>

                    <label>Trabajador</label>

                    <select value={user_id} onChange={(e)=>setUserId(e.target.value)}>
                        <option value="">Seleccione un opción</option>
                        {
                            trabajador.map((dato)=>(
                                <option value={dato.id}>{dato.name}</option>
                                
                            ))
                        }
                    </select>

                    <button type="submit">Crear</button>
                </form>
            </div>
        </>
    )
}