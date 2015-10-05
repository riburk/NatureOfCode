/**
 * Created by richardburkhardt on 3/19/15.
 */

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
 * 8. have multiple 'systems' of planets and moons
 * 9. on hover display more info, gray out others
 * 10. click to zoom in to next level of detail
 * 11. click-out to zoom out
 * 12. move to 3D
 *
 */

var currentMousePos;

//requirejs.config({
//    baseUrl: 'js',
//    paths: {jquery: 'vendor/jquery-1.10.2.min'}
//});

require(["js/config"], function () {
    require(["jquery", "circles", "pvector", "tethered"], function ($, Circles, PVector, Tethered) {

        var currentTest;
        var currentMousePos;
        currentMousePos = new PVector(0, 0);

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

        function animate() {
            requestAnimFrame(animate);
            step();
        }

        function step() {
            currentTest.draw();
        }

        function init() {
            currentTest = new Tethered();
            currentTest.init();
            var canvas = document.getElementById("drawing");

            canvas.addEventListener('mousemove', function (evt) {
                onMouseMove(canvas, evt);
            }, false);

            animate();
        }


        function onMouseMove(canvas, event) {
            currentMousePos.x = event.pageX - event.currentTarget.offsetLeft;
            currentMousePos.y = event.pageY - event.currentTarget.offsetTop;

            if (currentTest && currentTest.onMouseMove)
                currentTest.onMouseMove(currentMousePos);
        }

        init();
    });
});