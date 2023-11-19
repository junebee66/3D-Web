import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';

import {AnaglyphEffect} from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/effects/AnaglyphEffect.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
// import { CSS3DRenderer, CSS3DObject } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/renderers/CSS3DRenderer.js';

// import {OBJLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/OBJLoader.js';
// import {MTLLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/MTLLoader.js';
// import {Curtains, Plane, RenderTarget, ShaderPass} from 'https://cdn.jsdelivr.net/npm/curtainsjs@8.1.2/src/index.mjs';
// import {TextTexture} from 'https://gistcdn.githack.com/martinlaxenaire/549b3b01ff4bd9d29ce957edd8b56f16/raw/2f111abf99c8dc63499e894af080c198755d1b7a/TextTexture.js';



//When updating information in this code, I have to stop the localhost:12345 in the terminal with ctrl + c 
//and then run "node index.js" again, then reload the http://localhost:12345/ page to see changes


/*
// demo usage -- contact a script using the 'GET' method
performFetch({
  url: 'http://localhost:12345/getdata',
  method: 'get',
  data: {
      name: 'https://cims.nyu.edu/~kapp/june/test.html'
  },
  success: function(data) {
      console.log("success GET:", data);
  },
  error: function(error) {
      console.log("error GET:", error);
  }
});*/





//accessing iframe elements
let changeBtn = document.getElementById('changeBtn');


//3D text
let text = false;
let cubeMat = new THREE.MeshLambertMaterial({ color: 0xff3300 });

let container, camera, scene, renderer, cssRenderer, effect, leftC;

// const loader;
const spheres = [];
const boxes = [];

let mouseX = 0;
let mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let ratio = 20
let textRatio = 50;
let canvasLeft = -15;
let canvasTop = 15;
  

