import { usePage } from "@inertiajs/react";

export function useAuth(){
    const {auth} = usePage().props;
    const user = auth?.user;

    return{
        user: user,
        nombre: user?.name,
        apellido: user?.apellido,
        email: user?.email,
        isAdmin: user?.role === 'administrador',
    }
}