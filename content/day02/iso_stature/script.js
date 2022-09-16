let cubes = [];
let stretch = 3
let camera, scene;
function createScene(THREE, sce, cam) {
    camera = cam;
    scene = sce;
    let material = customColorsMaterial(THREE, [new THREE.Vector4(1.0,0,0,0.0), new THREE.Vector4(1.0,0.158,0.883,0.25), new THREE.Vector4(1,0.676,0.025,0.0), new THREE.Vector4(0.94,1,0.8,1)]);

    let currPos = new THREE.Vector3(-20,-20,-20);
    let direction = new THREE.Vector3(0,0,0);
    let maxPos = new THREE.Vector3(-100,-100,-100);
    let minPos = new THREE.Vector3(0,0,0);
    // Create each cube individually
    for (let i = 0; i<30; i++) {
        let rnd = Math.random();
        let leftover;
        let negative = (Math.random() < 0.5) ? -1 : 1; // Negative direction
        if (rnd < 0.35) { // go in x-direction
            direction = new THREE.Vector3(2+Math.ceil(Math.random() * stretch),1,1);
            currPos = new THREE.Vector3(currPos.x + (direction.x/2+0.5)*negative, currPos.y +1*negative, currPos.z+1*negative);
            leftover = new THREE.Vector3(direction.x/2-0.5, 0,0);
        }
        else if (rnd < 0.7) { // go in y-direction
            direction = new THREE.Vector3(1,Math.ceil(2+Math.random() * stretch),1);
            currPos = new THREE.Vector3(currPos.x +1*negative,currPos.y + (direction.y/2+0.5)*negative, currPos.z+1*negative);
            leftover = new THREE.Vector3(0,direction.y/2-0.5,0);
        }
        else { // go in z-direction
            direction = new THREE.Vector3(1,1,Math.ceil(2+Math.random() * stretch));
            currPos = new THREE.Vector3(currPos.x +1*negative, currPos.y+1*negative, currPos.z + (direction.z/2+0.5)*negative);
            leftover = new THREE.Vector3(0,0,direction.z/2-0.5);
        }
        // create and add cube to scene
        let geometry = new THREE.BoxGeometry(direction.x, direction.y, direction.z)
        let cube = new THREE.Mesh( geometry, material );
        cube.position.set(currPos.x, currPos.y, currPos.z);
        cubes.push(cube);
        scene.add( cube );
        if (negative > 0) {
            currPos.add(leftover);
        }
        else {
            currPos.add(leftover.addScalar(-1));
        }
        // Correct camera possition
        if (currPos.x < minPos.x) minPos.x = currPos.x;
        if (currPos.y < minPos.y) minPos.y = currPos.y;
        if (currPos.z < minPos.z) minPos.z = currPos.z;

        if (currPos.x > maxPos.x) maxPos.x = currPos.x;
        if (currPos.y > maxPos.y) maxPos.y = currPos.y;
        if (currPos.z > maxPos.z) maxPos.z = currPos.z;

    }

    // Set new camera position to center all
    let camCorrection = minPos.add(maxPos);
    camCorrection.divideScalar(2)
    camCorrection.multiplyScalar(1)
    camera.position.set(camCorrection.x+20, camCorrection.y+20, camCorrection.z+20);
}

function myAnimation() {

}