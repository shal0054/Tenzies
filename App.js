import React from 'react';
import Die from './Die';
import { nanoid } from 'nanoid';

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());

  function holdDice(id) {
    setDice(oldDice => {
      return oldDice.map(die => {
        return die.id === id ? Object.assign({}, die, { isHeld: !die.isHeld }) : die;
      });
    });
  }

  function allNewDice() {
    let newDice = [];
  
    for (let i = 0; i < 10; i++) {
      const die = {
        value : Math.ceil(Math.random() * 6),
        isHeld : false,
        id : nanoid()
      }
      newDice.push(die);
    }
  
    return newDice;
  }
  
  function roll() {
    const newRoll = allNewDice();
    setDice(oldDice => {
      return oldDice.map((die, i) => {
        return die.isHeld ? die : Object.assign({}, die, { value : newRoll[i].value });
        });
      });
    }
    
  const diceElements = dice.map(die => (
    <Die 
      key={die.id} 
      value={die.value} 
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
      />
  ));

  return (
    <main>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button className='roll-dice' onClick={roll}>ROLL</button>
    </main>
  )
}