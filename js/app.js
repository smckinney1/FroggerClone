//TODO (NOTE TO SELF):
////Centered "x" locations for enemy: 0, 100, 200, 300, 400
////Centered "y" locations for enemy: 132, 214, 296 (***other rows not valid starting positions for enemy***)
////Centered "x" locations for player: 13, 114, 215, 316, 417
////Centered "y" locations for player: 35, 118, 200, 282, 364, 446

// Enemy constants allow us to expand game in future, if needed
const ENEMY_TOP_ROW_OFFSET = 132;
const ENEMY_ROW_HEIGHT = 82;
const ENEMY_NUMBER_OF_ROWS = 3;

// Player constants
const PLAYER_STARTING_X_POSITION = 215;
const PLAYER_STARTING_Y_POSITION = 446;
const PLAYER_ROW_WIDTH = 101;
const PLAYER_ROW_HEIGHT = 82;

// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug-cropped.png';

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
    return ENEMY_TOP_ROW_OFFSET + (ENEMY_ROW_HEIGHT * rowIndex);
};

// Set enemy move speed
Enemy.prototype.setMoveSpeed = function() {

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-princess-girl-cropped.png';
    this.x = PLAYER_STARTING_X_POSITION;
    this.y = PLAYER_STARTING_Y_POSITION;
};

Player.prototype.update = function() {
    
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(e) {
    //TODO: Ensure player can't move off screen
    switch(e) {
        case 'left':
            player.x -= PLAYER_ROW_WIDTH;
            break;
        case 'right':
            player.x += PLAYER_ROW_WIDTH;
            break;
        case 'up':
            player.y -= PLAYER_ROW_HEIGHT;
            break;
        case 'down':
            player.y += PLAYER_ROW_HEIGHT;
            break;
    }
    console.log('x: ', player.x, 'y: ', player.y);
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
