let triangle, square, tet, box;
function createScene(THREE, scene) {
    let material = customColorsMaterial(THREE, [new THREE.Vector4(1.0,0.158,0.883,0.0), new THREE.Vector4(1.0,0.307,0.307,1.0)]);

    // 2D triangle
    const t_geometry = new THREE.BufferGeometry();
    const t_vertices = new Float32Array( [
        -1.0, -1.0,  1.0,
         1.0, -1.0,  1.0,
         0,  1.0,  1.0,
    ] );
    t_geometry.setAttribute( 'position', new THREE.BufferAttribute( t_vertices, 3 ) );
    t_geometry.scale(0.2, 0.2, 0.2);
    triangle = new THREE.Mesh( t_geometry, material );
    triangle.position.set(-0.5,0.5,0)
    scene.add( triangle );

    // 2D square
    const s_geometry = new THREE.BufferGeometry();
    const s_vertices = new Float32Array( [
        -1.0, -1.0,  1.0,
        1.0, -1.0,  1.0,
        1.0,  1.0,  1.0,

        1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0, -1.0,  1.0
    ] );
    s_geometry.setAttribute( 'position', new THREE.BufferAttribute( s_vertices, 3 ) );
    s_geometry.scale(0.2, 0.2, 0.2);
    square = new THREE.Mesh( s_geometry, material );
    square.position.set(0.5,0.5,0)
    scene.add( square );

    // 3D Tetrahedron
    const tet_geometry = new THREE.TetrahedronGeometry(0.3);
    tet = new THREE.Mesh( tet_geometry, material );
    tet.rotation.z = Math.PI / 4;
    tet.rotation.x = -Math.PI / 4;
    tet.position.set(-0.5,-0.5)
    scene.add( tet );

    // 3D Box
    const box_geometry = new THREE.BoxGeometry(0.3,0.3,0.3);
    box = new THREE.Mesh( box_geometry, material );
    box.rotation.z = Math.PI / 4;
    box.rotation.x = -Math.PI / 4;
    box.position.set(0.5,-0.5)
    scene.add( box );
}

let i = 0;
function myAnimation() {
    tet.rotation.x = i;
    tet.rotation.y = i;

    box.rotation.x = i;
    box.rotation.y = i;

    i+= 0.01;
}