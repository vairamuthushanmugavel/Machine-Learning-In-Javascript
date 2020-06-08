var dataset;
async function processData() {
 let data =await fetch("dataset.json");
 data = await data.json()
 
 

}
function convertTextToRGB(colorName) {
  ctx.beginPath();
  ctx.fillStyle = colorName;
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fill();
  let imagedata = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  return { r: imagedata[0], g: imagedata[1], b: imagedata[1], a: imagedata[4] };
}

//taking event from the form panel
let form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
});

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var data = convertTextToRGB("pink");
processData();
