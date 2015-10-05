/*****************************
 * Project ideas
 *
 * 1. make objects 'float' and repel each other
 * 2. circles display info inside
 * 3. state machine for different displays
 * 4. load from model
 * 5. create pie slices
 * 6. rotate with mouse wheel
 * 7. make circle orbit circle
 *
 */



require(["js/config"], function () {
    require(["jquery", "circle", "pvector"], function ($, Circle, PVector) {

        var canvas, ctx, circles = [];
        var $acceleration, $force;
        var $container = $("#canvas");

        window.requestAnimFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();

        function init() {
            canvas = $container.get(0);
            ctx = canvas.getContext("2d");
            $acceleration = $('#accel');
            $force = $('#force');

            for (var i = 0; i < 20; i++) {
                circles.push(new Circle($container, new PVector(Math.random() * canvas.width, Math.random() * canvas.height), Math.random() * 80 + 10, i));
            }
            animate();
        }

        function animate() {
            requestAnimFrame(animate);
            step();
        }

        function step() {
            draw();
        }

        function draw() {
            ctx.fillStyle = 'LavenderBlush';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (var i = 0; i < circles.length; i++) {

                for (var j = 0; j < circles.length; j++) {
                    if (i != j) {
                        var force = circles[j].attract(circles[i]);
                        circles[i].applyForce(force);
                        if (i == 0) {
                            $force.text(force.mag());
                            $acceleration.text(circles[0].acceleration.mag());
                        }
                    }
                }
                circles[i].update();
                circles[i].display();
            }

        }


        init();

        $('#canvas').mousemove(function (event) {
            currentMousePos.x = event.pageX - event.currentTarget.offsetLeft;
            currentMousePos.y = event.pageY - event.currentTarget.offsetTop;

            for (var i = 0; i < circles.length; i++) {
                circles[i].grow = circles[i].hitTest(currentMousePos);
            }
        });


        var currentMousePos = new PVector(0, 0);
    });
});



