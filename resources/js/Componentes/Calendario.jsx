import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../Styles/Calendario.css";
import { usePage } from "@inertiajs/react";

// export default function Calendario() {

//     const { alquileres, stock } = usePage().props;

//     // Mapa: "Mon May 06 2026" -> número de alquileres activos ese día
//     const conteoFechas = {};

//     alquileres.forEach(alquiler => {
//         let inicio = new Date(alquiler.fecha_inicio);
//         let fin    = new Date(alquiler.fecha_fin);

//         while (inicio <= fin) {

//             const clave = inicio.toDateString();
//             conteoFechas[clave] = (conteoFechas[clave] || 0) + 1;
            
//             inicio.setDate(inicio.getDate() + 1);
//         }
//     });

//     const estaLleno = (date) => {
//         const conteo = conteoFechas[date.toDateString()] || 0;
//         console.log(date.toDateString(), conteo, stock);
//         return conteo >= stock;
//     };

//     const hoy = new Date();
//     hoy.setHours(0, 0, 0, 0);

//     return (
//         <Calendar
//             tileClassName={({ date }) => {
//                 if (date < hoy)      return "gris";
//                 if (estaLleno(date)) return "rojo";
//                 return "verde";
//             }}
//             tileDisabled={({ date }) => date < hoy || estaLleno(date)}
//         />
//     );
// }
export default function Calendario({ conteoFechas, stock }) {

    const estaLleno = (date) => {
        const conteo = conteoFechas[date.toDateString()] || 0;
        return conteo >= stock;
    };

    const hoy = new Date();
    hoy.setHours(0,0,0,0);

    return (
        <Calendar
            tileClassName={({ date }) => {
                if(date < hoy)       return "gris";
                if(estaLleno(date))  return "rojo";
                return "verde";
            }}
            tileDisabled={({ date }) => date < hoy || estaLleno(date)}
        />
    );
}