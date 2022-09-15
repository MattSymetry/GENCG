let canvasSize, audioIn, fft, lows, mids, highs, triangle, brightness, radius, angleOffset, rotationDir, shapeIndex;
const minSize = 10;
const maxSize = 300;
function setup() {
  canvasSize = createVector(window.innerWidth,window.innerHeight);
  createCanvas(canvasSize.x, canvasSize.y);
  colorMode(HSB, 100);
  // audioIn = new p5.AudioIn();
  fft = new p5.FFT();
  fft.setInput(audioIn);

  let dirStart = Math.random()
  
  triangle = {
    mids : {angle: 0, color: createVector(30,100,100)},
    lows : {angle: Math.PI*2/3, color: createVector(47,100,100)},
    highs : {angle: Math.PI*4/3, color: createVector(90,100,100)},
    currPos : createVector(width/2, height/2),
    dir : createVector(dirStart, 1-dirStart)
  }

  angleOffset = 0.005;
  rotationDir = 1;
  shapeIndex = 2;

  audioIn.start(function () {
    //audioIn.setSource(2);
  });

  //noLoop()
}

window.onmousedown = function(){
  audioIn = new p5.AudioIn();
  audioIn.start(function () {
    //audioIn.setSource(2);
  });
};

function draw() {
  // Change Shape
  if (Math.random()>0.998) {
    shapeIndex = Math.ceil(Math.random()*2)
  }
  // Change rotation direction
  if (Math.random()>0.998) {
    rotationDir = rotationDir *-1
  }

  // Rotate
  angleOffset = angleOffset*rotationDir;
  triangle.lows.angle += angleOffset
  triangle.mids.angle += angleOffset
  triangle.highs.angle += angleOffset

  // Color change
  triangle.lows.color.x = (triangle.lows.color.x + Math.random()/30) % 100
  triangle.mids.color.x = (triangle.mids.color.x + Math.random()/20) % 100
  triangle.highs.color.x = (triangle.highs.color.x + Math.random()/10) % 100


  //background(20);
  fft.analyze();
  fft.smooth();
  lows = map(fft.getEnergy("bass"), 0, 255, minSize, maxSize);
  mids = map(fft.getEnergy("mid"), 0, 255, minSize, maxSize);     
  highs = map(fft.getEnergy("highMid"), 0, 255, minSize, maxSize);

  triangle.lows.color.y = 100-lows/3
  triangle.mids.color.y = 100-mids/3
  triangle.highs.color.y = 100-highs/3

  brightness = fft.getCentroid();
  angleOffset = brightness/100000
  radius = (lows + mids + highs) / 3

  // Move
  triangle.currPos.x += triangle.dir.x*brightness/1000
  triangle.currPos.y += triangle.dir.y*brightness/1000

  if (triangle.currPos.x > width || triangle.currPos.x < 0) {
    triangle.dir.x = triangle.dir.x * -1;
  }
  if (triangle.currPos.y > height || triangle.currPos.y < 0) {
    triangle.dir.y = triangle.dir.y * -1;
  }

  stroke(255)
  noFill();

  if (shapeIndex === 1) { // Circle
    noStroke();
    fill(triangle.lows.color.x, triangle.lows.color.y, triangle.lows.color.z);
    circle(Math.cos(triangle.lows.angle) * radius + triangle.currPos.x, Math.sin(triangle.lows.angle) * radius + triangle.currPos.y, lows);
    fill(triangle.mids.color.x, triangle.mids.color.y, triangle.mids.color.z);
    circle(Math.cos(triangle.mids.angle) * radius + triangle.currPos.x, Math.sin(triangle.mids.angle) * radius + triangle.currPos.y, mids);
    fill(triangle.highs.color.x, triangle.highs.color.y, triangle.highs.color.z);
    circle(Math.cos(triangle.highs.angle) * radius + triangle.currPos.x, Math.sin(triangle.highs.angle) * radius + triangle.currPos.y, highs);
  }
  else if (shapeIndex === 2) { // Square
    noStroke();
    fill(triangle.lows.color.x, triangle.lows.color.y, triangle.lows.color.z);
    rect(Math.cos(triangle.lows.angle) * radius + triangle.currPos.x - lows/2, Math.sin(triangle.lows.angle) * radius + triangle.currPos.y - lows/2, lows, lows);
    fill(triangle.mids.color.x, triangle.mids.color.y, triangle.mids.color.z);
    rect(Math.cos(triangle.mids.angle) * radius + triangle.currPos.x - mids/2, Math.sin(triangle.mids.angle) * radius + triangle.currPos.y - mids/2, mids, mids);
    fill(triangle.highs.color.x, triangle.highs.color.y, triangle.highs.color.z);
    rect(Math.cos(triangle.highs.angle) * radius + triangle.currPos.x - highs/2, Math.sin(triangle.highs.angle) * radius + triangle.currPos.y - highs/2, highs, highs);
  }
}
