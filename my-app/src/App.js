import React, { useEffect, useState } from 'react';
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
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
  }

 const HandleChoice = (card) => {
  if (card.id === choice1?.id)
    return
  choice1 ? setChoice2(card) : setChoice1(card)
 }

 useEffect(() => {
    if(choice1 && choice2) {
      setDisabled(true)

      if(choice1.src === choice2.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choice1.src) {
              return {...card, matched: true}
            } else {
            return card
          }
        })
      }) 
        resetTurns()
      } else {
        setTimeout(() => {
          resetTurns()
        }, 1000)
      }
      
    }
 }, [choice1, choice2])



 const resetTurns = () => {
  setChoice1(null)
  setChoice2(null)
  setTurns(prevTurns => prevTurns + 1)
  setDisabled(false)
 }

  

  return (
    <div className="app">
      <h1>Memory Legends</h1>
      <button onClick={shuffleCards}>New game</button>

      <div className="card-grid">
      {cards.map(card => (
        <SingleCard key={card.id}
         card={card
        } HandleChoice={HandleChoice}
         flipped={card === choice1 || card === choice2 || card.matched}
         disabled={disabled}/>
        
      ))}
      </div>
    </div>

    
  );
}

export default App;
