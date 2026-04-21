import "../Styles/Informacion.css";
import { useState } from "react";
import { useAuth } from "../Hooks/useAuth";

export default function InformacionDisponibilidad() {
    const { user } = useAuth();

    const [prueba, setPrueba] = useState(false);

    const handlePrueba = () => {
        setPrueba(!prueba);
    }

    return (
        <>
            {user &&
                <>
                    <h2>Buscar Disponibilidad</h2>
                    <div className="tarjetaFormulario2">
                        <form>
                            <label htmlFor="fecha_inicio">Fecha Inicio</label>
                            <input type="date" />

                            <label htmlFor="fecha_fin">Fecha Fin</label>
                            <input type="date" />

                            <button type="button" onClick={handlePrueba}>Buscar disponibilidad</button>
                        </form>
                    </div>
                </>
            }
            <form>
                {prueba &&

                    <button>Alquilar</button>
                }
            </form>
        </>
    )
}