let diam;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);

  if (diam > 0) {
    diam = diam - 25;
  }
}

function mousePressed() {
  cx = mouseX;
  cy = mouseY;
  diam = width * 2;
}

//Flued ball
let it = 0;

function setup() {
  createCanvas(500, 500);
  noStroke();
}

function draw() {
  background(255);

  // row
  for (let x = 0; x < width; x += width / 12) {
    let row = x * PI * 0.6;
    // colum
    for (let y = 0; y < height; y += height / 8) {
      let row = y * PI * 0.6;

      // position
      let xPos = x;
      let yPos = 40 * sin(it * 0.06 + row) + y;

      let cPos = 40 * sin(it * 0.06 + row) + x;
      let vPos = y;

      // size
      let s = 50 * (1 + cos(it * 0.1 + row)) * 0.5;

      let colorPalette = [
        color(76, 211, 240),
        color(255, 204, 182),
        color(255, 109, 121),
      ];
      //fill(random(colorPalette));
      //ellipse(xPos, yPos, s);

      let pmx = pmouseX;
      let pmy = pmouseY;

      for (let pmx = 0; pmx < 20; pmx++) {
        for (let pmy = 0; pmy < 20; pmy++) {
          if (mouseIsPressed === true) {
            push();
            fill(random(colorPalette));
            ellipse(cPos, vPos, pmy, s);
            pop();
          } else {
            fill(random(0, 255));
            rect(xPos, yPos, pmx, s);
          }
        }
      }
    }
    it += 0.5;
  }
}
