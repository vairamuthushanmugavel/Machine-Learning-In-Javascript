class Vector {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  multiply(num) {
    this.x *= num;
    this.y *= num;
    this.z *= num;
  }
  add({ x, y, z }) {
    this.x += x;
    this.y += y;
    this.z += z;
  }
}
