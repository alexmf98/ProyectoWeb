import { usePage } from "@inertiajs/react";
import ProyectoAdecuacion from "../Componentes/ProyectoAdecuacion";
import ProyectoRestauracion from "../Componentes/ProyectoRestauracion";

export default function Proyectos(){


    return(
        <>
            <ProyectoAdecuacion />

            <ProyectoRestauracion />
        </>
    );
}