

(function(processing){

    var p, ctx;

//    var mouseX = 0, mouseY = 0;
//    $(document).mousemove(function(event) {
//        mouseX = event.pageX;
//        mouseY = event.pageY;
//    });

    function setup() {
        p = new processing.Processing("canvas");
        p.size(600, 500);
        p.background(255);
        ctx = p.ctx;
        ctx.translate(p.width/2, p.height/2);
    }
    function draw() {
        ctx.translate(-p.width/2, -p.height/2);
        p.background(255);
        ctx.translate(p.width/2, p.height/2);
        var mouse = new PVector(p.mouseX, p.mouseY);
        var center = new PVector(p.width/2, p.height/2);
        mouse.sub(center);
        mouse.mult(0.5);
        p.line(0,0,mouse.x,mouse.y);
    }

    document.addEventListener('DOMContentLoaded', function () {
        setup();
        setInterval(draw, 15);
    });
})(window.processing = window.processing || {})