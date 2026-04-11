import Cabecera from "../Componentes/Cabecera";
import Footer from "../Componentes/Footer";
import "../Styles/MainLayout.css";

export default function MainLayout({ children }) {


    return (
        <div className="cuerpo">
           
            <Cabecera />
            <main>
                {children}
            </main>
            
            <Footer />
        </div>
    )
}