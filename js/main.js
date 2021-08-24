const game = {};
game.pressed = [];
const KEYS = {
    W: 87, 
    S: 83,
    D: 68
}
var speed = 5;
var yPosition = parseInt(Math.random() * 334);

const loop = () => {
    $(document).keydown(function(e) {
        game.pressed[e.which] = true;
    });
    
    
    $(document).keyup(function(e){
       game.pressed[e.which] = false;
    });
    
    moveBackground();
    movePlayer();
    moveEnemy1();
}

game.timer = setInterval(loop, 30); 

const moveBackground = () => {
    left = parseInt($('.game-background').css('background-position'));
    $('.game-background').css('background-position', left - 1);
}

const movePlayer = () => {
    if (game.pressed[KEYS.W]) {
        let top = parseInt($("#player").css("top"));
        if (top > 10) {
            $("#player").css("top", top - 10);
        }
    }
    
    if (game.pressed[KEYS.S]) {
        let top = parseInt($("#player").css("top"));
        if (top < 434) {
            $("#player").css("top", top + 10);	
        }
    }
    
    if (game.pressed[KEYS.D]) {
        
        //Chama função Disparo	
    }

}

const moveEnemy1 = () => {
    xPosition = parseInt($('#enemy1').css('left'));
    $('#enemy1').css('left', xPosition - speed);
    $('#enemy1').css('top', yPosition);
    
    if (xPosition <= 0) {
        yPosition = parseInt(Math.random() * 334);
        $('#enemy1').css('left', 694);
        $('#enemy1').css('top', yPosition);
    }
    
}

const start = () => {
    $('.beginning').hide(); // hides the "inicio" div

    // appends the "player", "enemy1", "enemy2" and "friend" divs in the "game-background" div
    $('.game-background').append('<div id="player" class="animation1";></div>');
    $('.game-background').append('<div id="enemy1" class="animation2"></div>');
    $('.game-background').append('<div id="enemy2" ></div>');
    $('.game-background').append('<div id="friend" class="animation3"></div>');
}

