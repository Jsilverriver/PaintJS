const canvas = document.getElementById("jsCanvas");
const CANVAS_SIZE = 700;
canvas.height = CANVAS_SIZE;
canvas.width = CANVAS_SIZE;
const ctx = canvas.getContext("2d");
const INITIAL_COLOR = "2c2c2c";
ctx.strokeStyle = INITIAL_COLOR; // default
ctx.fillStyle = INITIAL_COLOR; // default
ctx.lineWidth = 5; // default
const colors = document.querySelectorAll(".jsColors");
const range = document.querySelector("#jsRange");
const mode = document.getElementById("jsMode");

function paintCanvas() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

let filling = false;
function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}
mode.addEventListener("click", handleModeClick);

function handleRange(event) {
  const stroke = event.target.value;
  ctx.lineWidth = stroke;
}
range.addEventListener("input", handleRange);

function handleColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}
Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColor)
);
// Array.from은 어떤 값을 강제로 배열로 바꿔주는것이다.
// Array.from(colors).forEach(function(color) {
//   color.addEventListener("click", handleColor);
// });

let painting = false;
const startPainting = () => (painting = true);
// function startPainting() {
//   painting = true;
// }
const stopPainting = () => (painting = false);
// function stopPainting() {
//   painting = false;
// }

function onMouseMove(event) {
  let x = event.offsetX;
  let y = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", paintCanvas);
}
