var dataMap = {};
async function processData() {
  let data = await fetch("dataset.json");
  data = await data.json();
  for (let color of data.colors) {
    dataMap[color.color] = { rgba: convertTextToRGB(color.color), ...color };
  }
}

function calcEculideanDist(colorA, colorB) {
  return Math.sqrt(
    Math.pow((colorA.r - colorB.r), 2) +
      Math.pow((colorA.g - colorB.g), 2) +
      Math.pow((colorA.b - colorB.b), 2)
  );
}

/**
 *
 * @param {string} colorName A valid colorName
 * @return {Object} rgba value
 *
 */
function convertTextToRGB(colorName) {
  ctx.beginPath();
  ctx.fillStyle = colorName;
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fill();
  let imagedata = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  return { r: imagedata[0], g: imagedata[1], b: imagedata[1], a: imagedata[4] };
}

/**
 * @description  Listening to form submit event.
 */
let form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
});

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var data = convertTextToRGB("pink");
processData();
