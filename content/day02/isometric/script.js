let cubes = [];
let raycaster;
let pointer;
let camera, scene;
document.addEventListener("mousemove", onPointerMove);
function createScene(THREE, sce, cam) {
    camera = cam;
    scene = sce;
    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();
    let material = customColorsMaterial(THREE, [new THREE.Vector4(1.0,0,0,0.0), new THREE.Vector4(1.0,0.158,0.883,0.25), new THREE.Vector4(1,0.676,0.025,0.0), new THREE.Vector4(0.94,1,0.8,1)]);
    // Create grid
    for(let x = -10; x <= 10; x++) {
        for(let y = -10; y <= 10; y++) {
            let xS = 1;
            let yS = 40+Math.floor(Math.random() * 8);
            let zS = 1;
            let geometry = new THREE.BoxGeometry(xS, yS, zS)
            let cube = new THREE.Mesh( geometry, material );
            cube.position.set(x,y-20,-(x+y));
            // Leave some random spaces in the grid
            if (Math.random() > 0.2) {
                cubes.push(cube);
                scene.add( cube );
            }
        }
    }
}

function onPointerMove( event ) {
    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

let activeObject = null;
function myAnimation() {
    raycaster.setFromCamera( pointer, camera );
    var intersects = raycaster.intersectObject(scene, true);

    if (intersects.length > 0) {
        if (activeObject != intersects[0].object) {
            if (activeObject != null) {
                moveDown(activeObject);
            }
            activeObject = intersects[0].object;
            moveUp(activeObject);
        }
    }
}

function moveUp(obj) {
    //TWEEN.removeAll();
    new TWEEN.Tween( obj.scale )
    .to( { y: 1.1 }, 1000 )
    .easing( TWEEN.Easing.Elastic.Out )
    .onUpdate( )
    .start();
}

function moveDown(obj) {
    //TWEEN.removeAll();
    new TWEEN.Tween( obj.scale )
    .to( { y: 1 }, 1000 )
    .easing( TWEEN.Easing.Elastic.In )
    .onUpdate( )
    .start();
}