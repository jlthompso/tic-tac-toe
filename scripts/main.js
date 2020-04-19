/*
Grid array indices:
0 | 1 | 2
3 | 4 | 5
6 | 7 | 8
*/

const gameBoard = (() => {
    let grid = [];
    return {grid};
})();

const Player = (name, symbol) => {
    return {name, symbol};
}

const gamePlay = (() => {
    let turn = 0;
    let players = [];
    players[0] = Player(prompt("Enter first player's name:"), "X");
    players[1] = Player(prompt("Enter first player's name:"), "O");
    function newTurn() {
        turn = Number(!turn);
    }
    function getCurrentPlayer() {
        return players[turn];
    }
    return {newTurn, getCurrentPlayer};
})();

const displayController = (() => {
    const player = document.querySelector('#player');
    const display = document.querySelector('#display');
    player.innerHTML = `${gamePlay.getCurrentPlayer().name}'s Turn (${gamePlay.getCurrentPlayer().symbol})`;
    display.addEventListener('click', function(e) {
        gridIndex = Number(e.target.id.split("")[1]); // remove g from cell id
        if (typeof gameBoard.grid[gridIndex] === 'undefined') {
            s = gamePlay.getCurrentPlayer().symbol
            e.target.innerHTML = s;
            gameBoard.grid[gridIndex] = s;
            gamePlay.newTurn();
        }
        player.innerHTML = `${gamePlay.getCurrentPlayer().name}'s Turn (${gamePlay.getCurrentPlayer().symbol})`;
    });
})();