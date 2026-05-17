import { usePage } from "@inertiajs/react";
import "../Styles/Home.css";

export default function EmpresaColaboradora() {

    const {empresa} = usePage().props;

    return (
        <div className="empresasColaboradoras">
            <h3>
                Empresas Colaboradoras
            </h3>

            <div className="fotosColaboradoras">
                <div className="slider">
                    {
                        empresa.map((dato)=>(
                            <img src={dato.imagen} alt="no disponible" />
                        ))
                    }
                    {
                        empresa.map((dato)=>(
                            <img src={dato.imagen} alt="no disponible" />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}