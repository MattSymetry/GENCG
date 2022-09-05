
function _1(md){return(
    md`# Three.js example of a toon material with outline`
    )}
    
    function* _renderer(THREE,camera,invalidation,width,height,scene)
    {
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      const effect = new THREE.OutlineEffect( renderer, {
        defaultThickness: 0.0,
        defaultColor: [ 0, 0, 0 ],
        defaultAlpha: 0.8,
        defaultKeepAlive: true // keeps outline material in cache even if material is removed from scene
      });
      const controls = new THREE.OrbitControls(camera, renderer.domElement);
      invalidation.then(() => (controls.dispose(), renderer.dispose()));
      renderer.setSize(width, height);
      renderer.setPixelRatio(devicePixelRatio);
      controls.addEventListener('change', render);
      function render() {
        // renderer.render(scene, camera);
        effect.render(scene, camera);
      }
      render();
      yield renderer.domElement;
    }
    
    
    function _toneCount(html){return(
    html`<input type="range" value="3" min="1" max="10" />`
    )}
    
    function _outlineThickness(html){return(
    html`<input type="range" value="0.01" min="0" max="0.1" step="0.01" />`
    )}
    
    function _material(texture,THREE,outlineThickness)
    {
      const transparent = true;
      const opacity = 1;
      const gradientMap = texture;
      const color = 0x0000ff;
      const shininess = 1;
      const material = new THREE.MeshToonMaterial({ gradientMap, color, transparent, opacity, shininess});
      material.userData.outlineParameters = {
          thickness: outlineThickness,
          color: [ 0, 0, 0 ],
          alpha: 0.8,
          visible: true,
          keepAlive: true,
      };
      return material; 
    }
    
    
    function _camera(width,height,THREE)
    {
      const fov = 45;
      const aspect = width / height;
      const near = 1;
      const far = 100000;
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.set(1, 1, 1);
      return camera;
    }
    
    
    function _geometry(THREE)
    {
      const geometry = new THREE.SphereBufferGeometry( 0.4, 32, 16 );
      // const geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
      return geometry;
      
    }
    
    
    function _mesh(THREE,geometry,material)
    {
      const mesh = new THREE.Mesh(geometry, material);
      return mesh;
    }
    
    
    function _scene(THREE,mesh)
    {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf2f7f9);
      scene.add(new THREE.AxesHelper(10));
      
        const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
        directionalLight.position.set( -4, 5, 5 ).normalize();
        scene.add(directionalLight);
    
      scene.add(mesh);
      
      return scene;
    }
    
    
    function _height(){return(
    512
    )}
    
    function _generateToneMap(){return(
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
    
      context.putImageData(imageData, 0, 0 );
      const src = canvas.toDataURL("image/png");
      const image = new Image();
      image.src = src;
      return image;
    }
    )}
    
    function _threeToneCanvas(generateToneMap)
    {
      const image = generateToneMap(3);
      image.style.width = '100%';
      return image;
    }
    
    
    function _texture(THREE,generateToneMap,toneCount)
    {
         const texture = new THREE.CanvasTexture(generateToneMap(toneCount));
      // IMPORTANT for toon material to work properly.
        texture.minFilter = THREE.NearestFilter;
      texture.magFilter = THREE.NearestFilter;
      return texture;
    }
    
    
    async function _THREE(require)
    {
      const THREE = window.THREE = await require('three@0.115.0/build/three.min.js');
      await require('three@0.115.0/examples/js/controls/OrbitControls.js').catch(() => {});
      await require('three@0.115.0/examples/js/effects/OutlineEffect.js').catch(() => {});
      return THREE;
    }
    
    
    export default function define(runtime, observer) {
      const main = runtime.module();
      main.variable(observer()).define(["md"], _1);
      main.variable(observer("renderer")).define("renderer", ["THREE","camera","invalidation","width","height","scene"], _renderer);
      main.variable(observer("viewof toneCount")).define("viewof toneCount", ["html"], _toneCount);
      main.variable(observer("toneCount")).define("toneCount", ["Generators", "viewof toneCount"], (G, _) => G.input(_));
      main.variable(observer("viewof outlineThickness")).define("viewof outlineThickness", ["html"], _outlineThickness);
      main.variable(observer("outlineThickness")).define("outlineThickness", ["Generators", "viewof outlineThickness"], (G, _) => G.input(_));
      main.variable(observer("material")).define("material", ["texture","THREE","outlineThickness"], _material);
      main.variable(observer("camera")).define("camera", ["width","height","THREE"], _camera);
      main.variable(observer("geometry")).define("geometry", ["THREE"], _geometry);
      main.variable(observer("mesh")).define("mesh", ["THREE","geometry","material"], _mesh);
      main.variable(observer("scene")).define("scene", ["THREE","mesh"], _scene);
      main.variable(observer("height")).define("height", _height);
      main.variable(observer("generateToneMap")).define("generateToneMap", _generateToneMap);
      main.variable(observer("viewof threeToneCanvas")).define("viewof threeToneCanvas", ["generateToneMap"], _threeToneCanvas);
      main.variable(observer("threeToneCanvas")).define("threeToneCanvas", ["Generators", "viewof threeToneCanvas"], (G, _) => G.input(_));
      main.variable(observer("texture")).define("texture", ["THREE","generateToneMap","toneCount"], _texture);
      main.variable(observer("THREE")).define("THREE", ["require"], _THREE);
      return main;
    }
    