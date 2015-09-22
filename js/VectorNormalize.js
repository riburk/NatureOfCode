

(function (p){
    p.setup = function(){
        var ctx = p.ctx;
        p.size(600,500);
        ctx.translate(p.width/2, p.height/2);
    };


    p.draw = function() {
        var ctx = p.ctx;
        ctx.translate(-p.width/2, -p.height/2);
        p.background("white");
        var mouse = new PVector(p.mouseX, p.mouseY);
        var center = new PVector(p.width/2, p.height/2);
        mouse.sub(center);

        mouse.normalize();

        mouse.mult(50);
        ctx.translate(p.width/2, p.height/2);
        p.line(0,0,mouse.x,mouse.y);
    };


})(window.processing = window.processing || {})