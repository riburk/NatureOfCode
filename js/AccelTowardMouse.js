

requirejs.config({
    baseUrl: 'js',
    paths: {jquery: 'vendor/jquery-1.10.2.min'}
});

requirejs(["pvector", "mover", "processing"], function(PVector, Mover, Processing) {

    var movers = [];
    var numMovers = 20;
    var p = new Processing(document.getElementById('drawing'));

    function setup() {

        p.size(600,600);
        p.background("white");

        for(var i = 0; i < numMovers; i++) {
            var m = new Mover(p, new PVector(Math.random()* p.width, Math.random()* p.height),
                new PVector(0,0),
                new PVector(0,0),
                4,
                function(m){update(m)});
            movers.push(m);
        }
    }

    function draw() {
        p.background("white");

        for(var i = 0; i < numMovers; i++) {
            update(movers[i]);
            movers[i].update();
            movers[i].checkEdges();
            movers[i].display();
        }
    }

    function update(mover) {
        var mousePos = new PVector(p.mouseX, p.mouseY);
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
    //var canvas = document.getElementById('drawing');
    //var context = canvas.getContext('2d');

    //p.canvas.addEventListener('mousemove', function(evt) {
    //    var mousePos = getMousePos(p.canvas, evt);
    //    var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    //    writeMessage(canvas, message);
    //}, false);

    setup();
    setInterval(function(){draw()}, 15);

});
