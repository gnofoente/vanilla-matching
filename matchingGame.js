export default function MatchingGame() {
  renderBoard();
  // Matching game
  // Render the board randomly for a new game:
  function renderBoard() {
    console.info(
      "The game board needs to be rendered." +
        "\nYou can use the following CSS classes:" +
        "\nimage-1, image-2, ..., image-6" +
        "\nLook at the HTML pane for an example." +
        "\nNote: there are 6 images and 12 tiles," +
        "you need to render the pairs randomly.",
    );
    const boardArray = [];
    const availableCards = [];

    for (let i = 1; i <= 6; i++) {
      availableCards.push(makeCard(i));
      availableCards.push(makeCard(i));
    }

    for (let i = 0; i < 12; i++) {
      boardArray.push(fetchRandomCard(availableCards));
    }

    const boardElement = document.getElementById("board");
    const wrapper = document.createElement("div");

    boardArray.forEach((element) => {
      wrapper.appendChild(element);
    });

    boardElement.appendChild(wrapper);
  }

  function fetchRandomCard(availableCards) {
    let randomIndex = getRandomInt(0, availableCards.length);
    let randomCard = availableCards[randomIndex];
    availableCards.splice(randomIndex, 1);
    return randomCard;
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  function makeCard(cardNumber) {
    const cardElement = document.createElement("div");
    cardElement.id = cardNumber;
    cardElement.className = "card image-" + cardNumber;
    cardElement.onclick = onCardClick;
    return cardElement;
  }

  // Action(s) to perform when a card is clicked:
  function onCardClick(e) {
    if (flippedCardIds.length > 2) return;
    flippedCardsIds.push(e.target.id);
    // 1. flip the card over
    flipCard(e.target);
    // 2. check for a matching pair
    //    a. if they match leave them flipped up but disable click events.
    //    a. if they don't match flip them back over.
    isMatchingPair();

    // 3. check to see if the game is over
  }

  function flipCard(element) {
    element.classList.toggle("flipped-up");
    console.info("A selected card needs to have the flipped-up CSS class.");
  }

  // Check if the pair of cards are a match:
  function isMatchingPair() {
    if (flippedCardIds.length != 2) return;
    console.info("If the pair match, return true, else return false.");
  }

  // Check if the game is over:
  function isGameOver() {
    console.info(
      "The game is over when all the pairs of cards have been matched up." +
        "\nIf the game is over, return true, else return false.",
    );
  }
}
