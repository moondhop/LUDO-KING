const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const SIZE = 720;
const CELL = SIZE / 15;

function drawCell(x, y, color, border = "#222") {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL, y * CELL, CELL, CELL);

    ctx.strokeStyle = border;
    ctx.lineWidth = 1;
    ctx.strokeRect(x * CELL, y * CELL, CELL, CELL);
}

function drawHome(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL, y * CELL, CELL * 6, CELL * 6);

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(
        (x + 3) * CELL,
        (y + 3) * CELL,
        CELL * 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

function drawCenter() {

    ctx.beginPath();

    ctx.moveTo(7.5 * CELL, 5 * CELL);

    ctx.lineTo(10 * CELL, 7.5 * CELL);

    ctx.lineTo(7.5 * CELL, 10 * CELL);

    ctx.lineTo(5 * CELL, 7.5 * CELL);

    ctx.closePath();

    ctx.fillStyle = "#ffffff";

    ctx.fill();

}

function drawGrid() {

    for (let x = 0; x < 15; x++) {

        for (let y = 0; y < 15; y++) {

            drawCell(x, y, "#fafafa");

        }

    }

}

function drawBoard() {

    ctx.clearRect(0, 0, SIZE, SIZE);

    drawGrid();

    drawHome(0, 0, "#ff3b30");

    drawHome(9, 0, "#34c759");

    drawHome(0, 9, "#007aff");

    drawHome(9, 9, "#ffcc00");

    drawCenter();

}
