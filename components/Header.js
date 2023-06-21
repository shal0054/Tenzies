import React from 'react';
import Timer from './Timer';

export default function Header({lowestRolls, numOfRolls}) {

  return (
    <div className="header">
      <h3>{`LOWEST ROLLS: ${lowestRolls}`}</h3>
      <Timer />
      <h3>{`ROLLS: ${numOfRolls}`}</h3>
    </div>
  )
}