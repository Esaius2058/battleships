import { GameBoards} from "./battleships.js";
import "./styles.css";

const gameBoard = new GameBoards();
const gameBoardTwo = new GameBoards();
const startBtn = document.getElementById("start-btn");
const boardElement = document.getElementById("player-board");
const boardElementTwo = document.getElementById("opp-board");
const messageElement = document.getElementById("messages");
const startCoordinates = document.getElementById("start-coord");
const endCoordinates = document.getElementById("end-coord");
const placeShipBtn = document.getElementById("place-ship");
const attackCoordinates = document.getElementById("attack-coord");
const attackShipBtn = document.getElementById("attack-ship");
const shipLogs = document.getElementById("ship-logs");
const logsBtn = document.getElementById("logs-btn"); 

// render initial game board
const renderBoard = () => {
  boardElement.innerHTML = "";
  for (let i = 0; i < gameBoard.rows; i++) {
    for (let j = 0; j < gameBoard.columns; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (gameBoard.board[i][j] == "hit") {
        cell.classList.add("hit");
      } else if (gameBoard.board[i][j] == "miss") {
        cell.classList.add("miss");
      }
      cell.dataset.x = i;
      cell.dataset.y = j;
      boardElement.appendChild(cell);
    }
  }
};

//render the second board
const renderBoardTwo = () => {
  boardElementTwo.innerHTML = "";
  for (let i = 0; i < gameBoardTwo.rows; i++) {
    for (let j = 0; j < gameBoardTwo.columns; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (gameBoardTwo.board[i][j] == "hit") {
        cell.classList.add("hit");
      } else if (gameBoardTwo.board[i][j] == "miss") {
        cell.classList.add("miss");
      }
      cell.dataset.x = i;
      cell.dataset.y = j;
      boardElementTwo.appendChild(cell);
    }
  }
}

startBtn.addEventListener('click', () => {
    boardElement.classList.toggle('hidden');
    boardElementTwo.classList.toggle('hidden');
    renderBoard();
    renderBoardTwo();
});

placeShipBtn.addEventListener('click', () => {
    const startCoord = startCoordinates.value;
    const endCoord = endCoordinates.value;
    const [x1,y1] = startCoord.split(',').map(Number);
    const [x2,y2] = endCoord.split(',').map(Number);

    try{
        gameBoard.placeShip([x1,y1], [x2,y2]);
        startCoordinates.value = '';
        endCoordinates.value = '';
        messageElement.textContent = "Ship placed successfully!";
        shipLogs.innerHTML += `
          <p>Start Coordinates: ${x1}, ${y1}</p>
          <p>End Coordinates: ${x2}, ${y2}</p>
        `;
    }catch (error){
        messageElement.textContent = error.message;
    }

    //Computer also places a ship in the board two
    let auto = computerMoves();
    let [ax1,ay1] = auto.startCoords;
    let [ax2,ay2] = auto.endCoords;
    try{
      gameBoardTwo.placeShip([ax1,ay1], [ax2,ay2]); 
      messageElement.textContent += "Computer's Ship placed successfully!";
    }catch(error){
      messageElement.textContent = "Computer's is an " + error.message;
    }
});

attackShipBtn.addEventListener('click', () => {
    const targetCoord = attackCoordinates.value;
    const [x,y] = targetCoord.split(',').map(Number);
    messageElement.textContent = gameBoardTwo.receiveAttack(x, y);
    attackCoordinates.value = '';

    //Check if all the ships are sunk
    if(gameBoard.isAllShipsSunk()){
        messageElement.innerHTML += `<p>You sunk all the opp's ships! You win!</p>`;
    }

    const autoX = Math.floor(Math.random() * 7) + 1;
    const autoY = Math.floor(Math.random() * 7) + 1;
    messageElement.innerHTML += `<p>Computer ${gameBoard.receiveAttack(autoX, autoY)}</p>`;
    renderBoard();
    renderBoardTwo();
});

const computerMoves = () => {
    let shipPlacement;
    let shipLength = 3;

    //Random ship placement either true or false
    shipPlacement = Math.floor(Math.random() * 10) < 5;

    //Choosing random coordinates 
    let x1 = Math.floor(Math.random() * (8 - shipLength)) + 1;
    let y1 = Math.floor(Math.random() * (8 - shipLength)) + 1;

    let x2, y2;
    x2 = shipPlacement ? x1 + shipLength - 1 : x1;
    y2 = shipPlacement ? y1 : y1 + shipLength - 1;
 
    return {startCoords: [x1,x2], endCoords: [y1,y2]}
}

logsBtn.addEventListener('click', () => {
  shipLogs.classList.toggle('hidden');
  if(logsBtn.value == "Ship Logs"){
    logsBtn.textContent = "Hide Logs";
    logsBtn.value = "Hide Logs";
  }else{
    logsBtn.textContent = "Ship Logs";
    logsBtn.value = "Ship Logs";
  }
});