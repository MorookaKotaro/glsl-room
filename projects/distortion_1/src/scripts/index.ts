import * as THREE from 'three'
import gsap from 'gsap';

import image from '/src/assets/a.jpg';
import effectImage from '/src/assets/effect.jpg';
import dispImage from '/src/assets/disp.jpg';
import fragment from './fragmentShader.glsl';
import vertex from './vertexShader.glsl';

let camera, scene, renderer;
let geometry, material, mesh;

export default class Sketch {
  renderer: THREE.WebGLRenderer;
  camera: THREE.Camera;
  scene: THREE.Scene;
  time: number;
  geometry: THREE.PlaneGeometry;
  material: THREE.ShaderMaterial;
  mesh: THREE.Mesh<typeof geometry, typeof material>;

  constructor() {
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    const canvas = document.getElementById('container');
    canvas.appendChild( this.renderer.domElement );
    this.camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
    this.camera.position.z = 1;
  
    this.scene = new THREE.Scene();

    this.addMesh();

    this.time = 0;

    canvas.addEventListener('mouseenter', () => {
      console.log('enter');

      gsap.to(this.material.uniforms.dispFactor, 1.5, {
        value: 5
      })
    })

    canvas.addEventListener('mouseleave', () => {
      console.log('leave');
      gsap.to(this.material.uniforms.dispFactor, 1.5, {
        value: 1
      })
    })

    this.render();
  }

  addMesh() {
    const uniforms = {
      u_texture: { value: new THREE.TextureLoader().load(image) },
      u_texture2: {value: new THREE.TextureLoader().load(dispImage)},
      resolution: { type: "v2", value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      imageResolution: { type: 'v2', value: new THREE.Vector2(72, 72)},
      dispFactor: { type: "f", value: 0.0 },
    };


    this.geometry = new THREE.PlaneBufferGeometry(4, 2);
    this.material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.scene.add( this.mesh );
  }

  render() {
    this.time++;
    // this.material.uniforms.dispFactor.value = Math.sin(this.time / 10) + 2;
    this.renderer.render( this.scene, this.camera );
    window.requestAnimationFrame(this.render.bind(this));
  }
}

new Sketch();
 