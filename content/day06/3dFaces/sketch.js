// A choice for number of keypoints: 7,33,68,468

// === bare minimum 7 points ===
// var VTX = VTX7;

// === important facial feature 33 points ===
//var VTX = VTX33;

// === standard facial landmark 68 points ===
 var VTX = VTX68;

// === full facemesh 468 points ===
//var VTX = VTX468;

// select the right triangulation based on vertices
var TRI;
if (VTX == VTX7) {
  TRI = TRI7;
} else if (VTX == VTX33) {
  TRI = TRI33;
} else if (VTX == VTX68) {
  TRI = TRI68;
} else {
  TRI = TRI468;
}

var facemeshModel = null; // this will be loaded with the facemesh model
// WARNING: do NOT call it 'model', because p5 already has something called 'model'

var videoDataLoaded = false; // is webcam capture ready?

var statusText = "Loading facemesh model...";

var myFaces = []; // faces detected in this browser
// currently facemesh only supports single face, so this will be either empty or singleton

var capture; // webcam capture, managed by p5.js

// Load the MediaPipe facemesh model assets.
facemesh.load().then(function (_model) {
  console.log("model initialized.");
  statusText = "Model loaded.";
  facemeshModel = _model;
});
let canvasSize;
let myFont;
function preload() {
  myFont = loadFont('font.ttf');
}
//let canvasSize = createVector(window.innerWidth,window.innerHeight);
function setup() {
  canvasSize = createVector(window.innerWidth,window.innerHeight);
  createCanvas(canvasSize.x, canvasSize.y, WEBGL);
  capture = createCapture(VIDEO);
  frameRate(30);
  textFont(myFont);
  textSize(30);

  // this is to make sure the capture is loaded before asking facemesh to take a look
  // otherwise facemesh will be very unhappy
  capture.elt.onloadeddata = function () {
    console.log("video initialized");
    videoDataLoaded = true;
  };

  capture.hide();
}

//currentShape = faceTypes.roundShape;
/**
 * 
 * 0 -> top left
 * 16 -> top right
 * 8 -> bottom center
 */

// draw a face object returned by facemesh
function drawFaces(faces, filled) {
  currFaces = faces;
  for (var i = 0; i < faces.length; i++) {
    const keypoints = faces[i].scaledMesh;
    let correctionVect = createVector(canvasSize.x/2 - keypoints[30][0], canvasSize.y/2 - keypoints[30][1])
    correctionVect = createVector(0,0)
    stroke(20);
    fill(237, 34, 93);


    // Mouth
    beginShape();
    for (var j = 1; j < keypoints.length-1; j++) {
      let [x, y, z] = keypoints[j];
      vertex(x, y, -z);
    }
    endShape();



  }
}

// reduces the number of keypoints to the desired set
// (VTX7, VTX33, VTX68, etc.)
function packFace(face, set) {
  var ret = {
    scaledMesh: [],
  };
  for (var i = 0; i < set.length; i++) {
    var j = set[i];
    ret.scaledMesh[i] = [
      face.scaledMesh[j][0],
      face.scaledMesh[j][1],
      face.scaledMesh[j][2],
    ];
  }
  return ret;
}

function draw() {
  orbitControl();
  if (facemeshModel && videoDataLoaded) {
    // model and video both loaded,

    facemeshModel.estimateFaces(capture.elt).then(function (_faces) {
      // we're faceling an async promise
      // best to avoid drawing something here! it might produce weird results due to racing

      myFaces = _faces.map((x) => packFace(x, VTX)); // update the global myFaces object with the detected faces

      // console.log(myFaces);
      if (!myFaces.length) {
        // haven't found any faces
        statusText = "Show some faces!";
      } else {
        // display the confidence, to 3 decimal places
        statusText =
          "Confidence: " +
          Math.round(_faces[0].faceInViewConfidence * 1000) / 1000;
          statusText = ""
      }
    });
  }

  background(20);
  // now draw all the other users' faces (& drawings) from the server
  push();

  //scale(2);
  strokeWeight(3);
  noFill();
  drawFaces(myFaces);
  pop();

  push();
  fill(255, 0, 0);
  text(statusText, 2, 60);
  pop();
}
