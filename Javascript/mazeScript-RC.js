let levels = []; //will have 3 properties: map, player coords, goal coords

levels[0] = {
  map:[ 
     [1,0,0,1,1], //0 represents a floor tile, 1 represents a wall tile
     [0,0,1,1,1],
     [0,1,0,0,0],
     [0,0,0,1,0],
     [1,1,1,0,0],
     [1,1,0,0,1]
  ],
  player: {
     x:2,
     y:5
  },
  goal:{
    x:2,
    y:0
  },
  theme:'default'
};

function Game(id, level) {
  
    this.el = document.getElementById(id);
  
    this.tileTypes = ['floor','wall'];
  
    this.tileDim = 60;
  
    // inherit the level's properties: map, player start, goal start.
    this.map = level.map;
    this.theme = level.theme
    this.player = {...level.player};
    this.goal = {...level.goal};
}

Game.prototype.populateMap = function() {
  
    this.el.className = 'game-container ' + this.theme;
  
    let tiles = document.getElementById('tiles');
  
    for (var y = 0; y < this.map.length; ++y) { //creating and adding tiles 
    
        for (var x = 0; x < this.map[y].length; ++x) {
              
            let tileCode = this.map[y][x];
       
            let tileType = this.tileTypes[tileCode];
       
            let tile = this.createEl(x, y, tileType); //place right tile on right spot
       
            tiles.appendChild(tile); // add to tile layer
        }
    }
}

Game.prototype.createEl = function(x,y,type) {
    // create one tile.
    let el = document.createElement('div');
       
    // two class names: one for tile, one or the tile type.
    el.className = type;
  
    // set width and height of tile based on the passed-in dimensions.
    el.style.width = el.style.height = this.tileDim + 'px';
  
    // set left positions based on x coordinate.
    el.style.left = x*this.tileDim + 'px';
  
    // set top position based on y coordinate.
    el.style.top = y*this.tileDim + 'px';
      
    return el;
}

Game.prototype.sizeUp = function() {
  
    // inner container so that text can be below it
    let map  = this.el.querySelector('.game-map');
  
    // inner container, height. Need this.map
    map.style.height = this.map.length * this.tileDim + 'px';
   
    map.style.width = this.map[0].length * this.tileDim + 'px';
}

Game.prototype.placeSprite = function(type) {
    let x = this[type].x
    let y = this[type].y

    let sprite = this.createEl(x, y, type);
    sprite.id = type;
    sprite.style.borderRadius = this.tileDim + 'px';

    let layer = this.el.querySelector('#sprites');
    layer.appendChild(sprite);

    return sprite;
}

// Game.prototype.movePlayer = function(event) {
//     event.preventDefault();
//     if(event.keyCode < 37 || event.keyCode > 40) {
//         return;
//     } 

//     switch (event.keyCode) {
//         case 37: 
//         this.moveLeft();
//         break;

//         case 38: 
//         this.moveUp();
//         break;

//         case 39: 
//         this.moveRight();
//         break;

//         case 40: 
//         this.moveDown();
//         break;

//     }
// }

Game.prototype.moveLeft = function(sprite) {
    //boundary detection
    if(this.player.x == 0) {
        return;
    }
    //wall detection
    let nextTile = this.map[this.player.y][this.player.x - 1];
    if(nextTile == 1) {
        this.player.x = 2;
        this.player.y = 5;
        this.updateToStart();
        return;
    }
    //update player position
    this.player.x -= 1;
    //update player position in DOM
    this.updateHoriz(sprite);
}

Game.prototype.moveUp = function() {
    //boundary detection
    if(this.player.y == 0) {
        return;
    }
    //wall detection
    let nextTile = this.map[this.player.y-1][this.player.x];
    if(nextTile == 1) {
        this.player.x = 2;
        this.player.y = 5;
        this.updateToStart();
        return;
    }
    //update player position
    this.player.y -= 1;
    //update player position in DOM
    this.updateVert();
}

