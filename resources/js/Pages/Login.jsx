import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Formulario from "../Componentes/Formulario";

export default function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {errors} = usePage().props;

    const handleLogin = (e)=>{

        e.preventDefault();

        router.post('/login', {
            email: email,
            password:  password,
        });
    }

    return(

        <>
            <h1>{errors.is_active}</h1>
            
            <Formulario submit={handleLogin}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        texto={'Iniciar Sesión'} />
        </>
        
    );
}