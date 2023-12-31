import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';

import TWEEN from 'three/addons/libs/tween.module.js';
import {AnaglyphEffect} from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/effects/AnaglyphEffect.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';


//When updating information in this code, I have to stop the localhost:12345 in the terminal with ctrl + c 
//and then run "node index.js" again, then reload the http://localhost:12345/ page to see changes

//accessing iframe elements
let changeBtn = document.getElementById('changeBtn');

let container, camera, scene, renderer, renderer2, cssRenderer, effect, leftC, root, light, textObj, sphere;

let mouseX = 0;
let mouseY = 0;
let canvasLeft = -15;
let canvasTop = 15;
let ratio = 20;
let roots = [];
  

const iframe1 = document.getElementById("iframe1");
let iframeBody = iframe1.contentWindow.document.querySelector("body");

init();
animate();

//3D Scene Initialization
function init() {

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87CEEB);

  root = new THREE.Object3D();
  root.position.x = 0;
  root.position.y = 0;
  // root.rotation.y = Math.PI / 3;
  scene.add(root);


  const iframe1 = document.getElementById("iframe1");
  const searchText = document.getElementById("searchText");
  // let allElements = iframe1.contentWindow.document.querySelector("body").children;
  const newUrl = searchText.value;
  iframe1.src = `http://localhost:12345/getdata?name=${newUrl}`;


  iframe1.onload = function() {
    let allElements = iframe1.contentWindow.document.querySelector("body").children;
    console.log("iframe is loaded");

    for (let i = 0; i < allElements.length; i++) {
      let allElementsPos = allElements[i].getBoundingClientRect();
      
      const tagsToSkip = {
        'BODY': true,
        'SCRIPT': true
      }

      if (!tagsToSkip[allElements[i].tagName]) {
      textObj = makeElementObject(allElements[i], allElementsPos, i);
      // root.add(textObj);
      scene.add(textObj);  
      // console.log(scene);
    }
    }
  }


  // light
  ~function () {
    var ambientLight = new THREE.AmbientLight(0x999999, 1.5);
    root.add(ambientLight);

    light = new THREE.PointLight(0xffffff, 1, 0);
    light.castShadow = true;
    light.position.z = 150;
    light.shadow.mapSize.width = 1024; // default
    light.shadow.mapSize.height = 1024; // default
    light.shadow.camera.near = 1; // default
    light.shadow.camera.far = 80000; // default

    scene.add(new THREE.PointLightHelper(light, 10));

  }();

  ~function () {
    var material = new THREE.MeshPhongMaterial({
      color: 0x991d65,
      emissive: 0x000000,
      specular: 0x111111,
      side: THREE.DoubleSide,
      flatShading: false,
      shininess: 30,
      vertexColors: true });

    var geometry = new THREE.SphereBufferGeometry(70, 32, 32);

    // give the geometry custom colors for each vertex {{
    geometry = geometry.toNonIndexed(); // ensure each face has unique vertices

    // }}

    sphere = new THREE.Mesh(geometry, material);
    sphere.position.z = 20;
    sphere.position.y = -100;
    sphere.castShadow = true;
    sphere.receiveShadow = false;
    scene.add(sphere);
  }();

  // container = document.createElement( 'div' );
  leftC = document.querySelector('#webglRender');
  // leftC.appendChild( container );

  renderer2 = new CSS3DRenderer();
  renderer2.domElement.style.position = 'absolute';
  renderer2.domElement.style.top = 0;
  document.querySelector('#cssRender').appendChild(renderer2.domElement);

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  //container.appendChild( renderer.domElement );
  document.querySelector('#webglRender').appendChild(renderer.domElement);

    //anaglyph camera
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 100 );
    camera.position.z = 40;
    camera.focalLength = 3;
    // camera = new THREE.PerspectiveCamera();
    // camera.position.set(0, 0, 1000);

    const controls = new OrbitControls(camera, leftC);
    controls.target.set(0, 5, 0);
    controls.update();

    const width = window.innerWidth ;
    const height = window.innerHeight;

    effect = new AnaglyphEffect( renderer );
    effect.setSize( window.innerWidth, window.innerHeight );

    window.addEventListener('resize', resize);
    resize();

    {
        // const skyColor = 0xB1E1FF;  // light blue
        // const groundColor = 0xB97A20;  // brownish orange
        const skyColor = 0xffffff;  // light blue
        const groundColor = 0xffffff;  // brownish orange
        const intensity = 1;
        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        scene.add(light);
      }
}


function makeElementObject(element, allElementsPos, arrayNum) {
    let bgWidth = allElementsPos.width;
    let bgHeight = allElementsPos.height;
    let bgResizeW = bgWidth/ratio;
    let bgResizeH = bgHeight/ratio;
    let bgWHalf = bgResizeW/2;
    let bgHHalf = bgResizeH/2;
    let bgLeft = allElementsPos.left;
    let bgTop = allElementsPos.top;
  
    element.style.width = bgWidth + 'px';
    element.style.height = bgHeight + 'px';

    const obj = new THREE.Object3D();
    // const el = document.createElement('div');
    // console.log(el);
    // el.innerHTML = element.innerHTML;
    let css3dObject = new CSS3DObject(element);
    obj.add(css3dObject);
  
    // make an invisible plane for the DOM element to chop
    // clip a WebGL geometry with it.
    var material = new THREE.MeshPhongMaterial({
      opacity: 0.1,
      color: new THREE.Color(0x000000, 0.1),
      blending: THREE.NoBlending,
      transparent: true
      // side	: THREE.DoubleSide,
    });

    var geometry = new THREE.BoxGeometry(bgWidth, bgHeight, 1);
    var mesh = new THREE.Mesh(geometry, material);

    obj.add(mesh);

    console.log(obj);

    let secondL = canvasLeft + bgWHalf;// + (firstL /ratio);
    let secondT = canvasTop - bgHHalf;

    obj.position.z = 1-arrayNum*90;
  
    return obj;
  }

