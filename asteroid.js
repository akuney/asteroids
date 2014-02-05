(function(root) {
  Function.prototype.inherits = function(SuperClass) {
    function Surrogate(){};
    Surrogate.prototype = SuperClass.prototype;
    this.prototype = new Surrogate();
  }

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, vel, rad, col){
    Asteroids.MovingObject.call(this, pos, vel, Asteroid.RADIUS, Asteroid.COLOR);
  };

  Asteroid.COLOR = 'black';
  Asteroid.RADIUS = 10;

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.randomVec = function(){
    return [Math.random() * 4 - 2, Math.random() * 4 - 2];
  };

  Asteroid.randomAsteroid = function(dimX, dimY){
    var randX = dimX * Math.random();
    var randY = dimY * Math.random();
    var pos = [randX, randY];

    return new Asteroid(pos, Asteroid.randomVec(),
    Asteroid.RADIUS, Asteroid.COLOR);
  };

  Asteroid.prototype.relocate = function() {
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
  }

})(this);