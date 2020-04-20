/*
Grid array indices:
g00 | g01 | g02
g10 | g11 | g12
g20 | g21 | g22
*/

const gameBoard = (() => {
    let grid = [[], [], []];
    const reset = () => {
        grid = [[], [], []];
    }
    const set = (row, col, val) => {
        grid[row][col] = val;
    }
    const get = (row, col) => {
        return grid[row][col];
    }
    return {set, get, reset};
})();

const Player = (name, symbol) => {
    return {name, symbol};
}

const gamePlay = (() => {
    let turn = 1;
    let players = [];
    players[0] = Player(prompt("Enter first player's name:"), "X");
    players[1] = Player(prompt("Enter second player's name:"), "O");
    const newTurn = () => {
        return turn++;
    }
    const reset = () => {
        turn = 1;
    }
    const getCurrentPlayer = () => {
        return players[turn % 2];
    }
    const isWinner = () => {
        let win = false;
        let a, b, c;
        // check rows for match ignoring empty positions
        for (let row = 0; row < 3; row++) {
            a = gameBoard.get(row, 0);
            b = gameBoard.get(row, 1);
            c = gameBoard.get(row, 2);
            if (a === b && b === c && a && b && c) win = true;
        }
        // check columns for match ignoring empty positions
        for (let col = 0; col < 3; col++) {
            a = gameBoard.get(0, col);
            b = gameBoard.get(1, col);
            c = gameBoard.get(2, col);
            if (a === b && b === c && a && b && c) win = true;
        }
        // check diagonals for match ignoring empty positions
        a = gameBoard.get(0, 0);
        b = gameBoard.get(1, 1);
        c = gameBoard.get(2, 2);
        if (a === b && b === c && a && b && c) win = true;
        a = gameBoard.get(0, 2);
        b = gameBoard.get(1, 1);
        c = gameBoard.get(2, 0);
        if (a === b && b === c && a && b && c) win = true;
        return win;
    }
    return {turn, reset, newTurn, getCurrentPlayer, isWinner};
})();

const displayController = (() => {
    const player = document.querySelector('#player');
    const display = document.querySelector('#display');
    const resetButton = document.querySelector('button');
    resetButton.addEventListener('click', function() {
        reset();
    });
    player.innerHTML = `${gamePlay.getCurrentPlayer().name}'s Turn (${gamePlay.getCurrentPlayer().symbol})`;
    display.addEventListener('click', function(e) {
        row = Number(e.target.id.split("")[1]);
        col = Number(e.target.id.split("")[2]);
        if (gameBoard.get(row, col) === undefined) {
            s = gamePlay.getCurrentPlayer().symbol
            e.target.innerHTML = s;
            gameBoard.set(row, col, s);
            if (gamePlay.isWinner()) {
                alert(`${gamePlay.getCurrentPlayer().name} wins this round!`);
                reset();
            }
            else if (gamePlay.newTurn() === 9) {
                alert("Draw...");
                reset();
            }
        }
        player.innerHTML = `${gamePlay.getCurrentPlayer().name}'s Turn (${gamePlay.getCurrentPlayer().symbol})`;
    });
    const reset = () => {
        gameBoard.reset();
        gamePlay.reset();
        for (let row = 0; row < 3; row++)
        {
            for (let col = 0; col < 3; col++) {
                display.rows[row].cells[col].innerHTML = "";
            }
        }
    }
})();