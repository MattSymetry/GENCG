function customToonMaterial(THREE, colorValue, toneCount) {
    const transparent = true;
    const opacity = 1;
    const gradientMap = _texture(THREE, toneCount);
    const color = colorValue;
    const material = new THREE.MeshToonMaterial({ gradientMap, color, transparent, opacity});

    return material; 
}


function generateToneMap(count) {
    var canvas = document.createElement('canvas');
    
    canvas.width = count;
    canvas.height = 1;
    var context = canvas.getContext( '2d' );
    var imageData = context.getImageData(0, 0, count, 1);
    
    for (let i = 0; i < count; i++) {
        const value = Math.round(i / (count - 1) * 255);
        imageData.data[i * 4 + 0] = value;
        imageData.data[i * 4 + 1] = value;
        imageData.data[i * 4 + 2] = value;
        imageData.data[i * 4 + 3] = 255;  
    }
console.log(imageData.data)
    context.putImageData(imageData, 0, 0 );
    const src = canvas.toDataURL("image/png");
    const image = new Image();
    image.src = src;

    return image;
}

    
function _texture(THREE,toneCount)
{
    const texture = new THREE.CanvasTexture(generateToneMap(toneCount));
    // IMPORTANT for toon material to work properly.
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    return texture;
}