// rgb -> hex function
const componentToHex = (c) => {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

const rgbToHex = (r, g, b) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


//background image
const path = "https://threejs.org/examples/textures/cube/pisa/";
const format = '.png';
const urls = [
  path + 'px' + format, path + 'nx' + format,
  path + 'py' + format, path + 'ny' + format,
  path + 'pz' + format, path + 'nz' + format
];


const textureCube = new THREE.CubeTextureLoader().load( urls );

init();
animate();

//loop all iframe elements to change
changeBtn.onclick = function create3D(){

  //clean previous 3d objects in the scene
  while (scene.children.length > 0) {
    const child = scene.children[0];
    scene.remove(child);
}

  // update iframe url to input box link
  const searchText = document.getElementById("searchText");
  const iframe1 = document.getElementById("iframe1");
  // const tagsToSkip = {
  //   'BODY': true,
  // }

      // Get the value from the input box
      const newUrl = searchText.value;

      // Update the iframe src attribute with the new URL
      iframe1.src = `http://localhost:12345/getdata?name=${newUrl}`;


    
    // let iframe1 = document.getElementById("iframe1");
    let allElements = iframe1.contentWindow.document.querySelector("body").children;

  let geometry = new THREE.SphereBufferGeometry( 0.1, 32, 16 );
  let material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );

  // get the size of the actual iframe container
  let iframeBody = iframe1.contentWindow.document.querySelector("body");
  let bodyRect = iframeBody.getBoundingClientRect();
  //  console.log("BODY RECT:");
  //  console.log(bodyRect);

  
  for (let i = 0; i < allElements.length; i++) {

    if (allElements[i].tagName == 'SCRIPT') {
      continue;
    }

    let nodeName = allElements[i].nodeName;
    let pText = allElements[i].innerText;
    let imgUrl = allElements[i].currentSrc;
    let arrayNum = i;


    //Text Position and Color Setup 
    let allElementsPos = allElements[i].getBoundingClientRect();
  

    const allElCSS = window.getComputedStyle(allElements[i], null);
    // // let bgColorH1 = cssObjH1.getPropertyValue("background-color");

    let allElFontSize = parseFloat(allElCSS.fontSize.replace('px', '')) / textRatio;

    let components = allElCSS.color.split(", ");
    components[1] = parseInt(components[1]);
    components[0] = parseInt(components[0].split('(')[1]);
    components[2] = parseInt(components[2].split(')')[0]);
    let hexColorCode = rgbToHex(components[0], components[1], components[2]);

    // // create a unique material for this entity
    let textMaterial = new THREE.MeshLambertMaterial({ color: hexColorCode });

    let insideDiv = "OUTSIDE div..."


    if (nodeName == "P") {
        createText(pText, arrayNum, allElementsPos, allElFontSize,textMaterial, insideDiv);
        // console.log("printed p!");
    }

    if (nodeName == "H1") {
        const H1Object = new THREE.Object3D();
        H1Object.position.x = 5 + allElementsPos.left /ratio;
        H1Object.position.y = 5 + allElementsPos.top /ratio;

        // createText(pText, arrayNum, allElementsPos, allElFontSize, textMaterial, insideDiv);
    }
    
    if (nodeName == "H2") {
        // createText(pText, arrayNum);
        createText(pText, arrayNum, allElementsPos, allElFontSize, textMaterial, insideDiv);
        console.log("printed h2!");
    }
 
    if (nodeName == "IMG") {
        createImage(arrayNum, imgUrl, allElementsPos, insideDiv);
        // console.log(allElementsPos);
    }





    //get all divs
    // if(allElements[i].nodeName == "DIV"){
    //     //get children in each array
    //     for (let a = 0; a < allElements[i].children.length; a++) {
    //         let divNodeName = allElements[i].children[a].nodeName;
    //         let divPText = allElements[i].children[a].innerText;
    //         let divArrayNum = i;
    //         let divImgUrl = allElements[i].children[a].currentSrc;
    //         let divPos = allElements[i].children[a].getBoundingClientRect();
            

    //         console.log(divPos);
    //         const divElCSS = window.getComputedStyle(allElements[i].children[a], null);
    //         // // let bgColorH1 = cssObjH1.getPropertyValue("background-color");
        
    //         let divElFontSize = parseFloat(divElCSS.fontSize.replace('px', '')) / 50;
        
    //         let components = divElCSS.color.split(", ");
    //         components[1] = parseInt(components[1]);
    //         components[0] = parseInt(components[0].split('(')[1]);
    //         components[2] = parseInt(components[2].split(')')[0]);
    //         let hexColorCode = rgbToHex(components[0], components[1], components[2]);
        
    //         // // create a unique material for this entity
    //         let textMaterial = new THREE.MeshLambertMaterial({ color: hexColorCode });


    //         let insideDiv = "INSIDE div!"
    //       //   console.log("allElements[i].children[a].nodeName", allElements[i].children[a].nodeName);
    //         // console.log("🔴 image inside div pos", allElements[6].children[0].getBoundingClientRect());
      
    //     //   console.log("image outside x", allElements[6].getBoundingClientRect());
            
    //     if (divNodeName == "H1") {
    //       createPlaneText(divPText, divPos, allElFontSize);
    //       // createText(divPText, arrayNum, divPos, divElFontSize, textMaterial, insideDiv);
    //       // let divPTextF = window.getComputedStyle(allElements[i].children[0], null);
    //       // console.log("🟡h1 inside div", divPTextF);
    //     }
      
    //   if (divNodeName == "H2") {
    //       // createText(pText, arrayNum);
    //       createPlaneText(divPText, divPos, allElFontSize);
    //       // createText(divPText, arrayNum, divPos, divElFontSize, textMaterial, insideDiv);
    //       console.log("printed div h2!");
    //   }
        
    //     if (divNodeName == "P") {
    //             // createText(divPText, divArrayNum, divPos, divElFontSize, textMaterial, insideDiv);
    //             createPlaneText(divPText, divPos, allElFontSize);
    //             // createPlaneText(divPText, divPos, allElFontSize);
    //             console.log("print div p");
    //         }

    //         if (divNodeName == "IMG") {
    //             createImage(divArrayNum, divImgUrl, divPos, insideDiv);
    //             console.log("print div image");
    //         }
    // }

    // }
  }

}


//create text
function createText(pText, arrayNum, allElementsPos, allElFontSize, textMaterial, insideDiv) {
    // let pText = allElements[i].children[a].innerText;
        //create text
        let loader = new THREE.FontLoader();
        loader.load(
          "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/gentilis_regular.typeface.json",
          function(font) {
            let textGeo = new THREE.TextGeometry(pText, {
              font: font,
              size: allElFontSize,
              height: 0.003,
              curveSegments: 10,
              // bevelEnabled: false,
              bevelThickness: 1,
              bevelSize: 0,
              bevelOffset: 0,
              bevelSegments: 15,
              bevelEnabled: false
            });
            textGeo.computeBoundingBox();
            textGeo.computeVertexNormals();
            // console.log(textMaterial);
            text = new THREE.Mesh(textGeo, textMaterial);

            console.log("💬",insideDiv, " '", pText, "' ", "text pos before algorithm", allElementsPos)
            text.position.x = canvasLeft + allElementsPos.left /ratio;
            text.position.y = canvasTop - allElementsPos.top /ratio;
            // console.log("text.x", text.position.x);
            console.log("💬", insideDiv, " '", pText, "' ","'s x position after algorithm is", text.position.x);


            const geometry = new THREE.BoxGeometry( 0.1*(arrayNum+1), 0.1*(arrayNum+1), 0.1*(arrayNum+1) ); 
            const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
            const cube = new THREE.Mesh( geometry, material ); 
            cube.position.x = canvasLeft + (allElementsPos.left/ratio);
            cube.position.y = canvasTop - (allElementsPos.top/ratio);
            scene.add( cube );

            text.castShadow = true;
            scene.add(text);

            scene.add( new THREE.GridHelper(10, 10) );
        
          }
        );
}

