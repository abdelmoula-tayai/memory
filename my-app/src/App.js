import React, { useState } from 'react';
import './App.css';

const cardImages = [
  {src : "/img/cardback_viego.webp"},
  {src : "/img/cardback_soulbound.webp"},
  {src : "/img/cardback_samira.webp"},
  {src : "/img/cardback_nidalee.webp"},
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
  }

  console.log(cards, turns)

  return (
    <div className="app">
      <h1>Memory Legends</h1>
      <button onClick={shuffleCards}>New game</button>

      <div className="card-grid">
      {cards.map(card => (
        <div className='card' key={card.id}> 
            <div>
              <img className='front' src={card.src} alt="card front"/>
              <img className='back' src="/img/card_cover.webp" alt="card back"/> 
            </div>
        </div>
      ))}
      </div>
    </div>

    
  );
}

export default App;
