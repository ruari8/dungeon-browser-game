var posMoves = [];
var checkx, checky;
var lastMove;
var moveDelay = 250; //ms

const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}

function checkChoices(from){
    posMoves = [];
    checkDown();
    checkUp();
    checkLeft();
    checkRight();
    if(posMoves.length < 3){
        if(posMoves[0] === from)return posMoves[1];
        else if(posMoves[1] === from)return posMoves[0];                            
    }    
    else if(posMoves.length>2)return null;
}

function checkDown(){
    checkx = charx;
    checky = chary + charSize;
    var canvas = gameCanvas.getContext('2d');
    var colour = canvas.getImageData(checkx, checky, 1, 1).data;
    if(colour[0] === floorColourQ[0] && colour[1] === floorColourQ[1] && colour[2] === floorColourQ[2]){
        posMoves.push('down');
    }
}

function checkUp(){
    checkx = charx;
    checky = chary - 1;
    var canvas = gameCanvas.getContext('2d');
    var colour = canvas.getImageData(checkx, checky, 1, 1).data;
    if(colour[0] === floorColourQ[0] && colour[1] === floorColourQ[1] && colour[2] === floorColourQ[2]){
        posMoves.push('up');
    }
}

function checkLeft(){
    checkx = charx - 1;
    checky = chary;
    var canvas = gameCanvas.getContext('2d');
    var colour = canvas.getImageData(checkx, checky, 1, 1).data;
    if(colour[0] === floorColourQ[0] && colour[1] === floorColourQ[1] && colour[2] === floorColourQ[2]){
        posMoves.push('left');
    }
}

function checkRight(){
    checkx = charx + charSize;
    checky = chary;
    var canvas = gameCanvas.getContext('2d');
    var colour = canvas.getImageData(checkx, checky, 1, 1).data;
    if(colour[0] === floorColourQ[0] && colour[1] === floorColourQ[1] && colour[2] === floorColourQ[2]){
        posMoves.push('right');
    }
}

async function buttonLeft(){
    move('left');
    await sleep(moveDelay);
    direction = checkChoices('right');
    while(direction!=null){
        move(direction);
        direction = checkChoices(lastMove);
        update('challenge');
        await sleep(moveDelay);
    }
}

async function buttonRight(){
    move("right");
    await sleep(moveDelay);
    direction = checkChoices('left');
    while(direction!=null){
        move(direction);
        direction = checkChoices(lastMove);
        update('challenge');
        await sleep(moveDelay);
    }
}

async function buttonUp(){
    move("up");
    await sleep(moveDelay);
    direction = checkChoices('down');
    while(direction!=null){
        move(direction);
        direction = checkChoices(lastMove);
        update('challenge');
        await sleep(moveDelay);
    }
}

async function buttonDown(){
    move("down");
    await sleep(moveDelay);
    direction = checkChoices('up');
    while(direction!=null){
        move(direction);
        direction = checkChoices(lastMove);
        update('challenge');
        await sleep(moveDelay);
    }
}

//just some code to map the buttons on the html page to keypresses

