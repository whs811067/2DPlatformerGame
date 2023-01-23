function Platform(x, y, w, h, clr, ctx) {
    this.ctx = ctx;
    this.loc = new JSVector(x, y);
    this.width = w;
    this.height = h;
    this.clr = clr;
}

Platform.prototype.checkCollisions = function () {
    if (world.player.loc.y > this.loc.y && world.player.loc.y < this.loc.y + this.height && world.player.loc.x > this.loc.x && world.player.loc.x < this.loc.x + this.width) {
        let endposx = this.loc.x + this.width;
        world.player.isColliding = true;
    } else {
        world.player.isColliding = false;
    }
}

Platform.prototype.render = function () {
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.rect(this.loc.x, this.loc.y, this.width, this.height);
    ctx.fillStyle = this.clr;
    ctx.strokeStyle = this.clr;
    ctx.fill();
    ctx.stroke();
    ctx.drawImage(platform, this.loc.x, this.loc.y, this.width, this.height * 5);
}

Platform.prototype.run = function () {
    //this.checkCollisions();
    this.render();
}
