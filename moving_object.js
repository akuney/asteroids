(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MovingObject = Asteroids.MovingObject = function(pos, vel, rad, col) {
    this.x = pos[0];
    this.y = pos[1];
    this.vel = vel;
    this.rad = rad;
    this.col = col;
  };

  MovingObject.prototype.move = function() {
    this.x += this.vel[0];
    this.y += this.vel[1];
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.col;
    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.rad,
      0, 2 * Math.PI
    );

    ctx.fill();
  };

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var dist = Math.sqrt(Math.pow(this.x - otherObject.x, 2)
    + Math.pow(this.y - otherObject.y, 2));
    var radSum = this.rad + otherObject.rad;

    return (radSum > dist);
  }
})(this);