function createImage(arrayNum, imgUrl, imgPos, insideDiv){
        let ImgWidth = imgPos.width;
        let ImgHeight = imgPos.height;
        let ImgResizeW = ImgWidth/ratio;
        let ImgResizeH = ImgHeight/ratio;
        let ImgLoader = new THREE.TextureLoader();
        let ImgWHalf = ImgResizeW/2;
        let ImgHHalf = ImgResizeH/2;
        console.log("🔴IMG POS")
        console.log(imgPos);

        let ImgLeft = imgPos.left / ratio;
        let ImgTop = imgPos.top / ratio;

    
        const ImgMaterial = new THREE.MeshBasicMaterial();
        const ImgGeometry = new THREE.PlaneGeometry( ImgResizeW, ImgResizeH );

        ImgLoader.load( imgUrl, 
          function ( ImgTexture ) {    
            ImgMaterial.map = ImgTexture;
            // console.log(divImgMaterial.map);
            ImgMaterial.needsUpdate = true;
          });
        
        const ImgPlane = new THREE.Mesh( ImgGeometry, ImgMaterial );
        console.log("🖼️",insideDiv,"image all pos before algorithm is", imgPos);
        console.log("🖼️",insideDiv,"image left pos before algorithm is", imgPos.left);
        

        //making the image origin to the left border


        let secondL = canvasLeft + ImgWHalf;// + (firstL /ratio);
        ImgPlane.position.x = secondL + ImgLeft;

        let secondT = canvasTop - ImgHHalf;
        ImgPlane.position.y = secondT - ImgTop;

        // ImgPlane.position.x = canvasLeft + imgPos.left /ratio;
        // ImgPlane.position.y = canvasLeft - (imgPos.top /ratio); // has make the top number negative sign bc in threejs the higher the number is the higher it is in position
        ImgPlane.position.z = -1;
        console.log("🖼️", insideDiv,"image x after algorithm is",ImgPlane.position.x);
        // console.log("imgPlane Height", allElementsPos.height);
        // ImgPlane.position.x = Math.random() * -35 +arrayNum;
        // ImgPlane.position.y = Math.random() * -5 +arrayNum;
        // ImgPlane.position.z = Math.random() * -15 +arrayNum;
        
        scene.add( ImgPlane );


        //debug origin cube
        const geometry = new THREE.BoxGeometry( 0.1*(arrayNum+1), 0.1*(arrayNum+1), 0.1*(arrayNum+1) ); 
        const material = new THREE.MeshBasicMaterial( {color: 0xD70040} ); 
        const cube = new THREE.Mesh( geometry, material ); 
        cube.position.x = canvasLeft + (imgPos.left/ratio);
        cube.position.y = canvasTop - (imgPos.top/ratio);
        scene.add( cube );

}

