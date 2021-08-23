const start = () => {
    $('.beginning').hide(); // hides the "inicio" div

    // appends the "player", "enemy1", "enemy2" and "friend" divs in the "game-background" div
    $('.game-background').append('<div id="player"></div>');
    $('.game-background').append('<div id="enemy1"></div>');
    $('.game-background').append('<div id="enemy2"></div>');
    $('.game-background').append('<div id="friend"></div>');
}