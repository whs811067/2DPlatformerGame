//physical stuff
let world;
let gravity = 0;
let airResistance = 0.02;

//global assets & resource delcaration

//images
let background1 = new Image();
let background2 = new Image();
let background3 = new Image();
background1.src = "assets/background1.png";
background2.src = "assets/background2.png";
background3.src = "assets/background3.png";

let charIdle1 = new Image();
let charIdle2 = new Image();
let charIdle3 = new Image();
charIdle1.src = "assets/character/adventurer-idle-00.png";
charIdle2.src = "assets/character/adventurer-idle-01.png";
charIdle3.src = "assets/character/adventurer-idle-02.png";
let charIdleImgs = [charIdle1, charIdle2, charIdle3];
let charIdleIndex = 0;

let charRun1 = new Image();
let charRun2 = new Image();
let charRun3 = new Image();
let charRun4 = new Image();
let charRun5 = new Image();
let charRun6 = new Image();
charRun1.src = "assets/character/adventurer-run-00.png";
charRun2.src = "assets/character/adventurer-run-01.png";
charRun3.src = "assets/character/adventurer-run-02.png";
charRun4.src = "assets/character/adventurer-run-03.png";
charRun5.src = "assets/character/adventurer-run-04.png";
charRun6.src = "assets/character/adventurer-run-05.png";
let charRunImgs = [charRun1, charRun2, charRun3, charRun4, charRun5, charRun6];
let charRunIndex = 1;



let playerAnims = [charIdleImgs, charRunImgs];

//music
//let backgroundMusic = new Audio('assets/scaryForest.mp3');




//init
window.onload = init;

function init() {
  world = new World();
  animate();
}

function animate() {

  world.run();
  requestAnimationFrame(animate);
}

function randomNumber(min, max) {
  let rdm = Math.random() * (max - min) + min;
  return rdm;
}

function RGBToHex(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}

function getRandomColor() {
  let r = Math.floor(randomNumber(0, 255));
  let g = Math.floor(randomNumber(0, 255));
  let b = Math.floor(randomNumber(0, 255));
  let color = RGBToHex(r, g, b);
  return color;
}

function lerp(start, end, t) {
  return (1 - t) * start + t * end;
}

