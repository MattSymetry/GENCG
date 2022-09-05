function createScene(THREE, scene) {
    let material = customColorsMaterial(THREE, [new THREE.Vector4(1.0,0.158,0.883,0.0), new THREE.Vector4(1.0,0.307,0.307,1.0)]);
    let materialToon = customToonMaterial(THREE, 0xff02DE, 8);

    const geometry = new THREE.SphereGeometry( 1, 32, 16 );
    const sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );
}