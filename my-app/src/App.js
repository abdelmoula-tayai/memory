import React, { useState } from 'react';
import './App.css';
import SingleCard from './components/singleCard';

const cardImages = [
  {src : "/img/cardback_viego.webp"},
  {src : "/img/cardback_soulbound.webp"},
  {src : "/img/cardback_samira.webp"},
  {src : "/img/cardback_nidalee.webp"},
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choice1, setChoice1] = useState(null)
  const [choice2, setChoice2] = useState(null)

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
        <SingleCard key={card.id} card={card}/>
      ))}
      </div>
    </div>

    
  );
}

export default App;
