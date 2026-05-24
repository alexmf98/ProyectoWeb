import "../Styles/Informacion.css";
import { useEffect, useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import Calendario from "./Calendario.jsx";
import { router, usePage } from "@inertiajs/react";
import "../Styles/Errores.css";

export default function InformacionDisponibilidad() {
    const { user } = useAuth();
    // const { maquina } = usePage().props;
    const { maquina, alquileres, stock } = usePage().props;


    const [prueba, setPrueba] = useState(false);

    const [fecha_inicio, setFechaInicio] = useState("");
    const [fecha_fin, setFechaFin] = useState("");
    const [numTarjeta, setNumTarjeta] = useState("");
    const [cvv, setCvv] = useState("");
    const [pin, setPin] = useState("");
    const [precio_maq, setPrecioMaq] = useState(0);

    const [errores, setErrores] = useState({});

    const conteoFechas = {};
    alquileres.forEach(alquiler => {
        let inicio = new Date(alquiler.fecha_inicio);
        let fin    = new Date(alquiler.fecha_fin);

        while(inicio <= fin){
            const clave = inicio.toDateString();
            conteoFechas[clave] = (conteoFechas[clave] || 0) + 1;
            inicio.setDate(inicio.getDate() + 1);
        }
    });

    const fechaDisponible = (fecha) => {
        const conteo = conteoFechas[new Date(fecha).toDateString()] || 0;
        return conteo < stock;
    }

    const validarFechas = () => {
        const nuevosErrores = {};
    
        if(!fecha_inicio){
            nuevosErrores.fecha_inicio = "Debe seleccionar una fecha de inicio";
        }
    
        if(!fecha_fin){
            nuevosErrores.fecha_fin = "Debe seleccionar una fecha de fin";
        }
    
        if(fecha_inicio && fecha_fin && fecha_inicio > fecha_fin){
            nuevosErrores.fecha_fin = "La fecha fin no puede ser anterior a la fecha inicio";
        }
    
        return nuevosErrores;
    }
    
    const validarPago = () => {
        const nuevosErrores = {};
    
        if(!numTarjeta.trim()){
            nuevosErrores.numTarjeta = "El número de tarjeta es obligatorio";
        }else if(!/^[0-9]{16}$/.test(numTarjeta.replace(/\s/g, ""))){
            nuevosErrores.numTarjeta = "El número de tarjeta debe tener 16 dígitos";
        }
    
        if(!cvv.trim()){
            nuevosErrores.cvv = "El CVV es obligatorio";
        }else if(!/^[0-9]{3}$/.test(cvv)){
            nuevosErrores.cvv = "El CVV debe tener 3 dígitos";
        }
    
        if(!pin.trim()){
            nuevosErrores.pin = "El PIN es obligatorio";
        }else if(!/^[0-9]{4}$/.test(pin)){
            nuevosErrores.pin = "El PIN debe tener 4 dígitos";
        }
    
        return nuevosErrores;
    }

    const handlePrueba = () => {
        const erroresValidacion = validarFechas();

        if(Object.keys(erroresValidacion).length > 0){
            setErrores(erroresValidacion);
            return;
        }

        setErrores({});
        // setPrueba(!prueba);
        // precio();
        handleLimpiar();
    }

    const handleAlquiler = (e) => {

        e.preventDefault();

        const erroresValidacion = validarPago();

        if(Object.keys(erroresValidacion).length > 0){
            setErrores(erroresValidacion);
            return;
        }

        setErrores({});

        router.post('/maquinariaAlquiler', {
            user_id: user.id,
            maquinaria_id: maquina.id,
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            numero_tarjeta: numTarjeta,
            cvv: cvv,
            pin: pin,
        });

        handleLimpiar();
    }

    // useEffect(() => {

    //     if (!fecha_inicio || !fecha_fin) {
    //         setPrueba(false);
    //         return;
    //     }
    
    //     const hoy = new Date();
    //     hoy.setHours(0,0,0,0);
    
    //     const fInicio = new Date(fecha_inicio);
    //     fInicio.setHours(0,0,0,0);
    
    //     const fFin = new Date(fecha_fin);
    //     fFin.setHours(0,0,0,0);
    
    //     // Fecha fin menor que inicio
    //     if (fFin < fInicio) {
    //         setPrueba(false);
    //         return;
    //     }
    
    //     // Inicio en pasado
    //     if (fInicio < hoy) {
    //         setPrueba(false);
    //         return;
    //     }
    
    //     // Todo correcto
    //     setPrueba(true);

    //     const diferencia = Math.floor(
    //         (fFin - fInicio) / (1000 * 60 * 60 * 24)
    //     );

    //     const precio_maquina = maquina.precio;
    
    //     if (diferencia === 0) {
    //         setPrecioMaq(precio_maquina);
    //     } else {
    //         setPrecioMaq(diferencia * precio_maquina);
    //     }
    
    // }, [fecha_inicio, fecha_fin]);

    useEffect(() => {
        if(!fecha_inicio || !fecha_fin){
            setPrueba(false);
            return;
        }
    
        const hoy = new Date();
        hoy.setHours(0,0,0,0);
    
        const fInicio = new Date(fecha_inicio);
        fInicio.setHours(0,0,0,0);
    
        const fFin = new Date(fecha_fin);
        fFin.setHours(0,0,0,0);
    
        if(fFin < fInicio || fInicio < hoy){
            setPrueba(false);
            return;
        }
    
        // comprueba disponibilidad en todo el rango de fechas
        let cursor = new Date(fInicio);
        while(cursor <= fFin){
            if(!fechaDisponible(cursor)){
                setPrueba(false);
                setErrores({ fecha_fin: "No hay stock disponible en las fechas seleccionadas" });
                return;
            }
            cursor.setDate(cursor.getDate() + 1);
        }
    
        setErrores({});
        setPrueba(true);
    
        const diferencia = Math.floor((fFin - fInicio) / (1000*60*60*24));
        setPrecioMaq(diferencia === 0 ? maquina.precio : diferencia * maquina.precio);
    
    }, [fecha_inicio, fecha_fin]);
    
    // const precio = () => {

    //     // const hoy = new Date();
    //     // hoy.setHours(0,0,0,0);
    
    //     // const fInicio = new Date(fecha_inicio);
    //     // fInicio.setHours(0,0,0,0);
    
    //     // const fFin = new Date(fecha_fin);
    //     // fFin.setHours(0,0,0,0);
    
    //     // const diferencia = Math.floor(
    //     //     (fFin - fInicio) / (1000 * 60 * 60 * 24)
    //     // );
    
    //     // const pasado =
    //     //     fFin < hoy ||
    //     //     (fInicio < hoy && fInicio < fFin && fFin >= hoy);
    
    //     // if (diferencia < 0) {
    //     //     setPrueba(false);
    //     //     return;
    //     // }
    
    //     // if (pasado) {
    //     //     setPrueba(false);
    //     //     return;
    //     // }
    
    //     // if (fInicio >= hoy) {
    //     //     setPrueba(true);
    //     // }
    
    //     // const precio_maquina = maquina.precio;
    
    //     // if (diferencia === 0) {
    //     //     setPrecioMaq(precio_maquina);
    //     // } else {
    //     //     setPrecioMaq(diferencia * precio_maquina);
    //     // }
    // }

    const handleLimpiar = ()=>{
        setPrueba(false);
        setFechaInicio("")
        setFechaFin("")
        setNumTarjeta("")
        setCvv("")
        setPin("")
        setPrecioMaq(0)
        setErrores({})
    }

    return (
        <>
            {user &&
                <>

                    <h2>Disponibilidad</h2>

                    <div className="calendario-wrapper">
                        {/* <Calendario /> */}
                        <Calendario conteoFechas={conteoFechas} stock={stock} />
                    </div>

                    <div className="tarjetaFormulario2">

                        <label htmlFor="fecha_inicio">Fecha Inicio</label>
                        <input type="date" value={fecha_inicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                        />

                   


                        <label htmlFor="fecha_fin">Fecha Fin</label>
                        <input type="date" value={fecha_fin}
                            onChange={(e) => setFechaFin(e.target.value)}
                        />
                        {errores.fecha_fin && <span className="mensajeError">{errores.fecha_fin}</span>}

                    {/* {
                        fecha_inicio && fecha_fin &&
                            <button type="button"
                                onClick={handlePrueba}>
                                Alquilar
                            </button>
                    } */}

                    </div>
                </>
            }
            {prueba &&
                <form onSubmit={handleAlquiler} className="formulario-pago">

                    <div className="form-seccion-fechas">
                        <div className="form-field">
                            <label>Fecha inicio</label>
                            <input type="text" 
                            value={fecha_inicio}
                            onChange={(e)=>setFechaInicio(e.target.value)}
                            readOnly />
                        </div>

                    {errores.fecha_inicio && <span className="mensajeError">{errores.fecha_inicio}</span>}
                       
                        <div className="form-field">
                            <label>Fecha fin</label>
                            <input type="text" value={fecha_fin}
                            onChange={(e)=>setFechaFin(e.target.value)}
                            readOnly />
                        </div>
                    </div>

                    {errores.fecha_fin && <span className="mensajeError">{errores.fecha_fin}</span>}

                    <div className="form-field">
                        <label>Número de tarjeta</label>
                        <input type="text" value={numTarjeta} maxLength={16}
                            placeholder="1234 5678 9012 3456"
                            onChange={(e) => setNumTarjeta(e.target.value)} />
                    </div>

                    {errores.numTarjeta && <span className="mensajeError">{errores.numTarjeta}</span>}


                    <div className="fila-pago">
                        <div className="form-field">
                            <label>CVV</label>
                            <input type="text" value={cvv}
                                placeholder="123"
                                onChange={(e) => setCvv(e.target.value)} />
                        </div>

                        {errores.cvv && <span className="mensajeError">{errores.cvv}</span>}

                        <div className="form-field">
                            <label>PIN</label>
                            <input type="text" value={pin}
                                placeholder="••••"
                                onChange={(e) => setPin(e.target.value)} />
                        </div>

                        {errores.pin && <span className="mensajeError">{errores.pin}</span>}

                        <div className="form-field">
                        
                            <label>Coste Total</label>
                            <input type="text" value={precio_maq + " €"} /> 
                        
                        </div>
                    </div>

                    <div className="form-botones">
                        <button type="submit">Confirmar alquiler</button>
                        <button type="button" onClick={handleLimpiar}>Cancelar</button>
                    </div>

                </form>
            }
        </>
    )
}