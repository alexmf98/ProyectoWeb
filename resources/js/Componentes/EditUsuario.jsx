import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react"
import "../Styles/EditUsuarioAdmin.css";
import { useAuth } from "../Hooks/useAuth";

export default function EditUsuario() {

    const [editar, setEditar] = useState(false);

    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    
    
    const [users, setUsers] = useState([]);
    const {user} = useAuth();
    
    const { usuarios } = usePage().props;
    

    useEffect(()=>{
        const handleFiltrar = usuarios.filter((usuario) => usuario.id !== user.id);

        setUsers(handleFiltrar);
    }, [usuarios, user.id]); 
    

    const clickEditar = (usuario) => {

        setEditar(true);
        setId(usuario.id);
        setName(usuario.name);
        setEmail(usuario.email);
        setRole(usuario.role);
    }

    const handleEditar = (e) => {
        e.preventDefault();

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

                        <input type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />

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