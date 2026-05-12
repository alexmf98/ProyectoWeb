import { useState } from "react"

export default function Adecuacion({onChange}){

    const [seleccionado, setSeleccionado] = useState([]);

    const handleCheck = (e) =>{

        const {value, checked} = e.target;

        const nuevos = checked ? [...seleccionado, value] : seleccionado.filter(valor => valor != value);

        setSeleccionado(nuevos);
        onChange(nuevos);
    }


    return(
        <>
            <label>
                <input type="checkbox" value={"Adecuación via pública"} onChange={handleCheck} /> Vía pública
            </label>
            
            <label>
                <input type="checkbox" value={"Adecuación vivienda"} onChange={handleCheck}/> Adecuación de vivienda
            </label>

            <label>
                <input type="checkbox" value={"Adecuación accesibilidad"} onChange={handleCheck}/> Adecuación de accesibilidad
            </label>

        </>
    )
}