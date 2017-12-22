//TODO (NOTE TO SELF):
////Centered "x" locations for enemy: 0, 100, 200, 300, 400
////Centered "y" locations for enemy: 132, 214, 296 (***other rows not valid starting positions for enemy***)
////Centered "x" locations for player: 13, 114, 215, 316, 417
////Centered "y" locations for player: 35, 118, 200, 282, 364, 446

// Canvas constants
const TILE_WIDTH = 101;
const TILE_HEIGHT = 82;
const COL_COUNT = 5;
const ROW_COUNT = 6;

// Topmost valid value for Y
const Y_OFFSET = -32;

// Topmost valid value for X
const X_OFFSET = 2;

// Enemy constants allow us to expand game in future, if needed
// TOP_ROW_OFFSET prevents enemy from rendering in the water
const ENEMY_TOP_ROW_OFFSET = 50;
const ENEMY_NUMBER_OF_ROWS = 3;

// Player constants
// Last row, middle column
const PLAYER_STARTING_ROW_INDEX = ROW_COUNT - 1;
const PLAYER_STARTING_COL_INDEX = 2;

// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';

    //Starting locations
    //this.x = this.setXLocation();
    this.x = 0;
    this.y = this.setYLocation();

    this.setMoveSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

   // this.x = this.x * 
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Set enemy starting X position
Enemy.prototype.setXLocation = function() {
    //We want "x" to start off screen
};

// Set enemy starting Y position according to number of enemy rows defined in constants
Enemy.prototype.setYLocation = function() {
    var rowIndex = Math.floor(Math.random() * ENEMY_NUMBER_OF_ROWS);
    return ENEMY_TOP_ROW_OFFSET + (TILE_HEIGHT * rowIndex);
};

// Set enemy move speed
Enemy.prototype.setMoveSpeed = function() {

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-princess-girl.png';
    this.x = (TILE_WIDTH * PLAYER_STARTING_COL_INDEX) + X_OFFSET;
    this.y = (TILE_HEIGHT * PLAYER_STARTING_ROW_INDEX) + Y_OFFSET;
};

Player.prototype.update = function() {
    
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPressed) {
    var x = this.x;
    var y = this.y;

    // Move in the direction of the keypress if keypress was in bounds for the player
    switch(keyPressed) {
        case 'left':
            x -= TILE_WIDTH;
            if (x >= X_OFFSET) { this.x = x; }
            break;
        case 'right':
            x += TILE_WIDTH;
            if (x <= TILE_WIDTH * COL_COUNT) { this.x = x; }
            break;
        case 'up':
            y -= TILE_HEIGHT;
            if (y >= Y_OFFSET) { this.y = y; }
            break;
        case 'down':
            y += TILE_HEIGHT;
            if (y <= TILE_HEIGHT * (ROW_COUNT - 1)) { this.y = y; }
            break;
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player();
allEnemies.push(new Enemy());

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
