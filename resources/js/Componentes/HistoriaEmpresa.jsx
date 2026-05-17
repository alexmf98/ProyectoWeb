import "../Styles/Home.css";
import { useInfoEmpresa } from "../Hooks/useInfoEmpresa";

export default function HistoariaEmpresa(){

    const {descripcion} = useInfoEmpresa();

    return(
        <div className="historiaEmpresa">
                        <div className="overlayHistoria">
                            <p>
                                {descripcion}                        
                            </p>
                        </div>
                    </div>
    );
}