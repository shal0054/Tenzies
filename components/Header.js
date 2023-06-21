import React, {useState} from 'react';
import Timer from './Timer';

export default function Header({lowestRolls, numOfRolls, storeBestTime, tenzies, startTime}) {
  const [bestTime, setBestTime] = useState(localStorage.getItem('bestTime') || '00:00');

  function handleTimer(value) {
    if (tenzies) {
      if (value < bestTime || bestTime ==='00:00') {
        setBestTime(value);
        storeBestTime(value);
      }
    }
  }

  return (
    <div className="header">
      
      <div className="best">
        <h3>{`LOWEST ROLLS: ${lowestRolls}`}</h3>
        <h3>BEST TIME: {bestTime}</h3>
      </div>

      <div className='score'>
        <Timer 
          onValueChange={handleTimer}
          tenzies={tenzies}
          startTime={startTime}
        />
        <h3>{`ROLLS: ${numOfRolls}`}</h3>
      </div>

    </div>
  )
}