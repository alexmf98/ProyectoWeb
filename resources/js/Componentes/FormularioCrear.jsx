import "../Styles/Login.css";

export default function FormularioCrear({submit,name, setName,
                                                apellido, setApellido,
                                                email, setEmail, 
                                        password, setPassword, texto}){

    return(
        <div className="contenedorFormulario">
            <form onSubmit={submit} className="tarjetaFormulario">

                <label htmlFor="name">Nombre de Usuario</label>
                
                <input id="name" 
                    type="text" 
                    value={name} 
                    onChange={(e)=>setName(e.target.value)}/>

                <label htmlFor="apellido">Apellido</label>

                <input type="text"
                        value={apellido}
                        onChange={(e)=>setApellido(e.target.value)} />
                
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
            </form>
            
        </div>
    );
}