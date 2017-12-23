// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.initialize();
};

Enemy.prototype.initialize = function() {
    // this.x = OFFSCREEN_X_LOCATION;
    // this.y = this.setYLocation();
    // this.moveSpeed = this.setMoveSpeed();
    this.x = 202;
    this.y = 50;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter,
    // which will ensure the game runs at the same speed for
    // all computers.
    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Set enemy starting Y position according to number of enemy rows defined in constants
Enemy.prototype.setYLocation = function() {
    var rowIndex = Math.floor(Math.random() * ENEMY_NUMBER_OF_ROWS);
    return ENEMY_TOP_ROW_OFFSET + (TILE_HEIGHT * rowIndex);
};

// Set enemy move speed
// Speed will be either 100 (slow), 200 (medium), or 300 (fast)
Enemy.prototype.setMoveSpeed = function() {
    return (Math.floor(Math.random() * 3) + 1) * 100;
};

// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-princess-girl.png';
    this.x = this.setXLocation();
    this.y = this.setYLocation();

    //Starting number of wins + lives
    this.wins = 0;
    this.lives = 3;

};

Player.prototype.setXLocation = function() {
    return this.x = (TILE_WIDTH * PLAYER_STARTING_COL_INDEX) + X_OFFSET;
}

Player.prototype.setYLocation = function() {
    return this.y = (TILE_HEIGHT * PLAYER_STARTING_ROW_INDEX) + Y_OFFSET;
}

// If player has reached the water, add to win count and reset location.
Player.prototype.update = function() {
    if (this.y === Y_OFFSET) {
        this.wins += 1;
        this.x = this.setXLocation();
        this.y = this.setYLocation();
    } else {
        gameFunctions.checkCollision();
    }
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

// Avoiding creation of global function variables
var gameFunctions = {
    checkCollision: function() {
        allEnemies.forEach(function(enemy) {

            var enemyRightPosition = enemy.x + (TILE_WIDTH / 2);
            var enemyLeftPosition = enemy.x - (TILE_WIDTH / 2)
            var playerLeftPosition = player.x;
            var playerRightPosition = player.x + TILE_WIDTH;

            if (enemy.y === player.y &&
                enemyRightPosition >= playerLeftPosition && 
                enemyRightPosition <= playerRightPosition) 
            {
                // TODO: Check if lives === 0, if so reset game wins to 0
                player.lives--;
                player.setYLocation();
                player.setXLocation();
            }
        });
    }

};

// Instantiating game objects
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();
var enemy = new Enemy();
allEnemies.push(enemy);

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
