

(function (processing){
    var ctx, p;

    var mouseX = 0, mouseY = 0;
    $(document).mousemove(function(event) {
        mouseX = event.pageX;
        mouseY = event.pageY;
    });

    function setup() {
        p = new processing.Processing("canvas");
        p.size(600, 500);
        p.background(255);
        ctx = p.ctx;
        ctx.translate(p.width/2, p.height/2);
    }

    function draw() {
        //Draw a line to represent the vector.
        ctx.translate(-p.width/2, -p.height/2);
        p.background(255);
        ctx.translate(p.width/2, p.height/2);

        var mouse = new PVector(mouseX,mouseY);         //Two PVectors, one for the mouse location
        var center = new PVector(p.width/2, p.height/2);     // and one for the center of the window

        mouse.sub(center);          // PVector subtraction!



        ctx.moveTo(0,0);
        ctx.lineTo(mouse.x,mouse.y);
        ctx.fill();
        ctx.stroke();
    }

    document.addEventListener('DOMContentLoaded', function () {
        setup();
        setInterval(draw, 15);
    });
})(window.processing = window.processing || {})