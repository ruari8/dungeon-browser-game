var completed = false;
var running;
var option = 0;
var story;
var challengeStarted = false;
var returnx = 0;
var returny = 0;
var first = true;
var currentTorch;


function spiderChallenge() {
    var boardDisplay = document.getElementById('board');
    boardDisplay.style.display = "none";
    var buttonDisplay = document.getElementById('buttons');
    buttonDisplay.style.display = "none";

    story = document.getElementById("storyText")
    if (completed === true) { //if the challenge is over and you want to go back to the main screen
        clearInterval(running);
        endChallenge();
        story.innerHTML = "You continue on your adventure";
        resetButtons();
        challengeStarted = false;
        charx = returnx;
        chary = returny;
    }
    else {
        
        if (option == 1) {
            // spider on fire image
            story.innerHTML = "You hit it with fire! You can pass!";
            torchStrength -= 20;
            setTimeout(() => { completed = true; }, 3000);
        }
        else if (option == 2) {
            story.innerHTML = "Unlucky! The spider has eaten you.";
            board.style.backgroundImage = "url(images/spider_lose.png)";
            returnx = wallSize;
            returny = wallSize;
            setTimeout(() => { completed = true; }, 3000);
            if (first == true) {  //need this clause as this if statement is triggered more than once before the timeout finishes
                first = false;
                lives -= 1;
            }

        }
        else if (option == 3) {
            story.innerHTML = "Unlucky! You werent strong enough";
            board.style.backgroundImage = "url(images/spider_lose.png)";
            setTimeout(() => { completed = true; }, 3000);
            if (first == true) { //need this clause as this if statement is triggered more than once before the timeout finishes
                first = false;
                lives -= 1;
            }
           
        }

        else if (option == 4) {
            story.innerHTML = "Challenge skipped!";
            board.style.backgroundImage = "url(images/spider_skip.png)";
            setTimeout(() => { completed = true; }, 3000);
            if (first == true) { //need this clause as this if statement is triggered more than once before the timeout finishes
                first = false;
                lives -= 1;
                torchStrength -= 50;
            }
        }
    }
}

function endChallenge() {
    var button1 = document.getElementById("Spider1");
    var button2 = document.getElementById("Spider2");
    var button3 = document.getElementById("Spider3");
    var button4 = document.getElementById("Spider4");
    var bg = document.getElementById('spiderChallengeDiv');
    var boardDisplay = document.getElementById('board');
    var buttonDisplay = document.getElementById('buttons');

    clearInterval(running);
    challengeStarted = false;
    charx = returnx;
    chary = returny;
    boardDisplay.style.display = "revert";
    boardDisplay.style.backgroundImage = "";
    buttonDisplay.style.display = "revert";
    bg.style.display = "none";
    button1.className = "hideMe";
    button2.className = "hideMe";
    button3.className = "hideMe";
    button4.className = "hideMe";
}

function startSpiderChallenge() {

    var boardDisplay = document.getElementById('board');
    boardDisplay.style.display = "none";
    var buttonDisplay = document.getElementById('buttons');
    buttonDisplay.style.display = "none";

    story.innerHTML = "You have encountered a large spider! You must defeat it to pass!";


    challengeStarted = true;
    first = true;
    returnx = charx;
    returny = chary;
    option = 0;
    completed = false;

    var bg = document.getElementById('spiderChallengeDiv');
    bg.style.display = "flex";
    bg.style.backgroundImage = "url(images/spider_start.png)";



    // Setup buttons
    var button1 = document.getElementById("Spider1");
    var button2 = document.getElementById("Spider2");
    var button3 = document.getElementById("Spider3");
    var button4 = document.getElementById("Spider4");
    button1.className = "showMe";
    button2.className = "showMe";
    button3.className = "showMe";
    button4.className = "showMe";
    button1.onclick = button1Event;
    button2.onclick = button2Event;
    button3.onclick = button3Event;
    button4.onclick = button4Event;
    button1.innerHTML = "Attack with your torch! However, torch strength will decrease!";
    button2.innerHTML = "Try run past, you might be quick enough.";
    button3.innerHTML = "Attack with your fists";
    button4.innerHTML = "Skip this challenge (Lose a life and torch strength!)";

    story = document.getElementById("storyText")
    //var board = document.getElementById('gameScreen');
    //board.className = "hideMe";
    running = setInterval(spiderChallenge, 1000 / FPS);

}

function resetButtons() {
    var gameButtons = document.getElementById('gameButtons');
    gameButtons.style.display = "revert";
}

function button1Event() {
    option = 1;
}

function button2Event() {
    ;
    option = 2;
}

function button3Event() {
    option = 3;
}

function button4Event() {
    option = 4;
}
