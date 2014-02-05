(function(root) {
  Function.prototype.inherits = function(SuperClass) {
    function Surrogate(){};
    Surrogate.prototype = SuperClass.prototype;
    this.prototype = new Surrogate();
  }

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos) {
    Asteroids.MovingObject.call(this, pos, [0,0], Ship.RADIUS, Ship.COLOR);
    this.dir = [1,0];
  };

  Ship.RADIUS = 20;
  Ship.COLOR = 'blue';

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function(game) {
    var newBullet = new Asteroids.Bullet([this.x, this.y], this.dir, game);
    return newBullet;
  };

  Ship.normalize = function(vel) {
    var shipSpeed = Math.sqrt(Math.pow(vel[0],2) +
      Math.pow(vel[1],2));

    if (shipSpeed > 0) {
      return [vel[0]/shipSpeed, vel[1]/shipSpeed];
    }
  };

  Ship.prototype.move = function() {
    Asteroids.MovingObject.prototype.move.call(this);

    var shipSpeed = Math.sqrt(Math.pow(this.vel[0],2) +
      Math.pow(this.vel[1],2));

    if (shipSpeed > 0) {
      console.log(this.dir);
      this.dir = Ship.normalize(this.vel);
    }
  };

  Ship.prototype.relocate = function() {
    var width = Asteroids.Game.DIM_X;
    var height = Asteroids.Game.DIM_Y;

    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }

    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }
  };
})(this);