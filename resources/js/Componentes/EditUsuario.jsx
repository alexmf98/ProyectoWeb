import { router, usePage } from "@inertiajs/react";
import { useMemo, useState } from "react"
import "../Styles/EditUsuarioAdmin.css";
import "../Styles/Errores.css";
import { useAuth } from "../Hooks/useAuth";

export default function EditUsuario() {

    const [editar, setEditar] = useState(false);

    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [errores, setErrores] = useState({});
    const [segundoapellido, setSegundoApellido] = useState("");
    const [dni, setDni] = useState("");
    const [fechanacimiento, setFechaNacimiento] = useState("");
    const [apellido, setApellido] = useState("");

    const {user} = useAuth();
    
    const { usuarios, errors  } = usePage().props;

    const [filtro, setFiltro] = useState("");

    const usuariosFiltrados = useMemo(() => {
        const base = usuarios.filter(usuario => usuario.id !== user.id);
        
        if(!filtro) return base;
        
        return base.filter(usuario =>
            usuario.name.toLowerCase().includes(filtro.toLowerCase()) ||
            usuario.role.toLowerCase().includes(filtro.toLowerCase())
        );
    }, [usuarios, user.id, filtro]);
    

    const validar = () =>{

        const nuevosErrores = {}

        if(!name.trim()){
            nuevosErrores.name = "El nombre es obligatorio"
        }else if(!/^[a-zA-Z]+$/.test(name)){
            nuevosErrores.name = "El nombre no puede contener caracteres ni numeros"
        }

        if(!apellido.trim()){
            nuevosErrores.apellido = "Apellido es obligatorio"
        }

        if(!email.trim()){
            nuevosErrores.email = "El email no puede estar vacio"
        }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            nuevosErrores.email = "El formato del email no es correcto"
        }

        if (segundoapellido?.trim() && /[0-9]/.test(segundoapellido)) {
            nuevosErrores.segundoapellido = "El apellido no puede contener números";
        }

        if (role === 'trabajador') {
            if (dni) {
                if (!/^[0-9]{8}[A-Z]$/.test(dni)) {
                    nuevosErrores.dni = "El DNI debe tener 8 números seguidos de una letra mayúscula";
                } else {
                    const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
                    const letraCorrecta = letras[parseInt(dni.slice(0, 8)) % 23];
                    if (dni[8] !== letraCorrecta) {
                        nuevosErrores.dni = "La letra del DNI no es correcta";
                    }
                }
            }

            if (segundoapellido?.trim() && /[0-9]/.test(segundoapellido)) {
                nuevosErrores.segundoapellido = "El apellido no puede contener números";
            }
    
            if (fechanacimiento) {
                const hoy = new Date();
                const nacimiento = new Date(fechanacimiento);
                const edad = hoy.getFullYear() - nacimiento.getFullYear();
                const mesesDif = hoy.getMonth() - nacimiento.getMonth();
                const edadReal = mesesDif < 0 || (mesesDif === 0 && hoy.getDate() < nacimiento.getDate())
                                    ? edad - 1
                                    : edad;
    
                if (edadReal < 18) {
                    nuevosErrores.fechanacimiento = "Debe ser mayor de 18 años";
                }
            }
        }

        return nuevosErrores;
    }

    const handleSubir = () => {
        window.scrollTo({top:0, behavior:"smooth"});
    }
    

    const clickEditar = (usuario) => {

        setEditar(true);
        setId(usuario.id);
        setName(usuario.name);
        setEmail(usuario.email);
        setRole(usuario.role);
        setDni(usuario.dni ?? "");
        setSegundoApellido(usuario.segundo_apellido ?? "");
        setFechaNacimiento(usuario.fecha_nacimiento ?? "");
        setApellido(usuario.apellido);
        handleSubir();
        setErrores({});
    }

    const handleEditar = (e) => {
        e.preventDefault();

        const erroresValidacion = validar();

        if(Object.keys(erroresValidacion).length > 0){
            setErrores(erroresValidacion);

            return
        }

        setErrores({});

        router.put(`/editarUsuario/${id}`, {
            name: name.toLowerCase(),
            email: email,
            role: role,
            dni: dni,
            fecha_nacimiento: fechanacimiento,
            segundo_apellido: segundoapellido.toLowerCase(),
            apellido: apellido.toLowerCase(),
        }, {
            onSuccess: () => setEditar(false),
        });

       
    }

    const clickDesactivar = (id, is_active) =>{
        const confirmacion = is_active ? confirm("¿Desea desactivar esta cuenta?") 
                                : confirm("¿Desea activar esta cuenta?");
        
        confirmacion && router.put(`/desactivarPerfilAdmin/${id}`,{
            is_active: is_active ? false : true,
        });

        return confirmacion == is_active ? alert("Cuenta desactivada") : alert("Cuenta activada");
    }

    const capitalizar = (str) => {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    return (
        <>
            <div className="buscadorUsuario">
                <input
                    type="text"
                    placeholder="Buscar por nombre o rol..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                />
            </div>


            {editar &&


            <div className="formularioEditAdmin">
                <form onSubmit={handleEditar}>

                {errors.errorupdate && 
                    <span className="mensajeError">{errors.errorupdate}</span>
                }

                    <label htmlFor="nombre">Nombre</label>
                    <input type="text"
                        id="nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />

                    {errores.name && <span className="mensajeError">{errores.name}</span>}

                    <label htmlFor="apelldio">Apellido</label>
                                <input type="text"
                                        id="apellido"
                                        value={apellido}
                                        onChange={(e)=>setApellido(e.target.value)}
                                    />

                                {errores.apellido && 
                                                    <span className="mensajeError">{errores.apellido}</span>
                                                }

                    <label htmlFor="apellidodos">Segundo apellido</label>
                                <input type="text"
                                        value={segundoapellido}
                                        onChange={(e)=>setSegundoApellido(e.target.value)}
                                    />

                                {errores.segundoapellido && 
                                                    <span className="mensajeError">{errores.segundoapellido}</span>
                                                }

                    <label htmlFor="email">Email</label>
                    <input type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                        {(errores.email || errors.email) && 
                            <span className="mensajeError">{errores.email || errors.email}</span>
                        }

                    <label htmlFor="role">Role</label>
                    <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="usuario">Usuario</option>
                        <option value="trabajador">Trabajador</option>
                        <option value="administrador">Administrador</option>
                    </select>

                    {
                        role === 'trabajador' && 
                            <>
                                <label htmlFor="dni">Dni</label>
                                <input type="text" 
                                        value={dni}
                                        onChange={(e)=>setDni(e.target.value.toUpperCase())}
                                    />

                                {(errores.dni || errors.dni) && 
                                    <span className="mensajeError">{errores.dni || errors.dni}</span>
                                }

                                <label htmlFor="fecha_nacimiento">Fecha nacimiento</label>
                                <input type="date"
                                        value={fechanacimiento}
                                        onChange={(e)=>setFechaNacimiento(e.target.value)}
                                    />

                                {errores.fechanacimiento && <span className="mensajeError">{errores.fechanacimiento}</span>}
                            </>
                    }
                    <div className="botonEdit">
                        <button type="submit">Aceptar</button>
                        <button type="button" onClick={()=>setEditar()}>Cancelar</button>
                    </div>
                </form>
            </div>
            }

            <div className="tablaEditUsuarioAdmin">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Segundo Apellido</th>
                            <th>Dni</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th colSpan={2}>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usuariosFiltrados.map((dato) => (
                                <tr key={dato.id}>
                                    <td data-label="Nombre">{capitalizar(dato.name)}</td>
                                    <td data-label="Apellido">
                                        {capitalizar(dato.apellido)}
                                    </td>
                                    <td data-label="Segundo Apellido">
                                        {capitalizar(dato.segundo_apellido)}
                                    </td>
                                    <td data-label="Dni">
                                        {dato.dni}
                                    </td>
                                    <td data-label="Email">
                                        {dato.email}
                                    </td>
                                    <td data-label="Role">
                                        {dato.role}
                                    </td>
                                    <td data-label="Status">
                                        {dato.is_active ? 'activo' : 'desactivada'}
                                    </td>
                                    <td>
                                        {console.log(dato)}
                                        <button onClick={() => clickEditar(dato)}>Editar</button>
                                    </td>
                                    <td>
                                        <button className="deshabilitar" 
                                        onClick={()=>clickDesactivar(dato.id, dato.is_active)} 
                                        >
                                            {dato.is_active ? "Desactivar": "Activar"}
                                        </button>
                                    </td>
                                   
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </>
    )
}