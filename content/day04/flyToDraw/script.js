let cubes = [];
let camera, scene;

function createScene(THREE, sce, cam) {
    camera = cam;
    scene = sce;
    // Create outline cube
    let geometry = new THREE.BoxGeometry( 50, 50, 50 );
    let wireframe = new THREE.WireframeGeometry( geometry );
    let line = new THREE.LineSegments( wireframe );
    line.position.set(0,0,0)
    line.material.depthTest = false;
    line.material.opacity = 1;
    line.material.transparent = false;

    // Create floor
    geometry = new THREE.PlaneGeometry( 50, 50 );
    const material = new THREE.MeshPhysicalMaterial( {color: 0xffffff} );
    const plane = new THREE.Mesh( geometry, material );
    plane.rotation.x = -Math.PI/2
    plane.position.setY(-26);
    scene.add( plane );
}

function myAnimation() {
    
}