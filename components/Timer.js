import React, { useState, useEffect } from 'react';

export default function Timer({onValueChange, tenzies, startTime}) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timer;
    if (!tenzies && startTime) {
      timer = setInterval(() => {
        if (seconds < 59) {
          setSeconds(seconds + 1);
        } else {
          setSeconds(0);
          setMinutes(minutes + 1);
        }
      }, 1000);
    }

    onValueChange(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)

    return () => clearInterval(timer);
  }, [minutes, seconds, startTime]);

  return (
    <div>
      <p className='timer'>
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </p>
    </div>
  );
}