import React, { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/singleCard';
import Victory from './components/victory';
import Defeat from './components/defeat';
import CountdownTimer from './components/countdownTimer';


// images des cartes
const cardImages = [
  { src: '/img/cardback_viego.webp' },
  { src: '/img/cardback_soulbound.webp' },
  { src: '/img/cardback_samira.webp' },
  { src: '/img/cardback_nidalee.webp' },
];

// composant principal
function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choice1, setChoice1] = useState(null);
  const [choice2, setChoice2] = useState(null);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'victory', 'defeat'

  // fonction pour mélanger les cartes et réinitialiser le jeu
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoice1(null);
    setChoice2(null);
    setCards(shuffledCards);
    setTurns(0);
    setGameStatus('playing');
  };

  // fonction pour gérer le choix des cartes
  const handleChoice = (card) => {
    if (card.id === choice1?.id) return;
    choice1 ? setChoice2(card) : setChoice1(card);
  };

  // fonction pour réinitialiser les tours
  const resetTurns = () => {
    setChoice1(null);
    setChoice2(null);
    setTurns((prevTurns) => prevTurns + 1);
  };

  // useEffect pour vérifier si les cartes sont identiques
  useEffect(() => {
    if (choice1 && choice2) {
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
        setTimeout(resetTurns, 1000);
      }
    }
  }, [choice1, choice2]);

  // useEffect pour vérifier si toutes les cartes sont identiques
  useEffect(() => {
    const allMatched = cards.length > 0 && cards.every((card) => card.matched);
    if (allMatched) {
      setGameStatus('victory'); // Changer le statut du jeu à 'victory'
    }
  }, [cards]);

  // fonction pour gérer la fin du temps
  const handleTimeEnd = () => {
    setGameStatus('defeat'); // Changer le statut du jeu à 'defeat'
  };

  useEffect(() => {
    shuffleCards();
  }, []);

// html du jeu
  return (
    <div className="app">
      <h1>Memory Legends</h1>
      <CountdownTimer
        initialTime={60}
        gameStatus={gameStatus}
        onTimeEnd={handleTimeEnd}
      />
      {gameStatus === 'victory' && <Victory shuffleCards={shuffleCards} />}
      {gameStatus === 'defeat' && <Defeat shuffleCards={shuffleCards} />}
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            HandleChoice={handleChoice}
            flipped={card === choice1 || card === choice2 || card.matched}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
