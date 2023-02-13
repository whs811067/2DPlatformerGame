function World() {
    this.cnv = document.getElementById('cnv'); //canvas
    this.ctx = this.cnv.getContext('2d'); //context
    //dimensions
    this.dims = {
        top: -400,
        left: 0,
        bottom: 0,
        right: 3000,
        height: 800,
        width: 3000
    }
    //platforms and ground stuff
    this.groundThickness = 10; //ground thickness
    this.platforms = []; //platforms array
    this.loadPlatforms(1);
    this.ground = new Platform(0, -this.groundThickness, this.dims.width, 30, "Blue", this.ctx);
    this.cnvLoc = new JSVector(0, -400);
    this.player = new Player(50, -this.dims.height / 4, this.ctx, playerAnims);
    this.levelSpeed = 0.2;
    this.playerDisplacement = 225;
    this.lerpDestination = this.player.loc.x - this.playerDisplacement;
    this.cameraStiffness = 0.02;

    //preview animation stuff
    this.isPreviewing = false;
    this.previewForward = false;
    this.previewBackward = false;
    this.previewFinish = true;

    //parallax stuff
    this.bg1 = new JSVector(0, this.dims.top);
    this.bg2 = new JSVector(0, this.dims.top);
    this.bg3 = new JSVector(0, this.dims.top);

    //music
    this.backgroundMusic = new Audio("assets/scaryForest.mp3");

    //tick for world anims
    this.tickInterval = 30;
    this.tick = 0;
}


World.prototype.run = function () {
    this.tick++;
    try {
        this.backgroundMusic.play();
    }
    catch {

    }

    this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);
    this.ctx.save();
    this.ctx.translate(-this.cnvLoc.x, -this.cnvLoc.y);
    let ctx = this.ctx;

    //parallax
    ctx.drawImage(background3, this.bg3.x, this.bg3.y, this.cnv.width, this.cnv.height);
    ctx.drawImage(background3, this.bg3.x + this.cnv.width, this.bg3.y, this.cnv.width, this.cnv.height);

    ctx.drawImage(background2, this.bg2.x, this.bg2.y, this.cnv.width, this.cnv.height);
    ctx.drawImage(background2, this.bg2.x + this.cnv.width, this.bg2.y, this.cnv.width, this.cnv.height);

    ctx.drawImage(background1, this.bg1.x, this.bg1.y, this.cnv.width, this.cnv.height);
    ctx.drawImage(background1, this.bg1.x + this.cnv.width, this.bg1.y, this.cnv.width, this.cnv.height);

    //borders
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

    //this.cnvLoc.x += this.levelSpeed;
    if (this.isPreviewing) {
        if (this.previewForward) {
            this.lerpDestination = this.dims.width - this.cnv.width;
            if (this.cnvLoc.x >= this.lerpDestination - 5) {
                this.previewForward = false;
                this.previewBackward = true;
            }
        } else if (this.previewBackward) {
            this.lerpDestination = this.player.loc.x - this.playerDisplacement;
            if (this.cnvLoc.x <= this.lerpDestination + 5) {
                this.previewBackward = false;
                this.isPreviewing = false;
            }
        }
        
    } else {
        this.lerpDestination = this.player.loc.x - this.playerDisplacement;
    }
    this.cnvLoc.x = lerp(this.cnvLoc.x, this.lerpDestination, this.cameraStiffness);
    for (let i = 0; i < this.platforms.length; i++) {
        this.platforms[i].run();
    }

    this.ground.run();
    this.player.run();  

    this.bg2.x = lerp(this.bg2.x, (this.player.loc.x / 2) - this.playerDisplacement, this.cameraStiffness);
    this.bg3.x = lerp(this.bg3.x, (this.player.loc.x / 1.5) - this.playerDisplacement, this.cameraStiffness);

    //KEEP THIS LINE AT THE BOTTOM
    ctx.restore();



}

World.prototype.loadPlatforms = function (n) {
    for (let i = 0; i < n + 1; i++) {
        //this.platforms[i] = new Platform(Math.random() * this.dims.width - 0, Math.random() * this.dims.height - this.dims.height / 2, 50, this.groundThickness, getRandomColor(), this.ctx);
        this.platforms[i] = new Platform(60, -60, 50, this.groundThickness, getRandomColor(), this.ctx);
    }
}

World.prototype.previewLevel = function () {
    this.isPreviewing = true;
    this.previewForward = true;
}
