import { router, usePage } from "@inertiajs/react";
import "../Styles/ImagenProyecto.css";
import { useAuth } from "../Hooks/useAuth";
export default function ImagenProyecto() {

    
    const { proyecto, imagenes } = usePage().props;
    const {isAdmin} = useAuth();

    const handleEliminar = (id) =>{
        router.delete(`/eliminarImagen/${id}`)
    }

    return (
        <>
            <h1>{proyecto.nombre}</h1>

            <div className="galeria-imagenes">
                {imagenes.map((img) => (
                    <div key={img.id} className="galeria-imagen-card">
                        <img src={img.url} alt={proyecto.nombre} />
                       {
                        isAdmin &&
                            <button onClick={() => handleEliminar(img.id)}>
                                Eliminar
                            </button>
                       }
                    </div>
                ))}
            </div>



        </>
    )
}