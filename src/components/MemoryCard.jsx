import { decodeEntity } from "html-entities";
import EmojiButton from "./EmojiButton";
export default function MemoryCard({
  handleClick,
  data,
  selectedCard,
  matchedCards,
}) {
  const cardEl = data.map((emoji, index) => {
    const selectedCardEntry = selectedCard.find(
      (emoji) => emoji.index === index
    );
    const matchedCardEntry = matchedCards.find(
      (emoji) => emoji.index === index
    );

    const btnStyle = matchedCardEntry
      ? "card-item--matched"
      : selectedCardEntry
      ? "card-item--selected"
      : "";

    return (
      <li key={index} className={`card-item ${btnStyle}`}>
        <EmojiButton
          content={decodeEntity(emoji.htmlCode[0])}
          handleClick={() => handleClick(emoji.name, index)}
          selectedCardEntry={selectedCardEntry}
          matchedCardEntry={matchedCardEntry}
        />
      </li>
    );
  });

  return <ul className="card-container">{cardEl}</ul>;
}
