function Player(x, y, ctx) {
    this.loc = new JSVector(x, y);
    this.vel = new JSVector(0, 0);
    this.maxVel = 4;
    this.acc = new JSVector(0.1, 0);
    this.ctx = ctx;
    this.moving = {
        right: false,
        left: false, 
    }
}

Player.prototype.update = function() {
    if (this.moving.right) {
        this.vel.add(this.acc);
    } else {
        if (this.vel.x > 0) {
            this.vel.sub(this.acc);
        }
    }
    if (this.moving.left) {
        this.vel.sub(this.acc);
    } else {
        if (this.vel.x < 0) {
            this.vel.add(this.acc);
        }
    }

    this.vel.limit(this.maxVel);
    this.loc.add(this.vel);
    
}

Player.prototype.render = function() {
    this.ctx.beginPath();
    this.ctx.arc(this.loc.x, this.loc.y, 10, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fillStyle = "Black";
    this.ctx.strokeStyle = getRandomColor();
    this.ctx.fill();
    this.ctx.stroke();
}



Player.prototype.run = function() {
    this.update();
    this.render();
}