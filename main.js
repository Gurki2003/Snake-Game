//board
var blockSize = 25; // each box size
var rows = 20; //size of the board
var cols = 20;
var board; 
var context; 

//snake head and randomly assign the head  at (5,5)
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

var gameOver = false;

window.onload = start();
function start() 
{ 
    // whebn the page loads perform this function
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board

    placeFood();
    //adding a event listener to the document and waiting for any key to be pressed
    document.addEventListener("keyup", changeDirection);
    //for keep the thing going we have the function 
    // set interval we r running
    //the update functi0on 10 times a sec i.e or once after
    setInterval(update, 1000/10); //100 milliseconds
}

function update() {
    if (gameOver) {
        location.reload();
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);
    
    //if the snake collides with the food  
    if (snakeX == foodX && snakeY == foodY) {
        //the size of the snake
        snakeBody.push([foodX, foodY]);
        placeFood();
    }
    //moving the body with the head
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    //assign the body the head
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="lime";
    snakeX += velocityX * blockSize; // so that the snake move one block each time
    snakeY += velocityY * blockSize;  // so that the snake move one block each time  
    
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    //drawing the size of new snake after eating 
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    //
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("Game Over");
    }
    // body colition 
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
}
// assigning the directions
function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


function placeFood() {
    //placing the food at the given random location place
    //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}