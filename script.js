//gameBoard object created with a module pattern, as we only
//want one gameBoard at an given time
let gameBoard = (() => {
    //e for empty, x, o
    let board = ['', '', '', '', '', '', '', '', '',];
    let winTracker = [0, 0, 0, 0, 0, 0, 0, 0];
    let setSquare = (gamePiece, square) => {
        switch (gamePiece) {
            case "x":
                board[square] = "x";
                break;
            case "o":
                board[square] = "o";
                break;
            default:
                board[square] = "";      
        }
    }
    let getSquare = (square) => {
        return board[square];
    }
    let getBoard = () => {
        return board;
    }
    //will be called each time a play is made, and track the #
    //of xs, os, for each row, column, and diagonal
    let winTrack = (gamePiece, square) => {
        if (gamePiece == "x") {
            winTracker[square % 3]++;
            if (square < 3) {
                winTracker[3]++;
            } else if (2 < square < 6) {
                winTracker[4]++;
            } else if (5 < square < 9) {
                winTracker[5]++;
            }        
            if (square == 0 || square == 8) {
                winTracker[6]++;
            } else if (square == 6 || square == 2) {
                winTracker[7]++;
            } else if (square == 4) {
                winTracker[6]++;
                winTracker[7]++;
            }
        }
        if (gamePiece == "o") {
            winTracker[square % 3]--;
            if (square < 3) {
                winTracker[3]--;
            } else if (2 < square < 6) {
                winTracker[4]--;
            } else if (5 < square < 9) {
                winTracker[5]--;
            }        
            if (square == 0 || square == 8) {
                winTracker[6]--;
            } else if (square == 6 || square == 2) {
                winTracker[7]--;
            } else if (square == 4) {
                winTracker[6]--;
                winTracker[7]--;
            }
        }
    }
    let winChecker = (winTracker) => {
        let output = 2;
        winTracker.forEach((element) => {
            if (element == 3) {
                output = 0;
            } else if (element == -3) {
                output = 1;
            }
        })
        return output;
    }
    
    let displayBoard = (square, piece) => {
        document.getElementById("square" + square).innerHTML = piece;
    }
    let getWinTracker = () => {
        return winTracker;
    }
    return {
        setSquare,
        getSquare,
        getBoard,
        winTrack,
        winChecker,
        displayBoard,
        getWinTracker,
    }
    /*let initialBoard = (item, index, arr) => {
        displayBoard(index, item)
    }
    
    gameboard.forEach(initialBoard); may not be needed*/
})();

//player object created with factory function as we want two
let Player = (name, piece) => {
    let wins = 0;
    let getWins = () => {return wins;}
    let won = () => {wins++};
    let getName = () => {return name;}
    let getPiece = () => {return piece;}
    return {getWins, won, getName, getPiece}
};

let gameDriver = (() => {
    let player1 = Player("player1", "x");
    console.log(player1.getPiece());
    let player2 = Player("player2", "o");
    let player1First = Math.random() < 0.5;
    let gameOver = false;
    let turnTracker = 0;
    buttonList = document.querySelectorAll("button");
    let playRound = (element) => {
        if (player1First) {
            player1First = !player1First;
            element.innerHTML = player1.getPiece();
            gameBoard.winTrack(player1.getPiece(), element.id);
            if (gameBoard.winChecker(gameBoard.getWinTracker()) == 0) {
                player1.won();
                //reset board method
            }
            console.log(gameBoard.getWinTracker());
        } else {
            player1First = !player1First
            element.innerHTML = player2.getPiece();
            gameBoard.winTrack(player2.getPiece(), element.id);
            if (gameBoard.winChecker(gameBoard.getWinTracker()) == 1) {
                player2.won();
                //reset board method
            }
            console.log(gameBoard.getWinTracker());
        }
    }
    
    buttonList.forEach(element => element.addEventListener("click", function(){
        playRound(element)}));
    return {player1, player2};
})()