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
  

// const iframe1 = document.getElementById("iframe1");
// iframe1.onload = function() {
//   console.log("iframe is loaded");
//   // console.log(iframe1);
//   init();
// //   animate(performance.now());
// animate();
// }

const iframe1 = document.getElementById("iframe1");
let iframeBody = iframe1.contentWindow.document.querySelector("body");
// let allElements = iframe1.contentWindow.document.querySelector("body").children;
// let bodyRect = iframeBody.getBoundingClientRect();
// let bodyWidth = bodyRect.width;
// let bodyHeight = bodyRect.height;


init();
animate();

// changeBtn.onclick = function(){

//   // clean previous 3d objects in the scene
//   while (scene.children.length > 0) {
//     const child = scene.children[0];
//     scene.remove(child);
//     console.log("removed all children");
//     // console.log(scene);
//   }

// // iframe1.onload = function() {
//   let allElements = iframe1.contentWindow.document.querySelector("body").children;
//     // const showing = document.getElementById("showing");
//     const searchText = document.getElementById("searchText");
//     const newUrl = searchText.value;
//     iframe1.src = `http://localhost:12345/getdata?name=${newUrl}`;
//     // showing.src = `http://localhost:12345/getdata?name=${newUrl}`;

//   for (let i = 0; i < allElements.length; i++) {
//     let allElementsPos = allElements[i].getBoundingClientRect();
//     textObj = makeElementObject(allElements[i], allElementsPos, 300, 300, i);
//     root.add(textObj);
//     scene.add(root);
//   }
// // }

// }

//3D Scene Initialization
function init() {

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87CEEB);

  root = new THREE.Object3D();
  root.position.x = 0;
  root.position.y = 0;
  // root.rotation.y = Math.PI / 3;
  scene.add(root);


  // const iframe1 = document.getElementById("iframe1");
  // const newUrl = searchText.value;
  // iframe1.src = `http://localhost:12345/getdata?name=${newUrl}`;

  // textObj = makeElementObject(iframe1, 800, 500);
  // root.add(textObj);

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
      root.add(textObj);
      scene.add(root);  
      // console.log(scene);
    }
    }
  }

  textObj = makeElementObject(iframe1, 300, 5);
  root.add(textObj);


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

    root.add(light);
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

    let position = geometry.attributes.position;
    var colors = [];

    const color = new THREE.Color();
    for (var i = 0, l = position.count; i < l; i++) {
      color.setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.15 + 0.85);
      colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    // }}

    sphere = new THREE.Mesh(geometry, material);
    sphere.position.z = 20;
    sphere.position.y = -100;
    sphere.castShadow = true;
    sphere.receiveShadow = false;
    root.add(sphere);
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
  
  
    const obj = new THREE.Object3D();
    const innerText = element.innerHTML;
  
    element.style.width = bgWidth + 'px';
    element.style.height = bgHeight + 'px';
    element.style.opacity = 0.999;
    element.style.boxSizing = 'border-box';
    element.style.position = "relative";
    console.log(element);
    console.log(innerText +element.style.transform);
  
    let css3dObject = new CSS3DObject(element);
    obj.css3dObject = css3dObject;
    obj.add(css3dObject);
  
    // make an invisible plane for the DOM element to chop
    // clip a WebGL geometry with it.
    var material = new THREE.MeshPhongMaterial({
      opacity: 0.15,
      color: new THREE.Color(0x111111),
      blending: THREE.NoBlending,
      transparent: true
      // side	: THREE.DoubleSide,
    });

    var geometry = new THREE.BoxGeometry(bgWidth, bgHeight, 1);
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = canvasLeft + bgLeft;
    mesh.position.y = bgTop;
    mesh.position.z = 0;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    obj.lightShadowMesh = mesh;
    obj.add(mesh);


    let secondL = canvasLeft + bgWHalf;// + (firstL /ratio);
    let secondT = canvasTop - bgHHalf;

    obj.css3dObject.element.textContent = innerText;
    obj.css3dObject.element.setAttribute('contenteditable', '');
    
    // console.log(element);
    // console.log("🔴" + innerText + "is" + obj.position.x);
    // obj.position.x = canvasLeft + allElementsPos.left /ratio;
    // obj.position.y = canvasTop - allElementsPos.top/ratio;
    obj.position.x = (secondL + bgLeft) +ratio;
    obj.position.y = secondT - bgTop +ratio;
    obj.position.z = 1-arrayNum*90;
    obj.css3dObject.element.style.opacity = "10";
    obj.css3dObject.element.style.padding = '0px';
    // const color1 = '#7bb38d';
    // const color2 = '#71a381';
    // obj.css3dObject.element.style.background = `repeating-linear-gradient(
    //       45deg,
    //       ${color1},
    //       ${color1} 10px,
    //       ${color2} 10px,
    //       ${color2} 20px
    //   )`;
  
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
  
    // scene.updateMatrixWorld();
  
    renderer.render(scene, camera);
    renderer2.render(scene, camera);
  
    requestAnimationFrame(animate);
    render();
  }

function render() {

    const timer = 0.0001 * Date.now();

    // camera.position.x += ( mouseX - camera.position.x ) * .05;
    // camera.position.y += ( - mouseY - camera.position.y ) * .05;

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