require(['js/config'], function () {
    require(['processing', 'pvector'], function (Processing, PVector) {

        var p, ctx;

        function setup() {
            p = new Processing(document.getElementById('canvas'));
            p.size(600, 500);
            p.background("white");
            ctx = p.ctx;
            ctx.translate(p.width / 2, p.height / 2);
        }

        function draw() {
            ctx.translate(-p.width / 2, -p.height / 2);
            p.background(255);
            ctx.translate(p.width / 2, p.height / 2);
            var mouse = new PVector(p.mouseX, p.mouseY);
            var center = new PVector(p.width / 2, p.height / 2);
            mouse.sub(center);
            mouse.mult(0.5);
            p.line(0, 0, mouse.x, mouse.y);
        }

            setup();
            setInterval(draw, 15);
    });
});
