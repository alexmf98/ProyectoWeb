import "../Styles/Informacion.css";
import { useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import Calendario from "./Calendario.jsx";
import { router, usePage } from "@inertiajs/react";

export default function InformacionDisponibilidad() {
    const { user } = useAuth();
    const { maquina } = usePage().props;


    const [prueba, setPrueba] = useState(false);

    const [fecha_inicio, setFechaInicio] = useState("");
    const [fecha_fin, setFechaFin] = useState("");
    const [numTarjeta, setNumTarjeta] = useState("");
    const [cvv, setCvv] = useState("");
    const [pin, setPin] = useState("");

    const handlePrueba = () => {
        setPrueba(!prueba);
    }

    const handleAlquiler = (e) => {

        e.preventDefault();

        router.post('/maquinariaAlquiler', {
            user_id: user.id,
            maquinaria_id: maquina.id,
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            numero_tarjeta: numTarjeta,
            cvv: cvv,
            pin: pin,
        });
    }

    return (
        <>
            {user &&
                <>

                    <h2>Disponibilidad</h2>

                    <div className="calendario-wrapper">
                        <Calendario />
                    </div>

                    <div className="tarjetaFormulario2">

                        <label htmlFor="fecha_inicio">Fecha Inicio</label>
                        <input type="date"
                            onChange={(e) => setFechaInicio(e.target.value)}
                        />

                        <label htmlFor="fecha_fin">Fecha Fin</label>
                        <input type="date"
                            onChange={(e) => setFechaFin(e.target.value)}
                        />
                    

                    {
                        fecha_inicio && fecha_fin &&
                            <button type="button"
                                onClick={handlePrueba}>
                                Alquilar
                            </button>
                    }

                    </div>
                </>
            }
            {prueba &&
                <form onSubmit={handleAlquiler} className="formulario-pago">

                    <div className="form-seccion-fechas">
                        <div className="form-field">
                            <label>Fecha inicio</label>
                            <input type="text" value={fecha_inicio} readOnly />
                        </div>
                        <div className="form-field">
                            <label>Fecha fin</label>
                            <input type="text" value={fecha_fin} readOnly />
                        </div>
                    </div>

                    <div className="form-field">
                        <label>Número de tarjeta</label>
                        <input type="text" value={numTarjeta}
                            placeholder="1234 5678 9012 3456"
                            onChange={(e) => setNumTarjeta(e.target.value)} />
                    </div>

                    <div className="fila-pago">
                        <div className="form-field">
                            <label>CVV</label>
                            <input type="text" value={cvv}
                                placeholder="123"
                                onChange={(e) => setCvv(e.target.value)} />
                        </div>
                        <div className="form-field">
                            <label>PIN</label>
                            <input type="text" value={pin}
                                placeholder="••••"
                                onChange={(e) => setPin(e.target.value)} />
                        </div>
                    </div>

                    <div className="form-botones">
                        <button type="submit">Confirmar alquiler</button>
                        <button type="button">Cancelar</button>
                    </div>

                </form>
            }
        </>
    )
}