Game.prototype.moveRight = function(sprite) {
    //boundary detection
    if(this.player.x == this.map[this.player.y].length - 1) {
        return;
    }
    //wall detection
    let nextTile = this.map[this.player.y][this.player.x + 1];
    if(nextTile == 1) {
        this.player.x = 2;
        this.player.y = 5;
        this.updateToStart();
        return;
    }
    //update player position
    this.player.x += 1;
    //update player position in DOM
    this.updateHoriz(sprite);
}

Game.prototype.moveDown = function() {
    //boundary detection
    if(this.player.y == this.map.length - 1) {
        return;
    }
    //wall detection
    let nextTile = this.map[this.player.y+1][this.player.x];
    if(nextTile == 1) {
        this.player.x = 2;
        this.player.y = 5;
        this.updateToStart();
        return;
    }
    //update player position
    this.player.y += 1;
    //update player position in DOM
    this.updateVert();
}

Game.prototype.updateVert = function() {
    this.player.el.style.top = this.player.y * this.tileDim + 'px';
    if(currentLanguage == 'English') {
        var story = document.getElementById("storyText")
        story.innerHTML = "This pressure plate seems safe";
    } else if(currentLanguage == 'Spanish') {
        var story = document.getElementById("storyText")
        story.innerHTML = "Esta placa de presión parece segura";
    }
}

Game.prototype.updateHoriz = function(sprite) {
    this.player.el.style.left = this.player.x * this.tileDim + 'px';
    if(currentLanguage == 'English') {
        var story = document.getElementById("storyText")
        story.innerHTML = "This pressure plate seems safe";
    } else if(currentLanguage == 'Spanish') {
        var story = document.getElementById("storyText")
        story.innerHTML = "Esta placa de presión parece segura";
    }
}

Game.prototype.updateToStart = function() {
    this.player.el.style.top = this.player.y * this.tileDim + 'px';
    this.player.el.style.left = this.player.x * this.tileDim + 'px';
    if(currentLanguage == 'English') {
        var story = document.getElementById("storyText")
        story.innerHTML = "The pressure plate is a trapdoor, the floor disappears beneath your feet and suddenly your dropped back at the start. Some pressure plates must be dummies";
    } else if(currentLanguage == 'Spanish') {
        var story = document.getElementById("storyText")
        story.innerHTML = "La placa de presión es una trampilla, el suelo desaparece bajo tus pies y de repente te vuelves a caer al principio. Algunas placas de presión deben ser ficticias";
    }
}

Game.prototype.checkGoal = function() {
    let body = document.querySelector('body');

    if(this.player.y == this.goal.y && this.player.x == this.goal.x) {
        body.className = 'success';
        challengeProgress = true;
        
    } else {
        body.className = '';
    }
}

// Game.prototype.keyboardListener = function() {
//     document.addEventListener('keydown', event => {
//         this.movePlayer(event);

//         this.checkGoal();
//     });
// }

Game.prototype.buttonListeners = function() {
    let up = document.getElementById('upMaze');
    let left = document.getElementById('leftMaze');
    let right = document.getElementById('rightMaze');
    let down = document.getElementById('downMaze');

    let obj = this;
  
    up.addEventListener('mousedown',function() {
        obj.moveUp();
        obj.checkGoal();   
    });
  
    down.addEventListener('mousedown',function() {
        obj.moveDown();
        obj.checkGoal();   
    });
  
    left.addEventListener('mousedown',function() {
        obj.moveLeft();
        obj.checkGoal();   
    });
  
    right.addEventListener('mousedown',function() {
        obj.moveRight();
        obj.checkGoal();   
    });
}

function init() {
    let myGame = new Game('game-container-1',levels[0]);
    
    myGame.populateMap();
  
    myGame.sizeUp();

    myGame.placeSprite('goal');

    let playerSprite = myGame.placeSprite('player');
    myGame.player.el = playerSprite;

    //myGame.keyboardListener();

    myGame.buttonListeners();

   
}
init();