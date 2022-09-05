function customColorsMaterial(THREE, colors) {
    let colorArray = Array(8).fill(new THREE.Vector4(0.0,0.0,0.0,0.0));
    for (let i = 0; i<colors.length; i++) {
        colorArray[i] = colors[i];
    }
    const material = new THREE.ShaderMaterial( {

        uniforms: THREE.UniformsUtils.merge([THREE.UniformsUtils.clone(THREE.ShaderLib.standard.uniforms), {
			gradient: { value: colorArray},
            colorCount: { value: colors.length}
		}]),
        vertexShader: customVertexShader(),
        fragmentShader: customFragmentShader(),
        lights: true
    } );

    return material; 
}

function customVertexShader() {
    return `
        #if NUM_DIR_LIGHTS > 0
            struct DirectionalLight {
                vec3 direction;
                vec3 color;
                int shadow;
                float shadowBias;
                float shadowRadius;
                vec2 shadowMapSize;
            };
            uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
        #endif
        uniform vec4 gradient[8];
        uniform int colorCount;
        varying vec4 vColor;
        varying vec3 vNormal;

        vec4 col;
        float h = 0.5;

        void main() {
            vNormal = normal;
            vColor = vec4(0,0,0,1);
            #if NUM_DIR_LIGHTS > 0
                float nDotL = 0.0;
                for(int i=0;i<NUM_DIR_LIGHTS;++i)
                {
                    vec3 lightDirection = directionalLights[i].direction;
                    nDotL += ((dot(lightDirection, vNormal) + 1.0) / 2.0);
                }
                nDotL = nDotL / float(NUM_DIR_LIGHTS);
                for(int i=1;i<colorCount;++i)
                {
                    if (gradient[i].w > nDotL && gradient[i-1].w <= nDotL) {
                        float pct = (nDotL - gradient[i-1].w) * 1.0/(gradient[i].w - gradient[i-1].w);
                        vColor = mix(vec4(gradient[i-1].x, gradient[i-1].y, gradient[i-1].z, 1.0), vec4(gradient[i].x, gradient[i].y, gradient[i].z, 1.0), pct);
                        i = colorCount;
                    }
                }
            #endif

            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
            gl_PointSize = 2.0;
            gl_Position = projectionMatrix * mvPosition;
        }
    `;
}

function customFragmentShader() {
    return `
        varying vec4 vColor;

        void main() {
            gl_FragColor = vec4( vColor);
        }
        `;
    }