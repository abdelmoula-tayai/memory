import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ time, onTimeEnd, onReset, isGameActive }) => {
  const [currentTime, setCurrentTime] = useState(time);

  useEffect(() => {
    let timer;
    if (isGameActive && currentTime > 0) {
      timer = setTimeout(() => {
        setCurrentTime(currentTime - 1);
      }, 1000);
    } else if (currentTime === 0) {
      onTimeEnd(); // Appellez une fonction lorsque le temps est écoulé
    }
    return () => clearTimeout(timer);
  }, [currentTime, isGameActive]);

  useEffect(() => {
    if (onReset) {
      setCurrentTime(time);
    }
  }, [onReset, time]);

  return <h2>Time: {currentTime}</h2>;
};

export default CountdownTimer;
