

define(function() {
    var PVector = function(x, y) {
        this.x = x;
        this.y = y;

        this.add = function (v) {
            this.x += v.x;
            this.y += v.y;
        };

        this.sub = function (v) {
            this.x -= v.x;
            this.y -= v.y;
        };

        this.mult = function (n) {
            this.x *= n;
            this.y *= n;
        };

        this.div = function (n) {
            this.x /= n;
            this.y /= n;
        };

        this.mag = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };

        this.normalize = function () {
            var m = this.mag();
            if (m != 0) {
                this.div(m);
            }
        };

        this.limit = function (max) {
            if (this.mag() > max) {
                this.normalize();
                this.mult(max);
            }
        };

        this.get = function () {
            return new PVector(this.x, this.y);
        };

    };

    PVector.add = function (v, u) {
        return new PVector(v.x + u.x, v.y + u.y);
    };

    PVector.sub = function (v, u) {
        return new PVector(v.x - u.x, v.y - u.y);
    };

    PVector.mult = function (v, n) {
        return new PVector(v.x *= n, v.y *= n);
    };

    PVector.div = function (v, n) {
        return new PVector(v.x / n, v.y / n);
    };

    return PVector;
});