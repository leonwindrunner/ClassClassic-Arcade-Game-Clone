// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.picture = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed;
    if (this.x > 550) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.picture), this.x, this.y);
};

//Player class
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.picture = 'images/char-boy.png';
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.picture), this.x, this.y);
};

//control player movement,player can not move off screen and rockes
Player.prototype.handleInput = function(key) {
    if (key == "left" && (this.x > 0) && !(this.x == 202 && this.y == 309)) {
        this.x -= 101;
    } else if (key == "right" && (this.x < 404) && !(this.x == 0 && this.y == 309) && !(this.x == 303 && this.y == 309)) {
        this.x += 101;
    } else if (key == "up" && (this.y > 0) && !(this.x == 101 && this.y == 392) && !(this.x == 404 && this.y == 392)) {
        this.y -= 83;
    } else if (key == "down" && (this.y < 392) && !(this.x == 101 && this.y == 226) && !(this.x == 404 && this.y == 226)) {
        this.y += 83;
    }
};

//Rock class
var Rock = function(x, y) {
    this.x = x;
    this.y = y;
    this.picture = 'images/Rock.png';
};

// Draw rockes on the screen
Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.picture), this.x, this.y);
};

//Gem class
var Gem = function(x, y) {
    this.x = x;
    this.y = y;
    this.picture = 'images/Gem-Orange.png';
    this.numX;
    this.numY;

};

//when player get the gem, then gem move to a next random position
Gem.prototype.getNewGemPosition = function() {
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    var numArry1 = [0, 101, 202, 303, 404];
    numArry1 = shuffle(numArry1);
    this.numX = numArry1[0];

    var numArry2 = [60, 143, 226];
    numArry2 = shuffle(numArry2);
    this.numY = numArry2[0];
};

//update gem's position
Gem.prototype.update = function(dt) {
    this.getNewGemPosition();
    this.x = this.numX;
    this.y = this.numY;
};

// Draw gem on the screen
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.picture), this.x, this.y);
};

// Now instantiate objects.
var player = new Player(202, 392);

var allEnemies = new Array();
allEnemies[0] = new Enemy(0, 60, 3.3);
allEnemies[1] = new Enemy(0, 143, 2.5);
allEnemies[2] = new Enemy(275, 226, 1);
allEnemies[3] = new Enemy(0, 226, 1);

var rockes = new Array();
rockes[0] = new Rock(101, 309);
rockes[1] = new Rock(404, 309);

var gem = new Gem(202, 60);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//timer
var timerCount = 0;

function timer() {
    timerCount++;
    $("#timer").text(timerCount);
}

//when page loaded, start timer
window.onload = function() {
    setInterval(timer, 1000);
};

//when game over ,clike play again button, refesh page
$(".playAgain").on("click", function() {
    location.reload();
});