// Global variables ***************************************************
const board = document.querySelector(".container");

const boardLengthInput = document.querySelector("#boardSizeInput");
const boardLengthText = document.querySelector("#boardSizeText");

const btnClear = document.getElementById("btn-clear");
const colorPicker = document.getElementById("color-picker");
const btnRainbow = document.getElementById("btn-rainbow");
const btnShade = document.getElementById("btn-shade");
const btnLighten = document.getElementById("btn-lightening");
const btnEraser = document.getElementById("btn-eraser");

let colorPicked;
let lastColor = ""; //used to keep the rgb value of the last color in a tile

// 0 for constant color, 1 for rainbow, 2 for shading, 3 for lightening,
// 4 for eraser
// Used to identify the button selected
let typeOfColor = 0;

// *******************************************************************
// Update the board size value from the Input Range Element *****
boardLengthText.textContent = boardLengthInput.value;
boardLengthInput.addEventListener("input", (e) => {
    boardLengthText.textContent = e.target.value;
    drawBoard(e.target.value);
});

// Initialize the board
drawBoard(boardLengthInput.value);

// Clear button functionality
btnClear.addEventListener("click", () => {
    drawBoard(boardLengthInput.value);
});

// Color button functionality
colorPicker.addEventListener("click", () => {
    typeOfColor = 0;
});

// Rainbow button functionality
btnRainbow.addEventListener("click", () => {
    typeOfColor = 1;
});

// Shading Scale button functionality
btnShade.addEventListener("click", () => {
    typeOfColor = 2;
});

// Shading Scale button functionality
btnLighten.addEventListener("click", () => {
    typeOfColor = 3;
});

// Eraser button functionality
btnEraser.addEventListener("click", () => {
    typeOfColor = 4;
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

    paintTiles();
}

function cleanBoard() {
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach((element) => {
        element.remove();
    });
}

function paintTiles() {
    const tiles = document.querySelectorAll(".tile");

    tiles.forEach((tile) => {
        const gridTile = tile;
        gridTile.addEventListener("mouseover", (e) => {
            switch (typeOfColor) {
                case 0:
                    e.target.style.backgroundColor = colorPicker.value;
                    break;

                case 1:
                    e.target.style.backgroundColor = getRandomColor();
                    break;

                case 2:
                    lastColor = e.target.style.backgroundColor;
                    e.target.style.backgroundColor = getDarkerColor();
                    break;

                case 3:
                    lastColor = e.target.style.backgroundColor;
                    e.target.style.backgroundColor = getLighterColor();
                    break;

                case 4:
                    e.target.style.backgroundColor = "rgb(255, 255, 255)";
                    break;

                default:
                    e.target.style.backgroundColor = "rgb(0, 0, 0)";
                    break;
            }
        });
    });
}

function getRandomColor() {
    const R = Math.random() * 255;
    const G = Math.random() * 255;
    const B = Math.random() * 255;

    return "rgb(" + R + ", " + G + ", " + B + ")";
}

function getDarkerColor() {
    if (lastColor.length < 1) {
        lastColor = "rgb(255, 255, 255)";
    }

    const step = 40;
    const currentRGBArray = lastColor.slice(4, lastColor.length - 1).split(",");

    let R = parseFloat(currentRGBArray[0]) - step;
    let G = parseFloat(currentRGBArray[1]) - step;
    let B = parseFloat(currentRGBArray[2]) - step;

    return "rgb(" + R + ", " + G + ", " + B + ")";
}

function getLighterColor() {
    if (lastColor.length < 1) {
        lastColor = "rgb(255, 255, 255)";
    }

    const step = 40;
    const currentRGBArray = lastColor.slice(4, lastColor.length - 1).split(",");

    let R = parseFloat(currentRGBArray[0]) + step;
    let G = parseFloat(currentRGBArray[1]) + step;
    let B = parseFloat(currentRGBArray[2]) + step;

    return "rgb(" + R + ", " + G + ", " + B + ")";
}

// *****************************************************************
