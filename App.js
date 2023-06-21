import React, { useState, useEffect } from 'react';
import Die from './components/Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import Header from './components/Header';

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [numOfRolls, setNumOfRolls] = useState(1);
  const [lowestRolls, setLowestRolls] = useState(localStorage.getItem('lowestRolls') || 0);
  const [startTime, setStartTime] = useState(false);

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const allSame = dice.every(die => die.value === dice[0].value);

    if (allHeld && allSame) {
      setTenzies(true);
      if (numOfRolls < lowestRolls || lowestRolls === 0) {
        setLowestRolls(numOfRolls);
        localStorage.setItem('lowestRolls', numOfRolls);
      }
      console.log('YOU WON!!');
    }
  }, [dice])

  function holdDice(id) {
    if (startTime) {
      setDice(oldDice => {
        return oldDice.map(die => {
          return die.id === id ? Object.assign({}, die, { isHeld: !die.isHeld }) : die;
        });
      });
    }
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

      setNumOfRolls(prev => prev + 1);
    }
    
  const diceElements = dice.map(die => (
    <Die 
      key={die.id} 
      value={die.value} 
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
      />
  ));

  function storeBestTime(value) {
    localStorage.setItem('bestTime', value);
  }

  return (
    <main>
      <Header
        numOfRolls={numOfRolls}
        lowestRolls={lowestRolls}
        storeBestTime={storeBestTime}
        tenzies={tenzies}
        startTime={startTime}
      />
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die 
      to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      {(tenzies && startTime) && 
        <button className='roll-dice' onClick={() => location.reload()}>NEW GAME</button>}

      {(!startTime && !tenzies) &&
        <button className='startBtn' onClick={() => setStartTime(prev => !prev)}>START</button>}

      {(startTime && !tenzies) && <button className='roll-dice' onClick={roll}>ROLL</button>}
    </main>
  )
}