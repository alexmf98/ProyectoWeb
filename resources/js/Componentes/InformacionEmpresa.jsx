import { router, usePage } from "@inertiajs/react";
import { useState } from "react"
import { useInfoEmpresa } from "../Hooks/useInfoEmpresa";
import "../Styles/Errores.css";


export default function InformacionEmpresa(){

    const {id, telefono, email, localizacion, descripcion} = useInfoEmpresa();

    const [ver, setVer] = useState(false);
    const [verEdicion, setVerEdicion] = useState(false);

    const [descrip, setDescripcion] = useState("" || descripcion);
    const [tele, setTelefono] = useState("" || telefono);
    const [emai, setEmail] = useState("" || email);
    const [localiza, setLocalizacion] = useState("" || localizacion);

    const [errores, setErrores] = useState({});


    const validar = () => {
        const nuevosErrores = {};
    
        if(!tele.trim()){
            nuevosErrores.tele = "El teléfono es obligatorio";
        }else if(!/^[0-9]{9}$/.test(tele)){
            nuevosErrores.tele = "El teléfono debe tener 9 dígitos";
        }
    
        if(!emai.trim()){
            nuevosErrores.emai = "El email es obligatorio";
        }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emai)){
            nuevosErrores.emai = "El formato del email no es válido";
        }
    
        if(!localiza.trim()){
            nuevosErrores.localiza = "La localización es obligatoria";
        }
    
        if(!descrip.trim()){
            nuevosErrores.descrip = "La descripción es obligatoria";
        }
    
        return nuevosErrores;
    }

    const handleVer = () => {
        setVer(true);
    }

    const limpiarCampos = ()=>{
        setVer(false);
        setVerEdicion(false);
    }

    const handleEnviar = (e) => {

        e.preventDefault();

        const erroresValidacion = validar();

        if(Object.keys(erroresValidacion).length > 0){
            setErrores(erroresValidacion);
            return;
        }

        setErrores({});

        const formData = new FormData();

        formData.append("descripcion", descrip);
        formData.append("telefono", tele);
        formData.append("email", emai);
        formData.append("localizacion", localiza);
        

        router.post('/informacionempresa', formData);

        limpiarCampos();
    }

    const handleEditar = () => {
        setVerEdicion(true);
    }

    const handleEdit = (e)=>{
        e.preventDefault();

        const erroresValidacion = validar();

        if(Object.keys(erroresValidacion).length > 0){
            setErrores(erroresValidacion);
            return;
        }

        setErrores({});

        const formData = new FormData();

        formData.append("descripcion", descrip);
        formData.append("telefono", tele);
        formData.append("email", emai);
        formData.append("localizacion", localiza);
        

        router.put(`/informacionempresa/${id}`, formData);

        limpiarCampos();
    }

    
    const handleEliminar = ()=>{
        const respuesta = confirm("Desea eliminar la información de la empresa");

        if(respuesta) router.delete(`/informacionempresa/${id}`);
    }
    return(
        <>
            <h1>Informacion de empresa</h1>

            <div className="tablaEdicion">
                    <table>
                        <thead> 
                            <tr>
                                <th>Teléfono</th>
                                <th>Email</th>
                                <th>Localización</th>
                                <th>Descripcion</th>
                            </tr>
                        </thead>
                        <tbody>
                           <tr>
                                <td>{telefono}</td>
                                <td>{email}</td>
                                <td>{localizacion}</td>
                                <td>{descripcion}</td>
                           </tr>
                        </tbody>
                    </table>
            </div>

            <div>
                {
                    <div className="accionesEmpresa">
                        { !id && 
                            <button className="btnAceptar" onClick={handleVer}>Añadir</button>
                        }
                        
                        {
                            id &&
                            <>
                                <button className="btnAceptar" onClick={handleEditar}>Editar</button>
                            
                                <button className="btnCancelar" onClick={handleEliminar}>Eliminar</button>
                            </>
                        }
                    </div>
                }

                {
                    verEdicion && 
                        <form className="formularioEmpresa" onSubmit={handleEdit}>
                            <label>Telefono</label>
                            <input type="text" 
                                    value={tele}
                                    onChange={(e)=>setTelefono(e.target.value)}
                            />

                        {errores.tele && <span className="mensajeError">{errores.tele}</span>}


                            <label>Email</label>
                            <input type="email" 
                                    value={emai}
                                    onChange={(e)=>setEmail(e.target.value)}
                            />
                        {errores.emai && <span className="mensajeError">{errores.emai}</span>}

                            <label>Localizacion</label>
                            <input type="text" 
                                    value={localiza}
                                    onChange={(e)=>setLocalizacion(e.target.value)}
                            />

                        {errores.localiza && <span className="mensajeError">{errores.localiza}</span>}


                            <label>Descripcion</label>

                            <textarea
                                value={descrip}
                                onChange={(e)=>setDescripcion(e.target.value)}
                            />

                        {errores.descrip && <span className="mensajeError">{errores.descrip}</span>}


                            <button className="btnAceptar" type="submit">Aceptar</button>
                            <button className="btnCancelar" type="reset" onClick={()=>setVerEdicion(false)}>Cancelar</button>
                    </form>
                }

                {
                    ver && 
                        <form className="formularioEmpresa" onSubmit={handleEnviar}>
                            <label>Telefono</label>
                            <input type="text" 
                                    onChange={(e)=>setTelefono(e.target.value)}
                            />

                            {errores.tele && <span className="mensajeError">{errores.tele}</span>}

                            <label>Email</label>
                            <input type="email" 
                                    onChange={(e)=>setEmail(e.target.value)}
                            />
                            
                            {errores.emai && <span className="mensajeError">{errores.emai}</span>}
                            
                            <label>Localizacion</label>
                            <input type="text" 
                                    onChange={(e)=>setLocalizacion(e.target.value)}
                            />

                            {errores.localiza && <span className="mensajeError">{errores.localiza}</span>}  

                            <label>Descripcion</label>

                            <textarea
                                onChange={(e)=>setDescripcion(e.target.value)}
                           />

                            {errores.descrip && <span className="mensajeError">{errores.descrip}</span>}

                            <button type="submit">Aceptar</button>
                        </form>
                }
            </div>
        </>
    )
}