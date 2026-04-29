import { useState } from "react";
import "../Styles/AñadirProyecto.css";

export default function AñadirProyecto(){
    const [nombre, setNombre] = useState("");
    const [coste, setCoste] = useState(0);
    const [localizacion, setLocalizacion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [imagen, setImagen] = useState("");


    console.log(categoria);
    return(
        <>
            <div className="tarjetaAñadirProyecto">
                <form>
                    
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
                            <select  id="usuario">
                                <option value="">prueba1</option>
                                <option value="">prueba2</option>
                                <option value="">prueba3</option>
                            </select>
                        </>
                    }

                    <div className="botonAñadirProyecto">
                        <button>Aceptar</button>
                        <button>Cancelar</button>
                    </div>
                </form>
            </div>
        </>
    )
}