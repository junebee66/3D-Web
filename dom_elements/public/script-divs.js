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

init();
animate();

changeBtn.onclick = function(){

  //clean previous 3d objects in the scene
  while (scene.children.length > 0) {
    const child = scene.children[0];
    scene.remove(child);
}

  // update iframe url to input box link
  const searchText = document.getElementById("searchText");
  const iframe1 = document.getElementById("iframe1");

  const newUrl = searchText.value;
  iframe1.src = `http://localhost:12345/getdata?name=${newUrl}`;
  
  iframe1.onload = function () {
    let allElements = iframe1.contentWindow.document.querySelector('body').children;
    console.log('iframe is loaded');

    const objects = [];

    const tagsToSkip = {
      'BODY': true,
      'SCRIPT': true
    }
    // if (!tagsToSkip[allElements[i].tagName]) {
    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];
      const elementPos = element.getBoundingClientRect();

      const css3dObject = makeElementObject(element, elementPos);
      scene.add(css3dObject);
      objects.push(css3dObject);
    }
}
}

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87CEEB);

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1000);
  camera.position.z = 350;

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
      scene.add(css3dObject);
      objects.push(css3dObject);
    }

    // dragControls = new DragControls(objects, camera, renderer.domElement);
  };

  resize();
}

function makeElementObject(element, elementPos) {
  const width = elementPos.width;
  const height = elementPos.height;

  if (element.tagName.toLowerCase() === 'img') {
    const img = new Image();
    img.src = element.src;
    let imgW = img.width;
    let imgH = img.height;

    const css3dObject = new CSS3DObject(img);
    css3dObject.position.set(elementPos.left + imgW / 2, -elementPos.top - imgH / 2, 0);

    addHoverAnimation(css3dObject);

    return css3dObject;
  }

  const el = document.createElement('div');
  el.classList.add('noScroll');
  el.innerText = element.innerHTML;
  el.style.width = width + 'px';
  el.style.height = height + 'px';
  el.style.pointerEvents = 'none';
  el.style.overflowY = 'hidden';
  el.style.overflowX = 'hidden';

  const computedStyles = window.getComputedStyle(element);

  el.style.color = computedStyles.color;
  el.style.fontSize = computedStyles.fontSize;

  const css3dObject = new CSS3DObject(el);
  css3dObject.position.set(elementPos.left, -elementPos.top, 0);

  addHoverAnimation(css3dObject);

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
