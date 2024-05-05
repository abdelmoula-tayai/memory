import React, { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/singleCard';
import Victory from './components/victory';
import CountdownTimer from './components/countdownTimer';

const cardImages = [
  { src: '/img/cardback_viego.webp' },
  { src: '/img/cardback_soulbound.webp' },
  { src: '/img/cardback_samira.webp' },
  { src: '/img/cardback_nidalee.webp' },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choice1, setChoice1] = useState(null);
  const [choice2, setChoice2] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [isGameActive, setIsGameActive] = useState(true); // État indiquant si le jeu est actif
  const [resetTimerFlag, setResetTimerFlag] = useState(false); // Indique quand réinitialiser le minuteur

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoice1(null);
    setChoice2(null);
    setCards(shuffledCards);
    setTurns(0);
    setIsGameActive(true); // Réactiver le jeu
    setResetTimerFlag((prev) => !prev); // Réinitialiser le minuteur
  };

  const handleChoice = (card) => {
    if (card.id === choice1?.id) return;
    choice1 ? setChoice2(card) : setChoice1(card);
  };

  const resetTurns = () => {
    setChoice1(null);
    setChoice2(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (choice1 && choice2) {
      setDisabled(true);

      if (choice1.src === choice2.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choice1.src) {
              return { ...card, matched: true };
            }
            return card;
          });
        });
        resetTurns();
      } else {
        setTimeout(() => {
          resetTurns();
        }, 1000);
      }
    }
  }, [choice1, choice2]);

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    const allMatched = cards.length > 0 && cards.every((card) => card.matched);
    setIsGameActive(!allMatched); // Arrêter le jeu si toutes les cartes sont retournées
  }, [cards]);

  const handleTimeEnd = () => {
    // Code à exécuter lorsque le temps est écoulé
    setIsGameActive(false); // Arrêter le jeu
  };

  return (
    <div className="app">
      <h1>Memory Legends</h1>
      <CountdownTimer
        time={60}
        onTimeEnd={handleTimeEnd}
        onReset={resetTimerFlag}
        isGameActive={isGameActive}
      />

      {cards.length > 0 && cards.every((card) => card.matched) && (
        <Victory shuffleCards={shuffleCards} />
      )}

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            HandleChoice={handleChoice}
            flipped={card === choice1 || card === choice2 || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
