let cubes = [];
function createScene(THREE, scene) {
    let material = customColorsMaterial(THREE, [new THREE.Vector4(1.0,0.158,0.883,0.0), new THREE.Vector4(1.0,0.307,0.307,1.0)]);
    let materialBlue = customColorsMaterial(THREE, [new THREE.Vector4(0.2,0.158,0.383,0.0), new THREE.Vector4(0.2,0.158,0.383,1.0)]);
    let materialWhite = new THREE.MeshBasicMaterial( {color: 0xffffff} );

    for(let x = -10; x <= 10; x++) {
        for(let y = -10; y <= 10; y++) {
            let cube = new THREE.Mesh( new THREE.BoxGeometry(0.7,0.7,Math.random()*10), (Math.random() > 0.5) ? material : materialBlue );
            cube.position.set(x,y,0);
            //cube.rotation.z = Math.random();
            cubes.push(cube);
            scene.add( cube );
        }
    }
}

function myAnimation() {
    cubes.forEach(element => {
        element.rotation.z += 0.002;
    });
}