import { router } from "@inertiajs/react";
import { useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import FormularioEditar from "../Componentes/FormularioEditar";

export default function EditPerfil() {

    const {nombre, apellido, email} = useAuth();

    const [name, setName] = useState(nombre || "");
    const [apell, setApell] = useState(apellido || "");
    const [Email, setEmail] = useState(email || "");
    const [password, setPassword] = useState("");

    const handleEdit = (e) => {
        
        e.preventDefault();

        router.post('/editPerfil', {
            name: name,
            apellido: apell,
            email: Email,
            password: password,
        });
    }
    console.log(apell)
    return (
        <>
            <FormularioEditar submit={handleEdit}
                name={name}
                setName={setName}
                apell={apell}
                setApell={setApell}
                email={Email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                texto={'Editar Perfil'}
            />
        </>
    );
}