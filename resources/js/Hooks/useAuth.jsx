import { usePage } from "@inertiajs/react";

export function useAuth(){
    const {auth} = usePage().props;
    const user = auth?.user;

    return{
        user: user,
        nombre: user?.name,
        apellido: user?.apellido,
        segundo_apellido: user?.segundo_apellido,
        email: user?.email,
        isAdmin: user?.role === 'administrador',
        trabajador: user?.role === 'trabajador',
        dni: user?.dni,
        fecha_nacimiento: user?.fecha_nacimiento,
    }
}