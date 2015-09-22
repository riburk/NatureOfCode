
(function(processing) {


    var loc = new PVector(100, 100);
    var velocity = new PVector(2, 3.3);


    var canvas,ctx, p;

//[full] Remember how Processing works?  setup() is executed once when the sketch starts and draw() loops forever and ever (until you quit).
    function setup() {
        p = new processing.Processing("canvas");
        p.size(600, 500);
        p.background(255);
        canvas = p.canvas;
        ctx = p.ctx;
    }

//[end]

    function draw() {
        p.background(255);

        // Move the ball according to its speed.
        loc.add(velocity);
        //

        // Check for bouncing.
        if ((loc.x > p.width) || (loc.x < 0)) {
            velocity.x = velocity.x * -1;
        }
        if ((loc.y > p.height) || (loc.y < 0)) {
            velocity.y = velocity.y * -1;
        }
        //[end]

        // Display the ball at the location (x,y).
        //ctx.ellipse(x,y,16,16);
        ctx.beginPath();
        ctx.arc(loc.x, loc.y, 16, 0, Math.PI * 2, true);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.stroke();
    }
    document.addEventListener('DOMContentLoaded', function () {
        setup();
        setInterval(draw, 15);
    });

})(window.processing = window.processing || {});