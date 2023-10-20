import { customgeo } from "./custom.geo.js"
import { TrackballControls } from '//unpkg.com/three/examples/jsm/controls/TrackballControls.js';
import { lines } from "./lines.js"
import { map } from "./map.js"
Object.assign(THREE , { TrackballControls });




// Setup renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true}) // turn on antialias
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('globeViz').appendChild(renderer.domElement);


const Globe = new ThreeGlobe(renderer,{
    waitForGlobeReady : true,
    animateIn: true,
  })
    // .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
    .hexPolygonsData(customgeo.features)
    .hexPolygonResolution(3)
    .hexPolygonMargin(0.7)
    .showAtmosphere(true)
    .atmosphereColor("#c430d7")
    .atmosphereAltitude(0.5)
    .pointColor('color');
  
  setTimeout(() => {
    Globe.arcsData(lines.pulls)
    .arcColor(e => {
      return e.status ? "green": "crimson" 
    })
    .arcAltitude(e => {
      return e.arcAlt; 
    })
    .arcStroke(e => {
      return e.status ? 0.5: 0.3 
    })
    .arcDashLength(0.9)
    .arcDashGap(4)
    .arcDashAnimateTime(1000)
    .arcsTransitionDuration(1000)
    .arcDashInitialGap(e => e.order*1)
    .labelsData(map.maps)
    .labelColor(()=>"yellow")
    .labelDotRadius(0.4)
    .labelSize(e=>e.size)
    .labelText("city")
    .labelResolution(6)
    .labelAltitude(0.01)
    .pointsData(map.maps)
    .pointColor(()=> "white")
    .pointMerge(true)
    .pointAltitude(0.07)
    .pointRadius(0.05)
  }, 1000);
  Globe.rotateY(-Math.PI * (5/9))
  
  

const scene = new THREE.Scene();
scene.background = null; // Set background to null for transparency
scene.alpha = true;


scene.add(Globe);
scene.add(new THREE.AmbientLight(0xcccccc));
scene.add(new THREE.DirectionalLight(0xffffff, 0.6));

// Setup camera
const camera = new THREE.PerspectiveCamera();
camera.aspect = window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
camera.position.z = 300;

// Add camera controls
const tbControls = new THREE.TrackballControls(camera, renderer.domElement);
tbControls.minDistance = 101;
tbControls.rotateSpeed = 3;
tbControls.zoomSpeed = 0.8;




// Kick-off renderer
(function animate() { // IIFE
  // Frame cycle
  tbControls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);

})();