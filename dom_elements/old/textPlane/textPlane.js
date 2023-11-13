//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.75, 0.75, 0.75);
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.025, 20);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);

//-------- ----------
// MESH
//-------- ----------
const plane = TextPlane.createPlane({
    w: 7, h: 5,
    rows: 10, size: 256, palette: ['rgba(0,255,255,0.2)', 'black', 'black']
});
plane.position.set(0, 2.5, 0);
scene.add(plane);

//-------- ----------
// TEXT and textLines
//-------- ----------
const text2 = '\n\njsoidjflsne. \n';
const textLines = TextPlane.createTextLines(text2, 22);

// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20,
    // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30; // fps rate to move the object that is independent of frame update rate
FRAME_MAX = 600;
let frame = 0,
    lt = new Date();

// update
const update = function (frame, frameMax) {
    let a = frame / frameMax;
    let b = 1 - Math.abs(0.5 - a) / 0.5;

    // UPDATE
    TextPlane.moveTextLines(plane.userData.canObj.state.lines, textLines, b, 0, 30);
    // TextPlane.drawText(canObj, ctx, canvas, state);
    
    // update canvas
    canvasMod.update(plane.userData.canObj);
    // update camera
    camera.position.set(-4 * b, 1, 5);
    camera.lookAt(0, 1.5, 0);
};

// loop
const loop = () => {
    const now = new Date(),
        secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / FPS_UPDATE) {
        // update, render
        update(Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};

loop();
