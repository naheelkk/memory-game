export default function EmojiButton({
  content,
  handleClick,
  selectedCardEntry,
  matchedCardEntry,
}) {
  const btnContent = selectedCardEntry || matchedCardEntry ? content : "?";

  const btnStyle = selectedCardEntry
    ? "btn--emoji__back--selected"
    : matchedCardEntry
    ? "btn--emoji__back--matched"
    : "btn--emoji__front";

  return (
    <button className={`btn btn--emoji ${btnStyle}`} onClick={handleClick}>
      {btnContent}
    </button>
  );
}
