let world;
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

function getRandomColor() {
  let r = Math.floor(randomNumber(0,255));
  let g = Math.floor(randomNumber(0,255));
  let b = Math.floor(randomNumber(0,255));
  let color = RGBToHex(r, g, b);
  return color;
}
