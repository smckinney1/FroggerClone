// Canvas constants
const TILE_WIDTH = 101;
const TILE_HEIGHT = 82;
const SPRITE_WIDTH = 101;
const SPRITE_HEIGHT = 82;
const COL_COUNT = 5;
const ROW_COUNT = 6;
const OFFSCREEN_X_LOCATION = -100;

// Topmost valid value for Y
const Y_OFFSET = -32;

// Topmost valid value for X
const X_OFFSET = 2;

// Enemy constants
// TOP_ROW_OFFSET prevents enemy from rendering in the water
const ENEMY_TOP_ROW_OFFSET = Y_OFFSET + TILE_HEIGHT;
const ENEMY_NUMBER_OF_ROWS = 3;
const NUMBER_OF_ENEMIES = 5;

// Player constants for starting location (last row, middle column)
const PLAYER_STARTING_ROW_INDEX = ROW_COUNT - 1;
const PLAYER_STARTING_COL_INDEX = 2;

// To be used in gameFunctions.checkCollision(), as the player's width
// is much smaller than enemy width, despite tiles being same width.
const PLAYER_SPRITE_WIDTH_OFFSET = 23;