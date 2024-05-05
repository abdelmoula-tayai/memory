// ce composant est utilisé pour afficher une carte à la fois, il prend en paramètre la carte à afficher, la fonction HandleChoice pour gérer le choix de l'utilisateur, flipped pour savoir si la carte est retournée ou non et disabled pour savoir si la carte est cliquable ou non
export default function SingleCard({card, HandleChoice, flipped, disabled}) {

    const handleClick = () => {
        if(!disabled) {
            HandleChoice(card)
        }
    }

  return (
    <div className='card'> 
        <div className={flipped ? "flipped" : ""}>
            <img className='front' src={card.src} onClick={handleClick} alt="card front"/>
            <img className='back' src="/img/card_cover.webp" onClick={handleClick} alt="card back"/> 
         </div>
    </div>
  );
} 