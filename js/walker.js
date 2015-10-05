require(['js/config'], function(){
    require(['jquery'], function($){
        function Walker() {
            var x, y;
            var canvas = document.getElementById("canvas");
            var ctx = canvas.getContext("2d");
            x = canvas.width/2;
            y = canvas.height/2;

            this.display = function(){
                ctx.stroke();
                ctx.beginPath();
                ctx.fillRect(x,y,1,1);
                ctx.closePath();
            };

            this.step1 = function(){
                var choice = Math.floor( Math.random() * 4);

                if(choice == 0){
                    x++;
                } else if(choice == 1){
                    x--;
                } else if(choice == 2){
                    y++;
                } else if(choice == 3){
                    y--;
                }

            };

            this.step2 = function() {
                //Yields -1, 0, or 1
                var stepx = Math.floor(Math.random() * 3)-1;
                var stepy = Math.floor(Math.random() * 3)-1;
                x += stepx;
                y += stepy;
            };

            this.step3 = function() {
                var stepx = Math.random() * 2 - 1;
                var stepy = Math.random() * 2 - 1;
                x += stepx;
                y += stepy;
            };

            var currentMousePos = { x: -1, y: -1 };
            $(document).mousemove(function(event) {
                currentMousePos.x = event.pageX;
                currentMousePos.y = event.pageY;
            });

            this.stepTowardMouse = function(){
                var r= Math.random();
                dx = currentMousePos.x - x;
                dy = currentMousePos.y - y;
                if(r < .5){
                    var rx = Math.random() * 2 - 1;
                    var ry = Math.random() * 2 - 1;
                    if(0 < rx && rx < (dx / Math.abs(dx + dy))){
                        x++;
                    }
                    if((dx / Math.abs(dx + dy)) < rx && rx < 0){
                        x--;
                    }
                    if(0 < ry && ry < (dy / Math.abs(dx + dy))){
                        y++;
                    }
                    if((dy / Math.abs(dx + dy)) < ry && ry < 0){
                        y--;
                    }
                } else {
                    this.step3();
                }
            };

            this.stepGaussian = function(){
                function rnd_snd() {
                    return (Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1);
                }

                function rnd(mean, stdev) {
                    return Math.round(rnd_snd()*stdev+mean);
                }

                var stepx = rnd(0, 2);
                var stepy = rnd(0, 2);
                x += stepx;
                y += stepy;
            };

            this.montecarlo = function() {
                //We do this “forever” until we find a qualifying random value.
                while (true) {
                    //Pick a random value.
                    var r1 = Math.random();
                    //Assign a probability.
                    var probability = r1;
                    //Pick a second random value.
                    var r2 = Math.random();

                    //Does it qualify? If so, we’re done!
                    if (r2 < probability) {
                        return r1;
                    }
                }
            };

            this.stepMontecarlo = function(){
                var stepx = (1 - this.montecarlo())*2;
                var stepy = this.montecarlo() * 2 - 1;
                x += stepx;
                y += stepy;
            };

            this.uniformStepSize = function(){
                var stepsize = Math.random() * 10;

                var stepx = Math.random() * 2 * stepsize - stepsize;
                var stepy = Math.random() * 2 * stepsize - stepsize;

                x += stepx;
                y += stepy;
            }
        }
        var w;
        function draw(){
            //w.uniformStepSize();
            w.stepTowardMouse();
            w.display();
        }

        w = new Walker();
        setInterval(draw, 1);

    });
});






