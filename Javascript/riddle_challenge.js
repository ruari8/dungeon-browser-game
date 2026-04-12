var completed = false;
var running;
var option = 0;
var story;
var pass = false;
var pass1 = false;
var challengeStarted = false;
var returnx = 0;
var returny = 0;
var first = true;
var currentTorch;

function riddleChallenge(){
    var board = document.getElementById("challengeBoard");
    story = document.getElementById("storyText")
    if(completed === true){ //if the challenge is over and you want to go back to the main screen
        clearInterval(running);
        var cBoard = document.getElementById('challengeBoard');
        var aBox = document.getElementById('riddleAnswer');
        aBox.remove();
        var mazeCanvas = document.getElementById("gameCanvas");
        mazeCanvas.className = "showMe";
        story.innerHTML = "Find the trapdoor!";
        cBoard.remove();
        resetButtons();
        challengeStarted = false;
        charx = returnx;
        chary = returny;  
        torchStrength = currentTorch;    
        torchStrength += 30;  
        challengesStat += 1;
    }
    else{
        if (option == 1){   
            var ansBox = document.getElementById("riddleAnswer");
            var answer = ansBox.value;
            if(answer == "candle" || answer == "Candle"){
                board.style.backgroundImage = "url(images/riddle_challenge_open.png)";
                story.innerHTML = "Well aren't you clever... Enjoy the extra flicker in your flame!";  
                setTimeout(() => {completed = true;}, 3000);              
            }         
            pass = true;
        }
        else if(option == 2){
            story.innerHTML = "Carry on, try not to lose your way!";
            board.style.backgroundImage = "url(images/riddle_challenge_open.png)";
            currentTorch -= 50;         
            setTimeout(() => {completed = true;}, 3000);        
        }
        else if(option == 3){
            story.innerHTML = "I'm sure it did something...";
            pass1 = true;
        }

        else if(option == 4){
            
        }
    }
}

function startRiddleChallenge(){
    challengeStarted = true;
    currentTorch = torchStrength;
    first = true;
    returnx = charx;
    returny = chary;
    option = 0;
    pass = false;
    pass1 = false;
    completed = false;
    var screen = document.createElement('div');       
    screen.style.maxWidth = '610px';
    screen.style.height = '610px';
    screen.style.margin = "auto";
    screen.style.backgroundImage = "url(images/riddle_challenge.png)";
    screen.id = 'challengeBoard';  
    var riddleAnswer = document.createElement('input');
    riddleAnswer.type = "text";
    riddleAnswer.id = "riddleAnswer";
    riddleAnswer.style.margin = "auto";
    riddleAnswer.style.width = "300px"; 
    riddleAnswer.style.height = "50px";
    var mazeCanvas = document.getElementById("gameCanvas");
    mazeCanvas.className = "hideMe";
    var boardDiv = document.getElementById("board");
    boardDiv.appendChild(screen);
    boardDiv.appendChild(riddleAnswer);
    var button1 = document.getElementById("up");
    var button2 = document.getElementById("left");
    var button3 = document.getElementById("down");
    var button4 = document.getElementById("right");
    button1.onclick = button1Event;
    button2.onclick = button2Event;
    button3.onclick = button3Event;
    button4.onclick = button4Event;
    button1.value="Submit Answer";
    button1.style.fontSize = "10px";
    button2.value="Carry On";
    button2.style.fontSize = "10px";
    button3.value="";
    button3.style.fontSize = "10px";
    button4.value="";
    button4.style.fontSize = "10px";
    story = document.getElementById("storyText")
    story.innerHTML = "Solve the riddle to add flame to your torch. Carry on and you could turn wrong!";
    //var board = document.getElementById('gameScreen');
    //board.className = "hideMe";
    running = setInterval(riddleChallenge, 1000/FPS);
    
}

function resetButtons(){
    var button1 = document.getElementById("up");
    var button2 = document.getElementById("left");
    var button3 = document.getElementById("down");
    var button4 = document.getElementById("right");
    button1.onclick = buttonUp;
    button2.onclick = buttonLeft;
    button3.onclick = buttonDown;
    button4.onclick = buttonRight;
    button1.value="Up";
    button2.value="Left";
    button3.value="Down";
    button4.value="Right";
}

function button1Event(){
    option = 1;
}

function button2Event(){;
    option = 2;
}

function button3Event(){
    option = 3;
}

function button4Event(){
    option = 4;
}
