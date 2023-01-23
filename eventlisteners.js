window.addEventListener("keydown", function (event) {
  switch (event.code) {
    case "KeyA":
      //console.log("Left Key Down");
      world.player.moving.left = true;
      break;
    case "ArrowLeft":
      //console.log("Left Key Down");
      world.player.moving.left = true;
      break;
    case "KeyD":
      //console.log("Left Key Down");
      world.player.moving.right = true;
      break;
    case "ArrowRight":
      //console.log("Left Key Down");
      world.player.moving.right = true;
      break;
  }
}, false);

window.addEventListener("keyup", function (event) {
  switch (event.code) {
    case "KeyA":
      //console.log("Left Key Up");
      world.player.moving.left = false;
      break;
    case "ArrowLeft":
      //console.log("Left Key Up");
      world.player.moving.left = false;
      break;
    case "KeyD":
      //console.log("Right Key Up");
      world.player.moving.right = false;
      break;
    case "ArrowRight":
      //console.log("Right Key Up");
      world.player.moving.right = false;
      break;
  }
}, false);

window.addEventListener("keypress", function (event) {
  switch (event.code) {
    case "Space":
      world.player.jump();
      break;
  }
}, false);