function createPlaneText(text, imgPos, fontSize){
  console.log(imgPos.width);
  let ImgWidth = imgPos.width;
  let ImgHeight = imgPos.height;
  let ImgResizeW = ImgWidth/ratio;
  let ImgResizeH = ImgHeight/ratio;
  let ImgLoader = new THREE.TextureLoader();
  let ImgWHalf = ImgResizeW/2;
  let ImgHHalf = ImgResizeH/2;

  let ImgLeft = imgPos.left / ratio;
  let ImgTop = imgPos.top / ratio;

  const canObj1 = TextPlane.createCanObj({
    rows: 152, size: ImgWidth,
    palette: ['rgba(0,0,0,0)', 'black', 'black']
  });
  console.log("fontsize" + canObj1.size);
  // canvas object 2 will use the 'rnd' built in draw method
  // as a way to create a background a little more interesting
  // than just a static background
  let canObj2 = canvasMod.create({
    draw: 'rnd',
    size: ImgWidth,
    update_mode: 'canvas',
    state: {
        gSize: 16
    },
    // palette: ['red', 'lime', 'cyan', 'purple', 'orange', 'green', 'blue']
    palette: ['white', 'white', 'white', 'white', 'white', 'white', 'white']
  });
  // canvas object 3 will be the final background use for the material
  let canObj3 = canvasMod.create({
    draw: function(canObj, ctx, canvas, state){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.3;
        ctx.drawImage(canObj2.canvas, 0, 0);
        ctx.globalAlpha = 1;
        ctx.save();
        ctx.translate(128, 128);
        let d = state.rStart + state.rDelta * state.rAlpha;
        ctx.rotate(Math.PI / 180 * d);
        ctx.drawImage(canObj1.canvas, -128, -128);
        ctx.restore();
    },
    size: ImgWidth,
    update_mode: 'canvas',
    state: {
        rStart: -90,
        rDelta: 180,
        rAlpha: 100
    },
    palette: ['blue', 'white']
  });
  //-------- ----------
  // MESH
  //-------- ----------
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(ImgWidth/ratio, ImgHeight/ratio),
    new THREE.MeshBasicMaterial({
        map: canObj3.texture,
        transparent: true
    })
  );

  //making the image origin to the left border


  let secondL = canvasLeft + ImgWHalf;// + (firstL /ratio);
  mesh.position.x = secondL + ImgLeft;

  let secondT = canvasTop - ImgHHalf;
  mesh.position.y = secondT - ImgTop;
  console.log("here");
  
  // mesh.position.set(0, 1, 0);
  // mesh.position.x = canvasLeft + (tpPos.left/ratio);
  // mesh.position.y = canvasTop - (tpPos.top/ratio);
  mesh.position.z = 0;
  scene.add(mesh);
  //-------- ----------
  // TEXT and textLines
  //-------- ----------
  const text2 = text;
  const textLines = TextPlane.createTextLines(text2, 22);
  // ---------- ----------
  // ANIMATION LOOP
  // ---------- ----------
  const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
  FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
  // FRAME_MAX = 600;
  let secs = 0,
  frame = 0,
  lt = new Date();
  // update
  const update = function(frame, frameMax){
    let a = frame / frameMax;
    let b = 0.5;
    // UPDATE
    TextPlane.moveTextLines(canObj1.state.lines, textLines, 0, 0, 20);
    // update canvas
    canvasMod.update(canObj1);
    //canvasMod.update(canObj2); // background can be animated or static
    canObj3.state.rAlpha = b;
    canvasMod.update(canObj3);
  };
  // loop
  const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), 600);
        // update( Math.floor(frame), FRAME_MAX);
        cssRenderer.render(scene, camera);
        // step frame
        // frame += FPS_MOVEMENT * secs;
        // frame %= FRAME_MAX;
        // lt = now;
    }
  };
  loop();
  
}


//3D Scene Initialization
function init() {
  // console.log(allElement);

  container = document.createElement( 'div' );
  leftC= document.querySelector('#webglRender');
  leftC.appendChild( container );

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  leftC.appendChild( renderer.domElement );

  renderer2 = new THREE.CSS3DRenderer();
  renderer2.domElement.style.position = 'absolute';
  renderer2.domElement.style.top = 120;
  document.querySelector('#cssRender').appendChild(renderer2.domElement);

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 100 );
    camera.position.z = 40;
    camera.focalLength = 3;

    const controls = new OrbitControls(camera, leftC);
    controls.target.set(0, 5, 0);
    controls.update();


    scene = new THREE.Scene();
    // scene.background = textureCube;
    scene.background = new THREE.Color(0x87CEEB);


    const geometry = new THREE.SphereBufferGeometry( 0.1, 32, 16 );
    const material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );


    const width = window.innerWidth ;
    const height = window.innerHeight;

    effect = new AnaglyphEffect( renderer );
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
        // const skyColor = 0xB1E1FF;  // light blue
        // const groundColor = 0xB97A20;  // brownish orange
        const skyColor = 0xffffff;  // light blue
        const groundColor = 0xffffff;  // brownish orange
        const intensity = 1;
        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        scene.add(light);
      }
    
    //   {
    //     const color = 0xFFFFFF;
    //     const intensity = 1;
    //     const light = new THREE.DirectionalLight(color, intensity);
    //     light.position.set(5, 10, 2);
    //     scene.add(light);
    //     scene.add(light.target);
    //   }



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


