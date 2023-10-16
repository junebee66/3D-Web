var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
var renderer = new THREE.WebGLRenderer();
camera.position.set(0, 0, 150);
camera.lookAt(0, 0, 0);
renderer.setClearColor(0xdddddd);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;
//GEOMETRY
var cubeMat = new THREE.MeshLambertMaterial({ color: 0xff3300 });
var spotlight = new THREE.SpotLight(0xffffff);
spotlight.castShadow = true;
spotlight.position.set(30, 60, 60);

scene.add(spotlight);

document.body.appendChild(renderer.domElement);
var render = function() {
  requestAnimationFrame(render);
  animate();
};
loadFont();

render();
/*
HELPERS
~~~~~~~~~~~~~~~~~~~*/
//SETTINGS
var text = false;
function animate() {
  text.rotation.y += 0.01;
  renderer.render(scene, camera);
}
function loadFont() {
  var loader = new THREE.FontLoader();
  loader.load(
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/gentilis_regular.typeface.json",
    function(res) {
      createText(res);
    }
  );
}
function createText(font) {
  textGeo = new THREE.TextGeometry("Iz", {
    font: font,
    size: 40,
    height: 5,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1.8,
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

// trying to simplify an online example https://medium.com/@thesuperuser/three-js-text-example-4f214f478fac