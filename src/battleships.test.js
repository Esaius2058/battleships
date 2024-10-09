/* eslint-disable no-undef */
const { Ship, GameBoards, Player } = require("./battleships");

test("Ship is working perfectly", () => {
  let s = new Ship(5);
  s.hits = 4;
  expect(s.isSunk()).toBe(false);
});

test("GameBoards is working perfectly", () => {
  let b = new GameBoards();
  b.placeShip([0, 0], [0, 4]);
  b.placeShip([3, 2], [5, 2]);
  b.placeShip([2, 4], [2, 6]);
  expect(b.placeShip([0, 2], [2, 2])).toBe("Position is occupied");
  expect(b.receiveAttack(1, 2)).toBe("Miss!");
  expect(b.receiveAttack(0, 3)).toBe("Hit!");
  expect(b.board.length).toBe(7);
  expect(b.ships.length).toBe(3);
  expect(b.isAllShipsSunk()).toBe(false);
});

test("Player is working okay", () => {
    let p = new Player('real');
    expect(p.type).toBe('real');
    expect(p.board.length).toBe(7);
});
