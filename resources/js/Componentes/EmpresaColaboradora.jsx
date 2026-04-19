import "../Styles/Home.css";

export default function EmpresaColaboradora({children}) {
    return (
        <div className="empresasColaboradoras">
            <h3>
                Empresas Colaboradoras
            </h3>

            <div className="fotosColaboradoras">
                <div className="slider">
                    {children}
                </div>
            </div>
        </div>
    );
}