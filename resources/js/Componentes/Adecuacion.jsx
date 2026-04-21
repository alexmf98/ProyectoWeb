export default function Adecuacion(){
    return(
        <>
            <label>
                <input type="checkbox" value={"viaPublica"} /> Vía pública
            </label>
            
            <label>
                <input type="checkbox" value={"vivienda"}/> Adecuación de vivienda
            </label>

            <label>
                <input type="checkbox" value={"accesibilidad"}/> Adecuación de accesibilidad
            </label>

        </>
    )
}