import { useState } from "react";

export default function Reforma({onChange}){
    
    const [seleccionado, setSeleccionado] = useState([]);

    const handleChange = (e) =>{

        const {value, checked} = e.target;

        const nuevos = checked ? [...seleccionado, value] : seleccionado.filter(dato => dato != value);

        setSeleccionado(nuevos);
        onChange(nuevos);   
    }
    
    return(
        <>
            <label>
                <input type="checkbox" value={"Acabados interior"} onChange={handleChange}/> Reforma de acabados (pintar, cambiar suelos, 
                    sustitución de azulejos)
            </label>
            
            <label>
                <input type="checkbox" value={"Reforma cocina o baño"} onChange={handleChange}/> Reforma cocina o baño
            </label>

            <label>
                <input type="checkbox" value={"Modificación interior"} onChange={handleChange}/> Modificación interior (tirar o levantar tabiques
                    cambiar puertas o vantanas, renovación de cableado electrico)
            </label>
        </>
    );
}