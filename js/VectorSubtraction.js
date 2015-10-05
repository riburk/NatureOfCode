require(['js/config'], function(){
    require(['processing', 'pvector'], function(Processing, PVector){
        var ctx, p;

        function setup() {
            p = new Processing(document.getElementById("canvas"));
            p.size(600, 500);
            p.background('white');
            ctx = p.ctx;
            ctx.translate(p.width/2, p.height/2);
        }

        function draw() {
            //Draw a line to represent the vector.
            ctx.translate(-p.width/2, -p.height/2);
            p.background(255);
            ctx.translate(p.width/2, p.height/2);

            var mouse = new PVector(p.mouseX, p.mouseY);         //Two PVectors, one for the mouse location
            var center = new PVector(p.width/2, p.height/2);     // and one for the center of the window

            mouse.sub(center);          // PVector subtraction!

            ctx.moveTo(0,0);
            ctx.lineTo(mouse.x,mouse.y);
            ctx.fill();
            ctx.stroke();
        }

        setup();
        setInterval(draw, 15);
    });
});
