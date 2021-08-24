const moveBackground = () => {
    left = parseInt($('.game-background').css('background-position'));
    $('.game-background').css('background-position', left - 1);
}

class Game {


    constructor() {
        this.game = {};
        this.timer = setInterval(this.loop, 30);
    }

    loop() {
        moveBackground();
    }

}

const start = () => {
    $('.beginning').hide(); // hides the "inicio" div

    // appends the "player", "enemy1", "enemy2" and "friend" divs in the "game-background" div
    $('.game-background').append('<div id="player" class="animation1";></div>');
    $('.game-background').append('<div id="enemy1" class="animation2"></div>');
    $('.game-background').append('<div id="enemy2" ></div>');
    $('.game-background').append('<div id="friend" class="animation3"></div>');

    let game = new Game();
}

