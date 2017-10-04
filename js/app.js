"use strict;";
//Character class
var Character = function(x, y, picture) {
    this.x = x;
    this.y = y;
    this.picture = picture;
};

// Enemies our player must avoid
var Enemy = function(x, y, picture, speed) {
    Character.apply(this, arguments);
    this.speed = speed;
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
var Player = function(x, y, picture) {
    Character.apply(this, arguments);
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

//check whether player hit enemies
Player.prototype.checkCollisions = function() {
    for(let i=0;i<allEnemies.length;i++) {
        if (player.y == allEnemies[i].y && player.x > (allEnemies[i].x - 65) && player.x < (allEnemies[i].x + 80)) {
            scoreChange(-10);
        }
    }
};

//check whether player drop into water
Player.prototype.checkDropInWater = function() {
    if (player.y < 50) {
        scoreChange(-5);
    }
};

//check whether player get the gem
Player.prototype.checkGetGem = function() {
    if (player.x == gem.x && player.y == gem.y) {
        scoreChange(5);
        gem.update();
    }
};

//Rock class
var Rock = function(x, y, picture) {
    Character.apply(this, arguments);
};


// Draw rockes on the screen
Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.picture), this.x, this.y);
};

//Gem class
var Gem = function(x, y, picture) {
    Character.apply(this, arguments);
    this.numX;
    this.numY;
};

//when player get the gem, then gem move to a next random position
Gem.prototype.getNewGemPosition = function() {
    var numArry1 = [0, 101, 202, 303, 404];
    this.numX = numArry1[Math.floor(Math.random() * numArry1.length)];

    var numArry2 = [60, 143, 226];
    this.numY = numArry2[Math.floor(Math.random() * numArry2.length)];
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
var player = new Player(202, 392, 'images/char-boy.png');

var allEnemies = [];
allEnemies[0] = new Enemy(0, 60, 'images/enemy-bug.png', 3.3);
allEnemies[1] = new Enemy(0, 143, 'images/enemy-bug.png', 2.5);
allEnemies[2] = new Enemy(275, 226, 'images/enemy-bug.png', 1);
allEnemies[3] = new Enemy(0, 226, 'images/enemy-bug.png', 1);

var rockes = [];
rockes[0] = new Rock(101, 309, 'images/Rock.png');
rockes[1] = new Rock(404, 309, 'images/Rock.png');

var gem = new Gem(202, 60, 'images/Gem-Orange.png');

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

//when player hit enemies or drop into water, he lose scores
//when player get gem, he add scores
//finally reset player
var newScore = 0;
var scoreDiv = document.getElementById("score");

function scoreChange(num) {
    newScore = parseInt(scoreDiv.innerHTML);
    newScore += num;
    scoreDiv.innerHTML = newScore;
    player.x = 202;
    player.y = 392;
}