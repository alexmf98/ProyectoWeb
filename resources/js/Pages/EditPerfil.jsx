import { router } from "@inertiajs/react";
import { useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import FormularioEditar from "../Componentes/FormularioEditar";

export default function EditPerfil() {

    const {nombre, email} = useAuth();

    const [name, setName] = useState(nombre || "");
    const [Email, setEmail] = useState(email || "");
    const [password, setPassword] = useState("");

    const handleEdit = (e) => {
        
        e.preventDefault();

        router.post('/editPerfil', {
            name: name,
            email: Email,
            password: password,
        });
    }
    
    return (
        <>
            <FormularioEditar submit={handleEdit}
                name={name}
                setName={setName}
                email={Email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                texto={'Editar Perfil'}
            />
        </>
    );
}