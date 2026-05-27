import "../Styles/Login.css";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import "../Styles/Errores.css";

export default function FormularioEditar() {

    const { nombre, apellido, email, segundo_apellido, dni, fecha_nacimiento, trabajador } = useAuth();
    const { errors } = usePage().props;

    const [name, setName] = useState(nombre || "");
    const [apell, setApell] = useState(apellido || "");
    const [Email, setEmail] = useState(email || "");
    const [password, setPassword] = useState("");
    const [errores, setErrores] = useState({});
    const [segundoApellido, setSegundoApellido] = useState(segundo_apellido || "");
    const [Dni, setDni] = useState(dni || "");
    const [fechaNacimiento, setFechaNacimiento] = useState(fecha_nacimiento || "");

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

        if (trabajador) {
            if (!Dni.trim()) {
                nuevosErrores.Dni = "Rellene este campo";
            } else if (!/^[0-9]{8}[A-Z]$/.test(Dni)) {
                nuevosErrores.Dni = "El DNI debe tener 8 números seguidos de una letra mayúscula";
            } else {
                const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
                const letraCorrecta = letras[parseInt(Dni.slice(0, 8)) % 23];
                if (Dni[8] !== letraCorrecta) {
                    nuevosErrores.Dni = "La letra del DNI no es correcta";
                }
            }
        }

        if (trabajador) {
            if (!fechaNacimiento.trim()) {
                nuevosErrores.fechaNacimiento = "Rellene este campo";
            } else {
                const hoy = new Date();
                const nacimiento = new Date(fechaNacimiento);
                const edad = hoy.getFullYear() - nacimiento.getFullYear();
                const mesesDif = hoy.getMonth() - nacimiento.getMonth();
                const edadReal = mesesDif < 0 || (mesesDif === 0 && hoy.getDate() < nacimiento.getDate())
                                    ? edad - 1
                                    : edad;

                if (edadReal < 18) {
                    nuevosErrores.fechaNacimiento = "Debe ser mayor de 18 años";
                }
            }
        }

        if(!Email.trim()){
            nuevosErrores.Email = "El email es obligatorio";
        }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)){
            nuevosErrores.Email = "El formato del email no es válido";
        }
    
        if(password && password.length < 8){
            nuevosErrores.password = "La contraseña debe tener al menos 8 caracteres";
        }

        if (segundoApellido.trim() && /[0-9]/.test(segundoApellido)) {
            nuevosErrores.segundoApellido = "El apellido no puede contener números";
        }

        if (Dni) {
            if (!/^[0-9]{8}[A-Z]$/.test(Dni)) {
                nuevosErrores.Dni = "El DNI debe tener 8 números seguidos de una letra mayúscula";
            } else {
                
                const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
                const letraCorrecta = letras[parseInt(Dni.slice(0, 8)) % 23];
                if (Dni[8] !== letraCorrecta) {
                    nuevosErrores.Dni = "La letra del DNI no es correcta";
                }
            }
        }
    
        if (fechaNacimiento) {
            const hoy = new Date();
            const nacimiento = new Date(fechaNacimiento);
            const edad = hoy.getFullYear() - nacimiento.getFullYear();
            const mesesDif = hoy.getMonth() - nacimiento.getMonth();
            const edadReal = mesesDif < 0 || (mesesDif === 0 && hoy.getDate() < nacimiento.getDate()) 
                                ? edad - 1 
                                : edad;
    
            if (edadReal < 18) {
                nuevosErrores.fechaNacimiento = "Debe ser mayor de 18 años";
            }
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
            name: name.toLowerCase(),
            apellido: apell.toLowerCase(),
            email: Email,
            password: password,
            segundo_apellido: segundoApellido.toLowerCase(),
            dni: Dni,
            fecha_nacimiento: fechaNacimiento,
        });
    }
   
    return (
        <div className="contenedorFormulario">

            
            <form onSubmit={handleEdit} className="tarjetaFormulario">

                {errors.errorupdate && <span className="mensajeError">{errors.errorupdate}</span>}

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

                <label htmlFor="seguApellido">Segundo Apellido</label>

                <input id="seguApellido"
                    type="text"
                    value={segundoApellido}
                    onChange={(e) => setSegundoApellido(e.target.value)} />

                {errores.segundoApellido && 
                    <span className="mensajeError">{errores.segundoApellido}</span>
                }

                {
                    trabajador && 
                    <>
                        <label htmlFor="dni">Dni</label>

                        <input id="seguApellido"
                            type="text"
                            value={Dni}
                            onChange={(e) => setDni(e.target.value.toUpperCase())} />

                            {(errores.Dni || errors.dni) && 
                                <span className="mensajeError">{errores.Dni || errors.dni}</span>
                            }
                    </>
                }

                {
                    trabajador && 
                    <>
                        <label htmlFor="fecha_nacimiento">Fecha nacimiento</label>

                        <input id="fech_nac"
                            type="date"
                            value={fechaNacimiento}
                            onChange={(e) => setFechaNacimiento(e.target.value)} />
                        
                        {errores.fechaNacimiento && <span className="mensajeError">{errores.fechaNacimiento}</span>}
                    </>
                }

                

                <label htmlFor="email">Email</label>

                <input id="email"
                    type="text"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)} />

                    {(errores.Email || errors.email) && 
                        <span className="mensajeError">{errores.Email || errors.email}</span>
                    }


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