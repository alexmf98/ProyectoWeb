import { router, usePage } from "@inertiajs/react";
import { useState } from "react"
import { useInfoEmpresa } from "../Hooks/useInfoEmpresa";


export default function InformacionEmpresa(){

    const {id, telefono, email, localizacion, descripcion} = useInfoEmpresa();

    const [ver, setVer] = useState(false);
    const [verEdicion, setVerEdicion] = useState(false);

    const [descrip, setDescripcion] = useState("" || descripcion);
    const [tele, setTelefono] = useState("" || telefono);
    const [emai, setEmail] = useState("" || email);
    const [localiza, setLocalizacion] = useState("" || localizacion);

    const handleVer = () => {
        setVer(true);
    }

    const limpiarCampos = ()=>{
        setVer(false);
        setVerEdicion(false);
    }

    const handleEnviar = (e) => {

        e.preventDefault();

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

                            <label>Email</label>
                            <input type="email" 
                                    value={emai}
                                    onChange={(e)=>setEmail(e.target.value)}
                            />

                            <label>Localizacion</label>
                            <input type="text" 
                                    value={localiza}
                                    onChange={(e)=>setLocalizacion(e.target.value)}
                            />

                            <label>Descripcion</label>

                            <textarea
                                value={descrip}
                                onChange={(e)=>setDescripcion(e.target.value)}
                            >

                            </textarea>

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

                            <label>Email</label>
                            <input type="email" 
                                    onChange={(e)=>setEmail(e.target.value)}
                            />

                            <label>Localizacion</label>
                            <input type="text" 
                                    onChange={(e)=>setLocalizacion(e.target.value)}
                            />

                            <label>Descripcion</label>

                            <textarea
                                onChange={(e)=>setDescripcion(e.target.value)}
                            >

                            </textarea>

                            <button type="submit">Aceptar</button>
                        </form>
                }
            </div>
        </>
    )
}