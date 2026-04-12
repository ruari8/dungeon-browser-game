// declare variables

// load canvas
canvas = document.getElementById("gameCanvas");
context = canvas.getContext("2d");

//game vars
const FPS = 60;
var charx, chary;     //position of the top left of the squares
var canvas, context;

var torchStrength = 150;
var difficulty;
var wallSize;
var charSize;  //size of square in pixels
var square;  //size of each grid square on the board
var boardSize; //number of pixels wide
var lives = 3;
var Cells;   //number of squares wide
var maze = [];  //array containing every square with two values per square, indicating if the right and down walls are present or not
var allCells = [];
var winOptions = [];
var winSquare = 1;
var distanceMoved = 0;
var challengesEncountered = 0;

//colours
var wallColour = 'rgba(128,128,128, 255)';
var wallColourQ = [128, 128, 128, 255];
var floorColour = 'rgba(18,5,23, 255)';
var floorColourQ = [18, 5, 23, 255];
var winColour = 'rgba(0,256,0, 256)';
var winColourQ = [0, 255, 0, 255];
var charColour = 'rgb(255,128,0)';

// character starting position
charx = wallSize;
chary = wallSize;

// sound
var sfxMove = new Audio('sfx/sfxMove.wav'); // bug: sound never plays after skipping pressure plate challenge fixed
var sfxClick = new Audio('sfx/sfxClick.wav');
var sfxHover = new Audio('sfx/sfxHover.wav'); //unused, add with onmouseover
var sfxDamage = new Audio('sfx/sfxDamage.wav'); // unused, for losing hearts
var sfxVictory = new Audio('sfx/sfxVictory.wav');
var sfxMusic = new Audio('sfx/sfxBGM.mp3');

