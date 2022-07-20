var __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), Jigsaw;
(function(n) {
    var f = function() {
        function n(n, t) {
            this.x = n;
            this.y = t
        }
        return n.prototype.translate = function(n, t) {
            return n != null && (this.x += n),
            t != null && (this.y += t),
            this
        }
        ,
        n.prototype.translateN = function(t, i) {
            var r = new n(this.x,this.y);
            return r.translate(t, i)
        }
        ,
        n.prototype.flip = function(n, t) {
            return n != null && (this.x = n + (n - this.x)),
            t != null && (this.y = t + (t - this.y)),
            this
        }
        ,
        n.prototype.flipN = function(t, i) {
            var r = new n(this.x,this.y);
            return r.flip(t, i)
        }
        ,
        n
    }(), t, r, u, i;
    (function(n) {
        n[n.Top = 0] = "Top";
        n[n.Bottom = 1] = "Bottom";
        n[n.Left = 2] = "Left";
        n[n.Right = 3] = "Right";
        n[n.None = 4] = "None"
    }
    )(t || (t = {}));
    r = function() {
        function n(n, t, r, u, f, e, o) {
            this.buffer = .2;
            this.linkedPieces = [];
            this.canvasMarginX = 0;
            this.canvasMarginY = 0;
            this.isdocked = !1;
            this.parent = n;
            this.image = u;
            this.srcWidth = u.width / o * (1 + 2 * this.buffer);
            this.srcHeight = u.height / o * (1 + 2 * this.buffer);
            this.srcOffsetX = u.width / o * f - u.width / o * this.buffer;
            this.srcOffsetY = u.height / o * e - u.height / o * this.buffer;
            this.width = t;
            this.height = r;
            this.i = f;
            this.j = e;
            this.dimension = o;
            this.te = Math.floor(Math.random() * 2) > 0 ? 1 : -1;
            this.re = Math.floor(Math.random() * 2) > 0 ? 1 : -1;
            this.be = Math.floor(Math.random() * 2) > 0 ? 1 : -1;
            this.le = Math.floor(Math.random() * 2) > 0 ? 1 : -1;
            this.canvasMarginX = (this.parent.parent().width() - this.parent.width()) / 2;
            this.canvasMarginY = (this.parent.parent().height() - this.parent.height()) / 2;
            this.x0 = -this.canvasMarginX + i;
            this.y0 = -this.canvasMarginY;
            this.xn = n.width() + -this.x0 - this.width;
            this.yn = n.height() + -this.y0 - this.height
        }
        return n.prototype.initialize = function() {
            this.canvas = $("<canvas/>")[0];
            this.div = $("<div/>").addClass("canvas-container").append(this.canvas).height(this.height).width(this.width);
            this.canvas.height = this.srcHeight;
            this.canvas.width = this.srcWidth;
            this.divContainer = $("<div/>").addClass("div-container").data("i", this.i).data("j", this.j).height(this.height).width(this.width).append(this.div);
            $(this.canvas).css({
                top: -(this.buffer * this.height),
                left: -(this.buffer * this.width),
                height: (1 + 2 * this.buffer) * this.height,
                width: (1 + 2 * this.buffer) * this.width
            });
            this.left(this.i * this.width);
            this.top(this.j * this.height);
            this.drawInternal();
            this.parent.append(this.divContainer)
        }
        ,
        n.prototype.drawInternal = function() {
            this.setContext();
            this.drawClip();
            var n = 0
              , t = 0;
            this.srcOffsetX < 0 && (n = Math.abs(this.srcOffsetX),
            this.srcOffsetX = 0);
            this.srcOffsetY < 0 && (t = Math.abs(this.srcOffsetY),
            this.srcOffsetY = 0);
            this.ctx.drawImage(this.image, this.srcOffsetX, this.srcOffsetY, Math.min(this.srcOffsetX + this.srcWidth - n, this.image.width) - this.srcOffsetX, Math.min(this.srcOffsetY + this.srcHeight - t, this.image.height) - this.srcOffsetY, n, t, Math.min(this.srcOffsetX + this.srcWidth - n, this.image.width) - this.srcOffsetX, Math.min(this.srcOffsetY + this.srcHeight - t, this.image.height) - this.srcOffsetY);
            this.move()
        }
        ,
        n.prototype.drawClip = function() {
            var i = this.image.width / this.dimension
              , r = this.image.height / this.dimension
              , n = i * this.buffer
              , t = r * this.buffer
              , f = i / 3
              , e = r / 3
              , u = Math.min(i, r) * this.buffer;
            this.ctx.beginPath();
            this.ctx.moveTo(n, t);
            this.drawCurve(n, t, f, 0, u, this.te);
            n += i;
            this.drawCurve(n, t, 0, e, u, this.re);
            t += r;
            this.drawCurve(n, t, -f, 0, u, this.be);
            n -= i;
            this.drawCurve(n, t, 0, -e, u, this.le);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.clip()
        }
        ,
        n.prototype.setContext = function() {
            this.ctx = this.canvas.getContext("2d");
            this.ctx.fillStyle = "white";
            this.ctx.font = "5em Arial";
            this.ctx.strokeStyle = "black";
            this.ctx.shadowBlur = 12
        }
        ,
        n.prototype.drawCurve = function(n, t, i, r, u, e) {
            (i < 0 || r < 0) && (u = -u);
            var a = new f(n,t)
              , o = a.translateN(i, r)
              , s = o.translateN(i, r)
              , l = s.translateN(i, r);
            if (r == 0)
                var h = o.translateN(u, u)
                  , v = o.translateN(-u, -u)
                  , y = s.translateN(u, -u)
                  , c = s.translateN(-u, u);
            else
                var h = o.translateN(-u, u)
                  , v = o.translateN(u, -u)
                  , y = s.translateN(u, u)
                  , c = s.translateN(-u, -u);
            e < 0 && (h.flip(i == 0 ? n : null, r == 0 ? t : null),
            v.flip(i == 0 ? n : null, r == 0 ? t : null),
            y.flip(i == 0 ? n : null, r == 0 ? t : null),
            c.flip(i == 0 ? n : null, r == 0 ? t : null));
            e != 0 ? (this.ctx.lineTo(a.x, a.y),
            this.ctx.bezierCurveTo(h.x, h.y, h.x, h.y, o.x, o.y),
            this.ctx.bezierCurveTo(v.x, v.y, y.x, y.y, s.x, s.y),
            this.ctx.bezierCurveTo(c.x, c.y, c.x, c.y, l.x, l.y)) : this.ctx.lineTo(l.x, l.y)
        }
        ,
        n.prototype.randomize = function() {
            return this.move(),
            sb_st(this.randomizeInternal.bind(this), 1e3),
            this
        }
        ,
        n.prototype.randomizeInternal = function() {
            var i = Math.round(this.getRandom(this.x0, this.xn))
              , r = Math.round(this.getRandom(this.y0, this.yn))
              , n = i % 2 == 0
              , t = r % 2 == 0;
            n || t ? !n && t ? (this.left(i),
            this.top(this.y0)) : n && t ? (this.left(this.xn),
            this.top(r)) : n && !t && (this.left(i),
            this.top(this.yn)) : (this.left(this.x0),
            this.top(r));
            this.move(!0)
        }
        ,
        n.prototype.getRandom = function(n, t) {
            return Math.random() * (t - n) + n
        }
        ,
        n.prototype.top = function(n) {
            return n != null ? (this.linkedPieces.length == 0 && (n = Shared.clipValue(n, this.y0, this.yn)),
            this._top = n,
            this._bottom = n + this.height,
            this) : this._top
        }
        ,
        n.prototype.ddd = function(n) {
            return n != null ? (this.linkedPieces.length == 0 && (n = Shared.clipValue(n, this.x0, this.xn)),
            this._left = n,
            this._right = n + this.width,
            this) : this._left
        }
        ,
        n.prototype.bottom = function(n) {
            return n != null ? (this.linkedPieces.length == 0 && (n = Shared.clipValue(n, this.y0, this.yn)),
            this._bottom = n,
            this._top = n - this.height,
            this) : this.top() + this.height
        }
        ,
        n.prototype.right = function(n) {
            return n != null ? (this.linkedPieces.length == 0 && (n = Shared.clipValue(n, this.x0, this.xn)),
            this._right = n,
            this._left = n - this.width,
            this) : this.left() + this.width
        }
        ,
        n.prototype.move = function(n) {
            n === void 0 && (n = !1);
            this.inRange(this._left, -this.width / 2, this.parent.width() - this.width / 2) && this.inRange(this._top, -this.height / 2, this.parent.height() - this.height / 2) ? this.divContainer.removeClass("shrink") : this.linkedPieces.length == 0 && this.divContainer.addClass("shrink");
            n ? this.divContainer.animate({
                top: this._top + "px",
                left: this._left + "px"
            }, 500) : this.divContainer.css({
                top: this._top + "px",
                left: this._left + "px"
            })
        }
        ,
        n.prototype.inRange = function(n, t, i) {
            return n >= t && n <= i ? !0 : !1
        }
        ,
        n.prototype.movedelta = function(n, t, i, r) {
            var u, f;
            if (i === void 0 && (i = !0),
            r === void 0 && (r = !1),
            (n != 0 || t != 0) && (this.isdocked ? this.top(0) : this.top(this._top + t),
            this.left(this._left + n),
            this.move(r),
            i))
                for (u = 0; u < this.linkedPieces.length; ++u)
                    f = this.linkedPieces[u],
                    f.movedelta(n, t, !1, r)
        }
        ,
        n.prototype.link = function(n) {
            var i, t;
            if (!this.divContainer.hasClass("shrink") && !n.divContainer.hasClass("shrink")) {
                for (i = this.addLinkedPieces(n),
                t = 0; t < this.linkedPieces.length; ++t)
                    this.linkedPieces[t].addLinkedPieces(this);
                i && Soundv2.play("lockin", !1)
            }
        }
        ,
        n.prototype.addLinkedPieces = function(n) {
            var r = !1, t, i;
            for (this != n && this.linkedPieces.indexOf(n) == -1 && (this.linkedPieces.push(n),
            r = !0),
            t = 0; t < n.linkedPieces.length; ++t)
                i = n.linkedPieces[t],
                i != this && this.linkedPieces.indexOf(i) == -1 && this.linkedPieces.push(i);
            return r
        }
        ,
        n.prototype.attachedCount = function() {
            return this.linkedPieces.length
        }
        ,
        n.prototype.movestart = function() {
            var t = zindex + 1, n;
            for (this.divContainer.css("z-index", t),
            n = 0; n < this.linkedPieces.length; ++n)
                this.linkedPieces[n].divContainer.css("z-index", t)
        }
        ,
        n.prototype.moveend = function() {
            this.divContainer.css("z-index", ++zindex)
        }
        ,
        n.prototype.moveInPlace = function() {
            this.top(this.height * this.j + 20);
            this.left(this.width * this.i + 20);
            this.divContainer.removeClass("shrink");
            this.move(!0)
        }
        ,
        n
    }();
    u = function(n) {
        function u() {
            var t = n.call(this) || this;
            return t.pieces = [],
            t.dimension = 5,
            t.THRESHOLD = 30,
            t.dragging = !1,
            t.dockedPieces = {
                0: [],
                1: [],
                2: [],
                3: [],
                4: []
            },
            t.frameRatio = .65,
            t.dockedPiecesCountMap = isMobile ? {
                4: [5, 5, 3, 3],
                5: [8, 8, 4, 5],
                6: [10, 10, 8, 8]
            } : {
                4: [5, 5, 3, 3],
                5: [8, 8, 4, 5],
                6: [11, 11, 7, 7]
            },
            t
        }
        return __extends(u, n),
        u.prototype.initialize = function() {
            Selectorv2.init("jigsaw", this.setupComplete.bind(this))
        }
        ,
        u.prototype.finalize = function() {
            var n, t;
            Soundv2.pause("jigsaw_background");
            Soundv2.play("complete", !1);
            $(".div-container").css("z-index", 1);
            $(_w).off();
            $(this.game).off();
            n = this.pieces[0][0];
            n.movedelta(-n.left(), -n.top(), !0, !0);
            sb_st(this.expandAndGleam.bind(this), 200);
            Timer.pause();
            t = this.level == Shared.Level.Hard ? "gold" : this.level == Shared.Level.Medium ? "silver" : "bronze";
            Summaryv2.init("You finished in " + Summaryv2.toAnalogTimeString(_ge("timer").innerText), t, this.img.src, "Jigsaw", "jigsaw")
        }
        ,
        u.prototype.setupComplete = function(n) {
            Soundv2.play("start", !1);
            Soundv2.play("jigsaw_background", !0);
            Timer.init();
            n.level == "easy" ? (this.level = Shared.Level.Easy,
            this.dimension = 4) : n.level == "medium" ? (this.level = Shared.Level.Medium,
            this.dimension = 5) : n.level == "hard" && (this.level = Shared.Level.Hard,
            this.dimension = 6);
            this.img = new Image;
            this.img.src = n.image;
            this.img.onload = this.onImageLoad.bind(this)
        }
        ,
        u.prototype.expandAndGleam = function() {
            $(this.img).addClass("gleam").show()
        }
        ,
        u.prototype.onImageLoad = function() {
            var n, t;
            for (this.height = this.game.height() * this.frameRatio,
            this.width = this.game.width() * this.frameRatio,
            this.frame = $("<div/>").addClass("frame"),
            this.game.append(this.frame),
            this.game.append(this.frame),
            n = 0; n < this.dimension; ++n)
                for (this.pieces[n] = [],
                t = 0; t < this.dimension; ++t)
                    this.pieces[n][t] = new r(this.frame,this.width / this.dimension,this.height / this.dimension,this.img,n,t,this.dimension),
                    this.setEdges(this.pieces[n][t], n, t),
                    this.pieces[n][t].initialize();
            this.frameWidth = this.frame.width();
            this.frameHeight = this.frame.height();
            this.shuffle();
            this.frame.append($(this.img).hide().addClass("org-img"));
            sb_st(this.addHandlers.bind(this), 1500)
        }
        ,
        u.prototype.setEdges = function(n, t, i) {
            n.te = i == 0 ? 0 : -this.pieces[t][i - 1].be;
            n.le = t == 0 ? 0 : -this.pieces[t - 1][i].re;
            i == this.dimension - 1 && (n.be = 0);
            t == this.dimension - 1 && (n.re = 0)
        }
        ,
        u.prototype.shuffle = function() {
            for (var i, t = [], n = 0; n < this.dimension; ++n)
                for (i = 0; i < this.dimension; ++i)
                    t.push(this.pieces[n][i]);
            for (t = this.shuffleArray(t),
            n = 0; n < t.length; ++n)
                this.dock(t[n]);
            sb_st(this.evenlyArrange.bind(this), 1e3)
        }
        ,
        u.prototype.dock = function(n) {
            var r, i = this.dockedPiecesCountMap[this.dimension];
            r = this.dockedPieces[t.Top].length < i[t.Top] ? this.dockedPieces[t.Top] : this.dockedPieces[t.Bottom].length < i[t.Bottom] ? this.dockedPieces[t.Bottom] : this.dockedPieces[t.Left].length < i[t.Left] ? this.dockedPieces[t.Left] : this.dockedPieces[t.Right].length < i[t.Right] ? this.dockedPieces[t.Right] : this.dockedPieces[t.None];
            r.push(n)
        }
        ,
        u.prototype.evenlyArrange = function() {
            var r, f = 0, u, e, n;
            for (r = this.dockedPieces[t.Top],
            f = (this.game.width() - 2 * i) / r.length,
            n = 0; n < r.length; ++n)
                u = r[n],
                e = (f - u.width) / 2,
                u.top(u.y0).left(u.x0 + e + n * f).move(!0);
            for (r = this.dockedPieces[t.Bottom],
            f = (this.game.width() - 2 * i) / r.length,
            n = 0; n < r.length; ++n)
                u = r[n],
                e = (f - u.width) / 2,
                u.top(u.yn).left(u.x0 + e + n * f).move(!0);
            for (r = this.dockedPieces[t.Left],
            f = this.frameHeight / r.length,
            n = 0; n < r.length; ++n)
                u = r[n],
                e = (f - u.height) / 2,
                u.top(e + n * (this.frameHeight / r.length)).left(u.x0).move(!0);
            for (r = this.dockedPieces[t.Right],
            f = this.frameHeight / r.length,
            n = 0; n < r.length; ++n)
                u = r[n],
                e = (f - u.height) / 2,
                u.top(e + n * (this.frameHeight / r.length)).left(u.xn).move(!0);
            for (r = this.dockedPieces[t.None],
            n = 0; n < r.length; ++n)
                r[n].randomize()
        }
        ,
        u.prototype.onDragEnd = function(n) {
            this.checkAdjacent(n);
            _w.setTimeout(function() {
                for (var t = 0; t < n.linkedPieces.length; ++t)
                    this.checkAdjacent(n.linkedPieces[t]);
                this.checkComplete(n)
            }
            .bind(this), 1)
        }
        ,
        u.prototype.checkAdjacent = function(n) {
            var i = n.i
              , r = n.j;
            if (i - 1 >= 0) {
                var t = this.pieces[i - 1][r]
                  , u = t.right() - n.left()
                  , f = t.top() - n.top();
                this.movePiece(u, f, t, n)
            }
            if (i + 1 < this.dimension) {
                var t = this.pieces[i + 1][r]
                  , u = t.left() - n.right()
                  , f = t.top() - n.top();
                this.movePiece(u, f, t, n)
            }
            if (r - 1 >= 0) {
                var t = this.pieces[i][r - 1]
                  , u = t.right() - n.right()
                  , f = t.bottom() - n.top();
                this.movePiece(u, f, t, n)
            }
            if (r + 1 < this.dimension) {
                var t = this.pieces[i][r + 1]
                  , u = t.left() - n.left()
                  , f = t.top() - n.bottom();
                this.movePiece(u, f, t, n)
            }
        }
        ,
        u.prototype.movePiece = function(n, t, i, r) {
            r === void 0 && (r = this.currentPiece);
            Math.abs(n) <= this.THRESHOLD && Math.abs(t) <= this.THRESHOLD && r != null && !r.isdocked && (r.movedelta(n, t),
            r.link(i))
        }
        ,
        u.prototype.addHandlers = function() {
            $(_w).on("mousemove touchmove", null, this.handleMouseMove.bind(this));
            $(this.game).on("mousedown touchstart", null, this.handleMouseDown.bind(this));
            $(this.game).on("mouseup mouseleave touchend touchleave", null, this.handleMouseUp.bind(this));
            this.game.parent().find("#hint-icon").show().click(null, this.handleHintClick.bind(this))
        }
        ,
        u.prototype.checkComplete = function(n) {
            n.attachedCount() >= this.dimension * this.dimension - 1 && this.finalize()
        }
        ,
        u.prototype.solve = function() {
            for (var t, i, n = 0; n < this.dimension; ++n)
                for (t = 0; t < this.dimension; ++t)
                    i = this.pieces[n][t],
                    i.moveInPlace()
        }
        ,
        u.prototype.handleHintClick = function() {
            $(this.img).fadeIn();
            _w.setTimeout(function() {
                $(this.img).fadeOut()
            }
            .bind(this), 1e3)
        }
        ,
        u.prototype.handleMouseMove = function(n) {
            if (n.preventDefault(),
            this.dragging && this.currentPiece != null) {
                var t = n.pageX
                  , i = n.pageY;
                n.touches != null && n.touches.length > 0 && (t = n.touches[0].pageX,
                i = n.touches[0].pageY);
                this.currentPiece.movedelta(t - this.startX, i - this.startY);
                this.startX = t;
                this.startY = i
            }
            return !1
        }
        ,
        u.prototype.handleMouseDown = function(n) {
            var t, i, r, u;
            return n.preventDefault(),
            t = $(n.target).hasClass("canvas-container") ? $(n.target) : $(n.target).parents(".canvas-container"),
            t != null && t.hasClass("canvas-container") && (n.preventDefault(),
            i = n.pageX,
            r = n.pageY,
            n.touches != null && n.touches.length > 0 && (i = n.touches[0].pageX,
            r = n.touches[0].pageY),
            u = t.parent(),
            this.dragging = !0,
            this.startX = i,
            this.startY = r,
            this.currentPiece = this.pieces[u.data("i")][u.data("j")],
            this.currentPiece.movestart()),
            !1
        }
        ,
        u.prototype.handleMouseUp = function(n) {
            if (n.preventDefault(),
            this.currentPiece != null) {
                this.onDragEnd(this.currentPiece);
                this.currentPiece.moveend()
            }
            return this.dragging = !1,
            this.startX = 0,
            this.startY = 0,
            this.currentPiece = null,
            !1
        }
        ,
        u
    }(Shared.Game);
    zindex = 3;
    n.jigsaw = new u;
    n.jigsaw.initialize();
    i = isMobile && !pageConfig.IsOpal && !pageConfig.IsSapphire ? 23 : 0
}
)(Jigsaw || (Jigsaw = {}))
