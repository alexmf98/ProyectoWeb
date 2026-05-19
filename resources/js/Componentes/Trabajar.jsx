import { useState } from "react";
import "../Styles/Trabajar.css";
import { router } from "@inertiajs/react";

export default function Trabajar(){
    
    const [email, setEmail] = useState("");
    const [cv, setCv] = useState("");
    const [formKey, setFormKey] = useState(0);

    const handleMandarCv = (e)=>{

        e.preventDefault();
    
        const newFormData = new FormData();

        newFormData.append("email", email);
        newFormData.append("cv", cv);

        router.post('/mandarcv', newFormData);

        handleLimpiarCampos();
    }

    const handleLimpiarCampos = () =>{
        setEmail("");
        setCv("");
        setFormKey(prev => prev + 1);
    }

    return(
        <>

            <div className="contenedorTrabajar">
                <h1>Trabajar con nosotros</h1>
                
                <div className="tarjetaTrabajar">
                    <form  key={formKey} 
                        onSubmit={handleMandarCv}>

                        <label htmlFor="email">Email de contacto</label>
                        <input id="email" 
                            type="email" 
                            placeholder="Email" 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            />

                        <label htmlFor="cv">Añade tu curriculum vitae</label>
                        <input  id="cv" 
                            type="file"

                            onChange={(e)=>setCv(e.target.files[0])}
                            />

                        <div className="botonTrabajar">
                            <button type="submit">Aceptar</button>

                            <button type="button"
                                onClick={handleLimpiarCampos}
                                >Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}