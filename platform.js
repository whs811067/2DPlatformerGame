function Platform(x, y, w, h, ctx, type, length) {
    this.ctx = ctx;
    this.loc = new JSVector(x, y);
    this.width = w;
    this.height = h;
    this.type = type;
    this.length = length;
    this.hostiles = [];
    if (!this.type) {
        this.generateHostiles(Math.round(randomNumber(0, 2)));
    }
}

Platform.prototype.render = function () {
    if (!this.type) {
        let ctx = this.ctx;
        ctx.translate(30, -10);
        ctx.drawImage(platform, this.loc.x, this.loc.y);
        ctx.translate(-30, 10);
    }
}

Platform.prototype.run = function () {
    this.render();
    for (let i = 0; i < this.hostiles.length; i++) {
        this.hostiles[i].run();
    }
}

Platform.prototype.generateHostiles = function (n) {
    for (let i = 0; i < n; i++) {
        let x = Math.round(randomNumber(this.loc.x, this.loc.x + this.width));
        this.hostiles.push(new Hostile(x, this.loc.y, this.ctx, goblinAnims, this.loc, this.width));
    }
}