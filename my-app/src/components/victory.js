import Button from "./button"


// composant similaire au composant defeat mais avec une image différente
export default function Victory({shuffleCards}) {
    return ( 
            <div className="victory">
                <img src="/img/victory.png" alt="victory" className="victory-img"/>
                <Button shuffleCards={shuffleCards}/>
            </div>
    )
}
    