function xmur3(str) {
    for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
            h = h << 13 | h >>> 19;
    return function () {
        h = Math.imul(h ^ h >>> 16, 2246822507);
        h = Math.imul(h ^ h >>> 13, 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
}

function mulberry32(a) {
    return function () {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

let seedFunction = xmur3("bugs");
let rand = mulberry32(seedFunction());
/*function getRndInteger(max) {   //produces a random rumber between 0 and max based off the seed
    return Math.floor((rand() * max));
  }*/

function getRndInteger(max) {
    return Math.floor(Math.random() * max);
}

function setDifficulty(number){
    difficulty = number;
    wallSize = 1 * difficulty;
    charx = wallSize;
    chary = wallSize;
    charSize = 10 * difficulty;    //size of square in pixels
    square = wallSize + charSize;   //size of each grid square on the board
    boardSize = Math.floor(canvas.width / (square)) * square; //number of pixels wide
    canvas.width = boardSize + wallSize;
    canvas.height = boardSize + wallSize;
    Cells = (boardSize / square);
    allCells = [];
    for (let incx = 0; incx < Cells; incx++) {
        for (let incy = 0; incy < Cells; incy++) {
            x = wallSize + (square * incx)
            y = wallSize + (square * incy)
            coord = [x, y]
            allCells.push(coord);
        }
    }
    winOptions = [[boardSize - charSize, boardSize - charSize], [wallSize, boardSize - charSize], [boardSize - charSize, wallSize]]
}

function move(direction) {
    switch (direction) {
        case "down":
            checkx = charx;
            checky = chary + charSize;
            var canvas = gameCanvas.getContext('2d');
            var colour = canvas.getImageData(checkx, checky, 1, 1).data;
            if (colour[0] == floorColourQ[0] && colour[1] == floorColourQ[1] && colour[2] == floorColourQ[2]) {
                chary += square;
                lastMove = 'up';
                distanceMoved = distanceMoved + 1;
                if(challengeStarted == false) { sfxMove.play(); }
            }
            //check for win
            win_check();
            break;
        case "up":
            checkx = charx;
            checky = chary - 1;
            var canvas = gameCanvas.getContext('2d');
            var colour = canvas.getImageData(checkx, checky, 1, 1).data;
            if (colour[0] == floorColourQ[0] && colour[1] == floorColourQ[1] && colour[2] == floorColourQ[2]) {
                chary -= square;
                lastMove = 'down';
                distanceMoved = distanceMoved + 1;
                if(challengeStarted == false) { sfxMove.play(); }
            }
            //check for win
            win_check();
            break;
        case "right":
            checkx = charx + charSize;
            checky = chary;
            var canvas = gameCanvas.getContext('2d');
            var colour = canvas.getImageData(checkx, checky, 1, 1).data;
            if (colour[0] == floorColourQ[0] && colour[1] == floorColourQ[1] && colour[2] == floorColourQ[2]) {
                charx += square;
                lastMove = 'left';
                distanceMoved = distanceMoved + 1;
                if(challengeStarted == false) { sfxMove.play(); }
            }
            //check for win
            win_check();
            break;
        case "left":
            checkx = charx - 1;
            checky = chary;
            var canvas = gameCanvas.getContext('2d');
            var colour = canvas.getImageData(checkx, checky, 1, 1).data;
            if (colour[0] == floorColourQ[0] && colour[1] == floorColourQ[1] && colour[2] == floorColourQ[2]) {
                charx -= square;
                lastMove = 'right';
                distanceMoved = distanceMoved + 1;
                if(challengeStarted == false) { sfxMove.play(); }
            }
            //check for win
            win_check();
            break;
    }
}

window.addEventListener("keydown", function (event) {   //handles keyboard input, for now allows you to use arrow keys to move the character
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    switch (event.key) {
        case "ArrowDown":
            // code for "down arrow" key press.
            move("down");
            break;
        case "ArrowUp":
            // code for "up arrow" key press.
            move("up");
            break;
        case "ArrowLeft":
            // code for "left arrow" key press.
            move("left");
            break;
        case "ArrowRight":
            // code for "right arrow" key press.
            move("right");
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }

    event.preventDefault();
}, true);

function win_check() {
    if (challengeStarted) return;  //guard clause to prevent player accidentally winning whilst they are playing a challenge 
    var canvas = gameCanvas.getContext('2d');
    var colour = canvas.getImageData(charx + 5, chary + 5, 1, 1).data;
    if (colour[0] == winColourQ[0] && colour[1] == winColourQ[1] && colour[2] == winColourQ[2]) {
        endScreen('You won!');
        sfxMusic.pause();
        charx = wallSize;
        chary = wallSize;
        sfxVictory.play();
    }
}

function resetGame(){
    window.location.reload();
}

function populate_grid() {
    wallNumber = (canvas.width + wallSize) / difficulty;
    wallSpace = charSize + wallSize;
    x = 0;
    for (let inc = 0; inc < Cells * Cells; inc++) {
        maze.push([true, true]);
    }
    for (let inc = 0; inc < wallNumber; inc++) {  //draw grey lines spaced apart evenly until the board is full  
        context.fillStyle = wallColour;
        context.fillRect(x, 0, wallSize, boardSize);
        context.fillRect(0, x, boardSize + wallSize, wallSize);
        x += wallSpace;
    }
}
function draw_grid() {
    currentCell = [wallSize, wallSize];
    wallNumber = (canvas.width + wallSize) / difficulty;
    wallSpace = charSize + wallSize;
    x = 0;
    context.fillStyle = wallColour; //draw grey lines spaced apart evenly until the board is full  
    context.fillRect(0, 0, boardSize, wallSize);
    context.fillRect(0, 0, wallSize, boardSize);
    for (let inc = 0; inc < wallNumber; inc++) {
        context.fillStyle = wallColour;
        context.fillRect(x, 0, wallSize, boardSize);
        context.fillRect(0, x, boardSize + wallSize, wallSize);
        x += wallSpace;
    }
    for (let inc = 0; inc < Cells * Cells; inc++) {    //remove certain walls to make the maze    
        if (maze[inc][0] == false) {
            context.fillStyle = floorColour;
            context.fillRect(currentCell[0] + charSize, currentCell[1], wallSize, charSize);
        }
        if (maze[inc][1] == false) {
            context.fillStyle = floorColour;
            context.fillRect(currentCell[0], currentCell[1] + charSize, charSize, wallSize);
        }
        currentCell[0] += square;
        if (currentCell[0] > boardSize) {   //once you reach the edge of the board go back to the left side and down a square
            currentCell[0] = wallSize;
            currentCell[1] += square;
        }
    }
}

function in_array(array, coord) {
    for (let i = 0; i < array.length; i++) {
        if (array[i][0] == coord[0] && array[i][1] == coord[1]) {
            return true
        }
    }
    return false;
}

function findIndex(coords) {
    x = coords[0];
    y = coords[1]
    x -= wallSize;
    y -= wallSize;
    x = x / square;
    y = y / square;
    y = y * Cells;
    return x + y;
}

function generate_maze() {
    var currentIndex = 0;
    var currentCell = [wallSize, wallSize]   //start in the top right    
    var totalCells = Cells * Cells;
    var forceQuit = false;
    var visited = [currentCell];    //array containing the coordinates of all the squares that have been visited   
    winSquare = getRndInteger(3);
    while (visited.length < totalCells && forceQuit == false) {
        var choices = [];
        var right = [currentCell[0] + square, currentCell[1]];
        var left = [currentCell[0] - square, currentCell[1]];
        var up = [currentCell[0], currentCell[1] - square];
        var down = [currentCell[0], currentCell[1] + square];
        if (right[0] < boardSize && in_array(visited, right) == false) {
            choices.push(right);
        }
        if (left[0] >= wallSize && in_array(visited, left) == false) {
            choices.push(left);
        }
        if (up[1] >= wallSize && in_array(visited, up) == false) {
            choices.push(up);
        }
        if (down[1] < boardSize && in_array(visited, down) == false) {
            choices.push(down);
        }
        if (choices.length != 0) {
            option = choices[getRndInteger(choices.length)];

            if (option[0] > currentCell[0]) { //delete wall to right if you're moving to the right
                //delete right wall
                maze[currentIndex][0] = false;
                currentCell = option;
                currentIndex = findIndex(currentCell);
                draw_grid();

            }
            else if (option[0] < currentCell[0]) {
                //delete left wall
                currentCell = option;
                currentIndex = findIndex(currentCell);
                maze[currentIndex][0] = false;
                draw_grid();
            }
            else if (option[1] > currentCell[1]) {
                //delete down wall
                maze[currentIndex][1] = false;
                currentCell = option;
                currentIndex = findIndex(currentCell);
                draw_grid();
            }
            else if (option[1] < currentCell[1]) {
                //delete up wall
                currentCell = option;
                currentIndex = findIndex(currentCell);
                maze[currentIndex][1] = false;
                draw_grid();
            }
            context.fillStyle = "orange";
            context.fillRect(currentCell[0], currentCell[1], charSize, charSize);
            visited.push(currentCell);
        }
        else {
            inc = 1;
            while (true) {
                inc++;
                if (inc > visited.length) {
                    forceQuit = true;
                }
                var len = visited.length - inc;
                x = visited[len][0];
                y = visited[len][1];
                currentCell = [x, y];
                var choices = [];
                var right = [currentCell[0] + square, currentCell[1]];
                var left = [currentCell[0] - square, currentCell[1]];
                var up = [currentCell[0], currentCell[1] - square];
                var down = [currentCell[0], currentCell[1] + square];
                if (right[0] < boardSize && in_array(visited, right) == false) {
                    currentIndex = findIndex(currentCell);
                    break;
                }
                if (left[0] >= wallSize && in_array(visited, left) == false) {
                    currentIndex = findIndex(currentCell);
                    break;
                }
                if (up[1] >= wallSize && in_array(visited, up) == false) {
                    currentIndex = findIndex(currentCell);
                    break;
                }
                if (down[1] < boardSize && in_array(visited, down) == false) {
                    currentIndex = findIndex(currentCell);
                    break;
                }
            }
        }
    }
}


function update_ui() {
    var torchStrengthDisplay = document.getElementById('torchStrength');
    torchStrengthDisplay.innerHTML = torchStrength.toFixed(0);
    var live = document.getElementById('live');
    var live1 = document.getElementById('live1');
    var live2 = document.getElementById('live2');
    live.style.backgroundImage = 'url(images/emptyHeart.png)'
    live1.style.backgroundImage = 'url(images/emptyHeart.png)'
    live2.style.backgroundImage = 'url(images/emptyHeart.png)'
    if (lives > 0) {
        live.style.backgroundImage = 'url(images/heart.png)'
    }
    if (lives > 1) {
        live1.style.backgroundImage = 'url(images/heart.png)'
    }
    if (lives > 2) {
        live2.style.backgroundImage = 'url(images/heart.png)'
    }
}


// update function
function update(move) {
    if(challengeStarted){
        console.log("challenge started");
    };
    if(torchStrength < charSize *2)torchStrength = charSize*2;    
    // draw background      
    /*for(let inc = 0;inc<allCells.length;inc++){
        context.fillStyle = floorColour;
        context.fillRect(allCells[inc][0], allCells[inc][1], charSize, charSize);
    }*/
    if (move == 'challenge') {
        randomChallenge();
    }
    context.fillStyle = floorColour;
    context.fillRect(0, 0, boardSize, boardSize);
    draw_grid();
    //draw player
    context.fillStyle = charColour;
    context.fillRect(charx, chary, charSize, charSize);
    //draw finish
    context.fillStyle = winColour;
    context.fillRect(winOptions[winSquare][0], winOptions[winSquare][1], charSize, charSize);
    //draw the light source
    context.fillStyle = 'rgba(20,20,20,1)';
    context.beginPath();
    context.arc(charx + charSize / 2, chary + charSize / 2, torchStrength, 0, 2 * Math.PI);
    var lightSize = boardSize + wallSize;
    context.rect(lightSize, 0, -lightSize, lightSize);
    context.fill();
    //update ui
    update_ui();

}