//physical stuff
let world;
let gravity = 9.8;
let airResistance = 0.02;

//global assets & resource delcaration

//images
let background1 = new Image();
let background2 = new Image();
let background3 = new Image();
background1.src = "assets/background1.png";
background2.src = "assets/background2.png";
background3.src = "assets/background3.png";

let gameOverScreen = new Image();
gameOverScreen.src = "assets/gameover.jpeg";

let darkness = new Image();
darkness.src = "assets/darkness.png";

let heartBack = new Image();
let heartFore = new Image();
heartBack.src = "assets/health/health_bar_decoration.png";
heartFore.src = "assets/health/health_bar.png";

let platform = new Image();
platform.src = "assets/platform.png"

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

let charSlide1 = new Image();
let charSlide2 = new Image();
charSlide1.src = "assets/character/adventurer-slide-00.png";
charSlide2.src = "assets/character/adventurer-slide-01.png";
let charSlideImgs = [charSlide1, charSlide2];
let charSlideIndex = 2;

let charJump1 = new Image();
let charJump2 = new Image();
let charJump3 = new Image();
let charJump4 = new Image();
charJump1.src = "assets/character/adventurer-jump-00.png";
charJump2.src = "assets/character/adventurer-jump-01.png";
charJump3.src = "assets/character/adventurer-jump-02.png";
charJump4.src = "assets/character/adventurer-jump-03.png";
let charJumpImgs = [charJump1, charJump2, charJump3, charJump4]
let charJumpIndex = 3;

let playerAnims = [charIdleImgs, charRunImgs, charSlideImgs, charJumpImgs];

let goblinRun1 = new Image();
let goblinRun2 = new Image();
let goblinRun3 = new Image();
let goblinRun4 = new Image();
let goblinRun5 = new Image();
let goblinRun6 = new Image();
goblinRun1.src = "assets/goblin/goblin-run-00.png";
goblinRun2.src = "assets/goblin/goblin-run-01.png";
goblinRun3.src = "assets/goblin/goblin-run-02.png";
goblinRun4.src = "assets/goblin/goblin-run-03.png";
goblinRun5.src = "assets/goblin/goblin-run-04.png";
goblinRun6.src = "assets/goblin/goblin-run-05.png";
let goblinRunImgs = [goblinRun1, goblinRun2, goblinRun3, goblinRun4, goblinRun5, goblinRun6];
let goblinRunIndex = 0;

let goblinAnims = [goblinRunImgs];

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
  document.getElementById("CanvasLoc").innerHTML = "CanvasLoc: " + world.cnvLoc;
  document.getElementById("PlayerLoc").innerHTML = "PlayerLoc: " + world.player.loc;
  document.getElementById("PlayerHorizontal").innerHTML = "PlayerXVel: " + world.player.vel.x;
  document.getElementById("PlayerVertical").innerHTML = "PlayerYVel: " + world.player.vel.y;
  document.getElementById("Tick").innerHTML = "Tick: " + world.tick;
  document.getElementById("JumpTick").innerHTML = "Jump Tick: " + world.player.jumpAnimTick;
  document.getElementById("CharCurr").innerHTML = "Current Anim Frame: " + world.player.charCurr;
  document.getElementById("CurrentAnim").innerHTML = "Current Anim: " + world.player.charAnimCurr;
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

