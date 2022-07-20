function game() {
    //存放拼图碎片的数组
    this.pieces = [];
    this.dimension = 3;
}

//游戏设定好后（难度）
game.prototype.setupComplete = function() {
    //this.height=365.3;
    //this.width=650;
    this.frame = document.getElementById("frame");
    this.img = new Image;
    this.img.src = "goat.jpg";
    this.img.onload = this.onImageLoad.bind(this)
}

//图片加载完后生成拼图碎片
game.prototype.onImageLoad = function() {
    for (let i=0; i<this.dimension; i++) {
        this.pieces[i] = [];
        for (let j=0; j<this.dimension; j++) {
            this.pieces[i][j] = new clip(this.frame,this.width/this.dimension,this.height/this.dimension,this.img,i,j,this.dimension),
            this.setEdges(this.pieces[i][j],i,j),
            this.pieces[i][j].initialize();
        }
    }
}

//设置碎片边缘
game.prototype.setEdges = function(clip, i, j) {
    //碎片如果在第一行，那么上边缘都是平的，否则跟其上一行对应的碎片的凹凸性相反
    clip.te = (j == 0 ? 0 : -this.pieces[i][j - 1].be);
    //碎片如果在第一列，那么左边缘都是平的，否则跟其上一列对应的碎片的凹凸性相反
    clip.le = (i == 0 ? 0 : -this.pieces[i - 1][j].re);
    //最后一列的右边缘都是平的
    i == this.dimension - 1 && (clip.re = 0);
    //最后一行的下边缘都是平的
    j == this.dimension - 1 && (clip.be = 0);
}

var game = new game();
game.setupComplete();


function clip (frame, width, height, img, i, j, dimension) {
    this.buffer = 0.2;
    this.parent = frame;
    this.image = img;
    this.srcWidth = img.width / dimension * (1 + 2*this.buffer);
    this.srcHeight = img.height / dimension * (1 + 2*this.buffer);
    this.srcOffSetX = img.width / dimension * i - img.width / dimension * (this.buffer);
    this.srcOffSetY = img.height / dimension * j - img.height / dimension * (this.buffer);
    this.width = width;
    this.height = height;
    this.i = i;
    this.j = j;
    this.dimension = dimension;
    this.te = Math.floor(Math.random() * 2) > 0 ? 1 : -1;
    this.re = Math.floor(Math.random() * 2) > 0 ? 1 : -1;
    this.be = Math.floor(Math.random() * 2) > 0 ? 1 : -1;
    this.le = Math.floor(Math.random() * 2) > 0 ? 1 : -1;
}

clip.prototype.initialize = function() {
    this.canvasContainer = document.createElement("DIV");
    //this.canvasContainer.addClass("canvas-container");
    this.canvas = document.createElement("CANVAS");
    this.canvasContainer.append(this.canvas);
    this.canvas.height = this.srcHeight;
    this.canvas.width = this.srcWidth;
    //this.divContainer = $("<div/>").addClass("div-container").data("i", this.i).data("j", this.j).height(this.height).width(this.width).append(this.canvasContainer);
    // this.divContainer = document.createElement("DIVCONTAINER");
    // this.divContainer.append(this.canvasContainer);
    // this.canvas.css({
    //     top: -(this.buffer * this.height),
    //     left: -(this.buffer * this.width),
    //     height: (1 + 2 * this.buffer) * this.height,
    //     width: (1 + 2 * this.buffer) * this.width
    // });
    // this.left(this.i * this.width);
    // this.top(this.j * this.height);
    this.drawInternal();
    this.parent.append(this.canvasContainer);
}

clip.prototype.drawInternal = function() {
    this.setContext();
    this.drawClip();
    let x = 0, y = 0;
    this.srcOffsetX < 0 && (x = Math.abs(this.srcOffsetX),
        this.srcOffsetX = 0);
    this.srcOffsetY < 0 && (y = Math.abs(this.srcOffsetY),
        this.srcOffsetY = 0);
    this.ctx.drawImage(this.image, this.srcOffsetX, this.srcOffsetY, 
        Math.min(this.srcOffsetX + this.srcWidth - x, this.image.width) - this.srcOffsetX, 
        Math.min(this.srcOffsetY + this.srcHeight - y, this.image.height) - this.srcOffsetY, 
        x, y, Math.min(this.srcOffsetX + this.srcWidth - x, this.image.width) - this.srcOffsetX, 
        Math.min(this.srcOffsetY + this.srcHeight - y, this.image.height) - this.srcOffsetY);
    this.ctx.drawImage(this.image,x,y);
}

