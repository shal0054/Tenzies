import React, { useState, useEffect } from 'react';

export default function Timer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds < 59) {
        setSeconds(seconds + 1);
      } else {
        setSeconds(0);
        setMinutes(minutes + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, seconds]);

  return (
    <div>
      <p>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</p>
    </div>
  );
}