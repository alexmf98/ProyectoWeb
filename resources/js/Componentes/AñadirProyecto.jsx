import { useState } from "react";
import "../Styles/AñadirProyecto.css";
import { router, usePage } from "@inertiajs/react";

export default function AñadirProyecto(){
    const [nombre, setNombre] = useState("");
    const [coste, setCoste] = useState(0);
    const [localizacion, setLocalizacion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [imagen, setImagen] = useState("");
    
    const handleEnviar = (e) =>{
        e.preventDefault();

        router.post('/añadirproyecto',{
            nombre: nombre,
            coste: coste,
            localizacion: localizacion,
            categoria: categoria,
            imagen: imagen,
        });
        // if(user_id){
            
        //     router.post('/añadirproyecto',{
        //         nombre: nombre,
        //         coste: coste,
        //         localizacion: localizacion,
        //         categoria: categoria,
        //         imagen: imagen,
        //         user_id: user_id,
        //     });    
        // }else{
        //     router.post('/añadirproyecto',{
        //         nombre: nombre,
        //         coste: coste,
        //         localizacion: localizacion,
        //         categoria: categoria,
        //         imagen: imagen,
        //     });
        // }

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
                        <option value="adecuacion">Obra civíl</option>
                        <option value="restauracion">Obra pública</option>
                    </select>

                    <label htmlFor="imagen">Imagen</label>

                    <input type="file" onChange={(e)=>setImagen(e.target.files[0])}/>

                    <div className="botonAñadirProyecto">
                        <button type="submit">Aceptar</button>
                        <button type="reset">Cancelar</button>
                    </div>
                </form>
            </div>
        </>
    )
}