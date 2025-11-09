import Cabecera from "../Components/Principal/Cabecera"
import Copy from "../Components/Principal/Copy"
import Chat from "../Components/Principal/Chat"

export default function Principal(){
    return(
        <div className="flex flex-col h-screen">
            <Cabecera/>
            <Chat/>
            <Copy/>
        </div>
    )
}