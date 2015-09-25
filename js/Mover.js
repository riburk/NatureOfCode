
define(function () {
    return function(p, location, velocity, acceleration, topspeed, update) {
        //this.p = processing;
        this.location = location;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.topspeed = topspeed;
        this.update = update;


        this.display = function () {
            p.ctx.beginPath();
            p.ctx.arc(this.location.x, this.location.y, 20, 0, Math.PI * 2, true);
            p.ctx.strokeStyle = "black";
            p.ctx.stroke();
            p.ctx.fillStyle = "green";
            p.ctx.fill();
        };

        this.checkEdges = function () {
            //When it reaches one edge, set location to the other.

            if (this.location.x > p.width) {
                this.location.x = 0;
            } else if (this.location.x < 0) {
                this.location.x = p.width;
            }
            if (this.location.y > p.height) {
                this.location.y = 0;
            } else if (this.location.y < 0) {
                this.location.y = p.height;
            }
        };

        this.update = function () {
            this.velocity.add(this.acceleration);
            this.velocity.limit(this.topspeed);
            this.location.add(this.velocity);  //The Mover moves.
        };
    };

//    var mover;
//
//    var v1 = new PVector(1,1);
//    var v2 = new PVector(2,2);
//    var v3 = PVector.add(v1, v2);
//
//
//    p.setup = function(){
//        p.size(600,500);
//
//        var location = new PVector(p.width/2, p.height/2);
//        var velocity = new PVector(0,0);
//        var acceleration = new PVector(-0.001, 0.01);
//        var topspeed = 10;
//
//        var update = function (mover) {
//            mover.velocity.add(mover.acceleration);
//            mover.velocity.limit(mover.topspeed);
//            mover.location.add(mover.velocity);  //The Mover moves.
//        };
//
//        mover = new p.Mover(location, velocity, acceleration, topspeed, update);
//    };
//
//    p.draw = function(){
//        p.background("white");
//        mover.update(mover);
//        mover.checkEdges();
//        mover.display();
//    };

});