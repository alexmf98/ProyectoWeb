import "../Styles/Login.css";

export default function FormularioEditar({submit,name, setName,email, setEmail, password, setPassword, texto}){

    return(
        <div className="contenedorFormulario">
            <form onSubmit={submit} className="tarjetaFormulario">

                <label htmlFor="name">Nombre de Usuario</label>
                
                <input id="name" 
                    type="text" 
                    value={name} 
                    onChange={(e)=>setName(e.target.value)}/>
                
                <label htmlFor="email">Email</label>
                
                <input id="email" 
                    type="text" 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}/>

                <label htmlFor="password">
                    Contraseña 
                    <span>
                        Si dejas en blanco la contraseña se mantendra la actual*
                    </span>
                
                </label>

                <input id="password" 
                    type="password" 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)} 
                    />

                <button type="submit">{texto}</button>
            </form>
            
        </div>
    );
}