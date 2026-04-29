import { useState } from "react"
import "../Styles/AñadirMaquina.css";

export default function AñadirMaquinaria(){

    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("");
    const [precio, setPrecio] = useState(0);
    const [stock, setStock] = useState(0); 
    const [caracteristicas, setCaracteristicas] = useState("");
    const [imagen, setImagen] = useState("");

    return(
        <>
            <div className="tarjetaAñadirMaquina">
                <form>
                    
                    <label htmlFor="nombre">Nombre Maquina</label>
                    
                    <input type="text"
                            id="nombre" 
                            value={nombre}
                            onChange={(e)=>setNombre(e.target.value)}/>

                    <label htmlFor="categoria">Categoria</label>

                    <select id="categoria" onChange={(e)=>setCategoria(e.target.value)}>
                        <option value="excavacion">Excavación</option>
                        <option value="tierra">Movimiento de tierra</option>
                        <option value="fresado">Fresadora</option>
                    </select>

                    <label htmlFor="precio">Precio (€)</label>

                    <input type="number" 
                            value={precio}
                            onChange={(e)=>setPrecio(e.target.value)}
                            />

                    <label htmlFor="stock">Stock</label>

                    <input type="number"
                            value={stock}
                            onChange={(e)=>setStock(e.target.value)} />

                    <label htmlFor="caracteristicas">Características</label>

                    <textarea id="caracteriscticas"
                            value={caracteristicas}
                            onChange={(e)=>setCaracteristicas(e.target.value)}
                            rows={4}
                            placeholder="Describe las caraterísticas de la máquina"
                            />
                    
                    <label htmlFor="imagen">Imagen</label>

                    <input type="file" 
                            onChange={(e)=>setImagen(e.target.files[0])}/>

                    <div className="botonAñadirMaquina">
                        
                        <button>Añadir</button>
                        <button>Cancelar</button>
                    </div>

                </form>
            </div>

        </>
    )
}