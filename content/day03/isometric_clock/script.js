let cubes = [];
let camera, scene;
let timeBlocks = {
    h1: [],
    h2: [],
    m1: [],
    m2: [],
    s1: [],
    s2: [],
}

function createScene(THREE, sce, cam) {
    camera = cam;
    scene = sce;
    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();
    let materiall = customColorsMaterial(THREE, [
        new THREE.Vector4(189/255,178/255,255/255,0.0),
        new THREE.Vector4(189/255,178/255,255/255,0.5), //Front
        new THREE.Vector4(155/255,246/255,255/255,0.5),
        new THREE.Vector4(155/255,246/255,255/255,0.6), // Left
        new THREE.Vector4(255/255,173/255,173/255,0.61),
        new THREE.Vector4(255/255,173/255,173/255,1)]); // Up

    let material = customColorsMaterial(THREE, [
        new THREE.Vector4(255/255,255/255,255/255,0.0),
        new THREE.Vector4(255/255,255/255,255/255,0.5), //Front
        new THREE.Vector4(0/255,0/255,0/255,0.5),
        new THREE.Vector4(0/255,0/255,0/255,0.6), // Left
        new THREE.Vector4(0/255,0/255,0/255,0.61),
        new THREE.Vector4(0/255,0/255,0/255,1)]); // Up
    for(let x = -8; x <= 8; x++) {
        for(let y = -5; y <= 5; y++) {
            let xS = 1;
            let yS = 1;
            let zS = 1;
            if ((y == 1 && x == -3) || (y == -1 && x == -3) || (y == 1 && x == 3) || (y == -1 && x == 3)) zS = 2;
            let geometry = new THREE.BoxGeometry(xS, yS, zS)
            let cube = new THREE.Mesh( geometry, material );
            cube.position.set(x,y,0);
            cubes.push(cube);
            scene.add( cube );
            // H1
            if (x == -7) {
                if (y == -4) timeBlocks.h1[1] = cube;
                if (y == -3) timeBlocks.h1[2] = cube;
            }
            // H2
            else if (x == -5) {
                if (y == -4) timeBlocks.h2[1] = cube;
                if (y == -3) timeBlocks.h2[2] = cube;
                if (y == -2) timeBlocks.h2[3] = cube;
                if (y == -1) timeBlocks.h2[4] = cube;
                if (y == 0) timeBlocks.h2[5] = cube;
                if (y == 1) timeBlocks.h2[6] = cube;
                if (y == 2) timeBlocks.h2[7] = cube;
                if (y == 3) timeBlocks.h2[8] = cube;
                if (y == 4) timeBlocks.h2[9] = cube;
            }
            // M1
            else if (x == -1) {
                if (y == -4) timeBlocks.m1[1] = cube;
                if (y == -3) timeBlocks.m1[2] = cube;
                if (y == -2) timeBlocks.m1[3] = cube;
                if (y == -1) timeBlocks.m1[4] = cube;
                if (y == 0) timeBlocks.m1[5] = cube;
                if (y == 1) timeBlocks.m1[6] = cube;
                if (y == 2) timeBlocks.m1[7] = cube;
                if (y == 3) timeBlocks.m1[8] = cube;
                if (y == 4) timeBlocks.m1[9] = cube;
            }
            // M2
            else if (x == 1) {
                if (y == -4) timeBlocks.m2[1] = cube;
                if (y == -3) timeBlocks.m2[2] = cube;
                if (y == -2) timeBlocks.m2[3] = cube;
                if (y == -1) timeBlocks.m2[4] = cube;
                if (y == 0) timeBlocks.m2[5] = cube;
                if (y == 1) timeBlocks.m2[6] = cube;
                if (y == 2) timeBlocks.m2[7] = cube;
                if (y == 3) timeBlocks.m2[8] = cube;
                if (y == 4) timeBlocks.m2[9] = cube;
            }
            // S1
            else if (x == 5) {
                if (y == -4) timeBlocks.s1[1] = cube;
                if (y == -3) timeBlocks.s1[2] = cube;
                if (y == -2) timeBlocks.s1[3] = cube;
                if (y == -1) timeBlocks.s1[4] = cube;
                if (y == 0) timeBlocks.s1[5] = cube;
                if (y == 1) timeBlocks.s1[6] = cube;
                if (y == 2) timeBlocks.s1[7] = cube;
                if (y == 3) timeBlocks.s1[8] = cube;
                if (y == 4) timeBlocks.s1[9] = cube;
            }
            // S2
            else if (x == 7) {
                if (y == -4) timeBlocks.s2[1] = cube;
                if (y == -3) timeBlocks.s2[2] = cube;
                if (y == -2) timeBlocks.s2[3] = cube;
                if (y == -1) timeBlocks.s2[4] = cube;
                if (y == 0) timeBlocks.s2[5] = cube;
                if (y == 1) timeBlocks.s2[6] = cube;
                if (y == 2) timeBlocks.s2[7] = cube;
                if (y == 3) timeBlocks.s2[8] = cube;
                if (y == 4) timeBlocks.s2[9] = cube;
            }
        }
    }
}
// 1 1 : 1 1 : 1 1 
function myAnimation() {
}

window.setInterval(function(){
    let date = new Date();
    let h1 = Math.floor(date.getHours()/10);
    let h2 = date.getHours()%10;
    let m1 = Math.floor(date.getMinutes()/10);
    let m2 = date.getMinutes()%10;
    let s1 = Math.floor(date.getSeconds()/10);
    let s2 = date.getSeconds()%10;

    // H1
    for (let i in timeBlocks.h1) {
        if (i <= h1) {
            moveUp(timeBlocks.h1[i]);
        }
        else {
            moveDown(timeBlocks.h1[i]);
        }
    }
    // H2
    for (let i in timeBlocks.h2) {
        if (i <= h2) {
            moveUp(timeBlocks.h2[i]);
        }
        else {
            moveDown(timeBlocks.h2[i]);
        }
    }

    // M1
    for (let i in timeBlocks.m1) {
        if (i <= m1) {
            moveUp(timeBlocks.m1[i]);
        }
        else {
            moveDown(timeBlocks.m1[i]);
        }
    }
    // M2
    for (let i in timeBlocks.m2) {
        if (i <= m2) {
            moveUp(timeBlocks.m2[i]);
        }
        else {
            moveDown(timeBlocks.m2[i]);
        }
    }

    // S1
    for (let i in timeBlocks.s1) {
        if (i <= s1) {
            moveUp(timeBlocks.s1[i]);
        }
        else {
            moveDown(timeBlocks.s1[i]);
        }
    }
    // S2
    for (let i in timeBlocks.s2) {
        if (i <= s2) {
            moveUp(timeBlocks.s2[i]);
        }
        else {
            moveDown(timeBlocks.s2[i]);
        }
    }
  }, 1000);

function moveUp(obj) {
    //TWEEN.removeAll();
    new TWEEN.Tween( obj.scale )
    .to( { z: 2 }, 800 )
    .easing( TWEEN.Easing.Bounce.Out )
    .onUpdate()
    .start();
}

function moveDown(obj) {
    //TWEEN.removeAll();
    new TWEEN.Tween( obj.scale )
    .to( { z: 1 }, 800 )
    .easing( TWEEN.Easing.Bounce.Out )
    .onUpdate( )
    .start();
}

/*
x = right, front
y = up/down (height)
z = left,front



*/