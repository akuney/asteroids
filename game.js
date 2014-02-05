(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.asteroids = [];
    this.bullets = [];
    this.ship = new Asteroids.Ship([Game.DIM_X/2, Game.DIM_Y/2]);
    this.img = new Image();
    this.img.src = 'space.jpeg';
  };

  Game.DIM_X = 500;
  Game.DIM_Y = 500;
  Game.FPS = 30;

  Game.prototype.drawImage = function() {
    this.ctx.drawImage(this.img,
      0, 0, 230, 150,
      0, 0, 500, 500);
  };

  Game.prototype.addAsteroids = function(numAsteroids) {
    for(var i = 0; i < numAsteroids; i++) {
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
    }
  };

  Game.prototype.draw = function() {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    var ctx = this.ctx;
    this.drawImage();

    this.asteroids.forEach(function(asteroid){
      asteroid.draw(ctx);
    });

    this.bullets.forEach(function(bullet){
      bullet.draw(ctx);
    });

    this.ship.draw(ctx);
  };

  Game.prototype.move = function() {
    this.asteroids.forEach(function(asteroid){
      asteroid.move();
    });

    this.bullets.forEach(function(bullet){
      bullet.move();
    });

    this.ship.move();
  };

  Game.prototype.step = function() {
    this.move();
    this.checkOffScreen();
    this.draw();
    this.checkCollisions();
  };

  Game.prototype.checkOffScreen = function() {
    this.relocateAsteroids();
    this.removeBullets();
    this.relocateShip();
  };

  Game.prototype.destroyAsteroid = function(i) {
    this.asteroids.splice(i, 1);
  };

  Game.prototype.relocateAsteroids = function() {
    for(var i = 0; i < this.asteroids.length; i++) {
      if (this.isOutOfBounds(this.asteroids[i])) {
        this.asteroids[i].relocate();
      }
    }
  };

  Game.prototype.removeBullets = function() {
    for(var i = 0; i < this.bullets.length; i++) {
      if (this.isOutOfBounds(this.bullets[i])) {
        this.removeBullet(i);
      }
    }
  };

  Game.prototype.relocateShip = function() {
    if (this.isOutOfBounds(this.ship)) {
      this.ship.relocate();
    }
  };

  Game.prototype.isOutOfBounds = function(obj) {
    var x = obj.x;
    var y = obj.y;

    return (x < 0 || x > Game.DIM_X || y < 0 || y > Game.DIM_Y);
  };

  Game.prototype.removeBullet = function(i) {
    this.bullets.splice(i, 1);
  };

  Game.prototype.checkCollisions = function() {
    for(var i = 0; i < this.asteroids.length; i++) {
      if (this.asteroids[i].isCollidedWith(this.ship)) {
        this.stop();
        window.alert("Your ship has been destroyed.");
        return;
      }
    }
  };

  Game.prototype.fireBullet = function() {
    var newBullet = this.ship.fireBullet(this);
    if (newBullet !== undefined) {
      this.bullets.push(newBullet);
    }
  }

  Game.prototype.start = function() {
    this.addAsteroids(10);
    this.bindKeyHandlers();
    this.timerID = window.setInterval(this.step.bind(this), Game.FPS);
  };

  Game.prototype.stop = function() {
    window.clearInterval(this.timerID);
  }

  Game.prototype.bindKeyHandlers = function() {
    var ship = this.ship;

    key('up', function() {
      ship.power([0,-1]);
    });

    key('down', function() {
      ship.power([0, 1]);
    });

    key('left', function() {
      ship.power([-1, 0]);
    });

    key('right', function() {
      ship.power([1, 0]);
    });

    key('space', this.fireBullet.bind(this));
  }

})(this);