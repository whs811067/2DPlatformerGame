// global variables for canvas and context
var game, canvas, ctx;
window.onload = init;//  After the window has been loaded, go to init

function init(){
  canvas = document.createElement('canvas');
  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,0,0, .95)';
  canvas.width = 1096;  // 800 - 4 for the border
  canvas.height = 696; // 700 - 4 for the border
  ctx = canvas.getContext('2d'); // This is the context
  game = new Game();
  animate();
}


function animate(){
  ctx.fillStyle = 'rgba(0,0,0,.05)'
  ctx.fillRect(0,0,canvas.width,canvas.height); 
  game.update();
  requestAnimationFrame(animate);
}

  
function randomNumber(min, max) { 
  let rdm = Math.random() * (max - min) + min;
  return rdm;
} 

function RGBToHex(r,g,b) {
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