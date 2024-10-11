class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }

  hit = () => {
    this.hits++;
  };

  isSunk = () => {
    if (this.hits >= this.length) return true;
    return false;
  };
}

class GameBoards {
  constructor() {
    this.rows = 7;
    this.columns = 7;
    this.board = this.createBoard();
    this.ships = [];
  }

  createBoard = () => {
    let board = [];
    //Initialize the array as a 2d array of null values
    for (let i = 0; i < this.rows; i++) {
      board[i] = new Array(this.columns).fill(null);
    }
    return board;
  };

  placeShip = ([x1,y1], [x2,y2]) => {
    //Check if the ship is not placed horizontally or vertically
    if (x1 != x2 && y1 != y2) {
      throw new Error("Invalid ship placement");
    }

    //Horizontal placement
    if (x1 == x2) {
      for (let j = Math.min(y1, y2); j <= Math.max(y1, y2); j++) {
        //Check if any of the grids is occupied
        if (this.board[x1][j] != null && this.board[x1][j] != "miss") {
          throw new Error("Position is occupied");
        }
        this.board[x1][j] = "ship"; //Mark position as occupied
      }
    }
    //Vertical placement
    else if (y1 == y2) {
      for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
        //Check if any of the grids is occupied
        if (this.board[i][y1] != null && this.board[i][y1] != "miss") {
          return "Position is occupied";
        }
        this.board[i][y1] = "ship"; //Mark position as occupied
      }
    }
    let startCoords = [x1,y1];
    let endCoords = [x2,y2];
    this.ships.push({ startCoords, endCoords });
  };

  receiveAttack = (x,y) => {
    //Check if the position on the board has a ship:
    if (this.board[x][y] == "ship") {
      this.board[x][y] = "hit";
      return "Hit!\n";
    } else if (this.board[x][y] == null) {
      this.board[x][y] = "miss";
      return "Miss!\n";
    } else {
      return "Already attacked this position!";
    }
  };

  isAllShipsSunk = () => {
    for (let ship of this.ships) {
      let [x1,y1] = ship.startCoords;
      let [x2,y2] = ship.endCoords;
      let isSunk = true;

      //Check all ship coordinates for hit status
      if (x1 === x2) {
        for (let j = Math.min(y1, y2); j < Math.max(y1, y2); j++) {
          if (this.board[x1][j] !== "hit") {
            isSunk = false;
            break;
          }
        }
      } else if (y1 === y2) {
        for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
          if (this.board[i][y1] !== "hit") {
            isSunk = false;
            break;
          }
        }
      }

      // If any ship is not fully hit, return false
      if (!isSunk) return false;
    }
    return true;
  };
}

class Player {
  constructor(playerType = 'computer') {
    this.type = playerType;
    let g = new GameBoards();
    this.board = g.board;
  }
}

export { Ship, GameBoards, Player };