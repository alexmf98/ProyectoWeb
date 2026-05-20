import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react"
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
    
    
    const [users, setUsers] = useState([]);
    const {user} = useAuth();
    
    const { usuarios } = usePage().props;
    

    useEffect(()=>{
        const handleFiltrar = usuarios.filter((usuario) => usuario.id !== user.id);

        setUsers(handleFiltrar);
    }, [usuarios, user.id]); 

    const validar = () =>{

        const nuevosErrores = {}

        if(!name.trim()){
            nuevosErrores.name = "El nombre es obligatorio"
        }else if(!/^[a-zA-Z]+$/.test(name)){
            nuevosErrores.name = "El nombre no puede contener caracteres ni numeros"
        }

        if(!email.trim()){
            nuevosErrores.email = "El email no puede estar vacio"
        }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            nuevosErrores.email = "El formato del email no es correcto"
        }

        return nuevosErrores;
    }
    

    const clickEditar = (usuario) => {

        setEditar(true);
        setId(usuario.id);
        setName(usuario.name);
        setEmail(usuario.email);
        setRole(usuario.role);
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
            name: name,
            email: email,
            role: role,
        });

        setEditar(!editar);
    }

    const clickDesactivar = (id, is_active) =>{
        const confirmacion = is_active ? confirm("¿Desea desactivar esta cuenta?") 
                                : confirm("¿Desea activar esta cuenta?");
        
        confirmacion && router.put(`/desactivarPerfilAdmin/${id}`,{
            is_active: is_active ? false : true,
        });

        return confirmacion == is_active ? alert("Cuenta desactivada") : alert("Cuenta activada");
    }
    return (
        <>
            <div className="tablaEditUsuarioAdmin">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th colSpan={2}>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((dato) => (
                                <tr key={dato.id}>
                                    <td>
                                        {dato.name}
                                    </td>
                                    <td>
                                        {dato.apellido}
                                    </td>
                                    <td>
                                        {dato.email}
                                    </td>
                                    <td>
                                        {dato.role}
                                    </td>
                                    <td>
                                        {dato.is_active ? 'activo' : 'desactivada'}
                                    </td>
                                    <td>
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


            {editar &&

                <div className="formularioEditAdmin">
                    <form onSubmit={handleEditar}>

                        <input type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)} />

                        {errores.name && <span className="mensajeError">{errores.name}</span>}

                        <input type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />

                        {errores.email && <span className="mensajeError">{errores.email}</span>}

                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="usuario">Usuario</option>
                            <option value="trabajador">Trabajador</option>
                            <option value="administrador">Administrador</option>
                        </select>
                        <div className="botonEdit">
                            <button type="submit">Aceptar</button>
                            <button type="button" onClick={()=>setEditar()}>Cancelar</button>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}