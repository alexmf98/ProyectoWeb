import { useState } from "react";

export default function ObraMenor({onChange}){

    const [seleccionado, setSeleccionado] = useState([]);

    const handleChange = (e) => {

        const {value, checked} = e.target;

        const nuevos = checked ? [...seleccionado, value] : seleccionado.filter(valor => valor != value);

        setSeleccionado(nuevos);
        onChange(nuevos);
    }


    return(
        <>
            <label>
                <input type="checkbox" value={"Reforma interior"} onChange={handleChange}/> Reforma interior
            </label>
            
            <label>
                <input type="checkbox" value={"Renovación electrica"} onChange={handleChange}/> Renovacion instalación eléctrica
            </label>

            <label>
                <input type="checkbox" value={"Reforma baño"} onChange={handleChange}/> Reforma baño
            </label>

        </>
    );
}