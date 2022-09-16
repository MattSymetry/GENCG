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
//let canvasSize = createVector(window.innerWidth,window.innerHeight);
function setup() {
    canvasSize = createVector(window.innerWidth,window.innerHeight);
  createCanvas(canvasSize.x, canvasSize.y);
  capture = createCapture(VIDEO);
  frameRate(30);

  // this is to make sure the capture is loaded before asking facemesh to take a look
  // otherwise facemesh will be very unhappy
  capture.elt.onloadeddata = function () {
    console.log("video initialized");
    videoDataLoaded = true;
  };

  capture.hide();
}

let faceTypes = {
    triangleShape: function(myFaces) {
        for (var i = 0; i < myFaces.length; i++) {
            const keypoints = myFaces[i].scaledMesh;
            // Face shape
            line(keypoints[0][0], keypoints[0][1], keypoints[8][0], keypoints[8][1])
            line(keypoints[16][0], keypoints[16][1], keypoints[8][0], keypoints[8][1])

            // Brows
            line(keypoints[17][0], keypoints[17][1], keypoints[21][0], keypoints[21][1])
            line(keypoints[22][0], keypoints[22][1], keypoints[26][0], keypoints[26][1])

            // Eyes
            rect(keypoints[36][0], keypoints[38][1], keypoints[39][0]-keypoints[36][0], keypoints[41][1] - keypoints[38][1]);
            rect(keypoints[42][0], keypoints[44][1], keypoints[45][0]-keypoints[42][0], keypoints[47][1] - keypoints[44][1]);

            // Nose
            triangle(keypoints[30][0], keypoints[30][1], keypoints[31][0], keypoints[31][1],keypoints[35][0], keypoints[35][1]);
            line(keypoints[30][0], keypoints[30][1], keypoints[29][0], keypoints[29][1])

            //Mouth
            line(keypoints[48][0], keypoints[48][1], keypoints[51][0], keypoints[51][1])
            line(keypoints[54][0], keypoints[54][1], keypoints[51][0], keypoints[51][1])
            line(keypoints[48][0], keypoints[48][1], keypoints[57][0], keypoints[57][1])
            line(keypoints[54][0], keypoints[54][1], keypoints[57][0], keypoints[57][1])
        }
    },
    roundShape: function(myFaces) {
        for (var i = 0; i < myFaces.length; i++) {
            const keypoints = myFaces[i].scaledMesh;
            // Face shape
            ellipse((keypoints[14][0] - keypoints[2][0])/2 + keypoints[2][0], (keypoints[8][1] - keypoints[24][1])/2 + keypoints[24][1], (keypoints[14][0] - keypoints[2][0]), (keypoints[8][1] - keypoints[30][1])*2);

            // Brows
            beginShape();
            curveVertex(keypoints[17][0], keypoints[17][1]);
            curveVertex(keypoints[17][0], keypoints[17][1]);
            curveVertex(keypoints[18][0], keypoints[18][1]);
            curveVertex(keypoints[19][0], keypoints[19][1]);
            curveVertex(keypoints[20][0], keypoints[20][1]);
            curveVertex(keypoints[21][0], keypoints[21][1]);
            curveVertex(keypoints[21][0], keypoints[21][1]);
            endShape();

            beginShape();
            curveVertex(keypoints[22][0], keypoints[22][1]);
            curveVertex(keypoints[22][0], keypoints[22][1]);
            curveVertex(keypoints[23][0], keypoints[23][1]);
            curveVertex(keypoints[24][0], keypoints[24][1]);
            curveVertex(keypoints[25][0], keypoints[25][1]);
            curveVertex(keypoints[26][0], keypoints[26][1]);
            curveVertex(keypoints[26][0], keypoints[26][1]);
            endShape();

            // Eyes
            circle((keypoints[39][0] - keypoints[36][0])/2 + keypoints[36][0],(keypoints[41][1] - keypoints[38][1])/2 + keypoints[38][1], keypoints[41][1] - keypoints[38][1])
            circle((keypoints[45][0] - keypoints[42][0])/2 + keypoints[42][0],(keypoints[47][1] - keypoints[44][1])/2 + keypoints[44][1], keypoints[47][1] - keypoints[44][1])
            
            // Nose
            circle(keypoints[30][0],keypoints[30][1], keypoints[33][1] - keypoints[29][1])

            //Mouth
            beginShape();
            curveVertex(keypoints[48][0], keypoints[48][1]);
            curveVertex(keypoints[51][0], keypoints[51][1]);
            curveVertex(keypoints[54][0], keypoints[54][1]);
            curveVertex(keypoints[57][0], keypoints[57][1]);
            curveVertex(keypoints[48][0], keypoints[48][1]);
            endShape();
            beginShape();
            curveVertex(keypoints[54][0], keypoints[54][1]);
            curveVertex(keypoints[51][0], keypoints[51][1]);
            curveVertex(keypoints[48][0], keypoints[48][1]);
            curveVertex(keypoints[57][0], keypoints[57][1]);
            curveVertex(keypoints[54][0], keypoints[54][1]);
            endShape();

        }
    }
}
function getRandomShape(obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};

let currentShape = getRandomShape(faceTypes)
//currentShape = faceTypes.roundShape;
/**
 * 
 * 0 -> top left
 * 16 -> top right
 * 8 -> bottom center
 */

let myOwnFaces = [];
function setFace() {
    let myFaces = JSON.parse(JSON.stringify(currFaces))
    myOwnFaces[myOwnFaces.length] = {
        myFaces: myFaces,
        shape: currentShape
    }
    currentShape = getRandomShape(faceTypes)
}

let currFaces = null;
// draw a face object returned by facemesh
function drawFaces(faces, filled) {
  currFaces = faces;
  for (var i = 0; i < faces.length; i++) {
    const keypoints = faces[i].scaledMesh;
    let correctionVect = createVector(canvasSize.x/2 - keypoints[30][0], canvasSize.y/2 - keypoints[30][1])
    correctionVect = createVector(0,0)
    for (var j = 0; j < keypoints.length; j++) {
      keypoints[j][0] += correctionVect.x;
      keypoints[j][1] += correctionVect.y;
      let [x, y, z] = keypoints[j];
      //circle(x, y, 5);
      push();
      strokeWeight(1);
      fill(255,0,0)
      //text(j, x, y);
      pop();
    }
  }
  stroke(250)
  currentShape(faces)
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
  strokeJoin(ROUND); //otherwise super gnarly

  if (facemeshModel && videoDataLoaded) {
    // model and video both loaded,

    facemeshModel.estimateFaces(capture.elt).then(function (_faces) {
      // we're faceling an async promise
      // best to avoid drawing something here! it might produce weird results due to racing

      myFaces = _faces.map((x) => packFace(x, VTX)); // update the global myFaces object with the detected faces

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
  // Draw all saved faces
  myOwnFaces.forEach(element => {
    element.shape(element.myFaces)
  });
  pop();

  push();
  fill(255, 0, 0);
  text(statusText, 2, 60);
  pop();
}
