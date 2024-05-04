import Button from "./button"

export default function Victory({shuffleCards}) {
    return ( 
            <div className="victory">
                <img src="/img/victory.png" alt="victory" className="victory-img"/>
                <Button shuffleCards={shuffleCards}/>
            </div>
    )
}
    
