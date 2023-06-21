import React from 'react';
import Timer from './Timer';

export default function Header({lowestRolls, numOfRolls, bestTime}) {

  return (
    <div className="header">
      <div className="best">
        <h3>{`LOWEST ROLLS: ${lowestRolls}`}</h3>
        <h3>BEST TIME: 01:32</h3>
      </div>
      <Timer />
      <h3>{`ROLLS: ${numOfRolls}`}</h3>
    </div>
  )
}