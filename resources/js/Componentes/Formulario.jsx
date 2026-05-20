import "../Styles/Login.css";
import "../Styles/Errores.css";
import { useState } from "react";
import { router, usePage } from "@inertiajs/react";

export default function Formulario(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errores, setErrores] = useState({});

    const { errors } = usePage().props;

    const validar = () => {
        const nuevosErrores = {};

        if (!email.trim()) {
            nuevosErrores.email = "El email es obligatorio.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            nuevosErrores.email = "El formato del email no es válido.";
        }

        if (!password.trim()) {
            nuevosErrores.password = "La contraseña es obligatoria.";
        }

        return nuevosErrores;
    };

    const handleLogin = (e) => {

        e.preventDefault();

        const erroresValidacion = validar();

        if (Object.keys(erroresValidacion).length > 0) {
            setErrores(erroresValidacion);
            return;
        }

        setErrores({});

        router.post('/login', {
            email: email,
            password: password,
        });
    }

    return (
        <>
            {errors.email && (
                <div className="mensajeErrorInicio">
                    {errors.email}
                </div>
            )}

            {
                errors.is_active && (
                    <div className="mensajeErrorInicio">
                        {errors.is_active}
                    </div>
                )
            }

        <div className="contenedorFormulario">
            <form onSubmit={handleLogin} className="tarjetaFormulario">

                <label htmlFor="email">Email</label>

                <input id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errores.email ? "inputError" : ""}
                />

                {errores.email && <span className="mensajeError">{errores.email}</span>}
                

                <label htmlFor="password">Contraseña</label>

                <input id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={errores.password ? "inputError" : ""}
                />

                {errores.password && <span className="mensajeError">{errores.password}</span>}
               
                <button type="submit">Iniciar Sesión</button>

                <a className="crearCuenta" href="/crearcuenta">Crear Cuenta</a>
            </form>

        </div>
        </>
    );
}