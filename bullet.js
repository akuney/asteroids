(function(root) {
  Function.prototype.inherits = function(SuperClass) {
    function Surrogate(){};
    Surrogate.prototype = SuperClass.prototype;
    this.prototype = new Surrogate();
  }

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function(pos, dir, game) {
    var vel = [dir[0] * Bullet.SPEED, dir[1] * Bullet.SPEED];
    Asteroids.MovingObject.call(this, pos, vel, Bullet.RADIUS, Bullet.COLOR);

    this.game = game;
  };

  Bullet.COLOR = 'red';
  Bullet.RADIUS = 3;
  Bullet.SPEED = 10;

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.prototype.hitAsteroids = function() {
    var asteroids = this.game.asteroids;
    var currentBulletIndex = this.game.bullets.indexOf(this);

    for(var i = 0; i < asteroids.length; i++) {
      if (asteroids[i].isCollidedWith(this)) {
        this.game.destroyAsteroid(i);
        this.game.removeBullet(currentBulletIndex);
      }
    }
  };

  Bullet.prototype.move = function() {
    Asteroids.MovingObject.prototype.move.call(this);
    this.hitAsteroids();
  };
})(this);