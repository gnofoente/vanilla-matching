function MatchingGame() {
  this.flippedCards = [];
  this.matchedPairIds = [];
  this.boardArray = [];
  this.isClickBlocked = false;
  this.boardElement = document.getElementById("board");

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
    this.boardElement.textContent = "";
    const availableCards = [];
    for (let i = 1; i <= 6; i++) {
      availableCards.push(new Card(i, this));
      availableCards.push(new Card(i, this));
    }

    for (let i = 0; i < 12; i++) {
      this.boardArray.push(fetchRandomCard(availableCards));
    }

    const wrapper = document.createElement("div");

    this.boardArray.forEach((card) => {
      wrapper.appendChild(card.getElement());
    });

    this.boardElement.appendChild(wrapper);
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

  const isMatchingPair = () => {
    console.info("If the pair match, return true, else return false.");
    if (this.flippedCards.length != 2) return;
    return this.flippedCards[0].id === this.flippedCards[1].id;
  };

  const handleMatchingPairs = () => {
    this.flippedCards.forEach((card) => {
      card.element.onclick = null;
      this.flippedCards = [];
      this.matchedPairIds.push(card.id);
    });
  };

  const handleNotMatchingPairs = () => {
    this.isClickBlocked = !this.isClickBlocked;
    window.setTimeout(() => {
      const cardFlipPromises = [];

      this.flippedCards.forEach((card) => {
        cardFlipPromises.push(card.flip());
      });

      Promise.all(cardFlipPromises).then(() => {
        this.isClickBlocked = !this.isClickBlocked;
        this.flippedCards = [];
      });
    }, 1500);
  };

  const isGameOver = () => {
    console.info(
      "The game is over when all the pairs of cards have been matched up." +
        "\nIf the game is over, return true, else return false.",
    );
    return this.matchedPairIds.length == this.boardArray.length;
  };

  this.handleFlippedCardPool = (card) => {
    let cardElement = card.getElement();
    let isFlipped = cardElement.className.includes("flipped-up");
    if (isFlipped) {
      let filtered = this.flippedCards.filter((c) => c.id != cardElement.id);
      this.flippedCards = [...filtered];
      return;
    }
    this.flippedCards.push(card);
  };

  this.handlePlay = () => {
    if (this.flippedCards.length < 2) return;

    if (isMatchingPair()) {
      handleMatchingPairs();
      if (isGameOver()) {
        if (window.confirm("You win! Want to play again?")) {
          new MatchingGame();
        }
      }
      return;
    }
    handleNotMatchingPairs();
  };

  renderBoard();
}

function Card(id, game) {
  const createElement = () => {
    const el = document.createElement("div");
    el.id = this.id;
    el.className = "card image-" + this.id;
    el.onclick = handleClick;
    return el;
  };

  const handleClick = (e) => {
    if (this.game.isClickBlocked) return;
    this.game.handleFlippedCardPool(this);
    this.flip().then(this.game.handlePlay);
  };

  this.flip = () => {
    this.element.style.transform = "matrix(1, 0, 0, 0.001, 0, 0)";
    return new Promise((resolve) => {
      window.setTimeout(() => {
        this.element.style.transform = "";
        this.element.classList.toggle("flipped-up");
        window.setTimeout(resolve, 200); // waits until the 'transform' animation finishes
      }, 200);
    });
  };

  this.id = id;
  this.element = createElement();
  this.game = game;
  this.getElement = () => this.element;
}

(function () {
  console.clear();
  new MatchingGame();
})();
