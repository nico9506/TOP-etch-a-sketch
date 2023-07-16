// Global variables ***************************************************
const board = document.querySelector(".container");

let colorPicked = 'rgb(0, 0, 0)';

const boardLengthInput = document.querySelector("#boardSizeInput");
const boardLengthText = document.querySelector("#boardSizeText");

// *******************************************************************

// Initialize the board
drawBoard(16);

// Update the board size value from the Input Range Element *****
boardLengthText.textContent = boardLengthInput.value;
boardLengthInput.addEventListener("input", (e) => {
    boardLengthText.textContent = e.target.value;
    drawBoard(e.target.value);
});

//functions ******************************************************

function drawBoard(boardLength) {
    cleanBoard();

    // 32rem is the side length of the board, defined in style.css
    const numberOfTiles = boardLength ** 2;
    const tileLength = 100 / boardLength;

    for (let i = 0; i < numberOfTiles; i++) {
        const newTile = document.createElement("div");
        newTile.classList.add("tile");
        newTile.style.width = tileLength + "%";
        newTile.style.height = tileLength + "%";
        board.appendChild(newTile);
    }

    const tiles = document.querySelectorAll(".tile");
    // EventListener which paint the tiles triggered by a hover action
    tiles.forEach((tile) => {
        tile.addEventListener("mouseover", paintTile);
    });
}

function cleanBoard() {
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach((element) => {
        element.remove();
    });
}

function paintTile() {
    this.style.backgroundColor = colorPicked;
}

// *****************************************************************
