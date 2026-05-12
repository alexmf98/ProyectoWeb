import { router, usePage } from "@inertiajs/react"
import "../Styles/ProyectoPersonalAdmin.css";
import { useState } from "react";

export default function ProyectoPersonalAdmin() {

    const { proyectos } = usePage().props;

    const [imagenes, setImagenes] = useState([]);
    const [id, setId] = useState(null);

    const handleEnviar = (id) =>{
        setId(id);
    }

    const handleLimpiar = ()=>{
        setId();
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

    return (
        <>
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

                        </div>
                    ))
                }
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
                            <button type="submit" onClick={handleLimpiar}>Cancelar</button>
                        </form>
                    </div>
            }
        </>
    )
}