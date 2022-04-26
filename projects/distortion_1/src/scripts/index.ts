import * as THREE from 'three'
import image from '/src/assets/a.jpg';
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
    document.getElementById('container').appendChild( this.renderer.domElement );

    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 1000 );
    this.camera.position.z = 700;
  
    this.scene = new THREE.Scene();

    this.addMesh();

    this.time = 0;

    this.render();
  }

  addMesh() {
    const uniforms = {
      u_texture: { value: new THREE.TextureLoader().load(image) },
    };

    this.geometry = new THREE.PlaneBufferGeometry( 500, 500, 100, 100);
    this.material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.scene.add( this.mesh );
  }

  render() {
    this.renderer.render( this.scene, this.camera );
    window.requestAnimationFrame(this.render.bind(this));
  }
}

new Sketch();
 