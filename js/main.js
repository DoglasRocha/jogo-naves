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
var gameOver = false;

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
    collision();
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
        $('#shoot').css('top', shootTop);
        $('#shoot').css('left', shootX);

        shootTime = window.setInterval(doShoot, 30);
    }
}

const doShoot = () => {
    xPosition = parseInt($('#shoot').css('left'));
    $('#shoot').css('left', xPosition + 15);

    if (xPosition > 900) {
        window.clearInterval(shootTime);
        shootTime = null;
        $('#shoot').remove();
        canShoot = true;
    }
}

const collision = () => {
    let collision1 = ($('#player').collision($('#enemy1')));
    let collision2 = ($('#player').collision($('#enemy2')));
    let collision3 = ($('#shoot').collision($('#enemy1')));
    let collision4 = ($('#shoot').collision($('#enemy2')));
    let collision5 = ($('#player').collision($('#friend')));
    let collision6 = ($('#enemy2').collision($('#friend')));

    if (collision1.length > 0) {
        let xEnemy1 = parseInt($('#enemy1').css('left'));
        let yEnemy1 = parseInt($('#enemy1').css('top'));
        explosion1(xEnemy1, yEnemy1);

        yPosition = parseInt(Math.random() * 334);
        $('#enemy1').css('left', 694);
        $('#enemy1').css('top', yPosition);
    }

    if (collision2.length > 0) {
        let xEnemy2 = parseInt($('#enemy2').css('left'));
        let yEnemy2 = parseInt($('#enemy2').css('top'));
        explosion2(xEnemy2, yEnemy2);

        $('#enemy2').remove();

        repositionateEnemy2();
    }

    if (collision3.length > 0) {
        let xEnemy1 = parseInt($('#enemy1').css('left'));
        let yEnemy1 = parseInt($('#enemy1').css('top'));

        explosion1(xEnemy1, yEnemy1);
        $('#shoot').css('left', 950);

        yPosition = parseInt(Math.random() * 334);
        $('#enemy1').css('left', 694);
        $('#enemy1').css('top', yPosition);
    }

    if (collision4.length > 0) {
        let xEnemy2 = parseInt($('#enemy2').css('left'));
        let yEnemy2 = parseInt($('#enemy2').css('top'));
        
        explosion2(xEnemy2, yEnemy2);
        $('#enemy2').remove();
        $('#shoot').css('left', 950);

        repositionateEnemy2();
    }

    if (collision5.length > 0) {
        repositionateFriend();
        $('#friend').remove();
    }

    if (collision6.length > 0) {
        let xFriend = parseInt($('#friend').css('left'));
        let yFriend = parseInt($('#friend').css('top'));
        explosion3(xFriend, yFriend);

        $('#friend').remove();

        repositionateFriend();
    }

}

const explosion1 = (xEnemy1, yEnemy1) => {

    const removeExplosion = () => {
        div.remove();
        window.clearInterval(explosionTime);
        explosionTime = null;
    }

    $('.game-background').append('<div id="explosion1"></div>');
    $('#explosion1').css('background-image', 'url(imgs/explosao.png)');
    let div = $('#explosion1');
    div.css('top', yEnemy1);
    div.css('left', xEnemy1);
    div.animate({width: 200, opacity: 0}, 'slow');

    let explosionTime = window.setInterval(removeExplosion, 1000);
}

const explosion2 = (xEnemy2, yEnemy2) => {
    
    const removeExplosion2 = () => {
        div2.remove();
        window.clearInterval(explosionTime2);
        explosionTime2 = null;
    }
    
    $('.game-background').append('<div id="explosion2"></div>');
    $('#explosion2').css('background-image', 'url(imgs/explosao.png)');
    let div2 = $('#explosion2');
    div2.css('top', yEnemy2);
    div2.css('left', xEnemy2);
    div2.animate({width: 200, opacity: 0}, 'slow');

    let explosionTime2 = window.setInterval(removeExplosion2, 1000);
}

const explosion3 = (xFriend, yFriend) => {

    const resetExplosion3 = () => {
        $('#explosion3').remove();;
        window.clearInterval(explosionTime3);
        explosionTime3 = null;
    }

    $('.game-background').append('<div id="explosion3" class="animation4"></div>');
    $('#explosion3').css('top', yFriend);
    $('#explosion3').css('left', xFriend);

    let explosionTime3 = window.setInterval(resetExplosion3, 1000);
}

const repositionateEnemy2 = () => {

    const repositionate4 = () => {
        window.clearInterval(collision4time);
        collision4time = null;

        if (!gameOver) {
            $('.game-background').append('<div id="enemy2"></div>');
        }
    }

    let collision4time = window.setInterval(repositionate4, 5000);
}

const repositionateFriend = () => {

    const repositionate6 = () => {
        window.clearInterval(friendTime);
        friendTime = null;

        if (!gameOver) {
            $('.game-background').append('<div id="friend" class="animation3"></div>');
        }
    }

    let friendTime = window.setInterval(repositionate6, 6000);
}

const start = () => {
    $('.beginning').hide(); // hides the "beggining" div

    // appends the "player", "enemy1", "enemy2" and "friend" divs in the "game-background" div
    $('.game-background').append('<div id="player" class="animation1";></div>');
    $('.game-background').append('<div id="enemy1" class="animation2"></div>');
    $('.game-background').append('<div id="enemy2" ></div>');
    $('.game-background').append('<div id="friend" class="animation3"></div>');
}

