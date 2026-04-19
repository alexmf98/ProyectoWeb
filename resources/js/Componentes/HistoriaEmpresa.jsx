import "../Styles/Home.css";

export default function HistoariaEmpresa({children}){
    return(
        <div className="historiaEmpresa">
                        <div className="overlayHistoria">
                            <p>
                               {children}
                            </p>
                        </div>
                    </div>
    );
}