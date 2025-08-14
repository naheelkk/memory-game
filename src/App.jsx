import { useEffect, useState } from "react";
import Form from "./components/Form";
import MemoryCard from "./components/MemoryCard";

export default function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojisData, setEmojisData] = useState([]);
  const [selectedCard, setSelectedCard] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  console.log(selectedCard);

  useEffect(() => {
    if (
      selectedCard.length === 2 &&
      selectedCard[0].name === selectedCard[1].name
    ) {
      setMatchedCards((prevMatchedCards) => [
        ...prevMatchedCards,
        ...selectedCard,
      ]);
    }
  }, [selectedCard]);

  useEffect(() => {
    if (emojisData.length && matchedCards.length === emojisData.length) {
      setIsGameOver(true);
    }
  }, [matchedCards]);
  console.log(isGameOver);

  async function startGame(e) {
    e.preventDefault();
    //fetching
    try {
      const res = await fetch(
        "https://emojihub.yurace.pro/api/all/category/animals-and-nature"
      );
      if (!res.ok) {
        console.log("Not a Success");
        throw new Error("Couldn't fetch 'em");
      }
      const data = await res.json();
      const dataSlice = await getDataSlice(data);
      const emojisArray = await getEmojisArray(dataSlice);

      setEmojisData(emojisArray);

      setIsGameOn(true);
    } catch (e) {
      console.log(e);
    }
  }

  function getRandomIndices(data) {
    const randomIndicesArray = [];
    for (let i = 0; i < 5; i++) {
      const randomNum = Math.floor(Math.random() * data.length);
      if (!randomIndicesArray.includes(randomNum))
        randomIndicesArray.push(randomNum);
      else i--;
    }
    return randomIndicesArray;
  }

  async function getEmojisArray(data) {
    const pairedEmojisArray = [...data, ...data];
    for (let i = pairedEmojisArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = pairedEmojisArray[i];
      pairedEmojisArray[i] = pairedEmojisArray[j];
      pairedEmojisArray[j] = temp;
    }

    return pairedEmojisArray;
  }

  async function getDataSlice(data) {
    const randomIndices = getRandomIndices(data);

    const dataSlice = randomIndices.map((index) => data[index]);
    return dataSlice;
  }
  console.log(selectedCard);

  function turnCard(name, index) {
    // selectedCard.forEach(card=>console.log(card));
    const selectedCardEntry = selectedCard.find(
      (emoji) => emoji.index === index
    );

    if (!selectedCardEntry && selectedCard.length < 2) {
      setSelectedCard((prevSelectedCard) => [
        ...prevSelectedCard,
        { name, index },
      ]);
    } else if (!selectedCardEntry && selectedCard.length === 2) {
      const card = { name, index };
      setSelectedCard([card]);
    }
  }

  return (
    <main>
      <h1>Memory</h1>
      {!isGameOn && <Form handleSubmit={startGame} />}
      {isGameOn && (
        <MemoryCard
          handleClick={turnCard}
          data={emojisData}
          selectedCard={selectedCard}
          matchedCards={matchedCards}
        />
      )}
    </main>
  );
}
