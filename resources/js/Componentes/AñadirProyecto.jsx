import { useState } from "react";
import "../Styles/AñadirProyecto.css";
import { router, usePage } from "@inertiajs/react";

export default function AñadirProyecto(){
    const [nombre, setNombre] = useState("");
    const [coste, setCoste] = useState(0);
    const [localizacion, setLocalizacion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [imagen, setImagen] = useState("");
    const [user_id, setUserId] = useState(null);

    const {usuarios, usuario_aceptado} = usePage().props;

    const handleEnviar = (e) =>{
        e.preventDefault();

        if(user_id){
            
            router.post('/añadirproyecto',{
                nombre: nombre,
                coste: coste,
                localizacion: localizacion,
                categoria: categoria,
                imagen: imagen,
                user_id: user_id,
            });    
        }else{
            router.post('/añadirproyecto',{
                nombre: nombre,
                coste: coste,
                localizacion: localizacion,
                categoria: categoria,
                imagen: imagen,
            });
        }

    }
        
    return(
        <>
            <div className="tarjetaAñadirProyecto">
                <form onSubmit={handleEnviar}>
                    
                    <label htmlFor="nombre">Nombre</label>

                    <input type="text"
                            value={nombre}
                            onChange={(e)=>setNombre(e.target.value)} />

                    <label htmlFor="coste">Coste</label>

                    <input type="number" 
                            value={coste}
                            onChange={(e)=>setCoste(e.target.value)}/>

                    <label htmlFor="localizacion">Localización</label>

                    <input type="text"
                            value={localizacion}
                            onChange={(e)=>setLocalizacion(e.target.value)} />

                    <label htmlFor="categoria">Categoria</label>

                    <select id="categoria" onChange={(e)=>setCategoria(e.target.value)}>
                        <option value="">Seleccione una categoria</option>
                        <option value="adecuacion">Adecuación</option>
                        <option value="restauración">Restauración</option>
                        <option value="personal">Personal</option>
                    </select>

                    <label htmlFor="imagen">Imagen</label>

                    <input type="file" onChange={(e)=>setImagen(e.target.files[0])}/>

                    {
                        categoria == "personal" &&
                        <>
                            <label htmlFor="usuario">Usuario</label>
                            <select  id="usuario" onChange={(e)=>setUserId(e.target.value)}>
                                <option value="">Seleccione un usuario</option>
                                {
                                    usuario_aceptado.map((dato)=>(
                                        
                                        <option value={dato.user.id}>{dato.user.name} {dato.user.apellido}</option>
                                        
                                    ))
                                }
                            </select>
                        </>
                    }

                    <div className="botonAñadirProyecto">
                        <button type="submit">Aceptar</button>
                        <button type="reset">Cancelar</button>
                    </div>
                </form>
            </div>
        </>
    )
}