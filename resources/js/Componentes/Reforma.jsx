export default function Reforma(){
    return(
        <>
            <label>
                <input type="checkbox" value={"acabados"} /> Reforma de acabados (pintar, cambiar suelos, 
                    sustitución de azulejos)
            </label>
            
            <label>
                <input type="checkbox" value={"reforma"}/> Reforma cocina o baño
            </label>

            <label>
                <input type="checkbox" value={"accesibilidad"}/> Modificación interior (tirar o levantar tabiques
                    cambiar puertas o vantanas, renovación de cableado electrico)
            </label>
        </>
    );
}