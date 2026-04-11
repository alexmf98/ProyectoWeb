import "../Styles/Footer.css";

export default function Footer(){
    return(
        <div className="pie">
        
            <div className="contacto">
                <h3>Contacto</h3>
                <ul>
                    <li>Telefono: 123123123</li>
                    <li>Email: meloinvento@gmail.com</li>
                </ul>
            </div>
            
            <div className="localizacion">
                <h3>Localizacion</h3>
                <p>Calle pajarito n10º</p>
            </div>
        </div>
    );
}