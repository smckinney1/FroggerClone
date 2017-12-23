// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.initialize();
};

Enemy.prototype.initialize = function() {
    this.x = OFFSCREEN_X_LOCATION;
    this.y = this.setYLocation();
    this.moveSpeed = this.setMoveSpeed();
}

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter,
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.moveSpeed * dt);

    // Enemy is generated again when it goes off screen
    if (this.x > TILE_WIDTH * COL_COUNT) {
        this.initialize();
    }
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

// Set enemy move speed at 100 (slow), 200 (medium), or 300 (fast)
Enemy.prototype.setMoveSpeed = function() {
    return (Math.floor(Math.random() * 3) + 1) * 100;
};

var Player = function() {
    this.sprite = 'images/char-princess-girl.png';
    this.x = this.setXLocation();
    this.y = this.setYLocation();

    this.wins = 0;
    this.lives = 3;

};

// Below player location functions will calculate the correct starting location
// for the player in the bottom middle of the screen.
Player.prototype.setXLocation = function() {
    return this.x = (TILE_WIDTH * PLAYER_STARTING_COL_INDEX) + X_OFFSET;
}

Player.prototype.setYLocation = function() {
    return this.y = (TILE_HEIGHT * PLAYER_STARTING_ROW_INDEX) + Y_OFFSET;
}

// If player has reached the water, add to win count and reset location.
// Otherwise, check if the player and enemy have collided.
// This function constantly runs as a result of the game engine.
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

// Move in the direction of the keypress if keypress was in bounds for the player
Player.prototype.handleInput = function(keyPressed) {
    var x = this.x;
    var y = this.y;

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

// Reset wins & lives
Player.prototype.endGame = function() {
    this.wins = 0;
    this.lives = 3;
}

// Avoiding creation of global function variables
var gameFunctions = {
    generateEnemies: function() {
        for (var i = NUMBER_OF_ENEMIES; i > 0; i--) {
            allEnemies.push(new Enemy());
        }
    },
    checkCollision: function() {
        allEnemies.forEach(function(enemy) {

            // These calculations are necessary to ensure the bug is either on or overlapping
            // with player's body (not head) 
            var enemyRight = enemy.x + SPRITE_WIDTH;
            var enemyLeft = enemy.x;
            var playerRight = player.x + SPRITE_WIDTH - PLAYER_SPRITE_WIDTH_OFFSET;
            var playerLeft = player.x + PLAYER_SPRITE_WIDTH_OFFSET;

            // Logic indicates a collision with player's body (not head) has occurred
            if (enemy.y === player.y && enemyRight >= playerLeft && enemyLeft <= playerRight) {
                player.lives--;

                // Reset game if player lives reaches 0
                if (player.lives === 0) { player.endGame(); }

                // Place player back in starting position
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
gameFunctions.generateEnemies();

// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
