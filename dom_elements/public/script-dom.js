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

const convert3D = (() => {
    const SHOW_SIDES = false; // color sides of DOM nodes?
    const COLOR_SURFACE = true; // color tops of DOM nodes?
    const COLOR_RANDOM = false; // randomise color?
    const COLOR_HUE = 190; // hue in HSL (https://hslpicker.com)
    const MAX_ROTATION = 180; // set to 360 to rotate all the way round
    const THICKNESS = 20; // thickness of layers
    const DISTANCE = 10000; // ¯\_(ツ)_/¯

    function getRandomColor() {
        const hue = Math.floor(Math.random() * 360);
        const saturation = 50 + Math.floor(Math.random() * 30);
        const lightness = 40 + Math.floor(Math.random() * 30);
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    function getDOMDepth(element) {
        return [...element.children].reduce((max, child) => Math.max(max, getDOMDepth(child)), 0) + 1;
    }

    function getColorByDepth(depth, domDepthCache, hue = COLOR_HUE, lighten = 0) {
        return `hsl(${hue}, 75%, ${Math.min(10 + depth * (1 + 60 / domDepthCache), 90) + lighten}%)`;
    }

    // ... (keep createSideFaces function as it was)

    function traverseDOM(parentNode, depthLevel, offsetX, offsetY, domDepthCache) {
        for (let children = parentNode.childNodes, childrenCount = children.length, i = 0; i < childrenCount; i++) {
            const childNode = children[i];
            if (!(childNode.nodeType === 1 && !childNode.classList.contains('dom-3d-side-face'))) continue;
            const color = COLOR_RANDOM ? getRandomColor() : getColorByDepth(depthLevel, domDepthCache, COLOR_HUE, -5);
            Object.assign(childNode.style, {
                transform: `translateZ(${THICKNESS}px)`,
                overflow: "visible",
                backfaceVisibility: "hidden",
                isolation: "auto",
                transformStyle: "preserve-3d",
                backgroundColor: COLOR_SURFACE ? color : getComputedStyle(childNode).backgroundColor,
                willChange: 'transform',
            });

            let updatedOffsetX = offsetX;
            let updatedOffsetY = offsetY;
            if (childNode.offsetParent === parentNode) {
                updatedOffsetX += parentNode.offsetLeft;
                updatedOffsetY += parentNode.offsetTop;
            }
            createSideFaces(childNode, color);
            traverseDOM(childNode, depthLevel + 1, updatedOffsetX, updatedOffsetY, domDepthCache);
        }
    }

    return function(iframeDocument) {
        const iframeBody = iframeDocument.body;
        const domDepthCache = getDOMDepth(iframeBody);

        // Apply initial styles to the iframe body to enable 3D perspective
        iframeBody.style.overflow = "visible";
        iframeBody.style.transformStyle = "preserve-3d";
        iframeBody.style.perspective = DISTANCE;
        const perspectiveOriginX = (iframeDocument.documentElement.clientWidth / 2);
        const perspectiveOriginY = (iframeDocument.documentElement.clientHeight / 2);
        iframeBody.style.perspectiveOrigin = iframeBody.style.transformOrigin = `${perspectiveOriginX}px ${perspectiveOriginY}px`;
        
        traverseDOM(iframeBody, 0, 0, 0, domDepthCache);

        iframeDocument.addEventListener("mousemove", (event) => {
            const rotationY = (MAX_ROTATION * (1 - event.clientY / iframeDocument.documentElement.clientHeight) - (MAX_ROTATION / 2));
            const rotationX = (MAX_ROTATION * event.clientX / iframeDocument.documentElement.clientWidth - (MAX_ROTATION / 2));
            iframeBody.style.transform = `rotateX(${rotationY}deg) rotateY(${rotationX}deg)`;
        });
    };
})();

// Export the function to make it accessible from other scripts
window.convert3DDOM = convert3D;
