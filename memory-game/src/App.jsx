import { useState } from "react";
import Form from "./components/Form";
import MemoryCard from "./components/MemoryCard";

export default function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojisData,setEmojisData] = useState([]);
  console.log(emojisData);
  
  async function startGame(e) {
    e.preventDefault();
    //fetching
    try {
      const res = await fetch(
        "https://emojihub.yurace.pro/api/all/category/animals-and-nature"
      );
      if (!res.ok) {
        console.log("Not a Success");
        throw new Error("Couldn't fetch 'em")
      }
        const data = await res.json();
        console.log(data);
        let dataSample = data.slice(0,5)
        setEmojisData(dataSample)
        
        setIsGameOn(true);
      
    } catch (e) {
      console.log(e);
    }
  }

  function turnCard() {
    console.log("Memory card clicked");
  }

  return (
    <main>
      <h1>Memory</h1>
      {!isGameOn && <Form handleSubmit={startGame} />}
      {isGameOn && <MemoryCard handleClick={turnCard} data = {emojisData} />}
    </main>
  );
}
