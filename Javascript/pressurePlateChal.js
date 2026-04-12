var challengeProgress = false;
var running;


function startPressurePChal() {
    challengeStarted = true;
    returnx = charx;
    returny = chary;    
    var visualAidScreen = document.getElementById('pressurepVisualiser')
    visualAidScreen.className = 'showMe';
    var boardDisplay = document.getElementById('board');
    boardDisplay.style.display = "none";
    var buttonDisplay = document.getElementById('buttons');
    buttonDisplay.style.display = "none";

    if(currentLanguage == 'English') {
        var story = document.getElementById("storyText")
        story.innerHTML = "There appears to be a grid of Pressure Plates blocking the path in the corridor. There appears to be a trapdoor on the right saying: 'Skip but there will be consequences!'. Do you dare take on the challenge or risk the consequences?";
    } else if(currentLanguage == 'Spanish') {
        var story = document.getElementById("storyText")
        story.innerHTML = "Parece que hay una cuadrícula de placas de presión bloqueando el camino en el corredor. Parece haber una trampilla a la derecha que dice: '¡Sáltate pero habrá consecuencias!'. ¿Te atreves a asumir el reto o te arriesgas a las consecuencias?";
    }
    
}

function enterChallenge() {
    var visualAidScreen = document.getElementById('pressurepVisualiser')
    visualAidScreen.className = 'hideMe';
    var pressurepGame = document.getElementById('game-container-1');
    pressurepGame.style.display = "initial";

    if(currentLanguage == 'English') {
        var story = document.getElementById("storyText")
        story.innerHTML = "This pressure plate seems solid";
    } else if(currentLanguage == 'Spanish') {
        var story = document.getElementById("storyText")
        story.innerHTML = "Esta placa de presión parece sólida";
    }

    running = setInterval(endPressurePChal, 1000);
}

function endPressurePChal() {
    var pressurepGame = document.getElementById('game-container-1');
    var boardDisplay = document.getElementById('board');
    var buttonDisplay = document.getElementById('buttons');
    var story = document.getElementById("storyText")    
    if(challengeProgress == true) {
        clearInterval(running);
        challengeStarted = false;
        charx = returnx;
        chary = returny;
        pressurepGame.style.display = "none";
        boardDisplay.style.display = "revert";
        buttonDisplay.style.display = "revert";
        if(currentLanguage == 'English') {
            story.innerHTML = "Phew, you made it";
        } else if(currentLanguage == 'Spanish') {
            story.innerHTML = "Uf, lo lograste";
        }
        //visionTimer();
        torchStrength += 30;
        
    }
}

function skipPlateChallenge() {
    var visualAidScreen = document.getElementById('pressurepVisualiser')
    var pressurepGame = document.getElementById('game-container-1');
    var boardDisplay = document.getElementById('board');
    var buttonDisplay = document.getElementById('buttons');
    visualAidScreen.className = 'hideMe';
    pressurepGame.style.display = "none";
    boardDisplay.style.display = "revert";
    buttonDisplay.style.display = "revert";
    challengeStarted = false;
    charx = returnx;
    chary = returny;
    torchStrength = 50;
    if(currentLanguage == 'English') {
        var story = document.getElementById("storyText")
        story.innerHTML = "You skipped and your torch was weakened squeezing in the trapdoor, now enjoy a lack of visibility";
    } else if(currentLanguage == 'Spanish') {
        var story = document.getElementById("storyText")
        story.innerHTML = "Te saltaste y tu antorcha se debilitó apretando la trampilla, ahora disfruta de la falta de visibilidad";
    }
}

/*var visionTimerInterval;
var visionDuration;

function visionTimer() {
    visionDuration = 5;
    visionTimerInterval = setInterval('visionCountdown()', 1000);
}
function visionStopTimer() {
    clearInterval(visionTimerInterval);
}
function visionCountdown() {
    visionDuration--;
    if (visionDuration >= 0) {
        if(torchStrength == 150) {
            torchStrength = 300;
        } else if (torchStrength == 300) {
            torchStrength = 150;
        }
    } else {
        torchStrength = 150;
        visionStopTimer();
    }
}*/