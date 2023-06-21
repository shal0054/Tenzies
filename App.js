import React from 'react';
import Die from './Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const allSame = dice.every(die => die.value === dice[0].value);

    if (allHeld && allSame) {
      setTenzies(true)
      console.log('YOU WON!!')
    }
  }, [dice])

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
        return die.isHeld ? 
        die : 
        Object.assign({}, die, { value : newRoll[i].value });
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
      {tenzies && <Confetti/>}
    <h1 className="title">Tenzies</h1>
    <p className="instructions">Roll until all dice are the same. Click each die 
    to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      {!tenzies && <button className='roll-dice' onClick={roll}>ROLL</button>}
      {tenzies && <button className='roll-dice' onClick={() => location.reload()}>NEW GAME</button>}
    </main>
  )
}