import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../Styles/Calendario.css";

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