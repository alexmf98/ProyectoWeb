import "../Styles/Login.css";
import "../Styles/Errores.css";
import { useState } from "react";
import { router, usePage } from "@inertiajs/react";

export default function FormularioCrear() {
    const [name, setName] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errores, setErrores] = useState({});

    const {errors} = usePage().props;
   
    const validar = () => {

        const nuevosErrores = {};

        if(!name.trim()){
            nuevosErrores.name = "El nombre es obligatorio"
        }else if(!/^[a-zA-Z]+$/.test(name)){
            nuevosErrores.name = "El nombre no puede contener caracteres ni números"
        }

        if(!apellido.trim()){
            nuevosErrores.apellido = "El apellido es obligatorio"
        }else if(!/^[a-zA-Z]+$/.test(apellido)){
            nuevosErrores.apellido = "El apellido no puede contener caracteres ni números"
        }

        if(!email.trim()){
            nuevosErrores.email = "El email no puede estar vacio"
        }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            nuevosErrores.email = "El formato del email no es válido.";
        }

        if (!password.trim()) {
            nuevosErrores.password = "La contraseña es obligatoria.";
        }

        return nuevosErrores;
    }


    const handleCrearCuenta = (e) => {

        e.preventDefault();

        const erroresValidacion = validar();

        if(Object.keys(erroresValidacion).length > 0){
            setErrores(erroresValidacion);

            return;
        }

        setErrores({});

        router.post('/crearcuenta', {
            name: name,
            apellido: apellido,
            email: email,
            password: password,
        });
    }

    return (
        <>
        {
            errors.errorcreate && 
                <div className="mensajeErrorInicio">
                    {errors.errorcreate}
                </div>
        }

        <div className="contenedorFormulario">
            <form onSubmit={handleCrearCuenta} className="tarjetaFormulario">

                <label htmlFor="name">Nombre de Usuario</label>

                <input id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />

                {errores.name && <span className="mensajeError">{errores.name}</span>}

                <label htmlFor="apellido">Apellido</label>

                <input type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)} />

                {errores.apellido && <span className="mensajeError">{errores.apellido}</span>}

                <label htmlFor="email">Email</label>

                <input id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />

                {errores.email && <span className="mensajeError">{errores.email}</span>}

                <label htmlFor="password">Contraseña</label>

                <input id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                {errores.password && <span className="mensajeError">{errores.password}</span>}

                <button type="submit">Crear Cuenta</button>
            </form>

        </div>
    </>
    );
}