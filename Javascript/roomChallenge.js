var choiceNo = 0;
var choiceSelection = 0;
var wrongPotion = 3;

function startRoomChal() {
    console.log("poop")
    challengeStarted = true;
    var chalStartVisuals = document.getElementById('startRoomVisualiser')
    chalStartVisuals.style.display = "initial";
    var boardDisplay = document.getElementById('board');
    boardDisplay.style.display = "none";
    var buttonDisplay = document.getElementById('buttons');
    buttonDisplay.style.display = "none";

    if(currentLanguage == 'English') {
        var story = document.getElementById("storyText")
        story.innerHTML = "The floor opens up beneath you and you fall down the trap into a dark room";
    } else if(currentLanguage == 'Spanish') {
        var story = document.getElementById("storyText")
        story.innerHTML = "";
    }

    setTimeout(roomChal, 4000);
}

function roomChal() {
    var chalStartVisuals = document.getElementById('startRoomVisualiser')
    chalStartVisuals.style.display = "none";
    var roomChoices = document.getElementById('roomTextChoice')
    roomChoices.style.display = "initial";

    if(currentLanguage == 'English') {
        var story = document.getElementById("storyText")
        story.innerHTML = "There appears to be some form of statue in the middle of the room and behind it there is a ladder at the back of the room. However, the ladder is being blocked by some form of gate. There must be a way to open the gate and climb out back into the maze. What would you like to do: ";
    } else if(currentLanguage == 'Spanish') {
        var story = document.getElementById("storyText")
        story.innerHTML = "";
    }
}

function choice1() {
    if(choiceNo == 0) {
        var text = document.getElementById('decision');
        text.value = "Search the room"
    } else if (choiceNo == 1) {
        var text = document.getElementById('decision');
        text.value = "Read the book"
    } else if (choiceNo == 2) {
        var text = document.getElementById('decision');
        text.value = "Use Potion 1";
    }

    var bookPart = document.getElementById('choice1');
    if(bookPart.innerHTML == "Pull Lever") {
        var text = document.getElementById('decision');
        text.value = "Pull Lever";
    }

    
}
function choice2() {
    if(choiceNo == 0) {
        var text = document.getElementById('decision');
        text.value = "Investigate the statue"
    } else if (choiceNo == 1) {
        var text = document.getElementById('decision');
        text.value = "Pick up key";
    } else if (choiceNo == 2) {
        var text = document.getElementById('decision');
        text.value = "Use Potion 2";
    }

    var keyPart = document.getElementById('choice2');
    if(keyPart.innerHTML == "Use key") {
        var text = document.getElementById('decision');
        text.value = "Use key";
    }
    if(keyPart.innerHTML == "Return to maze") {
        var text = document.getElementById('decision');
        text.value = "Return to maze";
    }
    
}
function choice3() {
    if(choiceNo == 0) {
        var text = document.getElementById('decision');
        text.value = ""
    } else if (choiceNo == 1) {
        var text = document.getElementById('decision');
        text.value = "Pick up chizel";
    } else if (choiceNo == 2) {
        var text = document.getElementById('decision');
        text.value = "Use Potion 3";
    }
    
}
function choice4() {
    if(choiceNo == 0) {
        var text = document.getElementById('decision');
        text.value = ""
    } else if (choiceNo == 1) {
        var text = document.getElementById('decision');
        text.value = "Pick up map";
    } else if (choiceNo == 2) {
        var text = document.getElementById('decision');
        text.value = "Use Potion 4";
    }

    var wallPart = document.getElementById('choice4');
    if(wallPart.innerHTML == "Investigate wall") {
        var text = document.getElementById('decision');
        text.value = "Investigate wall";
    }
    
}

