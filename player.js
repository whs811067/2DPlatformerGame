function Player(x, y, ctx, playerAnims) {
    this.loc = new JSVector(x, y);
    this.vel = new JSVector(0, 0);
    this.acc = new JSVector(0, gravity/100);
    this.mass = 0.5;
    this.terminalVelocity = this.mass * gravity;
    this.maxVel = new JSVector(1.3, this.terminalVelocity);
    this.ctx = ctx;
    this.moving = {
        right: false,
        left: false,
    }
    this.friction = 0.02;
    this.charIdleAnim = [playerAnims[charIdleIndex][0], playerAnims[charIdleIndex][1], playerAnims[charIdleIndex][2]];
    this.charRunAnim = [playerAnims[charRunIndex][0], playerAnims[charRunIndex][1], playerAnims[charRunIndex][2], playerAnims[charRunIndex][3], playerAnims[charRunIndex][4], playerAnims[charRunIndex][5]];
    this.charSlideAnim = [playerAnims[charSlideIndex][0], playerAnims[charSlideIndex][1]];
    this.charCurr = 0;
    this.charAnimCurr = this.charIdleAnim;
    this.currentImage = this.charAnimCurr[this.charCurr];
    this.sizeMultiplier = 2;
    this.isColliding = 0;
    this.jumpPower = -4;
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

    if (this.vel.x <= 0.1 && this.vel.x >= 0.1 ) {
        console.log("eee")
        this.charAnimCurr = this.charIdleAnim;
    }



    //limit on the x axis
    if (this.vel.x >= this.maxVel.x) {
        this.vel.x = this.maxVel.x;
    }

    //apply gravity
    //this.vel.y = lerp(this.vel.y, this.maxVel.y, airResistance);
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

    ctx.beginPath();
    ctx.rect(this.loc.x, this.loc.y, 5, 5);
    ctx.fillStyle = getRandomColor();
    ctx.strokeStyle = getRandomColor();
    ctx.fill();
    ctx.stroke();
}



Player.prototype.run = function () {
    this.update();
    this.render();
}