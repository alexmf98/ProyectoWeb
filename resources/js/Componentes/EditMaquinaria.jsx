import { usePage } from "@inertiajs/react";
import "../Styles/EditarMaquinaria.css";

export default function EditMaquinaria() {

    const { maquina } = usePage().props;

    return (
        <>
            <h1>Editar maquinaria</h1>


            <div className="tarjetaEditMaquinaria">
                <form>

                    <label htmlFor="nombre">Nombre</label>
                    <input type="text"
                        value={maquina.nombre}
                    />

                    <label htmlFor="precio">Precio</label>
                    <input type="number"
                        value={maquina.precio}
                    />

                    <button>Aceptar</button>
                </form>

            </div>


        </>
    );
}