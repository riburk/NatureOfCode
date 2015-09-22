

requirejs.config({
    baseUrl: 'js',
    paths: {jquery: 'vendor/jquery-1.10.2.min'}
});

requirejs(["pvector", "mover"], function(PVector, Mover) {

    var movers = [];
    var numMovers = 20;
    var p;
    p.height = 600;
    p.width = 600;

    setup = function() {
        //p.size(600,500);
        //p.background("white");

        for(var i = 0; i < numMovers; i++) {
            var m = new Mover(new PVector(Math.random()* p.width, Math.random()* p.height),
                new PVector(0,0),
                new PVector(0,0),
                4,
                function(m){update(m)});
            movers.push(m);
        }
    };

    draw = function() {
        //p.background("white");

        for(var i = 0; i < numMovers; i++) {
            movers[i].update(movers[i]);
            movers[i].checkEdges();
            movers[i].display();
        }
    };

    function update(mover) {
        //var mouse = new PVector(p.mouseX, p.mouseY);
        var dir = PVector.sub(mousePos, mover.location);
        dir.normalize();
        dir.mult(0.5);
        mover.acceleration = dir;

        mover.velocity.add(mover.acceleration);
        mover.velocity.limit(mover.topspeed);
        mover.location.add(mover.velocity);
    }

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        writeMessage(canvas, message);
    }, false);

    setup();
    setInterval(draw(), 15);

});
