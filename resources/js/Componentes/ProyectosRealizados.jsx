import "../Styles/Home.css";

export default function ProyectosRealizados({ children }) {
    return (
        <>
            <div className="proyectosRealizados">

                <h1>
                    Proyectos realizados
                </h1>
                
                <div className="imagenesProyectos">

                    {children}

                </div>

            </div >
        </>
    )
}