let camera, scene;
let countPlanets = 4;
let maxSize = 5;
let radius = 300;
let planets = [];

function createScene(THREE, sce, cam) {
    camera = cam;
    scene = sce;

    // Create random planets
    for(let i = 0; i< countPlanets; i++) {
        let mass = 1+Math.random()*maxSize;
        let geometry = new THREE.SphereGeometry( mass, 16, 8 );
        let color = new THREE.Vector3(Math.random(),Math.random(),Math.random());
        let material = customColorsMaterial(THREE, [new THREE.Vector4(0,0,0,0), new THREE.Vector4(color.x,color.y,color.z,1)]);
        let sphere = new THREE.Mesh( geometry, material );
        let x = (Math.random() > 0.5) ? -Math.random()*radius : Math.random()*radius;
        let y = (Math.random() > 0.5) ? -Math.random()*radius : Math.random()*radius;
        let z = (Math.random() > 0.5) ? -Math.random()*radius : Math.random()*radius;
        sphere.position.set(x,y,z);
        planets.push({object: sphere, mass: mass, force: new THREE.Vector3(), color: color});
        scene.add( sphere );
    }
    // Create big start/sun in the middle
    let mass = 50;
    let geometry = new THREE.SphereGeometry( mass, 16, 8 );
    let color = new THREE.Vector3(1,1,1);
    let material = customColorsMaterial(THREE, [new THREE.Vector4(0,0,0,0), new THREE.Vector4(color.x,color.y,color.z,1)]);
    let sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );
    planets.push({object: sphere, mass: mass, force: new THREE.Vector3(), color: color});
}

function myAnimation() {
    // Each planet calculates its velocity by adding up all gravitational forces of each other planet
    planets.forEach(p1 => {
        planets.forEach(p2 => {
            if (p1 != p2) {
                // Calc and add force of each other planet
                let distance = p1.object.position.distanceTo(p2.object.position);
                let force = (p1.mass * p2.mass) / distance*distance;
                force = force/100000;
                let direction = new THREE.Vector3();
                direction.subVectors( p2.object.position, p1.object.position ).normalize();
                p1.force.add(direction.addScalar(force));
            }
        });
        if (p1.mass < 50) {
            // Add force to current position
            let points = []
            points.push(new THREE.Vector3(p1.object.position.x, p1.object.position.y, p1.object.position.z));
            p1.object.position.add(p1.force);
            points.push(new THREE.Vector3(p1.object.position.x, p1.object.position.y, p1.object.position.z));
            let geometry = new THREE.BufferGeometry().setFromPoints(points);
            let line = new MeshLine();
            line.setGeometry(geometry);
            let material = new MeshLineMaterial({color: new THREE.Color( p1.color.x, p1.color.y, p1.color.z ), lineWidth: p1.mass});
            let mesh = new THREE.Mesh(line, material);
            scene.add(mesh);

            // Remove planets when they are to far
            if (p1.object.x > 500 || p1.object.x < -500 ||
                p1.object.y > 500 || p1.object.y < -500 ||
                p1.object.z > 500 || p1.object.z < -500) {
                scene.remove(p1.object);
                p1.mass = 0;
                p1.object.position.set(0,0,0);
            }
        }
    });
}