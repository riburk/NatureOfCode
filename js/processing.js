define(['jquery', 'pvector'], function ($, PVector) {
    return function (canvas) {
        //this.p = {};
        //var p = this.p;
        this.mouseX = 0;
        this.mouseY = 0;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        var self = this;

        $(document).mousemove(function (event) {
            self.mouseX = event.pageX;
            self.mouseY = event.pageY;
        });


        this.size = function (x, y) {
            this.width = x;
            this.height = y;
            this.canvas.style.width = x + "px";
            this.canvas.style.height = y + "px";
        };

        this.background = function (color) {
            this.ctx.beginPath();
            this.ctx.rect(.5, .5, this.width - 1, this.height - 1);
            this.ctx.closePath();
            this.ctx.strokeStyle = "black";
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
            this.ctx.fillStyle = color;
            this.ctx.fill();
        };

        this.line = function (startX, startY, endX, endY) {
            this.ctx.moveTo(startX, startY);
            this.ctx.lineTo(endX, endY);
            this.ctx.stroke();
        };

        //this.init = function () {
        //    this.canvas = document.getElementById("drawing");
        //    this.ctx = this.canvas.getContext("2d");
        //};

        this.animate = function () {
            //if ( run )
            requestAnimFrame(animate);
            step();
        };

        this.step = function () {
            this.world.Step(1 / 60, 3, 2);
            this.draw();
        };

        document.addEventListener("DOMContentLoaded", function () {
            init();
            this.setup();
            //setInterval(this.draw, 15);
            animate();
        });

    }
});

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();