import { useState } from "react"
import "../Styles/AñadirMaquina.css";
import { router } from "@inertiajs/react";

export default function AñadirMaquinaria(){

    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("");
    const [precio, setPrecio] = useState(0);
    const [stock, setStock] = useState(0); 
    const [caracteristicas, setCaracteristicas] = useState("");
    const [imagen, setImagen] = useState("");

    const [nuevaCategoria, setNuevaCategoria] = useState(false);

    const handleNuevaCategoria = ()=>{
        setNuevaCategoria(true);
    }

    const handleLimpiarCampos = ()=>{
        setNuevaCategoria(false);
    }

    const handleEnviar = (e)=>{
        e.preventDefault();

        router.post('añadirMaquina',{
            nombre: nombre,
            categoria: categoria,
            precio: precio,
            stock: stock,
            caracteristicas: caracteristicas,
            imagen: imagen,
        });
    }

    const array = ["Excavación", "Movimiento de tierra", "Fresadora"]

    const [ver, setVer] = useState(false);

    const handleVer = () =>{
        setVer(!ver);
    }

    return(
        <>
            <h1>{categoria}</h1>
            <div className="tarjetaAñadirMaquina">
                <form onSubmit={handleEnviar}>
                    
                    <label htmlFor="nombre">Nombre Maquina</label>
                    
                    <input type="text"
                            id="nombre" 
                            value={nombre}
                            onChange={(e)=>setNombre(e.target.value)}/>


                    {
                        !nuevaCategoria &&
                        <>
                            {/* <label htmlFor="categoria">Categoria</label>
                            <select id="categoria" onChange={(e)=>setCategoria(e.target.value)}>
                                <option value="">Seleccione una categoria</option>
                                <option value="excavacion">Excavación</option>
                                <option value="tierra">Movimiento de tierra</option>
                                <option value="fresado">Fresadora</option>
                            </select> */}
                            <label htmlFor="categoria">Categoria</label>
                            <select id="categoria" onChange={(e)=>setCategoria(e.target.value)}>
                                <option value="">Seleccione una categoria</option>
                                {
                                    array.map((dato)=>(
                                        <option value={dato}>{dato}</option>
                                    ))
                                }
                            </select>
                        </>
                    }

                    {
                        nuevaCategoria &&
                            <>
                                <label htmlFor="nuevaCategoria">Nueva Categoria</label>
                                <input type="text" 
                                        id="nuevaCategoria"
                                        onChange={(e)=>setCategoria(e.target.value)}
                                />
                            </>
                    }

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
                
                <div className="botonAñadirCategoria">
                    <button onClick={handleNuevaCategoria}>Añadir nueva categoria</button>
                    <button onClick={handleVer}>Información Categorias</button>
                    <button onClick={handleLimpiarCampos}>Cancelar</button>
                </div>

            </div>
                    
            {
                ver && 
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Nombre Categoria
                                </th>
                                <th>
                                    Estado
                                </th>
                                <th>
                                    Accion
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    preuba 1
                                </td>
                                <td>
                                    Activo
                                </td>
                                <td>
                                    <button>Activar o desactivar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
            }
        </>
    )
}