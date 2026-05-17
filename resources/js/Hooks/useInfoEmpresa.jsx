import { usePage } from "@inertiajs/react";

export function useInfoEmpresa(){
    const {infoEmpresa} = usePage().props;

    return {
        id: infoEmpresa?.id,
        descripcion: infoEmpresa?.descripcion,
        telefono: infoEmpresa?.telefono,
        email: infoEmpresa?.email,
        localizacion: infoEmpresa?.localizacion,
    };
}