function Player(x, y, ctx, playerAnims) {
    this.loc = new JSVector(x, y);
    this.vel = new JSVector(0, 0);
    this.acc = new JSVector(0, gravity / 100);
    this.mass = 0.5;
    this.terminalVelocity = this.mass * gravity;
    this.maxVel = new JSVector(1.3, this.terminalVelocity);
    this.ctx = ctx;
    this.moving = {
        right: false,
        left: false,
        up: false,
        down: false
    }
    this.friction = 0.02;
    this.charIdleAnim = [playerAnims[charIdleIndex][0], playerAnims[charIdleIndex][1], playerAnims[charIdleIndex][2]];
    this.charRunAnim = [playerAnims[charRunIndex][0], playerAnims[charRunIndex][1], playerAnims[charRunIndex][2], playerAnims[charRunIndex][3], playerAnims[charRunIndex][4], playerAnims[charRunIndex][5]];
    this.charSlideAnim = [playerAnims[charSlideIndex][0], playerAnims[charSlideIndex][1]];
    this.charJumpAnim = [playerAnims[charJumpIndex][0], playerAnims[charJumpIndex][1], playerAnims[charJumpIndex][2], playerAnims[charJumpIndex][3]];
    this.charCurr = 0;
    this.charAnimCurr = this.charIdleAnim;
    this.currentImage = this.charAnimCurr[this.charCurr];
    this.sizeMultiplier = 2;
    this.isColliding = 0;
    this.jumpPower = -4;
    this.charDisplayDisplacement = 35;
    this.hitboxWidth = 30;
    this.hitboxheight = 63;
    this.jumpAnimTick = 0;
    this.jumpAimTickIntveral = 30;
    this.health = 100;
}

Player.prototype.update = function () {
    if (this.moving.right) {
        this.vel.x = lerp(this.vel.x, this.maxVel.x, this.friction);
        this.charAnimCurr = this.charRunAnim;
    } else if (this.vel.x > 0) {
        this.vel.x = lerp(this.vel.x, 0, this.friction);
        this.charAnimCurr = this.charIdleAnim;
    }
    if (this.moving.left) {
        this.vel.x = lerp(this.vel.x, -this.maxVel.x, this.friction);
    } else {
        if (this.vel.x < 0) {
            this.vel.x = lerp(this.vel.x, 0, this.friction);
        }
    }
    if (!this.moving.right && !this.moving.left) {
        if (this.vel.x > -0.1 || this.vel.x < 0.1) {
            this.vel.x = 0;
        }
    }



    if (this.vel.y != 0 && this.vel.getDirection() > 0) {
        this.moving.down = true;
        this.moving.up = false;
        this.charAnimCurr = this.charJumpAnim;
    } else if (this.vel.y != 0 && this.vel.getDirection() < 0) {
        this.moving.down = false;
        this.moving.up = true;
        this.charAnimCurr = this.charJumpAnim;
    } else if (this.vel.y == 0 && this.vel.x == 0) {
        this.charAnimCurr = this.charIdleAnim;
        this.moving.up = false;
        this.moving.down = false;
    }

    if (this.vel.x <= 0.00000001 && this.vel.x >= 0.00000001) {
        console.log("eee")
        this.charAnimCurr = this.charIdleAnim;
    }



    //limit on the x axis
    if (this.vel.x >= this.maxVel.x) {
        this.vel.x = this.maxVel.x;
    }

    //apply gravity
    this.vel.add(this.acc);
    if (this.isColliding) {
        this.vel.y = 0;
    }


    //apply velocity
    this.loc.add(this.vel);
}

Player.prototype.jump = function () {
    this.loc.y = this.loc.y - 10;
    this.vel.y = this.jumpPower;
    this.jumpAnimTick = 0;
    this.charCurr = 1;
}

Player.prototype.render = function () {
    let ctx = this.ctx;

    if (this.vel.getDirection() < 0) {
        this.moving.down = true;
    } else {
        this.moving.down = false;
    }

    if (this.moving.up) {
        if (this.jumpAnimTick % this.jumpAimTickIntveral == 0) {
            if (this.charCurr < this.charAnimCurr.length - 1) {
                this.charCurr++;
            } else {
                this.charCurr = this.charAnimCurr.length - 1;
            }
        }
        this.jumpAnimTick++;
    } else if (this.moving.down) {
        this.jumpAnimTick = 0;
        this.charCurr = 3;
    } else {
        if (world.tick % world.tickInterval == 0) {
            if (this.charCurr < this.charAnimCurr.length - 1) {
                this.charCurr++;
            } else {
                this.charCurr = 0;
            }
        }
    }
    this.currentImage = this.charAnimCurr[this.charCurr];

    if (this.currentImage == null) {
        this.currentImage = this.charAnimCurr[0];
    }
    ctx.translate(0, -this.hitboxheight);
    ctx.beginPath();
    //ctx.rect(this.loc.x, this.loc.y, this.hitboxWidth, this.hitboxheight);
    ctx.fillStyle = getRandomColor();
    ctx.strokeStyle = getRandomColor();
    ctx.fill();
    ctx.stroke();
    ctx.translate(-this.charDisplayDisplacement, this.hitboxheight);
    ctx.drawImage(this.currentImage, this.loc.x, this.loc.y - this.currentImage.height * this.sizeMultiplier, this.currentImage.width * this.sizeMultiplier, this.currentImage.height * this.sizeMultiplier);
}

Player.prototype.CheckCollisions = function () {
    for (let i = 0; i < world.platforms.length; i++) {
        if (this.loc.y >= world.platforms[i].loc.y && this.loc.y < world.platforms[i].loc.y + world.platforms[i].height && (this.loc.x > world.platforms[i].loc.x || this.loc.x + this.hitboxWidth > world.platforms[i].loc.x) && (this.loc.x < world.platforms[i].loc.x + world.platforms[i].width) && (this.moving.down || (!this.moving.down && !this.moving.up))) {
            this.loc.y = world.platforms[i].loc.y + 1;
            this.vel.y = 0;
        }
    }
    for (let i = 0; i < world.platforms.length; i++) {
        for (let j = 0; j < world.platforms[i].hostiles.length; j++) {
            if (this.loc.y >= world.platforms[i].hostiles[j].loc.y && this.loc.y < world.platforms[i].hostiles[j].loc.y + world.platforms[i].hostiles[j].height && (this.loc.x > world.platforms[i].hostiles[j].loc.x || this.loc.x + this.hitboxWidth > world.platforms[i].hostiles[j].loc.x) && (this.loc.x < world.platforms[i].hostiles[j].loc.x + world.platforms[i].hostiles[j].width)) {
                this.health -= 0.7;
            }
        }
    }
}

Player.prototype.run = function () {
    this.update();
    this.CheckCollisions();
    if (this.health >= 0) {
        this.render();
    }

}