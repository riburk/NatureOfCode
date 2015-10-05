/**
 * Created by richardburkhardt on 3/23/15.
 */

/*****************************
 Make circles attach to a parent circle by a tether

 1. Include a transition
 */

// 1. Create a parent circle (planet)
// 2. Attach child circles to it (moons)
// 3. Moon will subclass circle
// 4. May need a planet subclass of circle too
// 5. Moons are a defined distance from planet
// 6. Moons repel each other
// 7. Draw a line for the tether (or not)

define(['jquery', 'CircleBase', 'pvector', 'tetheredCircle'], function($, Circle, PVector, TetheredCircle){
    return function() {
        var canvas, ctx, planet, moon, satellite, sat2, sat3, sat4;
        var $container = $("#canvas");
        var circles = [];



        this.init = function () {
            canvas = $container.get(0);
            ctx = canvas.getContext("2d");

            var settings = {location:new PVector(Math.random() * canvas.width, Math.random() * canvas.height),
                radius: Math.random() * 80 + 10};

            planet = new Circle($container, settings);
            moon = new TetheredCircle($container, {radius:20}, planet);
            satellite = new TetheredCircle($container, {radius:10}, moon);
            sat2 = new TetheredCircle($container, {radius:10}, moon);
            sat3 = new TetheredCircle($container, {radius:10}, moon);
            sat4 = new TetheredCircle($container, {radius:10}, moon);
            circles.push(sat4);
            circles.push(sat3);
            circles.push(sat2);
            circles.push(satellite);
            circles.push(moon);
            circles.push(planet);

        };


        this.draw = function () {
            ctx.fillStyle = 'LavenderBlush';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            var l = circles.length;
            for(var i = 0; i < l; i++){
                circles[i].update();
                circles[i].display();
            }

            planet.display();
        };

        this.registerCircle = function(circle){
            circles.push(circle);
        };

        this.onMouseMove = function (currentMousePos) {
            for (var i = 0; i < circles.length; i++) {
                circles[i].grow = circles[i].hitTest(currentMousePos);
            }
        }
    }
});



