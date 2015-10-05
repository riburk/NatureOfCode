require(['js/config'],function(){
    require(['processing'], function(Processing){
        var boxes = [];
        var mousePressed = false;
        //var world;
        var p;

        function Box (x, y) {
            var w = 16,
                h = 16;

            var SCALE = 30;

            var bd = new b2BodyDef();
            bd.set_type(Module.b2_dynamicBody);
            bd.set_position(new b2Vec2(x / SCALE, y / SCALE));

            this.body = p.world.CreateBody(bd);

            var ps = new b2PolygonShape();

            var box2dW = w / SCALE;
            var box2dH = h / SCALE;

            ps.SetAsBox(box2dW, box2dH);

            var fd = new b2FixtureDef();
            fd.set_shape(ps);
            fd.set_density(1.0);
            fd.set_friction(0.3);
            fd.set_restitution(0.5);

            this.body.CreateFixture(fd);

            this.body.SetAwake(1);
            this.body.SetActive(1);

            this.display = function() {
                var pos = this.body.GetPosition(); //We need the Body’s location and angle.
                var a = this.body.GetAngle();
                p.ctx.save();
                p.ctx.translate(pos.get_x() * SCALE, pos.get_y() * SCALE);
                p.ctx.rotate(-a);
                p.ctx.fillStyle = "grey";
                p.ctx.strokeStyle = "black";
                //rectMode(CENTER);
                p.ctx.beginPath();
                p.ctx.rect(0, 0, w, h);
                p.ctx.closePath();
                p.ctx.stroke();
                p.ctx.fill();
                p.ctx.restore();
            }
        }


        function setup() {
            p = new Processing(document.getElementById("canvas"));
            p.size(600,500);
            p.background("white");
            p.world = new b2World(new b2Vec2(0,20), true);
        }

        var currentMousePos = { x: -1, y: -1 };
        $(document).mousemove(function(event) {
            currentMousePos.x = event.pageX;
            currentMousePos.y = event.pageY;
        });

        $(document).mousedown(function(event){
            mousePressed = true;
        });

        $(document).mouseup(function(event){
            mousePressed = false;
        });


        function draw() {
            p.world.Step(1/60, 3, 2   );
            p.background("white");

            if(mousePressed) {
                var b = new Box(currentMousePos.x, currentMousePos.y);
                boxes.push(b);
            }

            for(var i = 0; i<boxes.length;i++){
                boxes[i].display();
            }
        }

        setup();
        setInterval(draw, 15);
    });
});