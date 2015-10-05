/**
 * Created by richardburkhardt on 3/30/15.
 */

define(['pvector', 'CircleBase', 'classicalInheritance'], function(PVector, Circle) {
    function TetheredCircle($container, settings, parent) {
        this.parent = parent;
        this.init(this, $container, settings);
        this.tetherLength = 50 + parent.r + this.r;
        var tetherDirection = new PVector(1,0);
        var tether = PVector.mult(tetherDirection, this.tetherLength);
        this.location = PVector.add(parent.location, PVector.add(PVector.mult(tetherDirection, parent.r), tether));
        this.angle = 0;
        this.aVelocity = .05 * (Math.random());
        this.aAcceleration = 0;

    }
    TetheredCircle.inherits(Circle);

    TetheredCircle.method("update", function(){
       this.location.add(this.parent.velocity);
        this.aVelocity += this.aAcceleration;
        this.angle += this.aVelocity;
    });

    TetheredCircle.method("display", function(){
        this.ctx.beginPath();
        this.ctx.moveTo(this.parent.location.x, this.parent.location.y);
        this.ctx.lineTo(this.location.x, this.location.y);
        this.ctx.stroke();
        this.location.x = Math.cos(this.angle) * (parseInt(this.tetherLength) + parseInt(this.parent.r)) + this.parent.location.x;
        this.location.y = Math.sin(this.angle) * (parseInt(this.tetherLength) + parseInt(this.parent.r)) + this.parent.location.y;
        this.uber('display');

    });

    return TetheredCircle;



});