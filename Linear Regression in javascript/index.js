var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var reqAniFrame = window.requestAnimationFrame;
var points = [];
var learning_rate = 0.01;
//intitalizing the variables
Point.canvasWidth = canvas.width;
Point.canvasHeight = canvas.height;

//initalizing coefficient
//line equation will be y=mx+c
var m = 0.0;
var c = 0.0;

//creating the dataset using user click event .
document.addEventListener("click", function (event) {
  //getting the cursor position inside the canvas
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  //creating the new point
  let point = new Point(x, y);
  points.push(point);
});
//visuvalizing the points
function visualizepoints() {
  points.forEach((point) => {
    point.drawCircle();
  });
}

//calculate the gradient
function gradientDecent() {
  //calculatin the error for each everypoint and adjusting the weights.
  points.forEach(function (point) {
    //calculating the error
    let predict = m * point.x + c;
    let error = point.y - predict;
    //calculating the deltaM and delatC
    //deltaM = 2 * error * input
    deltaM = error * point.x * learning_rate;
    //deltaC = 2 * error
    deltaC = error * learning_rate;
    //adjusting the M and c value
    m += deltaM;
    c += deltaC;
  });
}

//visuvalizing the best fit line.
function drawLine() {
  //calculating the y1 and y2 using line equation and coefficient
  let x1 = 0;
  let y1 = m * x1 + c;
  // let y1 = 0.5;
  let x2 = 1;
  let y2 = m * x2 + c;
  // let y2 = 0.5;
  x1 = map(x1, 0, 1, 0, canvas.width);
  x2 = map(x2, 0, 1, 0, canvas.width);
  y1 = map(y1, 0, 1, canvas.height, 0);
  y2 = map(y2, 0, 1, canvas.height, 0);
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.stroke();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  visualizepoints();
  gradientDecent();
  console.log(m,c)
  drawLine();
  reqAniFrame(draw);
}

reqAniFrame(draw);
