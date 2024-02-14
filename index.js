function MatchingGame() {
  this.flippedCards = [];
  this.matchedPairIds = [];
  this.boardArray = [];
  this.isClickBlocked = false;

  // Matching game
  // Render the board randomly for a new game:
  const renderBoard = () => {
    console.info(
      "The game board needs to be rendered." +
        "\nYou can use the following CSS classes:" +
        "\nimage-1, image-2, ..., image-6" +
        "\nLook at the HTML pane for an example." +
        "\nNote: there are 6 images and 12 tiles," +
        "you need to render the pairs randomly.",
    );
    const availableCards = [];

    for (let i = 1; i <= 6; i++) {
      availableCards.push(makeCard(i));
      availableCards.push(makeCard(i));
    }

    for (let i = 0; i < 12; i++) {
      this.boardArray.push(fetchRandomCard(availableCards));
    }

    const boardElement = document.getElementById("board");
    const wrapper = document.createElement("div");

    this.boardArray.forEach((element) => {
      wrapper.appendChild(element);
    });

    boardElement.appendChild(wrapper);
  };

  const fetchRandomCard = (availableCards) => {
    let randomIndex = getRandomInt(0, availableCards.length);
    let randomCard = availableCards[randomIndex];
    availableCards.splice(randomIndex, 1);
    return randomCard;
  };

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };

  const onCardClick = (e) => {
    // 1. flip the card over
    // 2. check for a matching pair
    //    a. if they match leave them flipped up but disable click events.
    //    a. if they don't match flip them back over.
    // 3. check to see if the game is over
    if (this.isClickBlocked) return;
    let isFlipped = e.target.className.includes("flipped-up");

    if (isFlipped) {
      let filtered = this.flippedCards.filter((card) => card.id != e.target.id);
      this.flippedCards = [...filtered];
    } else {
      this.flippedCards.push(e.target);
    }

    console.log(this.flippedCards);

    flipCard(e.target);

    if (this.flippedCards.length < 2) return;

    if (isMatchingPair()) {
      this.flippedCards.forEach((card) => {
        card.onclick = null;
        this.flippedCards = [];
        this.matchedPairIds.push(card.id);
      });
    } else {
      this.isClickBlocked = true;
      window.setTimeout(() => {
        this.flippedCards.forEach((card) => {
          card.style.transform = "matrix(0.001, 0, 0, 1, 0, 0)";
          window.setTimeout(() => {
            card.style.transform = "";
            card.classList.toggle("flipped-up");
          }, 150);
        });
        this.isClickBlocked = false;
        this.flippedCards = [];
      }, 1500);
    }

    if (isGameOver()) {
      window.alert("you won!");
    }
  };

  const makeCard = (cardNumber) => {
    const cardElement = document.createElement("div");
    cardElement.id = cardNumber;
    cardElement.className = "card image-" + cardNumber;
    cardElement.onclick = onCardClick;
    return cardElement;
  };

  const flipCard = (element) => {
    element.style.transform = "matrix(0.001, 0, 0, 1, 0, 0)";
    window.setTimeout(() => {
      element.style.transform = "";
      element.classList.toggle("flipped-up");
    }, 150);
    console.info("A selected card needs to have the flipped-up CSS class.");
  };

  const isMatchingPair = () => {
    console.info("If the pair match, return true, else return false.");
    console.log(this.flippedCards);
    if (this.flippedCards.length != 2) return;
    return this.flippedCards[0].id === this.flippedCards[1].id;
  };

  const isGameOver = () => {
    console.info(
      "The game is over when all the pairs of cards have been matched up." +
        "\nIf the game is over, return true, else return false.",
    );
    return this.matchedPairIds.length == this.boardArray.length;
  };

  renderBoard();
}

// Bonus: animate the card flipping up and flipping back down
// Note: this can be done using either JS or CSS.

// Start the game on page load
/*(function () {
  console.clear();
  renderBoard();
})();*/

(function () {
  console.clear();
  new MatchingGame();
})();
