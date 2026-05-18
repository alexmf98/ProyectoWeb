import { router, usePage } from "@inertiajs/react"
import "../Styles/ProyectoPersonalAdmin.css";
import { useState } from "react";

export default function ProyectoPersonalAdmin() {

    const { proyectos } = usePage().props;

    const [imagenes, setImagenes] = useState([]);
    const [id, setId] = useState("");
    const [categoria, setCategoria] = useState("");

    const subir = ()=>{
        window.scrollTo({top:0, behavior: "smooth"})
    }

    const handleEnviar = (id) =>{
        setId(id);
        subir();
    }

    const handleLimpiar = ()=>{
        setId("");
        setCategoria("");
        router.get('/proyectoPersonalAdm', {}, { replace: true });
    }

    const handleSubir = (e) => {
        e.preventDefault();

        const formData = new FormData();
        imagenes.forEach(img => formData.append('imagenes[]', img));

        router.post(`/subirimagen/${id}`, formData);
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
                id && 
                    <div className="tarjeta-personal-Adm">
                        <form className="tarjeta-personal-card" onSubmit={handleSubir}>
                            <input
                                type="file"
                                multiple
                                onChange={(e) => setImagenes(Array.from(e.target.files))}
                            />

                            <button>Aceptar</button>
                            <button type="button" onClick={handleLimpiar}>Cancelar</button>
                        </form>
                    </div>
            }

            <div className="tarjeta-personal-Adm">
                {
                    proyectos.map((dato) => (
                        <div className="tarjeta-personal-card" key={dato.id}>
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
                                <button>Editar Proyecto</button>
                            </div>
                            
                        </div>
                    ))
                }
            </div>
            
        </>
    )
}