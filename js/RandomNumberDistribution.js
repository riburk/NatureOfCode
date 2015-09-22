

var randomCounts = [];

function setup() {
    size(640,240);
    randomCounts = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
}

function draw() {
    background();

    // Pick a random number and increase the count.
    var index = Math.floor(Math.random() * randomCounts.length);
    randomCounts[index]++;

    var w = width/randomCounts.length;
    // Graphing the results
    for (var x = 0; x < randomCounts.length; x++) {
        ctx.beginPath();
        ctx.rect(x*w,height-randomCounts[x],w-1,randomCounts[x]);
        ctx.closePath();
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.fillStyle = "gray";
        ctx.fill();
    }
}

init().then(setup).then(function(){setInterval(draw, 15)});


