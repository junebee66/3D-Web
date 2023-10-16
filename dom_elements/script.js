import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';

import {AnaglyphEffect} from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/effects/AnaglyphEffect.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';
import {OBJLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/MTLLoader.js';


//accessing iframe elements
let changeBtn = document.getElementById('changeBtn');
let iframe1 = document.getElementById("iframe1");
let allH1 = iframe1.contentWindow.document.getElementsByTagName("H1")
let allH2 = iframe1.contentWindow.document.getElementsByTagName("H2")
let allElement = iframe1.contentWindow.document.querySelector("body").children;


//3D text
let text = false;
let cubeMat = new THREE.MeshLambertMaterial({ color: 0xff3300 });


let container, camera, scene, renderer, effect, leftC;

// const loader;
const spheres = [];
const boxes = [];

let mouseX = 0;
let mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;


//background image

// const path = "https://threejs.org/examples/textures/cube/pisa/";
// const format = '.png';
// const urls = [
//   path + 'px' + format, path + 'nx' + format,
//   path + 'py' + format, path + 'ny' + format,
//   path + 'pz' + format, path + 'nz' + format
// ];

// const path = "https://threejs.org/examples/textures/cube/SwedishRoyalCastle/";
// const format = '.jpg';
// const urls = [
// 	path + 'px' + format, path + 'nx' + format,
// 	path + 'py' + format, path + 'ny' + format,
// 	path + 'pz' + format, path + 'nz' + format
// ];

const path = "https://threejs.org/examples/textures/cube/Park3Med/";
const format = '.jpg';
const urls = [
    path + 'px' + format, path + 'nx' + format,
    path + 'py' + format, path + 'ny' + format,
    path + 'pz' + format, path + 'nz' + format
];


const textureCube = new THREE.CubeTextureLoader().load( urls );

init();
animate();
// loadFont();

//loop all iframe elements to change
changeBtn.onclick = function(){
  // console.log(elements);

  // for (let i = 0; i < allElement.length; i++) {
  //   allElement[i].style.display = "none";
  // }

  let geometry = new THREE.SphereBufferGeometry( 0.1, 32, 16 );
  let material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );

  for (let i = 0; i < allH1.length; i++) {

    const bigMesh = new THREE.Mesh( geometry, material );

    bigMesh.position.x = Math.random() * 2 ;
    bigMesh.position.y = Math.random() * 2 ;
    bigMesh.position.z = Math.random() * 2 ;
    
    // bigMesh.position.x = 0 ;
    // bigMesh.position.y = 0 ;
    // bigMesh.position.z = 0 ;


    bigMesh.scale.x = bigMesh.scale.y = bigMesh.scale.z = Math.random() * 10;
    
    scene.add(bigMesh);

    //text
    let loader = new THREE.FontLoader();
    loader.load(
      "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/gentilis_regular.typeface.json",
      function(font) {
        let textGeo = new THREE.TextGeometry("Iz", {
          font: font,
          size: 0.2,
          height: 0.003,
          curveSegments: 50,
          bevelEnabled: true,
          bevelThickness: 1,
          bevelSize: 0,
          bevelOffset: 0,
          bevelSegments: 5,
          bevelEnabled: true
        });
        textGeo.computeBoundingBox();
        textGeo.computeVertexNormals();
        text = new THREE.Mesh(textGeo, cubeMat);
        text.position.x = -textGeo.boundingBox.max.x / 2;
        text.castShadow = true;
        scene.add(text);
    
      }
    );


    // loadFont();
    
  }


  
  
  
  // for (let i = 0; i < allElement.length; i++) {
    
    
    // if allElement[i] = 

    // allElement[i].style.display = "none";
    // console.log(allElement[3]);
    
  // }



  

}


