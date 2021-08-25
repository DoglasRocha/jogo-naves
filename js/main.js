const game = {};
game.pressed = [];
const KEYS = {
    W: 87, 
    S: 83,
    D: 68
}
var speed = 5;
var yPosition = parseInt(Math.random() * 334);
var canShoot = true;
var shootTime;

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
    moveEnemy2();
    moveFriend();
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
        shoot()
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

const moveEnemy2 = () => {
    xPosition = parseInt($('#enemy2').css('left'));
    $('#enemy2').css('left', xPosition - 3);

    if (xPosition <= 0) {
        $('#enemy2').css('left', 775);
    }
}

const moveFriend = () => {
    xPosition = parseInt($('#friend').css('left'));
    $('#friend').css('left', xPosition + 1);

    if (xPosition > 906) {
        $('#friend').css('left', 0);
    }
}

const shoot = () => {
    if (canShoot) {
        canShoot = false;

        let top = parseInt($('#player').css('top'));
        xPosition = parseInt($('#player').css('left'));
        let shootX = xPosition + 190;
        let shootTop = top + 46;
        $('.game-background').append('<div id="shoot"></div>');
        console.log('aaaa')
        $('#shoot').css('top', shootTop);
        $('#shoot').css('left', shootX);

        shootTime = window.setInterval(doShoot, 30);
    }
}

const doShoot = () => {
    console.log('a')
    xPosition = parseInt($('#shoot').css('left'));
    $('#shoot').css('left', xPosition + 15);

    if (xPosition > 900) {
        window.clearInterval(shootTime);
        shootTime = null;
        $('#shoot').remove();
        canShoot = true;
        console.log('aaa')
    }
}

const start = () => {
    $('.beginning').hide(); // hides the "beggining" div

    // appends the "player", "enemy1", "enemy2" and "friend" divs in the "game-background" div
    $('.game-background').append('<div id="player" class="animation1";></div>');
    $('.game-background').append('<div id="enemy1" class="animation2"></div>');
    $('.game-background').append('<div id="enemy2" ></div>');
    $('.game-background').append('<div id="friend" class="animation3"></div>');
}

