function World() {
    this.cnv = document.getElementById('cnv');
    this.ctx = this.cnv.getContext('2d');
    this.dims = {
        top: -1000,
        left: 0,
        bottom: 0,
        right: 3000,
        height: 1000,
        width: 3000
    }
}


World.prototype.run = function () { 
    
}