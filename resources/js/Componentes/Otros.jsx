import "../Styles/Personal.css";

export default function Otros({onChange}) {
    return (
        <>
            <textarea className="textAreaPersonal"
                placeholder="Especifique el tipo de proyecto que desea realizar"
                onChange={(e)=>onChange(e.target.value)}
            />
            
        </>
    );
}