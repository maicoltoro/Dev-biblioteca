import { GraficaLibro } from "./GraficaLibro";
import { GraficaUser } from "./GraficaUser";

export function Graficas (){
    return(
       <div className="Menugraficas">
        <div className="graficauser">
            <GraficaUser/>
        </div>
        <div className="graficalibros">
            <GraficaLibro/>
        </div>
       </div>
    )
}