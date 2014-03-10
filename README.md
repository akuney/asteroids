Asteroids
=========

By Andre Kuney and Sett Paing Oo

The well-known arcade game, made using object-oriented JavaScript and Canvas drawing. Running the index.html file allows you to play the game.

###MovingObject

Asteroid, Ship, and Bullet all inherit from movingObject, using the standard JavaScript inheritance pattern. There is logic here for movement (velocity to be determined from the subclass), collisions (where the meaningful collisions are dealt with elsewhere), and drawing using canvas (with various aspects in the subclass).

###Asteroid

10 Asteroids are randomly generated at the beginning of the game. If an Asteroid goes off the board, it comes back on the other side (this works because Asteroids keep a copy of the Game).

###Ship

Ships fire Bullets, and have key handlers installed on the arrow keys to let the user move the ship around. 

###Bullet

Bullets have the power to destroy Asteroids, and much of that logic is kept here. The game ends when there are no Asteroids left, or the Ship is destroyed by an Asteroid.

###Game

This is the central location of all the action. We build asteroids at a random position, specify what happens each time-step, fire bullets, get rid of bullets, bind the arrow keys, end the game, etc.