function submitChoice() {
    var choiceChosen = document.getElementById('decision');
    if(choiceChosen.value == "Search" || choiceChosen.value == "Search the room") {
        var text = document.getElementById('decision');
        text.value = "";
        if(currentLanguage == 'English') {
            var story = document.getElementById("storyText")
            story.innerHTML = "You shine your torch around the room trying to find clues as to a way out. Notable items in the room were: A greek mythology book, a key, a map";
        } else if(currentLanguage == 'Spanish') {
            var story = document.getElementById("storyText")
            story.innerHTML = "";
        }
        
        if (choiceSelection == 1) {
            document.getElementById('choice1').innerHTML = "Read the book";
            document.getElementById('choice2').innerHTML = "Pick up key";
            document.getElementById('choice3').innerHTML = "Pick up chizel";
            document.getElementById('choice4').innerHTML = "Pick up map";
            choiceNo = 1;
        }
        choiceSelection = 1;
    } else if(choiceChosen.value == "Investigate" || choiceChosen.value == "Investigate the statue") {
        var text = document.getElementById('decision');
        text.value = "";
        if(currentLanguage == 'English') {
            var story = document.getElementById("storyText")
            story.innerHTML = "At a closer glance it isn't any ordinary statue. Infact it's not a statue at all. It appears to be a frozen man. More interestingly this man is bent down holding onto a lever. That must be the lever to open the gate!";
        } else if(currentLanguage == 'Spanish') {
            var story = document.getElementById("storyText")
            story.innerHTML = "";
        }
    
        if (choiceSelection == 1) {
            document.getElementById('choice1').innerHTML = "Read the book";
            document.getElementById('choice2').innerHTML = "Pick up key";
            document.getElementById('choice3').innerHTML = "Pick up chizel";
            document.getElementById('choice4').innerHTML = "Pick up map";
            choiceNo = 1;
        }
        choiceSelection = 1;
    }

    if(choiceChosen.value == "Book" || choiceChosen.value == "Read the book") {
        var text = document.getElementById('decision');
        text.value = "";
        if(currentLanguage == 'English') {
            var story = document.getElementById("storyText")
            story.innerHTML = "The books goes in detail on a curse called 'Petrification' by the greek monster Medusa, the frozen man must have been cursed! The book goes into detail as to the only way to break the curse is with the 'Restoritive Potion'";
        } else if(currentLanguage == 'Spanish') {
            var story = document.getElementById("storyText")
            story.innerHTML = "";
        }
    } else if(choiceChosen.value == "Key" || choiceChosen.value == "Pick up key") {
        var text = document.getElementById('decision');
        text.value = "";
        if(currentLanguage == 'English') {
            var story = document.getElementById("storyText")
            story.innerHTML = "I wonder if the key will work on the gate?";
        } else if(currentLanguage == 'Spanish') {
            var story = document.getElementById("storyText")
            story.innerHTML = "";
        }
        document.getElementById('choice2').innerHTML = "Use key";
    } else if(choiceChosen.value == "Key" || choiceChosen.value == "Use key") {
        var text = document.getElementById('decision');
        text.value = "";
        if(currentLanguage == 'English') {
            var story = document.getElementById("storyText")
            story.innerHTML = "CLUNK <br> The key doesn't fit. There must be another way to open the gate";
        } else if(currentLanguage == 'Spanish') {
            var story = document.getElementById("storyText")
            story.innerHTML = "";
        }
    } else if(choiceChosen.value == "Chizel" || choiceChosen.value == "Pick up chizel") {
        var text = document.getElementById('decision');
        text.value = "";
        if(currentLanguage == 'English') {
            var story = document.getElementById("storyText")
            story.innerHTML = "I don't think you have enough time to chizel the man out of the stone";
        } else if(currentLanguage == 'Spanish') {
            var story = document.getElementById("storyText")
            story.innerHTML = "";
        }
    } else if(choiceChosen.value == "Map" || choiceChosen.value == "Pick up map") {
        var text = document.getElementById('decision');
        text.value = "";
        if(currentLanguage == 'English') {
            var story = document.getElementById("storyText")
            story.innerHTML = "It's a map of the room. However, this map shows there is another room attached to the left wall but there is no door to access it. There must be someway to get to the room";
        } else if(currentLanguage == 'Spanish') {
            var story = document.getElementById("storyText")
            story.innerHTML = "";
        }
        document.getElementById('choice4').innerHTML = "Investigate wall";
    } else if(choiceChosen.value == "Wall" || choiceChosen.value == "Investigate wall") {
        var text = document.getElementById('decision');
        text.value = "";
        if(currentLanguage == 'English') {
            var story = document.getElementById("storyText")
            story.innerHTML = "There is a loose stone in the wall, you push it in and all of a sudden the wall has vanished and you see a brewing stand with 4 potions sitting in the middle of the secret room.";
        } else if(currentLanguage == 'Spanish') {
            var story = document.getElementById("storyText")
            story.innerHTML = "";
        }
        document.getElementById('choice1').innerHTML = "Use Potion 1";
        document.getElementById('choice2').innerHTML = "Use Potion 2";
        document.getElementById('choice3').innerHTML = "Use Potion 3";
        document.getElementById('choice4').innerHTML = "Use Potion 4";
        choiceNo = 2;
    }

    if(choiceChosen.value == "Use Potion 1" || choiceChosen.value == "Use Potion 3" || choiceChosen.value == "Use Potion 4") {
        var text = document.getElementById('decision');
        text.value = "";
        if(currentLanguage == 'English') {
            var story = document.getElementById("storyText")
            story.innerHTML = "Potion had no effect on the statue";
        } else if(currentLanguage == 'Spanish') {
            var story = document.getElementById("storyText")
            story.innerHTML = "";
        }
        wrongPotion--;
    } else if (choiceChosen.value == "Use Potion 2") {
        var text = document.getElementById('decision');
        text.value = "";
        if(currentLanguage == 'English') {
            var story = document.getElementById("storyText")
            story.innerHTML = "The Potion worked, the stone around the man and lever started cracking! This must be the 'Restorative Potion'! Using the chizel you could easily free the stone surrounding the lever";
        } else if(currentLanguage == 'Spanish') {
            var story = document.getElementById("storyText")
            story.innerHTML = "";
        }
        document.getElementById('choice1').innerHTML = "Pull Lever";
        document.getElementById('choice2').innerHTML = "N/A";
        document.getElementById('choice3').innerHTML = "N/A";
        document.getElementById('choice4').innerHTML = "N/A";
    }

    if(choiceChosen.value == "Pull Lever") {
        var text = document.getElementById('decision');
        text.value = "";
        if(currentLanguage == 'English') {
            var story = document.getElementById("storyText")
            story.innerHTML = "The gate blocking the ladder began to rise. You can now return to the maze";
        } else if(currentLanguage == 'Spanish') {
            var story = document.getElementById("storyText")
            story.innerHTML = "";
        }
        document.getElementById('choice2').innerHTML = "Return to maze";
    }

    if(choiceChosen.value == "Return to maze") {
        var text = document.getElementById('decision');
        text.value = "";
        if(currentLanguage == 'English') {
            var story = document.getElementById("storyText")
            story.innerHTML = "You climb the ladder and return to the maze. You decide to poor any left over potion on your torch to see if it has an effect";
        } else if(currentLanguage == 'Spanish') {
            var story = document.getElementById("storyText")
            story.innerHTML = "";
        }

        if(wrongPotion>0) {
            torchStrength += wrongPotion*20;
        }

        endRoomChallenge();
    }


}

function endRoomChallenge() {
    choiceNo = 0;
    choiceSelection = 0;
    wrongPotion = 3;
    document.getElementById('choice1').innerHTML = "Search";
    document.getElementById('choice2').innerHTML = "Investigate";
    document.getElementById('choice3').innerHTML = "N/A";
    document.getElementById('choice4').innerHTML = "N/A";

    var boardDisplay = document.getElementById('board');
    var buttonDisplay = document.getElementById('buttons');
    var roomChoices = document.getElementById('roomTextChoice')
    challengeStarted = false;
    boardDisplay.style.display = "revert";
    buttonDisplay.style.display = "revert";
    roomChoices.style.display = "none";
}