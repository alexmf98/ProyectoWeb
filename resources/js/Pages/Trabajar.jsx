import "../Styles/Trabajar.css";

export default function Trabajar(){
    return(
        <>

            <div className="contenedorTrabajar">
                <h1>Trabajar con nosotros</h1>
                
                <div className="tarjetaTrabajar">
                    <form action="">

                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" />

                        <label htmlFor="telefono">Telefono</label>
                        <input id="telefono" type="text" placeholder="numero de teléfono"/>

                        <input type="file" placeholder="Añade tu CV"/>

                        <div className="botonTrabajar">
                            <button>Aceptar</button>

                            <button>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}