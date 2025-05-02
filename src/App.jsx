import { useEffect, useState, useRef } from "react";
import useData from "./useData";
import Confetti from "react-confetti";

const { initialData, data, rollData } = useData(6, 10); // useData(maxNumberOfCards, numberOfBoxes)

function App() {
  const [cardsArray, setCardsArray] = useState(data);
  const buttonRef = useRef(null);
  const isOver = cardsArray.every((card) => card.isSelected && card.value == cardsArray[0].value);

  function handleSelect(id) {
    setCardsArray(cardsArray.map((card) => (card.id == id ? { ...card, isSelected: !card.isSelected } : card)));
  }

  function handleRoll() {
    if (!isOver) {
      setCardsArray(rollData(cardsArray));
    } else {
      setCardsArray(rollData(initialData));
    }
  }

  useEffect(() => {
    if (isOver) {
      buttonRef.current.focus();
    }
  }, [isOver]);

  return (
    <main className="main">
      <div aria-live="polite" className="sr-only">
        {isOver && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <section className="main__container container">
        {isOver && <Confetti />}
        <h1 className="container__title">Tenzies</h1>
        <p className="container__text">
          Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
        </p>
        <div className="container__card-box">
          {cardsArray.map((item) => (
            <Card key={item.id} {...item} handleSelect={handleSelect} />
          ))}
        </div>
        <button ref={buttonRef} className="container__button" onClick={handleRoll}>
          {isOver ? "New Game" : "Roll"}
        </button>
      </section>
    </main>
  );
}

function Card(props) {
  return (
    <button
      className={`${props.isSelected ? "selected" : ""} card`}
      onClick={() => props.handleSelect(props.id)}
      aria-pressed={props.isSelected}
      aria-label={`Die with value ${props.value} is ${props.isSelected ? "selected" : "not selected"}`}>
      {props.value}
    </button>
  );
}

export default App;
