import { router, usePage } from "@inertiajs/react";
import "../Styles/EditarMaquinaria.css";
import "../Styles/Errores.css";

import { useState } from "react";

export default function EditMaquinaria() {

    const { maquina, categorias } = usePage().props;

    const [nombre, setNombre] = useState("" || maquina.nombre);
    const [precio, setPrecio] = useState(0 || maquina.precio);
    const [imagen, setImagen] = useState("" || maquina.imagen);
    const [categoria, setCategoria] = useState("" || maquina.categoria_id);
    const [stock, setStock] = useState(0 || maquina.stock);
    const [caracteristicas, setCaracteristicas] = useState("" || maquina.caracteristicas);

    const [errores, setErrores] = useState({});
    const [id, setId] = useState(null);

   
    const validar = () => {

        const nuevosErrores = {}

        if(!nombre.trim()){
            nuevosErrores.nombre = "El nombre de la maquina es obligatorio"
        }else if(!/^[a-zA-Z0-9]+$/.test(nombre.trim())){
            nuevosErrores.nombre = "No puede contener caracteres"
        }

        if(precio < 0){
            nuevosErrores.precio = "No puede contener numeros negativos"
        }

        if(imagen instanceof File && !/\.(jpg|jpeg|png)$/i.test(imagen.name)){
            nuevosErrores.imagen = "El formato permitido es jpg png jpeg"
        }

        if(!categoria){
            nuevosErrores.categoria = "Debe seleccionar una categoria"
        }

        if(stock <= 0){
            nuevosErrores.stock = "Debe al menos tener un stock disponible"
        }

        if(!caracteristicas.trim()){
            nuevosErrores.caracteristicas = "Debe de escribir alagunas caracteristicas"
        }

        return nuevosErrores;
    }


    const handleEditar = (e) => {

        e.preventDefault();

        const erroresValidacion = validar();

        if(Object.keys(erroresValidacion).length > 0){
            setErrores(erroresValidacion);
            
            return;
        }

        setErrores({});


        const newFormdData = new FormData();

        newFormdData.append("nombre", nombre);
        newFormdData.append("precio", precio);
        
        if(imagen instanceof File){
            newFormdData.append("imagen", imagen);
        }

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

                    {errores.nombre && <span className="mensajeError">{errores.nombre}</span>}

                    <label htmlFor="categoria">Categoria</label>
                    <select value={categoria} onChange={(e)=>setCategoria(e.target.value)}>
                        <option value="">Seleccione una categoria</option>
                        {
                            categorias.map((dato)=>(
                                <option value={dato.id}>{dato.categoria}</option>
                            ))
                        }
                    </select>

                    {errores.categoria && <span className="mensajeError">{errores.categoria}</span>}

                    <label htmlFor="precio">Precio</label>
                    <input type="number"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />

                    {errores.precio && <span className="mensajeError">{errores.precio}</span>}

                    <label htmlFor="stock">Numero de stock</label>
                    <input type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />

                    {errores.stock && <span className="mensajeError">{errores.stock}</span>}

                    <label htmlFor="caracteristicas">Caracteristicas</label>
                    <textarea id="caracteriscticas"
                            value={caracteristicas}
                            onChange={(e)=>setCaracteristicas(e.target.value)}
                            rows={4}
                            />

                    {errores.caracteristicas && <span className="mensajeError">{errores.caracteristicas}</span>}

                    <label htmlFor="imagen">Imagen</label>
                    <input type="file"
                        onChange={(e) => setImagen(e.target.files[0])}
                    />

                    {errores.imagen && <span className="mensajeError">{errores.imagen}</span>}

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