import React from 'react';
import Die from './Die';

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());

  function allNewDice() {
    let newDice = [];
  
    for (let i = 0; i < 10; i++) {
      const randomNumber = Math.ceil(Math.random() * 6);
      newDice.push(randomNumber);
    }
  
    return newDice;
  }
  
  function roll() {
    setDice(allNewDice());
  }

  const diceEl = dice.map(die => <Die value={die} />);

  return (
    <main>
      <div className='dice-container'>
        {diceEl}
      </div>
      <button className='roll-dice' onClick={roll}>ROLL</button>
    </main>
  )
}