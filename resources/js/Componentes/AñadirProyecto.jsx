import { useState } from "react";
import "../Styles/AñadirProyecto.css";
import "../Styles/Errores.css";
import { router } from "@inertiajs/react";

export default function AñadirProyecto(){
    const [nombre, setNombre] = useState("");
    const [coste, setCoste] = useState(0);
    const [localizacion, setLocalizacion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [imagen, setImagen] = useState("");
    const [formKey, setFormKey] = useState(0);
    const [errores, setErrores] = useState("");

    const validar = () =>{

        const nuevosErrores = {};

        if(!nombre.trim()){
            nuevosErrores.nombre = "El nombre del proyecto es obligatorio"
        }else if(/^[a-zA-Z]$/.test(nombre)){
            nuevosErrores.nombre = "El nombre no puede contener caracteres ni numeros"
        }

        if(coste <= 0){
            nuevosErrores.coste = "El coste no puede ser negativo ni 0"
        }

        if(!localizacion.trim()){
            nuevosErrores.localizacion = "La localizacion es obligatoria"
        }else if(/^[a-zA-Z]$/.test(localizacion)){
            nuevosErrores.localizacion = "La localizacion no puede contener caracteres ni numeros"
        }

        if(!categoria.trim()){
            nuevosErrores.categoria = "Selecciona una categoria"
        }

        if(!imagen){
            nuevosErrores.imagen = "Debe de incluir una imagen"
        }else if(!/\.(jpg|jpeg|png)$/i.test(imagen.name)){
            nuevosErrores.imagen = "Formatos permitidos jpg, png, jpeg"
        }

        return nuevosErrores;
    }

    const handleEnviar = (e) =>{
        e.preventDefault();

        const erroresValidacion = validar();

        if(Object.keys(erroresValidacion).length > 0){
            setErrores(erroresValidacion);
            
            return;
        }

        setErrores({});

        router.post('/añadirproyecto',{
            nombre: nombre,
            coste: coste,
            localizacion: localizacion,
            categoria: categoria,
            imagen: imagen,
        });
        
        handleLimpiarCampos();
    }

    const handleLimpiarCampos = ()=>{
        setNombre("");
        setCoste(0);
        setLocalizacion("");
        setCategoria("");
        setImagen("");
        setErrores({});
        setFormKey(prev => prev + 1);
    }
        
    return(
        <>
            <div className="tarjetaAñadirProyecto">
                <form key={formKey} onSubmit={handleEnviar}>
                    
                    <label htmlFor="nombre">Nombre</label>

                    <input type="text"
                            value={nombre}
                            onChange={(e)=>setNombre(e.target.value)} />

                    {errores.nombre && <span className="mensajeError">{errores.nombre}</span>}

                    <label htmlFor="coste">Coste</label>

                    <input type="number" 
                            value={coste}
                            onChange={(e)=>setCoste(e.target.value)}/>

                    {errores.coste && <span className="mensajeError">{errores.coste}</span>}

                    <label htmlFor="localizacion">Localización</label>

                    <input type="text"
                            value={localizacion}
                            onChange={(e)=>setLocalizacion(e.target.value)} />

                    {errores.localizacion && <span className="mensajeError">{errores.localizacion}</span>}

                    <label htmlFor="categoria">Categoria</label>

                    <select value={categoria} id="categoria" onChange={(e)=>setCategoria(e.target.value)}>
                        <option value="">Seleccione una categoria</option>
                        <option value="restauracion">Obra civíl</option>
                        <option value="adecuacion">Obra pública</option>
                    </select>

                    {errores.categoria && <span className="mensajeError">{errores.categoria}</span>}

                    <label htmlFor="imagen">Imagen</label>

                    <input type="file" onChange={(e)=>setImagen(e.target.files[0])}/>

                    {errores.imagen && <span className="mensajeError">{errores.imagen}</span>}

                    <div className="botonAñadirProyecto">
                        <button type="submit">Aceptar</button>
                        
                        <button type="button"
                                onClick={handleLimpiarCampos}
                            >Cancelar
                        </button>
                    
                    </div>
                </form>
            </div>
        </>
    )
}