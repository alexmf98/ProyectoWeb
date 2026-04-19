import { useState } from "react";
import "../Styles/Login.css";
import { router } from "@inertiajs/react";

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
        <div className="contenedorFormulario">
            <form onSubmit={handleLogin} className="tarjetaFormulario">
                
                <label htmlFor="email">Email</label>
                
                <input id="email" 
                    type="text" 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}/>

                <label htmlFor="password">Contraseña</label>

                <input id="password" 
                    type="password" 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)} />

                <button type="submit">Iniciar Sesión</button>
            </form>
            
        </div>
    );
}