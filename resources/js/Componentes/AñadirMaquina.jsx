import { useState } from "react"
import "../Styles/AñadirMaquina.css";
import "../Styles/Errores.css";
import { router, usePage } from "@inertiajs/react";

export default function AñadirMaquinaria(){

    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("");
    const [precio, setPrecio] = useState(0);
    const [stock, setStock] = useState(0); 
    const [caracteristicas, setCaracteristicas] = useState("");
    const [imagen, setImagen] = useState("");
    const [categoriaid, setCategoriaId] = useState(null);
    const [formKey, setFormKey] = useState(0);
    const [errores, setErrores] = useState({});

    const [nuevaCategoria, setNuevaCategoria] = useState(false);

    const {Categoria, cat} = usePage().props;

    const [idEditarCategoria, setIdEditarCategoria] = useState(null);
    const [nombreEditarCategoria, setNombreEditarCategoria] = useState("");

    const handleEditarCategoria = (dato) => {
        setIdEditarCategoria(dato.id);
        setNombreEditarCategoria(dato.categoria);
    }

    const handleGuardarCategoria = (e) => {
        e.preventDefault();

        if(!nombreEditarCategoria.trim()) return;

        router.put(`/categoria/${idEditarCategoria}`, {
            categoria: nombreEditarCategoria,
        }, {
            onSuccess: () => {
                setIdEditarCategoria(null);
                setNombreEditarCategoria("");
            }
        });
    }

    const handleCancelarEditarCategoria = () => {
        setIdEditarCategoria(null);
        setNombreEditarCategoria("");
    }

    const validarCategoria = () => {
        const nuevosErrores = {};
    
        if(!categoria.trim()){
            nuevosErrores.categoria = "La categoria no puede estar vacia";
        }else if(!/^[a-zA-Z\s]+$/.test(categoria)){
            nuevosErrores.categoria = "La categoria no puede contener caracteres ni numeros";
        }
    
        return nuevosErrores;
    }
    
    const validarMaquina = () => {
        const nuevosErrores = {};
    
        if(!nombre.trim()){
            nuevosErrores.nombre = "El nombre de la maquina es obligatorio";
        }else if(!/^[a-zA-Z]+[0-9]*$/.test(nombre)){
            nuevosErrores.nombre = "El nombre no puede contener caracteres";
        }
    
        if(precio <= 0){
            nuevosErrores.precio = "El precio no puede ser negativo ni 0";
        }
    
        if(stock <= 0){
            nuevosErrores.stock = "El stock no puede ser negativo ni 0";
        }
    
        if(!caracteristicas.trim()){
            nuevosErrores.caracteristicas = "Las caracteristicas son obligatorias";
        }
    
        if(!imagen){
            nuevosErrores.imagen = "Debes de seleccionar una imagen";
        }else if(!/\.(jpg|jpeg|png)$/i.test(imagen.name)){
            nuevosErrores.imagen = "El formato permitido es jpg png jpeg";
        }
    
        if(categoriaid === null){
            nuevosErrores.categoriaid = "Debes de elegir una categoria";
        }
    
        return nuevosErrores;
    }

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
        setErrores({});
        setFormKey(prev => prev + 1);
    }
    
    const handleEnviar = (e)=>{
        e.preventDefault();

        const erroresValidacion = validarMaquina();

        if(Object.keys(erroresValidacion).length > 0){
            setErrores(erroresValidacion);

            return
        }

        setErrores({});
       
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

        const erroresValidacion = validarCategoria();

        if(Object.keys(erroresValidacion).length > 0){
            setErrores(erroresValidacion);

            return
        }

        setErrores({});

        router.post('/categorias', {
            categoria: categoria,
        })

        handleLimpiarCampos();
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

                                        {errores.categoria && <span className="mensajeError">{errores.categoria}</span>}
                                    </>

                                    <button>Aceptar</button>
                    </form>
                </div>
            }

            <div className="tarjetaAñadirMaquina">

                {
                    !nuevaCategoria &&

                <form key={formKey} onSubmit={handleEnviar}>
                    
                    <label htmlFor="nombre">Nombre Maquina</label>
                    
                    <input type="text"
                            id="nombre" 
                            value={nombre}
                            onChange={(e)=>setNombre(e.target.value)}/>

                    {errores.nombre && <span className="mensajeError">{errores.nombre}</span>}
                    
                    <label htmlFor="categoria">Categoria</label>
                    <select id="categoria" onChange={(e)=>setCategoriaId(e.target.value)}>
                        <option value="">Seleccione una categoria</option>
                        {
                            Categoria.map((dato)=>(
                            <option value={dato.id}>{dato.categoria}</option>
                            ))
                        }
                    </select>

                    {errores.categoriaid && <span className="mensajeError">{errores.categoriaid}</span>}
                        
                    <label htmlFor="precio">Precio (€)</label>

                    <input type="number" 
                            value={precio}
                            onChange={(e)=>setPrecio(e.target.value)}
                            />

                    {errores.precio && <span className="mensajeError">{errores.precio}</span>}

                    <label htmlFor="stock">Stock</label>

                    <input type="number"
                            value={stock}
                            onChange={(e)=>setStock(e.target.value)} />

                    {errores.stock && <span className="mensajeError">{errores.stock}</span>}

                    <label htmlFor="caracteristicas">Características</label>

                    <textarea id="caracteriscticas"
                            value={caracteristicas}
                            onChange={(e)=>setCaracteristicas(e.target.value)}
                            rows={4}
                            placeholder="Describe las caraterísticas de la máquina"
                            />

                    {errores.caracteristicas && <span className="mensajeError">{errores.caracteristicas}</span>}
                    
                    <label htmlFor="imagen">Imagen</label>

                    <input type="file" 
                            onChange={(e)=>setImagen(e.target.files[0])}/>

                    {errores.imagen && <span className="mensajeError">{errores.imagen}</span>}

                    <div className="botonAñadirMaquina">
                        
                        <button>Añadir</button>
                        <button type="button" onClick={handleLimpiarCampos}>Cancelar</button>
                    </div>

                </form>
                }
                
                <div className="botonAñadirCategoria">
                    <button onClick={handleNuevaCategoria}>Añadir nueva categoria</button>
                    <button className="btnInfoCategoria" onClick={handleVer}>Información Categorias</button>
                    <button onClick={handleLimpiarCampos}>Cancelar</button>
                </div>

            </div>
                 
            {ver &&
                <div className="tablaCategoria">
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre Categoria</th>
                                <th>Estado</th>
                                <th colSpan={3}>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cat.map((dato, index) => (
                                <tr key={index}>
                                    <td>
                                        
                                        {idEditarCategoria === dato.id
                                            ? <form onSubmit={handleGuardarCategoria} className="formEditarCategoria">
                                                <input
                                                    type="text"
                                                    value={nombreEditarCategoria}
                                                    onChange={(e) => setNombreEditarCategoria(e.target.value)}
                                                    autoFocus
                                                />
                                                <button type="submit">Guardar</button>
                                                <button type="button" onClick={handleCancelarEditarCategoria}>Cancelar</button>
                                              </form>
                                            : dato.categoria
                                        }
                                    </td>
                                    <td>{dato.is_active ? 'Activo' : 'Desactivado'}</td>
                                    <td>
                                        <button onClick={() => handleActivar(dato.id)}>Activar</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDesactivar(dato.id)}>Desactivar</button>
                                    </td>
                                    <td>
                                        
                                        {idEditarCategoria !== dato.id &&
                                            <button onClick={() => handleEditarCategoria(dato)}>Editar</button>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </>
    )
}