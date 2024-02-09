import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { AnaglyphEffect } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/effects/AnaglyphEffect.js';
// import { TWEEN } from 'https://cdn.skypack.dev/@tweenjs/tween.js';
import TWEEN from 'three/addons/libs/tween.module.js';
import { DragControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/DragControls.js';

let scene, camera, renderer, renderer2, effect, dragControls;
const iframe1 = document.getElementById('iframe1');
let iframeBody = iframe1.contentWindow.document.querySelector('body');
let ratio = 20;
let canvasTop = 400;
let canvasLeft = -1300;
const objects = [];

//run "node index.js" to see the code result at web url: http://localhost:12345/

init();
animate();

changeBtn.onclick = function(){

  // for (const obj of objects) {
  //   scene.remove(obj);
  // }

  // objects.length = 0;


  for( var i = scene.children.length - 1; i >= 0; i--) { 
    let obj = scene.children[i];
    scene.remove(obj); 
  }

  while (scene.children.length)
  {
      scene.remove(scene.children[2]);
  }

  // update iframe url to input box link
  const searchText = document.getElementById("searchText");
  const iframe1 = document.getElementById("iframe1");

  const newUrl = searchText.value;
  iframe1.src = `http://localhost:12345/getdata?name=${newUrl}`;
  
  iframe1.onload = function () {
    let allElements = iframe1.contentWindow.document.querySelector('body').children;
    console.log('iframe is loaded');

    const tagsToSkip = {
      'BODY': true,
      'SCRIPT': true
    }

    console.log(objects);
    // if (!tagsToSkip[allElements[i].tagName]) {
    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];
      const elementPos = element.getBoundingClientRect();
      const css3dObject = makeElementObject(element, elementPos);
      objects.push(css3dObject);
    }

    for (const obj of objects) {
      scene.add(obj);
    }
}
}


function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87CEEB);

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1000);
  camera.position.z = 350;
  let canvasDiv = document.getElementById('canvas');

  renderer2 = new CSS3DRenderer();
  renderer2.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer2.domElement);

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.querySelector('#webglRender').appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.update();

  effect = new AnaglyphEffect(renderer);

  const iframe1 = document.getElementById('iframe1');
  const iframeBody = iframe1.contentWindow.document.querySelector('body');
  const newUrl = searchText.value;
  iframe1.src = `http://localhost:12345/getdata?name=${newUrl}`;

  iframe1.onload = function () {
    let allElements = iframe1.contentWindow.document.querySelector('body').children;
    console.log('iframe is loaded');

    const objects = [];

    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];
      const elementPos = element.getBoundingClientRect();

      const css3dObject = makeElementObject(element, elementPos);
      objects.push(css3dObject);
    }
    for (const obj of objects) {
      scene.add(obj);
    }
  };

  resize();
}

function makeElementObject(element, elementPos) {
  const width = elementPos.width;
  const height = elementPos.height;

  //crucial to setting the position ratio correct
  element.style.width = width + 'px';
  element.style.height = height + 'px';
  element.style.position = elementPos.left + ',' + elementPos.top + ', 0';

  const css3dObject = new CSS3DObject(element);

  if (element.tagName.toLowerCase() === 'img') {
    css3dObject.position.x = canvasLeft + width + elementPos.left;
    css3dObject.position.y = canvasTop - height - elementPos.top;
    css3dObject.position.z = 0;
  }

  css3dObject.position.x = canvasLeft + width + elementPos.left;
  css3dObject.position.y = canvasTop - height - elementPos.top;
  css3dObject.position.z = 0;


  addHoverAnimation(css3dObject);

  // const geometry = new THREE.BoxGeometry( 0.1*(30+1), 0.1*(30+1), 0.1*(30+1) ); 
  // const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
  // const cube = new THREE.Mesh( geometry, material ); 
  // cube.position.x = elementPos.left;
  // cube.position.y = elementPos.top;
  // scene.add( cube );

  return css3dObject;
}

function addHoverAnimation(css3dObject) {
  css3dObject.element.addEventListener('mouseenter', function () {
    new TWEEN.Tween(css3dObject.position)
      .to({ z: 150 }, 500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
  });

  css3dObject.element.addEventListener('mouseleave', function () {
    new TWEEN.Tween(css3dObject.position)
      .to({ z: 0 }, 500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
  });
}

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer2.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  renderer2.render(scene, camera);
  TWEEN.update(); // Update the tweening library
  render();
}

function render() {
  camera.lookAt(scene.position);
  effect.render(scene, camera);
}
