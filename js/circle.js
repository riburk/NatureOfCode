

define(['pvector'], function(PVector){
    return function($container, location, r, index){
        this.location = location;
        this.index = index;
        this.r = r;
        this.color = 'HoneyDew';
        var max_r = r * 2;
        var min_r = r;
        this.grow = false;
        var grow_rate = 1.2;
        var direction = new PVector(Math.random() * 2 - 1, Math.random() * 2 - 1);
        var rate = .05;
        this.velocity = PVector.mult(direction, rate);
        this.acceleration = new PVector(0,0);
        this.getMass = function(){return Math.PI * this.r * this.r};

        this.canvas = $container.get(0);
        this.ctx = this.canvas.getContext("2d");
        var G = .1;
        var topSpeed = 1;

        var dragCoefficient = 1000;
        var minDistance = 5;
        var maxDistance = 500;

        this.display = function(){
            this.ctx.beginPath();
            this.ctx.arc(this.location.x, this.location.y, this.r, 0, Math.PI * 2, true);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
            this.ctx.strokeStyle = "DimGray";
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
            this.ctx.font = "16px Georgia";
            this.ctx.strokeStyle = "Black";
            this.ctx.lineWidth = 2;
            this.ctx.fillStyle = "Black";
            var text = Math.round(this.r);
            var textSize = this.ctx.measureText(text);
            this.ctx.fillText(text, this.location.x - 0.5 * textSize.width, this.location.y +4, 2*this.r);

        };

        this.update = function(){
            var drag = this.getDrag(dragCoefficient);
            this.applyForce(drag);
            this.applyGrowth();
            var edgeRepelForce = this.repelEdges();
            this.applyForce(edgeRepelForce);
            this.velocity.add(this.acceleration);
            this.velocity.limit(topSpeed);
            if (this.velocity.mag() < 0.03) {
                this.velocity.mult(0)
            }
            this.location.add(this.velocity);
            this.acceleration.mult(0);
        };

        this.hitTest = function(point){
            var vec = PVector.sub(this.location, point);
            return vec.mag() < this.r;
        };

        this.applyGrowth = function(){
            if(this.grow && this.r < max_r){
                this.r *= grow_rate;
            } else if(!this.grow && this.r > min_r){
                this.r /= grow_rate;
            }
        };

        this.applyForce = function(force) {
            var f = PVector.div(force, this.getMass());
            this.acceleration.add(f);
        };

        this.attract = function( m) {
            var force = PVector.sub(this.location, m.location);
            var distance = force.mag();
            distance = constrain(distance, minDistance, maxDistance);
            force.normalize();
            //What’s the force’s direction?
            var strength = (G * this.getMass() * m.getMass()) / (distance * distance);
            force.mult(-strength);
            return force; //Return the force so that it can be applied!
        };

        function constrain(val, min, max){
            if(val < min){
                return min;
            } else if(val > max){
                return max;
            }
            return val;
        }

        this.checkEdges = function() {
            //When it reaches one edge, reverse direction.

            if (this.location.x >= this.canvas.width || this.location.x <= 0) {
                this.velocity.x *= -1;
                this.acceleration.x *= -1;
            }
            if (this.location.y >= this.canvas.height || this.location.y <= 0) {
                this.velocity.y *= -1;
                this.acceleration.y *= -1;
            }
        };

        this.repelEdges = function() {
            var edgeMass = 10000;
            var edgeForces = [];
            var totalForce = new PVector(0,0);
            var topForce = PVector.sub(this.location, new PVector(this.location.x, 0));
            edgeForces.push(topForce);
            var bottomForce = PVector.sub(this.location, new PVector(this.location.x, this.canvas.height));
            edgeForces.push(bottomForce);
            var leftForce = PVector.sub(this.location, new PVector(0, this.location.y));
            edgeForces.push(leftForce);
            var rightForce = PVector.sub(this.location, new PVector(this.canvas.width, this.location.y));
            edgeForces.push(rightForce);


            //var force = PVector.sub(this.location, m.location);
            for(var i=0; i < edgeForces.length; i++) {
                var force = edgeForces[i];
                var distance = force.mag();
                distance = constrain(distance, minDistance, maxDistance);
                force.normalize();
                //What’s the force’s direction?
                var strength = (G * this.getMass() * edgeMass) / (distance * distance);
                force.mult(strength);
                totalForce.add(force);
            }
            return totalForce;
        };

        this.getDrag = function(dragCoefficient) {
            var speed = this.velocity.mag();
            var dragMagnitude = dragCoefficient * speed * speed;
            var drag = this.velocity.get();
            drag.mult(-1);
            drag.normalize();
            drag.mult(dragMagnitude);
            return drag;
        };
    }
});