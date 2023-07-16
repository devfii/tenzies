import React, {useState, useEffect} from 'react';
import './style.css';
import Die from './components/die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(()=> {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue);
    if (allSameValue && allHeld){
      setTenzies(true);
      console.log("You won")
    }
  }, [dice])

  const { width, height } = useWindowSize();
  function generateNewDie() {
    return {
      value: Math.ceil((Math.random() * 6)),
      isHeld: false,
      id : nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (var i=0; i <10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice;
  }


  function rollDice() {
    if (tenzies) {
      setDice(allNewDice());
      setTenzies(false);
    } else {
      setDice(oldDice => oldDice.map(
        die => die.isHeld ? die : generateNewDie()
      ));
    }
  }

  function holdDice(dieId) {
    setDice(oldDice => oldDice.map(
      die => die.id != dieId ? die : { ...die, isHeld: !die.isHeld}
    ))
  }
  
  const diceElem = dice.map(die =>
     <Die key= {die.id} 
          value= {die.value} 
          isHeld = {die.isHeld} 
          id = {die.id}
          holdDice = {() => holdDice(die.id)}
      />)

  return (
    <main>
      <h2 className='title'>Tenzies</h2>
      <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

    <div className="dice-container">
      {diceElem}
    </div>
    <button className='roll' onClick={rollDice}>{!tenzies ? "Roll" : "New Game"}</button>
    {
      
    tenzies && <Confetti  width={width} height={height} />}
</main>
  )
};

export default App;
