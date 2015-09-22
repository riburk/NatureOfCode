

(function (processing){
    var ctx, p;

    function setup() {
        p = new processing.Processing("canvas");
        p.size(600,500);
        ctx = p.ctx;
        p.background("white");
        ctx.translate(p.width/2, p.height/2);

    }
    function draw() {
        ctx.translate(-p.width/2, -p.height/2);
        p.background("white");
        var mouse = new PVector(p.mouseX, p.mouseY);
        var center = new PVector(p.width/2, p.height/2);
        mouse.sub(center);

        var m = mouse.mag();
        ctx.beginPath();
        ctx.rect(0,0,m,10);
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.fill();

        ctx.translate(p.width/2, p.height/2);
        p.line(0,0,mouse.x,mouse.y);
    }

    document.addEventListener('DOMContentLoaded', function(){
        setup();
        setInterval(draw, 15);
    })


})(window.processing = window.processing || {});