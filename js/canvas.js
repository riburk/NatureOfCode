/**
 * Created by richardburkhardt on 8/20/14.
 */

(function(p) {

    p.mouseX = 0;
    p.mouseY = 0;
    $(document).mousemove(function(event) {
        p.mouseX = event.pageX;
        p.mouseY = event.pageY;
    });


    p.size = function (x, y) {
        p.width = x;
        p.height = y;
        p.canvas.style.width = x + "px";
        p.canvas.style.height = y + "px";
    };

    p.background = function (color) {
        p.ctx.beginPath();
        p.ctx.rect(.5,.5, this.width -1, this.height -1);
        p.ctx.closePath();
        p.ctx.strokeStyle = "black";
        p.ctx.lineWidth = 1;
        p.ctx.stroke();
        p.ctx.fillStyle = color;
        p.ctx.fill();
    };

    p.line = function(startX, startY, endX, endY){
        p.ctx.moveTo(startX, startY);
        p.ctx.lineTo(endX, endY);
        p.ctx.stroke();
    };

    this.init = function(){
        p.canvas = document.getElementById("canvas");
        p.ctx = p.canvas.getContext("2d");
    };

    this.animate = function() {
        //if ( run )
        requestAnimFrame( animate );
        step();
    };

    this.step = function(){
        p.world.Step(1/60, 3, 2);
        p.draw();
    };

    document.addEventListener("DOMContentLoaded", function(){
        init();
        p.setup();
        //setInterval(p.draw, 15);
        animate();
    });

})(Window.processing = Window.processing || {});

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();