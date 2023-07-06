// Define the canvas
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Define the player object
var playerImage = new Image();
playerImage.src = "player.png";

var player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    image: playerImage
};

// Define the bullets array
var bullets = [];

// Define the green boxes array
var greenBoxes = [];

// Game variables
var score = 0;
var lives = 3;

// Function to handle player shooting
function shoot() {
    var bullet = {
        x: player.x + player.width / 2 - 2.5,
        y: player.y - 10,
        width: 5,
        height: 10,
        color: "red",
        speed: 5
    };
    bullets.push(bullet);
}

// Define the canvas
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Define the player object
var playerImage = new Image();
playerImage.src = "player.png";

var player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    image: playerImage
};

// Define the bullets array
var bullets = [];

// Define the green boxes array
var greenBoxes = [];
var greenBoxImage = new Image();
greenBoxImage.src = "green-box.png";

// Function to create a new green box
function createGreenBox() {
    var newGreenBox = {
        x: Math.random() * (canvas.width - 50),
        y: 0,
        width: 50,
        height: 50,
        image: greenBoxImage,
        speed: Math.random() * 4 + 2, // Random speed between 2 and 6
        visible: true
    };

    greenBoxes.push(newGreenBox);

    // Check if the number of green boxes exceeds the maximum limit
    var maxGreenBoxes = 10; // Maximum number of green boxes on the screen
    if (greenBoxes.length > maxGreenBoxes) {
        greenBoxes.shift(); // Remove the oldest green box from the array
    }
}

// Rest of your code...


// Game over logic
function gameOver() {
    // Remove event listeners
    canvas.removeEventListener("click", shoot);
    canvas.removeEventListener("mousemove", mouseMoveHandler);

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Hide the game canvas
    canvas.style.display = "none";

    // Display game over screen
    var gameOverScreen = document.getElementById("gameOverScreen");
    var gameOverText = document.getElementById("gameOverText");
    var finalScoreText = document.getElementById("finalScoreText");
    var finalScore = document.getElementById("finalScore");
    var playAgainBtn = document.getElementById("playAgainBtn");

    gameOverScreen.style.display = "block";
    gameOverText.style.display = "block";
    finalScoreText.style.display = "block";
    finalScore.textContent = score;
    playAgainBtn.style.display = "block";
}

// Event listener for shooting on mouse click
canvas.addEventListener("click", shoot);

// Event listener for moving the player with the mouse
canvas.addEventListener("mousemove", mouseMoveHandler);

// Function to handle mouse movement
function mouseMoveHandler(event) {
    var rect = canvas.getBoundingClientRect();
    player.x = event.clientX - rect.left - player.width / 2;
}

// Event listener for restarting the game on click
var playAgainBtn = document.getElementById("playAgainBtn");
playAgainBtn.addEventListener("click", function () {
    // Reset game variables
    score = 0;
    lives = 3;
    greenBoxes = [];
    bullets = [];

    // Hide the game over screen
    var gameOverScreen = document.getElementById("gameOverScreen");
    gameOverScreen.style.display = "none";

    // Show the game canvas
    canvas.style.display = "block";

    // Start the gameagain
    canvas.addEventListener("click", shoot);
    canvas.addEventListener("mousemove", mouseMoveHandler);
    update();
});

// Update function to redraw the game
function update() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the player image
    context.drawImage(player.image, player.x, player.y, player.width, player.height);

    // Update and draw the green boxes
    for (var i = 0; i < greenBoxes.length; i++) {
        var greenBox = greenBoxes[i];
        greenBox.y += greenBox.speed;

        // Draw the green box if it's visible
        if (greenBox.visible) {
            context.fillStyle = greenBox.color;
            context.fillRect(greenBox.x, greenBox.y, greenBox.width, greenBox.height);
        }

        // Check if the green box is out of bounds
        if (greenBox.y > canvas.height) {
            greenBoxes.splice(i, 1); // Remove the green box from the array
            i--; // Decrement the index to account for the removed element
            lives--; // Decrement the lives

            // Check if lives are zero
            if (lives === 0) {
                // Game over
                gameOver();
                return; // Exit the update function
            }
        }
    }

    // Draw the bullets
    for (var j = 0; j < bullets.length; j++) {
        var bullet = bullets[j];
        context.fillStyle = bullet.color;
        context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        bullet.y -= bullet.speed; // Move the bullet upwards

        // Check if the bullet hits the top of the canvas
        if (bullet.y < 0) {
            bullets.splice(j, 1); // Remove the bullet from the array
            j--; // Decrement the index to account for the removed element
            continue; // Skip the collision check
        }

        // Check if the bullet collides with a green box
        for (var k = 0; k < greenBoxes.length; k++) {
            var greenBox = greenBoxes[k];
            if (
                bullet.x < greenBox.x + greenBox.width &&
                bullet.x + bullet.width > greenBox.x &&
                bullet.y < greenBox.y + greenBox.height &&
                bullet.y + bullet.height > greenBox.y
            ) {
                bullets.splice(j, 1); // Remove the bullet from the array
                j--; // Decrement the index to account for the removed element
                greenBoxes.splice(k, 1); // Remove the green box from the array
                k--; // Decrement the index to account for the removed element
                score++; // Increment the score
                break; // Exit the collision loop
            }
        }
    }

    // Display the score and lives
    context.fillStyle = "black";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 10, 30);
    context.fillText("Lives: " + lives, 10, 60);

    // Request the next frame
    requestAnimationFrame(update);
}

// Create a new green box every second
setInterval(createGreenBox, 1000);

// Show the game canvas
canvas.style.display = "block";

// Start the game
update();
