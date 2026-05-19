import { router, usePage } from "@inertiajs/react";
import "../Styles/EditarMaquinaria.css";
import { useState } from "react";

export default function EditMaquinaria() {

    const { maquina, categorias } = usePage().props;

    const [nombre, setNombre] = useState("" || maquina.nombre);
    const [precio, setPrecio] = useState(0 || maquina.precio);
    const [imagen, setImagen] = useState("" || maquina.imagen);
    const [categoria, setCategoria] = useState("" || maquina.categoria_id);
    const [stock, setStock] = useState(0 || maquina.stock);
    const [caracteristicas, setCaracteristicas] = useState("" || maquina.caracteristicas);

    const [id, setId] = useState(null);

    const handleEditar = (e) => {

        e.preventDefault();

        const newFormdData = new FormData();

        newFormdData.append("nombre", nombre);
        newFormdData.append("precio", precio);
        newFormdData.append("imagen", imagen);
        newFormdData.append("categoria_id", categoria);
        newFormdData.append("stock", stock);
        newFormdData.append("caracteristicas", caracteristicas);

        router.put(`/editarmaquina/${id}`, newFormdData);
    }

    const handleVolver = () =>{
        router.get('/alquileres', {}, {replace:true});
    }

    return (
        <>
          
            <div className="tarjetaEditMaquinaria">
                <form onSubmit={handleEditar}>

                    <label htmlFor="nombre">Nombre</label>
                    <input type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />

                    <label htmlFor="categoria">Categoria</label>
                    <select value={categoria} onChange={(e)=>setCategoria(e.target.value)}>
                        <option value="">Seleccione una categoria</option>
                        {
                            categorias.map((dato)=>(
                                <option value={dato.id}>{dato.categoria}</option>
                            ))
                        }
                    </select>

                    <label htmlFor="precio">Precio</label>
                    <input type="number"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />

                    <label htmlFor="stock">Numero de stock</label>
                    <input type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />

                    <label htmlFor="caracteristicas">Caracteristicas</label>
                    <textarea id="caracteriscticas"
                            value={caracteristicas}
                            onChange={(e)=>setCaracteristicas(e.target.value)}
                            rows={4}
                            />

                    <label htmlFor="imagen">Imagen</label>
                    <input type="file"
                        onChange={(e) => setImagen(e.target.files[0])}
                    />

                        <button type="submit"
                                onClick={()=>setId(maquina.id)}
                                >Aceptar
                        </button>
                </form>
                    
            </div>
            <div className="btnVolver">
                    <button
                    onClick={handleVolver}>
                    Volver
                </button>
            </div>
        </>
    );
}