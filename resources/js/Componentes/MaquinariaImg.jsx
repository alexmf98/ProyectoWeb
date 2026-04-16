import "../Styles/Alquiler.css";
export default function MaquinariaImg({titulo, src, alt}){
    return (
            <>

                <h2>{titulo}</h2>
                
                <img src={src} alt={alt} />

                <button> Informacion</button>
            </>

    );
}