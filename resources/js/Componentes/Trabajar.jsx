import { useState } from "react";
import "../Styles/Trabajar.css";
import "../Styles/Errores.css";
import { router } from "@inertiajs/react";

export default function Trabajar(){
    
    const [email, setEmail] = useState("");
    const [cv, setCv] = useState("");
    const [formKey, setFormKey] = useState(0);

    const [errores, setErrores] = useState({});

    const validar = () => {

        const nuevosErrores = {}

        if(!email.trim()){
            nuevosErrores.email = "El email no puede estar vacio"
        }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            nuevosErrores.email = "Formato de email no valido"
        }

        if(!cv){
            nuevosErrores.cv = "El archivo del curriculum no puede estar vacio"
        }else if(!/\.(pdf)$/i.test(cv.name)){
            nuevosErrores.cv = "Formato correcto pdf"
        }

        return nuevosErrores;
    }

    const handleMandarCv = (e)=>{

        e.preventDefault();

        const erroresValidacion = validar();

        if(Object.keys(erroresValidacion).length > 0){
            setErrores(erroresValidacion);

            return
        }

        setErrores({});
    
        const newFormData = new FormData();

        newFormData.append("email", email);
        newFormData.append("cv", cv);

        router.post('/mandarcv', newFormData,{
            onSuccess: () => handleLimpiarCampos()
        });

    }

    const handleLimpiarCampos = () =>{
        setEmail("");
        setCv("");
        setErrores({});
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

                        {errores.email && <span className="mensajeError">{errores.email}</span>}

                        <label htmlFor="cv">Añade tu curriculum vitae</label>
                        <input  id="cv" 
                            type="file"

                            onChange={(e)=>setCv(e.target.files[0])}
                            />

                        {errores.cv && <span className="mensajeError">{errores.cv}</span>}

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