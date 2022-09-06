function customRenderer(THREE, camera, scene) {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth + 1, window.innerHeight + 1);
    renderer.setPixelRatio(devicePixelRatio);
    
    return renderer;
}