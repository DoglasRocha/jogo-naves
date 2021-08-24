
const game = {};
game.pressed = [];

const loop = () => {
    $(document).keydown(function(e) {
        game.pressed[e.which] = true;
    });
    
    
    $(document).keyup(function(e){
       game.pressed[e.which] = false;
    });
    
    moveBackground();
    movePlayer()
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

const KEYS = {
    W: 87, 
    S: 83,
    D: 68
}

const start = () => {
    $('.beginning').hide(); // hides the "inicio" div

    // appends the "player", "enemy1", "enemy2" and "friend" divs in the "game-background" div
    $('.game-background').append('<div id="player" class="animation1";></div>');
    $('.game-background').append('<div id="enemy1" class="animation2"></div>');
    $('.game-background').append('<div id="enemy2" ></div>');
    $('.game-background').append('<div id="friend" class="animation3"></div>');
}