clip.prototype.drawClip = function() {
    //画碎片
    let dimensionWidth = this.image.width / this.dimension;
    let dimensionHeight = this.image.height / this.dimension;
    let bufferDimensionWidth = dimensionWidth * this.buffer;
    let bufferDimensionHeight = dimensionHeight * this.buffer;
    let oneThirdDimensionWidth = dimensionWidth / 3;
    let oneThirdDimensionHeight = dimensionHeight / 3;
    let smallerOne = Math.min(dimensionHeight, dimensionWidth) * this.buffer;
    this.ctx.beginPath();
    this.ctx.moveTo(bufferDimensionWidth,bufferDimensionHeight);
    this.drawCurve(bufferDimensionWidth,bufferDimensionHeight,oneThirdDimensionWidth,0,smallerOne,this.te);
    bufferDimensionWidth += dimensionWidth;
    this.drawCurve(bufferDimensionWidth,bufferDimensionHeight,0,oneThirdDimensionHeight,smallerOne,this.re);
    bufferDimensionHeight += dimensionHeight;
    this.drawCurve(bufferDimensionWidth,bufferDimensionHeight,-oneThirdDimensionWidth,0,smallerOne,this.be);
    bufferDimensionWidth -= dimensionWidth;
    this.drawCurve(bufferDimensionWidth,bufferDimensionHeight,0,-oneThirdDimensionHeight,smallerOne,this.le);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.clip();
}

clip.prototype.drawCurve = function(bufferDimensionWidth,bufferDimensionHeight,
    oneThirdDimensionWidth,oneThirdDimensionHeight,smallerOne,e) {
    //画曲线
    (oneThirdDimensionWidth < 0 || oneThirdDimensionHeight < 0) && (smallerOne = -smallerOne);
    
    var startPoint = new coordinate(bufferDimensionWidth,bufferDimensionHeight)
        , o = startPoint.translateN(oneThirdDimensionWidth,oneThirdDimensionHeight)
        , s = o.translateN(oneThirdDimensionWidth,oneThirdDimensionHeight)
        , endPoint = s.translateN(oneThirdDimensionWidth,oneThirdDimensionHeight);

    if(oneThirdDimensionHeight == 0) {
        var h = o.translateN(smallerOne,smallerOne)
        , v = o.translateN(-smallerOne, -smallerOne)
        , y = s.translateN(smallerOne, -smallerOne)
        , c = s.translateN(-smallerOne, smallerOne);
    } else {
        var h = o.translateN(-smallerOne,smallerOne)
        , v = o.translateN(smallerOne, -smallerOne)
        , y = s.translateN(smallerOne,smallerOne)
        , c = s.translateN(-smallerOne, -smallerOne)
    }

    e < 0 && (h.flip(oneThirdDimensionWidth == 0 ? bufferDimensionWidth : null, oneThirdDimensionHeight == 0 ?  bufferDimensionHeight : null),
    v.flip(oneThirdDimensionWidth == 0 ? bufferDimensionWidth : null, oneThirdDimensionHeight == 0 ?  bufferDimensionHeight : null),
    y.flip(oneThirdDimensionWidth == 0 ? bufferDimensionWidth : null, oneThirdDimensionHeight == 0 ?  bufferDimensionHeight : null),
    c.flip(oneThirdDimensionWidth == 0 ? bufferDimensionWidth : null, oneThirdDimensionHeight == 0 ?  bufferDimensionHeight : null));
    
    e != 0 ? (this.ctx.lineTo(startPoint.x,startPoint.y),
    this.ctx.bezierCurveTo(h.x,h.y,h.x,h.y,o.x,o.y),
    this.ctx.bezierCurveTo(v.x,v.y,y.x,y.y,s.x,s.y),
    this.ctx.bezierCurveTo(c.x,c.y,c.x,c.y,endPoint.x,endPoint.y)) : this.ctx.lineTo(endPoint.x,endPoint.y);
}

clip.prototype.setContext = function() {
    //设置context对象
    this.ctx = this.canvas.getContext("2d");
    this.ctx.fillStyle = "white";
    this.ctx.font = "5em Arial";
    this.ctx.strokeStyle = "black";
    this.shadowBlur = 12;
}

function coordinate(n,t) {
    this.x = n;
    this.y = t;
}

coordinate.prototype.translate = function(n,t) {
    return n != null && (this.x += n),
    t != null && (this.y += t),
    this
}

coordinate.prototype.translateN = function(t,i) {
    //相当于把原坐标向右平移t个单位，向下平移i个单位
    var r = new coordinate(this.x,this.y);
    return r.translate(t,i);
}

coordinate.prototype.flip = function(n,t) {
    return n != null && (this.x = n + (n - this.x)),
    t != null && (this.y = t + (t - this.y)),
    this
}

coordinate.prototype.flipN = function(t,i) {
    var r = new coordinate(this.x,this.y);
    return r.flip(t,i);
}

