import { useState } from "react"
import "../Styles/AñadirMaquina.css";
import { router, usePage } from "@inertiajs/react";

export default function AñadirMaquinaria(){

    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("");
    const [precio, setPrecio] = useState(0);
    const [stock, setStock] = useState(0); 
    const [caracteristicas, setCaracteristicas] = useState("");
    const [imagen, setImagen] = useState("");
    const [categoriaid, setCategoriaId] = useState(null);

    const [nuevaCategoria, setNuevaCategoria] = useState(false);

    const {Categoria, cat} = usePage().props;

    const handleNuevaCategoria = ()=>{
        setNuevaCategoria(true);
    }

    const handleLimpiarCampos = ()=>{
        setNombre("");
        setCategoria("");
        setPrecio(0);
        setStock(0);
        setCaracteristicas("");
        setImagen("");
        setCategoriaId(null);
        setNuevaCategoria(false);
        setVer(false);
    }
    
    const handleEnviar = (e)=>{
        e.preventDefault();
       
        router.post('añadirMaquina',{
            nombre: nombre,
            precio: precio,
            stock: stock,
            caracteristicas: caracteristicas,
            imagen: imagen,
            categoria_id: categoriaid,
        });
    }

    const [ver, setVer] = useState(false);

    const handleVer = () =>{
        setVer(true);
    }


    const handleCategoria = (e)=>{

        e.preventDefault();

        router.post('/categorias', {
            categoria: categoria,
        })
    }

    const handleDesactivar = (id)=>{
        router.put(`/categoria/${id}`, {
            is_active: false,
        });
    }

    const handleActivar = (id)=>{
        router.put(`/categoria/${id}`, {
            is_active: true,
        });
    }
    return(
        <>
        {
            nuevaCategoria &&
                <div className="tarjetaAñadirMaquina">
                    <form onSubmit={handleCategoria}>
                                    <>
                                        <label htmlFor="nuevaCategoria">Nueva Categoria</label>
                                        <input type="text" 
                                                id="nuevaCategoria"
                                                onChange={(e)=>setCategoria(e.target.value)}
                                        />
                                    </>

                                    <button>Aceptar</button>
                    </form>
                </div>
            }

            <div className="tarjetaAñadirMaquina">

                {
                    !nuevaCategoria &&

                <form onSubmit={handleEnviar}>
                    
                    <label htmlFor="nombre">Nombre Maquina</label>
                    
                    <input type="text"
                            id="nombre" 
                            value={nombre}
                            onChange={(e)=>setNombre(e.target.value)}/>


                        <>
                            <label htmlFor="categoria">Categoria</label>
                            <select id="categoria" onChange={(e)=>setCategoriaId(e.target.value)}>
                                <option value="">Seleccione una categoria</option>
                                {
                                   Categoria.map((dato)=>(
                                    <option value={dato.id}>{dato.categoria}</option>
                                   ))
                                }
                            </select>
                        </>

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
                        <button onClick={handleLimpiarCampos}>Cancelar</button>
                    </div>

                </form>
                }
                
                <div className="botonAñadirCategoria">
                    <button onClick={handleNuevaCategoria}>Añadir nueva categoria</button>
                    <button className="btnInfoCategoria" onClick={handleVer}>Información Categorias</button>
                    <button onClick={handleLimpiarCampos}>Cancelar</button>
                </div>

            </div>
                 
            {
                ver &&
                <div className="tablaCategoria">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Nombre Categoria
                                </th>
                                <th>
                                    Estado
                                </th>
                                <th colSpan={2}>
                                    Accion
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cat.map((dato)=>(
                                    <tr>
                                        <td>
                                            {dato.categoria}
                                        </td>
                                        <td>
                                            {dato.is_active ? 'Activo' : 'Desactivado'}
                                        </td>

                                        <td>
                                            <button onClick={()=>handleActivar(dato.id)}>Activar</button>
                                        </td>

                                        <td>
                                            <button onClick={()=>handleDesactivar(dato.id)}>Desactivar</button>
                                        </td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div> 
            }
        </>
    )
}