function makeElementObject2(element, allElementsPos, arrayNum) {
    let width = allElementsPos.width;
    let height = allElementsPos.height;

    const obj = new THREE.Object3D();
    const innerText = element.innerHTML;

    const el = document.createElement('div');
    el.classList.add('noScroll');
    el.innerText = innerText;
    // el.style.backgroundColor = "rbga(255,255,255,1)";
    // el.style.color = "rbga(255,0,0,1)";
    el.style.pointerEvents = 'none';
    el.style['pointer-events'] = 'none';
    el.style['transform'] = 'none';
    el.style.overflowY = 'hidden'; 
    el.style.overflowX = 'hidden'; 
    el.style.width = width + 'px';
    el.style.height = height + 'px';
    el.style.position = '0,0';
    el.style.userSelect = 'none';
    console.log(el);

    let css3dObject = new CSS3DObject( el ); //have both the css3dobject and the mesh together as one obj
    // css3dObject.element.style.pointerEvents = 'none';
    // css3dObject.element.style.preventScroll = 'none';
    // css3dObject.element.style.transform = 'none';
    // css3dObject.element.style.overflow = 'hidden'; 
    // console.log(css3dObject.element.style);

    
    obj.add(css3dObject);

    let material = new THREE.MeshPhongMaterial({
      opacity: 0.15,
      color: new THREE.Color(0x111111),
      blending: THREE.NoBlending,
      transparent: true
    });

    var geometry = new THREE.BoxGeometry(width, height, 1);
    var mesh = new THREE.Mesh(geometry, material);
    obj.add(mesh);

    obj.position.z = 1-arrayNum*90;
    console.log(el);
    return obj;
  }



function resize() {
    camera.fov = 45;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.near = 1;
    camera.far = 8000;
    camera.updateProjectionMatrix();
    renderer2.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(window.innerWidth, window.innerHeight);
  }


// function animate() {

//     requestAnimationFrame( animate );
//     renderer.render(scene, camera);
//     renderer2.render(scene, camera);
//     render();

// }

function animate(time) {

    light.position.x = 30 * Math.sin(time * 0.003) + 30;
    light.position.y = 40 * Math.cos(time * 0.001) - 20;
    // root.rotation.y = Math.PI / 8 * Math.cos(time * 0.001) - Math.PI / 6;
    // background.rotation.y = Math.PI / 8 * Math.cos(time * 0.001) - Math.PI / 6;
    // background.rotation.x = Math.PI / 10 * Math.sin(time * 0.001) - Math.PI / 10;
    sphere.rotation.x += 0.005;
    sphere.rotation.y += 0.005;
  
    renderer.render(scene, camera);
    renderer2.render(scene, camera);
  
    requestAnimationFrame(animate);
    render();
  }

function render() {

    const timer = 0.0001 * Date.now();
    camera.lookAt( scene.position );
    effect.render( scene, camera );
}



function performFetch(args) {
  /* args is an object that is formatted as follows:

      {
          // the URL to contact on the server
          url: url_to_contact

          // request method ('get' or 'post')
          method: 'get',

          // object of variables to send to the server
          data: {
              var1: value1,
              var2: value2,
              var3: value3 // ... etc
          },

          // function to run if request succeeds, should accept a single argument which is the data returned by the server
          success: function(data), 

          // function to run if request fails, should accept a single argument which is the error message
          error: function(error) 
      }
      
  */

  // GET requests
  if (args.method && args.method.toLowerCase() == 'get') {

      // package up the data to send to the server
      const params = new URLSearchParams();
      for (const varName in args.data) {
          params.append(varName, args.data[varName]);
      }

      // append variables to URL
      args.url += '?' + params.toString();

      // perform the fetch request
      fetch(args.url)
          .then(function(response) {
              if (response.ok) {
                  return response.text();
              }
              else {
                  let error = new Error("server error");
                  throw error;
              }
          })
          
          // call the provided success callback function
          .then(function(text) {
              args.success(text);
          })
          
          // call the provided error callback function
          .catch(function(error) {
              args.error(error);
          });

  } // end GET request

  // POST requests
  else if (args.method && args.method.toLowerCase() == 'post') {

      // package up the data to send to the server
      // note that this is designed specifically to contact a PHP script
      // we will use a slightly different approach when we contact
      // node.js scripts in the next unit
      const formData = new FormData();
      for (const key in args.data) {
          if (args.data.hasOwnProperty(key)) {
              formData.append(key, args.data[key]);
          }
      }

      // perform the fetch request
      fetch(args.url, {
          method: "POST",
          body: formData,
      })
      .then(function(response) {
          if (response.ok) {
              return response.text();
          }
          else {
              let error = new Error("server error");
              throw error;
          }
      })
      
      // call the provided success callback function        
      .then(function(text) {
          args.success(text);
      })
      
      // call the provided error callback function        
      .catch(function(error) {
          args.error(error);
      });

  } // end POST request

}