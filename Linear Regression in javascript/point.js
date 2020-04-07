
function  map(input,input_start,input_end,output_start,output_end){
   let slope = (output_start -  output_end) / (input_start - input_end) 
   let output = slope * (input - input_start) + output_start;
   return output
}

class Point {
  static canvasWidth = null;
  static canvasHeight = null;
  constructor(x, y) {
    //normalizing the pixel between 0 and 1
    this.x = map(x,0,Point.canvasWidth,0,1) ;
    //flliping the side for calculation  and normalizing the pixel between 0 and 1
    this.y = map(y,0,Point.canvasHeight,1,0) ;
  }
  getPixelPX() {
    //getting the original of pixel y
    return map(this.x , 0 ,1 , 0 ,Point.canvasWidth);
  }
  getPixelPY() {
    //getting original pixel value of y
    return map(this.y,0,1,Point.canvasHeight,0)  ;
  }
  drawCircle() {
    ctx.beginPath();
    ctx.arc(this.getPixelPX(), this.getPixelPY(), 4, 0, 2 * Math.PI);
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.stroke();
    ctx.fill();
  }
}
