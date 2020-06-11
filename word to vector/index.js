var dataMap = {};
async function processData() {
  let data = await fetch("dataset.json");
  data = await data.json();
  for (let color of data.colors) {
    dataMap[color.color] = { rgba: convertTextToRGB(color.hex), ...color };
  }
}

/**
 *
 * @param {Object} colorA object which contains rgba values
 * @param {Object} colorB object which contains rgba values
 * @return {Number} distance between two objects
 */
function calcEculideanDist(colorA, colorB) {
  return Math.sqrt(
    Math.pow(colorA.r - colorB.r, 2) +
      Math.pow(colorA.g - colorB.g, 2) +
      Math.pow(colorA.b - colorB.b, 2)
  );
}

/**
 *
 * @param {string} colorName A valid colorName
 * @return {Object} rgba value
 *
 */
function convertTextToRGB(colorName) {
  ctx.clearRect(0,0,canvas.width,canvas.height)
  ctx.beginPath();
  ctx.fillStyle = colorName;
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fill();
  let imagedata = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  return { r: imagedata[0], g: imagedata[1], b: imagedata[1], a: imagedata[4] };
}

/** Listening to form submit event.
 */
let form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let color = document.forms[0].color;
  let rgb = convertTextToRGB(color.value);
  // sorting the array based on ecludian distance

  let closestColorsArr = Object.keys(dataMap);
  // closestColorsArr.length = 10 
  closestColorsArr.sort((c1, c2) => {
    return calcEculideanDist(dataMap[c1].rgba, rgb) -  calcEculideanDist(dataMap[c2].rgba, rgb);
  });
  updateClosesetVec(closestColorsArr);
});
/**
 * @param arr sorted array based on current vector
 */
function updateClosesetVec(arr) {
  let closetVec = document.getElementById("closestvectors");
  let container = document.createDocumentFragment();
  let span = document.createElement('span');
  span.innerText = "Top 5 Close color Vectors that close to current color"
  container.appendChild(span)
  for (i = 0; i < 5; i++) {
    let p = document.createElement("p");
    p.innerText = arr[i];
    p.style.color = dataMap[arr[i]].hex
    container.appendChild(p);
  }
  closetVec.innerHTML = "";
  closetVec.append(container);
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
processData();
