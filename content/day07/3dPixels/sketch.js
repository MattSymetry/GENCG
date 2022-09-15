let canvasSize, img, boxes, cam, stratPos, endPos;
let goToStart = false;
let easing = 0.01;

function preload() {
  img = loadImage('pix-logo.png');
}

function setup() {
  canvasSize = createVector(window.innerWidth,window.innerHeight);
  createCanvas(canvasSize.x, canvasSize.y, WEBGL);
  cam = createCamera();
  cam.ortho();
  img.resize(200, 200);
  createScene();
  stratPos = createVector(250,250,200);
  endPos = createVector(0,0,200);
  cam.setPosition(stratPos.x, stratPos.y, stratPos.z)

  noStroke();
  shininess(100);
}

function createScene() {
  let correctionX = img.width/2
  let correctionY = img.height/2
  boxes = [];
  for(let x = 0; x < img.width; x+= 5) {
    for(let y = 0; y < img.height; y+=5) {
      if (img.get(x,y)[3] > 250) {
        boxes.push(createVector(x-correctionX,y-correctionY,random(300)-150))
      }
    }
  }

  for(let x = -200; x < 200; x += 5) {
    for(let y = -200; y < 200; y += 5) {
      for(let z = -200; z < 200; z += 5) {
        if (((x<-100 || x>100) || y>100 || y<-100) && ((y<-100 || y>100) || x>100 || x<-100)) {
          if (random(20) > 19.9) {
            boxes.push(createVector(x,y,z))
          }
        }
      }
    }
  }
}

function draw() {
  background(20);
  ambientLight(200);
  //orbitControl();
  cam.lookAt(0,0,0);
  img.loadPixels();

  if (!goToStart) {
    let dx = endPos.x - cam.eyeX;
    cam.eyeX += dx * easing;
    let dy = endPos.y - cam.eyeY;
    cam.eyeY += dy * easing;
    let dz = endPos.z - cam.eyeZ;
    cam.eyeZ += dz * easing;
    if (Math.abs(dx+dy+dz) < 1) {
      goToStart = true;
    }
  }
  else {
    let dx = stratPos.x - cam.eyeX;
    cam.eyeX += dx * easing;
    let dy = stratPos.y - cam.eyeY;
    cam.eyeY += dy * easing;
    let dz = stratPos.z - cam.eyeZ;
    cam.eyeZ += dz * easing;
    if (Math.abs(dx+dy+dz) < 1) {
      goToStart = false;
    }
  }

  boxes.forEach(element => {
    translate(element.x, element.y, element.z);
    specularMaterial(map(element.x, -200, 200, 0, 255), map(element.y, -200, 200, 0, 255), map(element.z, -200, 200, 0, 255));
    //sphere(5, 6, 3);
    box(5)
    translate(-element.x, -element.y, -element.z);
  });
}