function init() {


    container = document.createElement( 'div' );
    leftC= document.querySelector('#bottomSection');
    leftC.appendChild( container );


    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 100 );
    camera.position.z = 3;
    camera.focalLength = 3;

    const controls = new OrbitControls(camera, leftC);
    controls.target.set(0, 5, 0);
    controls.update();


    scene = new THREE.Scene();
    scene.background = textureCube;


    const geometry = new THREE.SphereBufferGeometry( 0.1, 32, 16 );
    const material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );



    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    leftC.appendChild( renderer.domElement );

    const width = window.innerWidth ;
    const height = window.innerHeight;

    effect = new AnaglyphEffect( renderer );
    // effect.setSize( width, height );
    effect.setSize( width*0.9, height*0.9);

    const planeSize = 4000;

    const loader = new THREE.TextureLoader();
    const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 200;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide,
    });

    {
        const skyColor = 0xB1E1FF;  // light blue
        const groundColor = 0xB97A20;  // brownish orange
        const intensity = 1;
        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        scene.add(light);
      }
    
      {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(5, 10, 2);
        scene.add(light);
        scene.add(light.target);
      }



    function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
        const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
        const halfFovY = THREE.MathUtils.degToRad(camera.fov * .5);
        const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
        // compute a unit vector that points in the direction the camera is now
        // in the xz plane from the center of the box
        const direction = (new THREE.Vector3())
            .subVectors(camera.position, boxCenter)
            .multiply(new THREE.Vector3(1, 0, 1))
            .normalize();
    
        // move the camera to a position distance units way from the center
        // in whatever direction the camera was from the center already
        camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));
    
        // pick some near and far values for the frustum that
        // will contain the box.
        camera.near = boxSize / 100;
        camera.far = boxSize * 100;
    
        camera.updateProjectionMatrix();
    
        // point the camera to look at the center of the box
        camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
      }

    //Windmill Model
    // const mtlLoader = new MTLLoader();
    // mtlLoader.load('https://threejsfundamentals.org/threejs/resources/models/windmill_2/windmill-fixed.mtl', (mtl) => {
    //   mtl.preload();
    //   const objLoader = new OBJLoader();
    //   objLoader.setMaterials(mtl);
    //   objLoader.load('https://threejsfundamentals.org/threejs/resources/models/windmill_2/windmill.obj', (root) => {
    //     root.scale.x = root.scale.y = root.scale.z = 0.001;   
    //   scene.add(root);

    //     // compute the box that contains all the stuff
    //     // from root and below
    //     const box = new THREE.Box3().setFromObject(root);

    //     const boxSize = box.getSize(new THREE.Vector3()).length();
    //     const boxCenter = box.getCenter(new THREE.Vector3());

    //     // set the camera to frame the box
    //     frameArea(boxSize * 1.2, boxSize, boxCenter, camera);

    //     // update the Trackball controls to handle the new size
    //     controls.maxDistance = boxSize * 10;
    //     controls.target.copy(boxCenter);
    //     controls.update();
    //   });
    // });


}

function onWindowResize() {

    windowHalfX = window.innerWidth ;
    windowHalfY = window.innerHeight;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    effect.setSize( window.innerWidth, window.innerHeight );

}


function animate() {

    requestAnimationFrame( animate );

    render();

}

function render() {

    const timer = 0.0001 * Date.now();

    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;

    camera.lookAt( scene.position );

    for ( let i = 0, il = spheres.length; i < il; i ++ ) {

        const sphere = spheres[ i ];

        sphere.position.x = 5 * Math.cos( timer + i );
        sphere.position.y = 5 * Math.sin( timer + i * 1.1 );
 
        sphere.position.x = 5 * Math.cos( timer + i );
        sphere.position.y = 5 * Math.sin( timer + i * 1.1 );

    }

    for ( let i = 0, il = boxes.length; i < il; i ++ ) {

        const box = boxes[ i ];

        box.position.x = 5 * Math.cos( timer + i );
        box.position.y = 5 * Math.sin( timer + i * 1.1 );

        box.position.x = 5 * Math.cos( timer + i );
        box.position.y = 5 * Math.sin( timer + i * 1.1 );

    }


      effect.render( scene, camera );
}








