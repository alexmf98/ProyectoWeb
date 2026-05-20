import "../Styles/Login.css";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import "../Styles/Errores.css";

export default function FormularioEditar() {

    const { nombre, apellido, email } = useAuth();

    const [name, setName] = useState(nombre || "");
    const [apell, setApell] = useState(apellido || "");
    const [Email, setEmail] = useState(email || "");
    const [password, setPassword] = useState("");
    const [errores, setErrores] = useState({});

    const validar = () => {
        const nuevosErrores = {};
    
        if(!name.trim()){
            nuevosErrores.name = "El nombre es obligatorio";
        }else if(!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)){
            nuevosErrores.name = "El nombre solo puede contener letras";
        }
    
        if(!apell.trim()){
            nuevosErrores.apell = "El apellido es obligatorio";
        }else if(!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apell)){
            nuevosErrores.apell = "El apellido solo puede contener letras";
        }
    
        if(!Email.trim()){
            nuevosErrores.Email = "El email es obligatorio";
        }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)){
            nuevosErrores.Email = "El formato del email no es válido";
        }
    
        // password opcional, solo valida si rellena algo
        if(password && password.length < 8){
            nuevosErrores.password = "La contraseña debe tener al menos 8 caracteres";
        }
    
        return nuevosErrores;
    }


    const handleEdit = (e) => {

        e.preventDefault();

        const erroresValidacion = validar();

        if(Object.keys(erroresValidacion).length > 0){
            setErrores(erroresValidacion);
            return;
        }
    
        setErrores({});

        router.post('/editPerfil', {
            name: name,
            apellido: apell,
            email: Email,
            password: password,
        });
    }
   
    return (
        <div className="contenedorFormulario">
            <form onSubmit={handleEdit} className="tarjetaFormulario">

                <label htmlFor="name">Nombre de Usuario</label>

                <input id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                
                {errores.name && <span className="mensajeError">{errores.name}</span>}


                <label htmlFor="apellido">Apellido</label>

                <input id="apellido"
                    type="text"
                    value={apell}
                    onChange={(e) => setApell(e.target.value)} />

                {errores.apell && <span className="mensajeError">{errores.apell}</span>}


                <label htmlFor="email">Email</label>

                <input id="email"
                    type="text"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)} />

{               errores.Email && <span className="mensajeError">{errores.Email}</span>}


                <label htmlFor="password">
                    Contraseña
                    <span>
                        Si dejas en blanco la contraseña se mantendra la actual*
                    </span>

                </label>

                {errores.password && <span className="mensajeError">{errores.password}</span>}


                <input id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Editar Perfil</button>
            </form>

        </div>
    );
}