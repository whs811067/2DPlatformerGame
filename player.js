function Player(x, y, ctx, playerAnims) {
    this.loc = new JSVector(x, y);
    this.vel = new JSVector(0, 0);
    this.mass = 0.5;
    this.terminalVelocity = this.mass * gravity;
    this.maxVel = new JSVector(0.9, this.terminalVelocity);
    this.ctx = ctx;
    this.moving = {
        right: false,
        left: false,
    }
    this.friction = 0.02;
    this.charIdleAnim = [playerAnims[charIdleIndex][0], playerAnims[charIdleIndex][1], playerAnims[charIdleIndex][2]];
    this.charRunAnim = [playerAnims[charRunIndex][0], playerAnims[charRunIndex][1], playerAnims[charRunIndex][2], playerAnims[charRunIndex][3], playerAnims[charRunIndex][4], playerAnims[charRunIndex][5]];
    this.charCurr = 0;
    this.charAnimCurr = this.charIdleAnim;
    this.currentImage = this.charAnimCurr[this.charCurr];
    this.sizeMultiplier = 2;
}

Player.prototype.update = function () {
    if (this.moving.right) {
        this.vel.x = lerp(this.vel.x, this.maxVel.x, this.friction);
        this.charAnimCurr = this.charRunAnim;
    } else {
        if (this.vel.x > 0) {
            this.vel.x = lerp(this.vel.x, 0, this.friction);
            this.charAnimCurr = this.charIdleAnim;
        }
    }
    if (this.moving.left) {
        this.vel.x = lerp(this.vel.x, -this.maxVel.x, this.friction);
    } else {
        if (this.vel.x < 0) {
            this.vel.x = lerp(this.vel.x, 0, this.friction);
        }
    }



    //limit on the x axis
    if (this.vel.x >= this.maxVel.x) {
        this.vel.x = this.maxVel.x;
    }

    //apply gravity
    this.vel.y = lerp(this.vel.y, this.terminalVelocity, airResistance);

    //apply velocity
    this.loc.add(this.vel);
}

Player.prototype.render = function () {
    let ctx = this.ctx;

    if (world.tick % world.tickInterval == 0) {
        if (this.charCurr < this.charAnimCurr.length - 1) {
            this.charCurr++;
        } else {
            this.charCurr = 0;
        }
    }

    this.currentImage = this.charAnimCurr[this.charCurr];

    if (this.currentImage == null) {
        this.currentImage = this.charAnimCurr[0];
    }
    ctx.drawImage(this.currentImage, this.loc.x, this.loc.y - this.currentImage.height * this.sizeMultiplier, this.currentImage.width * this.sizeMultiplier, this.currentImage.height * this.sizeMultiplier);
}



Player.prototype.run = function () {
    this.update();
    this.render();
}