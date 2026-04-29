import { router, usePage } from "@inertiajs/react";
import { useState } from "react"
import "../Styles/EditUsuarioAdmin.css";

export default function EditUsuario() {

    const [editar, setEditar] = useState(false);

    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const { usuarios } = usePage().props;

    const clickEditar = (usuario) => {

        setEditar(true);
        setId(usuario.id);
        setName(usuario.name);
        setEmail(usuario.email);
        setRole(usuario.role);
    }

    const handleEditar = (e) => {
        e.preventDefault();

        router.post(`/editarUsuario/${id}`, {
            name: name,
            email: email,
            role: role,
        });

        setEditar(!editar);
    }

    const clickDesactivar = () =>{
        const confirmacion = confirm("¿Desea desactivar esta cuenta?");

        return confirmacion ? alert("Cuenta desactivada") : "";
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
                            <th colSpan={2}>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usuarios.map((dato) => (
                                <tr>
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
                                        <button onClick={() => clickEditar(dato)}>Editar</button>
                                    </td>
                                    <td>
                                        <button onClick={()=>clickDesactivar()} className="deshabilitar">Deshabilitar</button>
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