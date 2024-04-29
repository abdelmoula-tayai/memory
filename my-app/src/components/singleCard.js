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