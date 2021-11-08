//gameBoard object created with a module pattern, as we only
//want one gameBoard at an given time
let gameBoard = (() => {
    //e for empty, x, o
    let gameboard = ['', '', '', '', '', '', '', '', '',];
    let winTracker = [0, 0, 0, 0, 0, 0, 0, 0]
    let setSquare = (gamePiece, square) => {
        switch (gamePiece) {
            case "x":
                gameboard[square] = "x";
                break;
            case "o":
                gameboard[square] = "o";
                break;
            default:
                gameboard[square] = "";      
        }
    }
    let getSquare = (square) => {
        return gameboard[square];
    }
    let getBoard = () => {
        return gameboard;
    }
    //will be called each time a play is made, and track the #
    //of xs, os, for each row, column, and diagonal
    let winTrack = (gamePiece, square) => {
        if (gamePiece == "x") {
            winTracker[square % 3]++;
            winTracker[(square % 3) + 3]++;           
            if (square == 0 || square == 4 || square == 8) {
                winTracker[6]++;
            } else if (square == 6 || square == 4 || square == 2) {
                winTracker[7]++;
            }
        }
        if (gamePiece == "0") {
            winTracker[square % 3]--;
            winTracker[(square % 3) + 3]--;
            if (square == 0 || square == 4 || square == 8) {
                winTracker[6]--;
            } else if (square == 6 || square == 4 || square == 2) {
                winTracker[7]--;
            }
        }
    }
    let winChecker = (item, index, arr) => {
        if (arr[index] == 3 || arr[index] == -3) {
            return true;
        } else {
            return false;
        }
    }
    
    let displayBoard = (square, piece) => {
        document.getElementById("square" + square).innerHTML = piece;
    }
    /*let initialBoard = (item, index, arr) => {
        displayBoard(index, item)
    }
    
    gameboard.forEach(initialBoard); may not be needed*/
})();

//player object created with factory function as we want two
let Player = (name, piece) => {
    let wins = 0;
    let getWins = () => wins;
    let won = () => wins++;
    let getName = () => name;
    let getPiece = () => piece;
    return {getWins, won, getName, getPiece}
};

let gameDriver = (() => {
    let player1 = Player("player1", "o");
    console.log(player1.getPiece());
    let player2 = Player("player2", "o");
    let player1First = Math.random() < 0.5;
    gameOver = false;
    buttonList = document.querySelectorAll("button");
    let playRound = (element) => {
        do {
            if (true) {
                player1First = !player1First;
                element.innerHTML = player1.getPiece();
                gameOver = true;
            }
        } while(!gameOver)
    }
    buttonList.forEach(element => element.addEventListener("click", playRound(element)))
    
})()