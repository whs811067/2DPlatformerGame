class Game{
    constructor(){
      this.cnv = canvas;
      this.ctx = this.cnv.getContext('2d');
      this.gamePaused = false;
      this.ga = new GameArea();
      this.dims = {
        top: -1000,
        left: 0,
        bottom: 0,
        right: 5000,
        width: 5000,
        height: 1000
      }
      this.cnvLoc = new JSVector(0, 0);
    }


    update = function(){
      this.ctx.clearReact(0, 0, this.cnv.width, this.cnv.height);
      this.ctx.save();
      this.ctx.translate(-this.cnvLoc.x, -this.cnvLoc.y);
      let ctx = this.ctx;

    }


}//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  end Ball constructor
