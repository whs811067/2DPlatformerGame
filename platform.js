function Platform(x, y, w, h, clr, ctx) {
    this.ctx = ctx;
    this.loc = new JSVector(x, y);
    this.width = w;
    this.height = h;
    this.clr = clr;
}

Platform.prototype.checkCollisions = function () {

}

Platform.prototype.render = function () {
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.rect(this.loc.x, this.loc.y, this.width, this.height);
    ctx.fillStyle = this.clr;
    ctx.strokeStyle = this.clr;
    ctx.fill();
    ctx.stroke();
}

Platform.prototype.run = function () {
    this.checkCollisions();
    this.render();
}
