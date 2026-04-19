import "../Styles/Login.css";

export default function Formulario({submit, email, setEmail, password, setPassword, texto}){

    return(
        <div className="contenedorFormulario">
            <form onSubmit={submit} className="tarjetaFormulario">
                
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

                <button type="submit">{texto}</button>

                <a className="crearCuenta" href="/crearcuenta">Crear Cuenta</a>
            </form>
            
        </div>
    );
}