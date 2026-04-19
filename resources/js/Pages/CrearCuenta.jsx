import { useState } from "react";

import { router } from "@inertiajs/react";
import FormularioCrear from "../Componentes/FormularioCrear";

export default function CrearCuenta() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleCrearCuenta = (e) => {

        e.preventDefault();

        router.post('/crearcuenta', {
            name: name,
            email: email,
            password: password,
        });
    }

    return (
        <FormularioCrear submit={handleCrearCuenta}
                        name={name}
                        setName={setName}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        texto={'Crear Cuenta'} 
        />
    )
}