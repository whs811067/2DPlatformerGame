window.addEventListener("keydown", function (event) {
    switch (event.code) {
      // case "KeyW":
      //   if (world.cnvLoc.y > (world.dims.top))
      //     world.cnvLoc.y -= 10;
      //   break;
      //case "KeyS":
      //   if (world.cnvLoc.y + world.cnv.height - 100 < (world.dims.bottom))
      //     world.cnvLoc.y += 10;
      //  break;
      case "KeyA":
        console.log("Left Key Down");
        world.player.moving.left = true;
        break;
      case "KeyD":
        console.log("Left Key Down");
        world.player.moving.right = true;
        break;
    }
  }, false);

  window.addEventListener("keyup", function (event) {
    switch (event.code) {
      case "KeyA":
        console.log("Left Key Up");
        world.player.moving.left = false;
        break;
      case "KeyD":
        console.log("Right Key Up");
        world.player.moving.right = false;
        break;
    }
  }, false);