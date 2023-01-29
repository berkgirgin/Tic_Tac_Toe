// PROJECT STARTS FROM HERE //

const container_gameboard = document.querySelector(".container_gameboard");
// const boxes_gameboard = document.querySelectorAll(".container_gameboard .box");
// const testButton = document.querySelector(".test_button");
// testButton.addEventListener("click", function () {
//   GameboardModule.checkWinner();
// });

// const startButton = document.querySelector(".start_game");
// startButton.addEventListener("click", function () {
//   GameFlowModule.startNewGame();
// });
// const viewGameboardButton = document.querySelector(".view_gameboard");
// viewGameboardButton.addEventListener("click", function () {
//   console.log(GameboardModule.gameboard);
// });

// const overlay = document.querySelector(".overlay_for_pop_up");
// const popUp = document.querySelector(".end_game_pop_up");
// const statusMessage = document.querySelector(".winner_status");
// const newGameButton = document.querySelector(
//   ".end_game_pop_up .new_game_button"
// );
// newGameButton.addEventListener("click", function () {
//   GameFlowModule.startNewGame();
// });

// *** **************** *** //
// *** Gameboard Module > start *** //
// *** **************** *** //
const GameboardModule = (function Gameboard() {
  const gameboard = ["", "", "", "", "", "", "", "", "8s"];

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
      `grid-template-columns: repeat(${dimension}, minmax(60px, 1fr));grid-auto-rows: 1fr`
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
          GameFlowModule.showEndGameResult(whoIsWinner);
          GameFlowModule.isTurnPlayerX = true;
          checkPlayerFocus(GameFlowModule.isTurnPlayerX);
          return;
        }
        GameFlowModule.isTurnPlayerX = !GameFlowModule.isTurnPlayerX;
        checkPlayerFocus(GameFlowModule.isTurnPlayerX);
        console.log("inside playTurn" + gameboard);
      }
    }
  }

  function checkPlayerFocus(isTurnPlayerX) {
    console.log("sa");
    const player_1_image = document.querySelector(".player_1 img");
    const player_2_image = document.querySelector(".player_2 img");

    if (isTurnPlayerX) {
      player_1_image.classList.add("active");
      if (player_2_image.classList.contains("active")) {
        player_2_image.classList.remove("active");
      }
    } else {
      if (player_1_image.classList.contains("active")) {
        player_1_image.classList.remove("active");
      }
      player_2_image.classList.add("active");
    }
  }

  function checkWinner(XorO) {
    //checks for "X" and "O" player seperately, i.e wont make "O" player win when checking for "X" player
    //didn't add extra effect for the rare scenario where there are two winning lines at the end(e.g one row and one column are X-X-X)
    // TO DO: add effect to winning combination
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (i = 0; i < winningCombos.length; i++) {
      for (j = 0; j < winningCombos[i].length; j++) {
        const myCombo = winningCombos[i];
        if (
          gameboard[myCombo[0]] === XorO &&
          gameboard[myCombo[1]] === XorO &&
          gameboard[myCombo[2]] === XorO
        ) {
          return XorO;
        }
      }
    }

    //checking for draw, in case all 9 boxes are full without a winner
    if (!gameboard.includes("")) {
      return "draw";
    } else {
      return false;
    }
  }

  return {
    gameboard,
    displayGameboardContent,
    createGameboardGrids,
    checkWinner,
    checkPlayerFocus,
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
  const overlay = document.querySelector(".overlay_for_pop_up");
  const popUp = document.querySelector(".end_game_pop_up");
  const statusMessage = document.querySelector(".winner_status");
  const statusImage = document.querySelector(".end_game_pop_up .winner_image");
  const newGameButton = document.querySelector(
    ".end_game_pop_up .new_game_button"
  );
  newGameButton.addEventListener("click", function () {
    startNewGame();
  });

  let isTurnPlayerX = true;

  function startNewGame() {
    this.isTurnPlayerX = true;
    GameboardModule.checkPlayerFocus(isTurnPlayerX);

    console.log(isTurnPlayerX);
    for (let i = 0; i < 9; i++) {
      GameboardModule.gameboard[i] = "";
    }
    GameboardModule.createGameboardGrids();
    GameboardModule.displayGameboardContent();
    statusMessage.innerHTML = "";
    popUp.classList.remove("active");
    overlay.classList.remove("active");
    statusImage.setAttribute("src", "");
    statusImage.setAttribute("alt", "");
  }

  function showEndGameResult(gameResult) {
    if (gameResult === "X") {
      statusMessage.innerHTML = `Player"X" WON!`;
      popUp.setAttribute(
        "style",
        "background-image: url(./images/soviets.jpg);"
      );
    } else if (gameResult === "O") {
      statusMessage.innerHTML = `Player"0" WON!`;
      popUp.setAttribute(
        "style",
        "background-image: url(./images/allies.jpg);"
      );
    } else if (gameResult === "draw") {
      statusMessage.innerHTML = `It has been a draw!`;
      popUp.setAttribute("style", "background-image: none;");
      statusImage.setAttribute("src", "./images/handshake-heart-64.png");
      statusImage.setAttribute("alt", "handshake");
    }
    popUp.classList.add("active");
    overlay.classList.add("active");
  }

  return { isTurnPlayerX, startNewGame, showEndGameResult };
})();

GameFlowModule.startNewGame();
console.log(GameFlowModule.isTurnPlayerX);
