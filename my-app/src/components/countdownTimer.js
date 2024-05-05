import React, { useEffect, useState } from 'react';


// composant du timer
const CountdownTimer = ({ initialTime, gameStatus, onTimeEnd }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime); // Temps restant en secondes


// useEffect pour mettre à jour le minuteur
  useEffect(() => {
    let timer;
    if (gameStatus === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000); // Décrémenter le temps restant
    } else if (gameStatus !== 'playing' || timeLeft === 0) {
      if (timeLeft === 0) {
        onTimeEnd(); // Appeler lorsque le timer atteint zéro
      }
      clearTimeout(timer); // Arrêter le minuteur
    }
    return () => clearTimeout(timer); 
  }, [gameStatus, timeLeft, onTimeEnd]); // Mettre à jour le timer lorsque le jeu est en cours et que le temps restant est supérieur à 0

  useEffect(() => {
    if (gameStatus === 'playing') {
      setTimeLeft(initialTime); // Réinitialiser le timer lorsque le jeu commence
    }
  }, [gameStatus, initialTime]); 

  return <h2>Time: {timeLeft}</h2>;
};

export default CountdownTimer;
