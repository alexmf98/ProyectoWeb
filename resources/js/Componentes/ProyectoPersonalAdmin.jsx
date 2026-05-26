import { router, usePage } from "@inertiajs/react"
import "../Styles/ProyectoPersonalAdmin.css";
import "../Styles/Errores.css";
import { useState } from "react";

export default function ProyectoPersonalAdmin() {

    const { proyectos } = usePage().props;

    const [imagenes, setImagenes] = useState([]);
    const [id, setId] = useState("");
    const [categoria, setCategoria] = useState("");

    const [nombre, setNombre] = useState("");
    const [coste, setCoste] = useState(0);
    const [localizacion, setLocalizacion] = useState("");
    const [Categoria, setCategorias] = useState("");
    const [Imagen, setImagen] = useState("");
    const [editar, setEditar] = useState(false);
    const [añadirImagen, setAñadirImagen] = useState(false);
    const [formKey, setFormKey] = useState(0);

    const [errores, setErrores] = useState("");

    const validarImagenes = () => {
        const nuevosErrores = {};
        
        if(imagenes.length === 0){
            nuevosErrores.imagenes = "Debes de seleccionar al menos una imagen";
        } else {
            const formatoInvalido = imagenes.some(
                img => !/\.(jpg|jpeg|png)$/i.test(img.name)
            );
            if(formatoInvalido){
                nuevosErrores.imagenes = "Formato de imagenes permitidos jpg jpeg png";
            }
        }
    
        return nuevosErrores;
    }

    const validar = () => {
        
        const nuevosErrores = {}
        
        if(!nombre.trim()){
            nuevosErrores.nombre = "El nombre no puede estar en blanco"
        }

        if(coste <= 0){
            nuevosErrores.coste = "El coste no puede ser negativo ni 0"
        }

        if(!localizacion.trim()){
            nuevosErrores.localizacion = "La localizacion es obligatorio"
        }

        if(!Categoria.trim()){
            nuevosErrores.Categoria = "Debe de eleguir una categoria"
        }
        
        if(Imagen instanceof File && !/\.(jpg|jpeg|png)$/i.test(Imagen.name)){
            nuevosErrores.Imagen = "Formato de imagen valido jpg png jpeg"
        }
        return nuevosErrores;
    }

    const subir = ()=>{
        window.scrollTo({top:0, behavior: "smooth"})
    }

    const handleEnviar = (id) =>{
        setId(id);
        setAñadirImagen(true);
        setEditar(false);
        subir();
    }

    const handleLimpiar = ()=>{
        setId("");
        setCategoria("");
        router.get('/proyectoPersonalAdm', {}, { replace: true });
        setFormKey(prev => prev + 1);
        setErrores({})
    }

    const handleSubir = (e) => {
        e.preventDefault();

        const erroresValidacion = validarImagenes(); 

        if(Object.keys(erroresValidacion).length > 0){
            setErrores(erroresValidacion);
            return;
        }

        const formData = new FormData();
        imagenes.forEach(img => formData.append('imagenes[]', img));

        router.post(`/subirimagen/${id}`, formData);

        handleLimpiar();
    }

    const handleVer = (id) =>{
        router.get(`/verimagenes/${id}`);
    }

    const handleBuscar = (e)=>{
        e.preventDefault();

        router.get('/proyectoPersonalAdm',{
            'categoria': categoria,
        });
    }

    const handleBotonEditar = (id,nombre,coste,localizacion,categoria,imagen)=>{
        setId(id);
        setNombre(nombre);
        setCoste(coste);
        setLocalizacion(localizacion);
        setCategorias(categoria)
        setImagen(imagen);
        setEditar(true);

        handleSubirEditar();
    }

    const handleLimpiarCampos = ()=>{
        setNombre("");
        setCoste("");
        setLocalizacion("");
        setCategorias("");
        setImagen("");
        setId("");
        setErrores({});
        setEditar(false);
    }

    const handleSubirEditar = ()=>{
        window.scrollTo({top:0, behavior:"smooth"})
    }

    const handleEditar = (e)=>{
        e.preventDefault();

        const erroresValidacion = validar();

        if(Object.keys(erroresValidacion).length > 0){
            setErrores(erroresValidacion);

            return
        }

        setErrores({});

        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("coste", coste);
        formData.append("localizacion", localizacion);
        formData.append("categoria", Categoria);

        if(Imagen instanceof File){
            formData.append("imagen", Imagen);
        }

        router.put(`editproyecto/${id}`,formData, {
            onSuccess: () => handleLimpiarCampos()
        });

    }
    
    return (
        <>

            <div className="buscadorProyectoAdm">
                <form onSubmit={handleBuscar}>
                    <label>Buscar: </label>
                    <select onChange={(e)=>setCategoria(e.target.value)}>
                        <option value="">Seleccione una opcion</option>
                        <option value="restauracion">Obra civíl</option>
                        <option value="adecuacion">Obra Pública</option>
                        <option value="personal">Personal</option>
                    </select>

                    <button>Aceptar</button>
                    <button type="button" onClick={handleLimpiar}>Cancelar</button>
                </form>
            </div>

            {
                editar &&
                <form className="formularioproyectopersonalAdm"
                        onSubmit={handleEditar}
                >
                    <label htmlFor="">Nombre</label>
                    <input type="text" 
                        value={nombre}
                        onChange={(e)=>setNombre(e.target.value)}
                    />

                    {errores.nombre && <span className="mensajeError">{errores.nombre}</span>}

                    <label htmlFor="">Coste</label>
                    <input type="number" 
                            value={coste}
                            onChange={(e)=>setCoste(e.target.value)}
                    />

                    {errores.coste && <span className="mensajeError">{errores.coste}</span>}

                    <label htmlFor="">Localizacion</label>
                    <input type="text"
                            value={localizacion}
                            onChange={(e)=>setLocalizacion(e.target.value)}
                    />

                    {errores.localizacion && <span className="mensajeError">{errores.localizacion}</span>}

                    {
                        Categoria !== 'personal' &&
                        <>
                            <label htmlFor="">Categoria</label>
                            <select id=""
                                    value={Categoria}
                                    onChange={(e)=>setCategorias(e.target.value)}
                                >
                                    <option value="">Seleccione una opcion</option>
                                    <option value="restauracion">Obra civíl</option>
                                    <option value="adecuacion">Obra Pública</option>
                                </select>

                            {errores.Categoria && <span className="mensajeError">{errores.Categoria}</span>}
                        </>
                    }

                    <label htmlFor="">Imagen</label>
                    <input type="file" 
                            onChange={(e)=>setImagen(e.target.files[0])}
                    />
                    
                    {errores.Imagen && <span className="mensajeError">{errores.Imagen}</span>}

                    <button>Aceptar</button>
                    <button type="button"
                            onClick={handleLimpiarCampos}
                            >Cancelar</button>

                </form>
            }

            {
                añadirImagen && 
                    <div className="tarjeta-personal-Adm">
                        <form key={formKey}  className="tarjeta-personal-card" onSubmit={handleSubir}>
                            <input
                                type="file"
                                multiple
                                onChange={(e) => setImagenes(Array.from(e.target.files))}
                            />

                        {errores.imagenes && <span className="mensajeError">{errores.imagenes}</span>}

                            <button>Aceptar</button>
                            <button type="button" onClick={handleLimpiar}>Cancelar</button>
                        </form>
                    </div>
            }

            <div className="tarjeta-personal-Adm">
                {
                    proyectos.map((dato) => (
                        <div className="tarjeta-personal-card" key={dato.id}>
                          
                            <img src={dato.imagen} alt="No disponible" className="imagenTarjeta" />

                            <div className="tarjeta-personal-fila">
                                <label>Nombre</label>
                                <p>{dato.nombre}</p>
                            </div>
                            <div className="tarjeta-personal-fila">
                                <label>Coste</label>
                                <p>{dato.coste} €</p>
                            </div>

                            <div className="boton-proyecto-fila">

                                <button onClick={()=>handleEnviar(dato.id)}>Subir imágenes</button>
                            </div>

                            <div className="boton-proyecto-fila">

                                <button onClick={()=>handleVer(dato.id)}>Ver imágenes</button>
                            </div>

                            <div className="boton-proyecto-fila">
                                <button
                                    onClick={()=>
                                        handleBotonEditar(
                                            dato.id,
                                            dato.nombre,
                                            dato.coste,
                                            dato.localizacion,
                                            dato.categoria,
                                            dato.imagen
                                        )
                                    }
                                >
                                    Editar Proyecto
                                </button>
                            </div>

                            
                            
                        </div>
                    ))
                }
            </div>
            
        </>
    )
}