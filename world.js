function World() {
    this.cnv = document.getElementById('cnv');
    this.ctx = this.cnv.getContext('2d');
    this.dims = {
        top: -400,
        left: 0,
        bottom: 0,
        right: 3000,
        height: 800,
        width: 3000
    }
    this.movers = [];
    this.loadMovers(100);
    this.cnvLoc = new JSVector(0, -400);
    this.player = new Player(50, this.dims.height/4, this.ctx);
}


World.prototype.run = function () { 
    this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);
    this.ctx.save();
    this.ctx.translate(-this.cnvLoc.x, -this.cnvLoc.y);
    let ctx = this.ctx;

    ctx.beginPath();
    ctx.moveTo(0, this.dims.top);
    ctx.lineTo(0, this.dims.bottom);
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(this.dims.left, 0);
    ctx.lineTo(this.dims.right, 0);
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
    ctx.stroke();
    
    for (let i = 0; i < this.movers.length; i++) {
        this.movers[i].run();
    }
    ctx.restore();

    this.player.run();
}

World.prototype.loadMovers = function (n) {
    for (let i = 0; i < n; i++) {
      this.movers[i] = new Mover(Math.random() * this.dims.width - 0, Math.random() * this.dims.height - this.dims.height/2, 21, getRandomColor(), this.ctx);
    }
}