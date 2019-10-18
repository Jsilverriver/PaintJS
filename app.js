const canvas = document.getElementById("jsCanvas");
const CANVAS_SIZE = 700;
canvas.height = CANVAS_SIZE;
canvas.width = CANVAS_SIZE;
const ctx = canvas.getContext("2d");
const INITIAL_COLOR = "2c2c2c";

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR; // default
ctx.fillStyle = INITIAL_COLOR; // default
ctx.lineWidth = 5; // default

const colors = document.querySelectorAll(".jsColors");
const range = document.querySelector("#jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

function handleSaveClick(event) {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  // save버튼을 클릭하게 되면, link를 클릭하는것 처럼 만들어서 이벤트를 발생시킨다. 라고 생각하면된다.
  // 지금 link에 href와 download가 추가되어 있으니까.
  link.click();
}

saveBtn.addEventListener("click", handleSaveClick);

//contextmenu가 나오는걸 막는다.
function handleCM(event) {
  event.preventDefault();
  console.log(event);
}

function paintCanvas() {
  if (filling) {
    // ctx.fillStyle = color; it is executed below
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
  canvas.addEventListener("contextmenu", handleCM);
}
