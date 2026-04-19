import { useState } from "react";
import { router } from "@inertiajs/react";
import Formulario from "../Componentes/Formulario";

export default function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const handleLogin = (e)=>{

        e.preventDefault();

        router.post('/login', {
            email: email,
            password:  password,
        });
    }

    return(
        <Formulario submit={handleLogin}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    texto={'Iniciar Sesión'} />
    );
}