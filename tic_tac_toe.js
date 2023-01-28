// PROJECT STARTS FROM HERE //

const container_gameboard = document.querySelector(".container_gameboard");
// const boxes_gameboard = document.querySelectorAll(".container_gameboard .box");
const testButton = document.querySelector(".test_button");
testButton.addEventListener("click", function () {
  GameboardModule.checkWinner();
});

const startButton = document.querySelector(".start_game");
startButton.addEventListener("click", function () {
  GameFlowModule.startNewGame();
});

const statusMessage = document.querySelector(".winner_status");

// *** Gameboard Module > start *** //
// *** **************** *** //
const GameboardModule = (function Gameboard() {
  let gameboard = ["", "", "", "", "", "", "", "", "8s"];

  function displayGameboardContent() {
    const dimension = 3;
    for (let i = 0; i < dimension ** 2; i++) {
      const selectedBox = document.querySelector(`.box${i}`);
      selectedBox.innerHTML = gameboard[i];
    }
  }

  function createGameboardGrids() {
    const dimension = 3;
    const childrenOfContainer = document.querySelectorAll(
      "div.container_gameboard > .box"
    );
    childrenOfContainer.forEach((element) => {
      element.remove();
      element.setAttribute("style", `border: 2px solid blue;`);
    });

    container_gameboard.setAttribute(
      "style",
      `grid-template-columns: repeat(${dimension}, 1fr); grid-template-columns: repeat(${dimension}, 1fr)`
    );

    for (let i = 0; i < dimension ** 2; i++) {
      const newDiv = document.createElement("div");
      newDiv.classList.add("box");
      newDiv.classList.add(`box${i}`);
      container_gameboard.appendChild(newDiv);
    }

    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) =>
      box.addEventListener("click", function () {
        playTurn(this);
      })
    );
  }

  function playTurn(box) {
    let input_X_or_O = GameFlowModule.isTurnPlayerX ? "X" : "O";
    for (let i = 0; i < 9; i++) {
      if (box.classList.contains(`box${i}`) && gameboard[i] === "") {
        gameboard[i] = input_X_or_O;
        displayGameboardContent();
        console.log("isTurnPlayerX: " + GameFlowModule.isTurnPlayerX);
        // checkWinner(input_X_or_O);
        console.log("winning status is: " + checkWinner(input_X_or_O));
        if (checkWinner(input_X_or_O) !== false) {
          let whoIsWinner = checkWinner(input_X_or_O); // "X","O" or "draw"
          GameFlowModule.endGame(whoIsWinner);
        }
        GameFlowModule.isTurnPlayerX = !GameFlowModule.isTurnPlayerX;
        console.log("inside playTurn" + gameboard);
        return;
      }
    }
  }

  function checkWinner(XorO) {
    //checks for "X" and "O" player seperately, i.e wont make "O" player win when checking for "X" player
    //didn't add extra effect for the rare scenario where there are two winning lines at the end(e.g one row and one column are X-X-X)
    // TO DO: add effect to winning combination

    // checking for rows
    console.log("inside checkwinner> " + gameboard);
    if (
      gameboard[0] === XorO &&
      gameboard[1] === XorO &&
      gameboard[2] === XorO
    ) {
      return XorO;
    } else if (
      gameboard[3] === XorO &&
      gameboard[4] === XorO &&
      gameboard[5] === XorO
    ) {
      return XorO;
    } else if (
      gameboard[6] === XorO &&
      gameboard[7] === XorO &&
      gameboard[8] === XorO
    ) {
      return XorO;
    }
    //checking for columns
    if (
      gameboard[0] === XorO &&
      gameboard[3] === XorO &&
      gameboard[6] === XorO
    ) {
      return XorO;
    } else if (
      gameboard[1] === XorO &&
      gameboard[4] === XorO &&
      gameboard[7] === XorO
    ) {
      return XorO;
    } else if (
      gameboard[2] === XorO &&
      gameboard[5] === XorO &&
      gameboard[8] === XorO
    ) {
      return XorO;
    }
    //checking for crosses
    if (
      gameboard[0] === XorO &&
      gameboard[4] === XorO &&
      gameboard[8] === XorO
    ) {
      return XorO;
    } else if (
      gameboard[2] === XorO &&
      gameboard[4] === XorO &&
      gameboard[6] === XorO
    ) {
      return XorO;
    }
    //checking for draw, in case all 9 boxes are full without a winner
    if (!gameboard.includes("")) {
      // TO DO: add draw condition
      return "draw";
    }

    return false;
  }

  return {
    gameboard,
    displayGameboardContent,
    createGameboardGrids,
    checkWinner,
  };
})();
// *** Gameboard Module > end *** //
// *** **************** *** //

// function Player(name, XorO) {
//   name = name;
//   isXorO = XorO;
//   return { name, isXorO };
// }

const GameFlowModule = (function () {
  let isTurnPlayerX;
  function startNewGame() {
    this.isTurnPlayerX = true;
    console.log(isTurnPlayerX);
    GameboardModule.gameboard = ["", "", "", "", "", "", "", "7s", "8s"];
    GameboardModule.createGameboardGrids();
    GameboardModule.displayGameboardContent();
    statusMessage.innerHTML = "";
  }

  function endGame(gameResult) {
    if (gameResult === "X") {
      statusMessage.innerHTML = "Congrats to Player1! X has won";
    } else if (gameResult === "0") {
      statusMessage.innerHTML = "Congrats to Player2! 0 has won";
    } else if (gameResult === "draw") {
      statusMessage.innerHTML = "It has been a draw!";
    }
  }

  return { isTurnPlayerX, startNewGame, endGame };
})();

GameFlowModule.startNewGame();
console.log(GameFlowModule.isTurnPlayerX);
