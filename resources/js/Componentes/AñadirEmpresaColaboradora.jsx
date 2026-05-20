import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import "../Styles/Errores.css";


export default function EmpresaColabora() {

    const { empresa } = usePage().props;

    const [ver, setVer] = useState(false);
    const [imagen, setImagen] = useState("");
    const [formKey, setFormKey] = useState(0);
    const [errores, setErrores] = useState({});

    const validar = () => {
        const nuevosErrores = {};
    
        if(!imagen){
            nuevosErrores.imagen = "Debe seleccionar una imagen";
        }else if(!/\.(jpg|jpeg|png)$/i.test(imagen.name)){
            nuevosErrores.imagen = "Solo se admiten formatos jpg jpeg png";
        }
    
        return nuevosErrores;
    }

    const handleLimpiar = ()=>{
        router.get('/edicion', {}, { replace: true });
        setFormKey(prev => prev + 1);
        setErrores({})
    }

    const handleDeleteEmpresa = (id) => {
        const confirmar = confirm("Desea elimnar a la empresa colaboradora");

        if(confirmar){
            router.delete(`/empresacolaboradora/${id}`);
        }
    }

    const handleAddEmpresa = () => {
        setVer(true);
    }

    const handleEnviar = (e) => {

        e.preventDefault();

        const erroresValidacion = validar();

        if(Object.keys(erroresValidacion).length > 0){
            setErrores(erroresValidacion);
            return;
        }

        setErrores({});
        
        const newFormaData = new FormData();

        newFormaData.append("imagen", imagen);

        router.post('/empresacolaboradora', newFormaData);

        handleLimpiar();
    }

    const handleCancelar = ()=>{
        setVer(false);
    }

    return (
        <>
            <h1>Empresas Colaboradoras</h1>

            <div className="tablaEdicion">
                <table>
                    <thead>
                        <tr>
                            <th>Logo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empresa.map((empresa) => (
                            <tr key={empresa.id}>
                                <td>
                                    <img
                                        src={empresa.imagen}
                                        alt="Empresa colaboradora"
                                        style={{ height: "50px", objectFit: "contain" }}
                                    />
                                </td>
                                <td>
                                    <button className="btnOcultar" onClick={() => handleDeleteEmpresa(empresa.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            
            <button className="btnAñadir" onClick={() => handleAddEmpresa()}>
                    Añadir empresa colaboradora
            </button>
            
            <div>
                {
                    ver &&
                    <form key={formKey} onSubmit={handleEnviar}>
                        <div className="añadirEmpresa">
                            <label htmlFor="fileEmpresa" className="btnFile">
                                Seleccionar imagen
                            </label>
                            <input
                                id="fileEmpresa"
                                type="file"
                                className="inputFile"
                                onChange={(e)=>setImagen(e.target.files[0])}
                            />

                        {errores.imagen && <span className="mensajeError">{errores.imagen}</span>}

                            <button className="btnAceptar" type="submit">Aceptar</button>
                            <button type="reset" className="btnCancelar" onClick={handleCancelar}>Cancelar</button>
                        </div>
                    </form>
                }
            </div>

        </>
    )
}