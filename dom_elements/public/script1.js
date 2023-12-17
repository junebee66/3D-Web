import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {AnaglyphEffect} from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/effects/AnaglyphEffect.js';

let scene, camera, renderer, renderer2, effect;
const iframe1 = document.getElementById("iframe1");
let iframeBody = iframe1.contentWindow.document.querySelector("body");


init();
animate();

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.z = 200;
    // camera.focalLength = 3;

    renderer2 = new CSS3DRenderer();
    renderer2.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer2.domElement);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  //container.appendChild( renderer.domElement );
  document.querySelector('#webglRender').appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 5, 0);
    controls.update();

    effect = new AnaglyphEffect( renderer );
    // effect.setSize( window.innerWidth, window.innerHeight );

    // window.addEventListener('resize', onWindowResize);

    // Access the iframe and its body
    const iframe1 = document.getElementById("iframe1");
    const iframeBody = iframe1.contentWindow.document.querySelector("body");
    const newUrl = searchText.value;
    iframe1.src = `http://localhost:12345/getdata?name=${newUrl}`;

    iframe1.onload = function() {
      let allElements = iframe1.contentWindow.document.querySelector("body").children;
      console.log("iframe is loaded");

        for (let i = 0; i < allElements.length; i++) {
            const element = allElements[i];
            const elementPos = element.getBoundingClientRect();

            const css3dObject = makeElementObject(element, elementPos);
            scene.add(css3dObject);

        }
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
      // css3dObject.position.set(elementPos.left + imgW/2, -elementPos.top - imgH/2, 0);
      css3dObject.position.set(elementPos.left + width/2, -elementPos.top - height/2, 0);

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

    // Set color and font size to the CSS3DObject
    el.style.color = computedStyles.color;
    el.style.fontSize = computedStyles.fontSize;


    const css3dObject = new CSS3DObject(el);
    css3dObject.position.set(elementPos.left, -elementPos.top, 0);
    // css3dObject.position.set(elementPos.left, -elementPos.top, -50);

    return css3dObject;
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


