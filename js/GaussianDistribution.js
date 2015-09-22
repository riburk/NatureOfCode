
function rnd_snd() {
    return (Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1);
}

function rnd(mean, stdev) {
    return Math.round(rnd_snd()*stdev+mean);
}


var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

// draw blue rectangle
//    context.beginPath();
//    context.rect(200, 20, 100, 100);
//    context.fillStyle = 'blue';
//    context.fill();

function drawCircle(x, y) {
    var red = (x - 250 + 60);
    var green = (y - 250 + 60) * 2;
    var blue = 0;
//    context.globalAlpha = 0.05;
    context.beginPath();
    context.arc(x, y, 5, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgb('+red+','+green+','+blue+')';
    context.fill();
}

setInterval(function(){drawCircle(rnd(250, 30), rnd(250, 30))}, 1);

