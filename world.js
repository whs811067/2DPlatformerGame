function World() {
    this.cnv = document.getElementById('cnv');
    this.ctx = this.cnv.getContext('2d');
    this.dims = {
        top: -400,
        left: 0,
        bottom: 0,
        right: 3000,
        height: 400,
        width: 3000
    }
    //platforms and ground stuff
    this.groundThickness = 10;

    this.platforms = [];

    this.loadPlatforms(20);
    this.cnvLoc = new JSVector(0, -400);
    this.player = new Player(50, -300, this.ctx, playerAnims);
    this.levelSpeed = 0.2;
    this.playerDisplacement = 225;
    this.lerpDestination = this.player.loc.x - this.playerDisplacement;
    this.cameraStiffness = 0.01;

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

    this.heartSizeMultiplier = 2;;
}


World.prototype.run = function () {
    this.tick++;
    this.backgroundMusic.play();
    this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);
    this.ctx.save();
    this.ctx.translate(-this.cnvLoc.x, -this.cnvLoc.y);
    let ctx = this.ctx;

    //parallax

    for (let index = -1; index < 5; index++) {
        ctx.drawImage(background3, this.bg3.x + (this.cnv.width * index), this.bg3.y, this.cnv.width, this.cnv.height);
    }

    for (let index = -1; index < 5; index++) {
        ctx.drawImage(background2, this.bg2.x + (this.cnv.width * index), this.bg2.y, this.cnv.width, this.cnv.height);
    }

    for (let index = -1; index < 5; index++) {
        ctx.drawImage(background1, this.bg1.x + (this.cnv.width * index), this.bg1.y, this.cnv.width, this.cnv.height);
    }




    //borders
    // ctx.beginPath();
    // ctx.moveTo(0, this.dims.top);
    // ctx.lineTo(0, this.dims.bottom);
    // ctx.closePath();
    // ctx.lineWidth = 5;
    // ctx.strokeStyle = "red";
    // ctx.stroke();

    // ctx.beginPath();
    // ctx.moveTo(this.dims.left, 0);
    // ctx.lineTo(this.dims.right, 0);
    // ctx.closePath();
    // ctx.lineWidth = 5;
    // ctx.strokeStyle = "red";
    // ctx.stroke();

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
    this.player.run();
    for (let i = 0; i < this.platforms.length; i++) {
        this.platforms[i].run();
    }

    this.bg2.x = lerp(this.bg2.x, (this.player.loc.x / 2) - this.playerDisplacement, this.cameraStiffness);
    this.bg3.x = lerp(this.bg3.x, (this.player.loc.x / 1.5) - this.playerDisplacement, this.cameraStiffness);

    ctx.drawImage(darkness, (this.player.loc.x - darkness.width / 2) + 40, this.player.loc.y - darkness.height / 2);
    //KEEP THIS LINE AT THE BOTTOM
    ctx.restore();
    let healthBarLength = (this.player.health / 100);
    if (healthBarLength <= 0) {
        healthBarLength = 0;
    }
    ctx.drawImage(heartBack, 40, 30, heartBack.width * this.heartSizeMultiplier, heartBack.height * this.heartSizeMultiplier);
    ctx.translate(14 * this.heartSizeMultiplier, 0);
    ctx.drawImage(heartFore, 40, 30, heartFore.width * this.heartSizeMultiplier * healthBarLength, heartFore.height * this.heartSizeMultiplier);
    ctx.translate(-14 * this.heartSizeMultiplier, 0);

    if (this.player.health <= 0) {
        ctx.drawImage(gameOverScreen, 0, 0, this.cnv.width, this.cnv.height);
    }


}

World.prototype.loadPlatforms = function (n) {
    for (let i = 0; i < n; i++) {
        if (i == 0) {
            this.platforms[i] = new Platform(60, this.dims.top / 2, 100, this.groundThickness, this.ctx, false);
        } else {
            if (this.platforms[i - 1].length != 1) {
                let length = randomNumber(0, 1);
                length = Math.round(length);
                let min = 120;
                let max = 200;
                let x = randomNumber(min, max);
                let y = randomNumber((max - x) / 2, -(max - x) / 2);

                this.platforms[i] = new Platform(this.platforms[i - 1].loc.x + x, this.platforms[i - 1].loc.y - y, 100, this.groundThickness, this.ctx, false, length);
            } else {
                let length = randomNumber(0, 1);
                length = Math.round(length);
                this.platforms[i] = new Platform(this.platforms[i - 1].loc.x + this.platforms[i - 1].width, this.platforms[i - 1].loc.y, 100, this.groundThickness, this.ctx, false, length);
            }
        }
    }
    this.platforms.push(new Platform(0, -this.groundThickness, this.dims.width, 30, this.ctx, true));
}

World.prototype.previewLevel = function () {
    this.isPreviewing = true;
    this.previewForward = true;
}
