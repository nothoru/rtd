let rows = 3;
let columns = 3;

let currTile;
let otherTile; //blank tile

let turns = 0;

let imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];
let winningOrder = [
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6.png",
  "7.png",
  "8.png",
  "9.png",
];

window.onload = function () {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      //img
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString();
      tile.src = imgOrder.shift() + ".png";

      tile.addEventListener("dragstart", dragStart);
      tile.addEventListener("dragover", dragOver);
      tile.addEventListener("dragenter", dragEnter);
      tile.addEventListener("dragleave", dragLeave);
      tile.addEventListener("drop", dragDrop);
      tile.addEventListener("dragend", dragEnd);

      document.querySelector("#board").append(tile);
    }
  }
};

function dragStart() {
  currTile = this;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  otherTile = this;
}

function dragEnd() {
  if (!otherTile.src.includes("3.png")) {
    return;
  }

  let currCoords = currTile.id.split("-");

  let r = parseInt(currCoords[0]);
  let c = parseInt(currCoords[1]);

  let otherCoords = otherTile.id.split("-");
  let r2 = parseInt(otherCoords[0]);
  let c2 = parseInt(otherCoords[1]);

  let moveLeft = r == r2 && c2 == c - 1;
  let moveRight = r == r2 && c2 == c + 1;
  let moveUp = c == c2 && r2 == r - 1;
  let moveDown = c == c2 && r2 == r + 1;

  let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

  if (isAdjacent) {
    let currImg = currTile.src;
    let otherImg = otherTile.src;

    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.querySelector("#turns").textContent = turns;

    checkWin();
  }
}

function checkWin() {
  let tiles = document.querySelectorAll("#board img");
  let currentOrder = Array.from(tiles).map((tile) => tile.src.split("/").pop());

  if (currentOrder.join() === winningOrder.join()) {
    let prizeLink = document.querySelector(".prize");
    prizeLink.textContent = "Congratulations! Click here for your prize!";
    prizeLink.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    prizeLink.target = "_blank";
  }
}
