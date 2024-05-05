import Button from "./button"


// composant similaire au composant victory mais avec une image différente
export default function Defeat({shuffleCards}) {
    return ( 
            <div className="defeat">
                <img src="/img/defeat.png" alt="defeat" className="defeat-img"/>
                <Button shuffleCards={shuffleCards}/>
            </div>
    )
}