import { useInfoEmpresa } from "../Hooks/useInfoEmpresa";
import "../Styles/Footer.css";

export default function Footer(){

    const {telefono, email, localizacion} = useInfoEmpresa();

    return(
        <div className="pie">
        
            <div className="contacto">
                <h3>Contacto</h3>
                <ul>
                    <li>Telefono: {telefono}</li>
                    <li>Email: {email}</li>
                </ul>
            </div>
            
            <div className="localizacion">
                <h3>Localizacion</h3>
                <p>{localizacion}</p>
            </div>
        </div>
    );
}