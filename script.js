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
            } else if (square > 2 && square < 6) {
                winTracker[4]++;
            } else if (square > 5 && square < 9) {
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
            } else if (square > 2 && square < 6) {
                winTracker[4]--;
            } else if (square > 5 && square < 9) {
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
    let reset = () => {
        winTracker = [0, 0, 0, 0, 0, 0, 0, 0];
    }
    return {
        setSquare,
        getSquare,
        getBoard,
        winTrack,
        winChecker,
        displayBoard,
        getWinTracker,
        reset,
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
    name1 = "";
    name2 = "";
    nameButton = document.getElementById("formbutton");
    let formSubmit = () => {
        let form1 = document.getElementById("player1");
        let form2 = document.getElementById("player2");
        name1 = form1.value;
        name2 = form2.value;
    }
    nameButton.addEventListener("click", formSubmit);
    let player1 = Player(name1, "x");
    let player2 = Player(name2, "o");
    let player1First = Math.random() < 0.5;
    let gameOver = false;
    let turnTracker = 0;
    buttonList = document.querySelectorAll(".grid-item");
    let playRound = (element) => {
        if (player1First && element.innerHTML == "") {
            player1First = !player1First;
            element.innerHTML = player1.getPiece();
            gameBoard.winTrack(player1.getPiece(), element.id);
            turnTracker++;
            if (gameBoard.winChecker(gameBoard.getWinTracker()) == 0) {
                player1.won();
                buttonList.forEach(element => element.innerHTML = "");
                gameBoard.reset();
                turnTracker = 0;
            }
        } else if (!player1First && element.innerHTML == "") {
            player1First = !player1First
            element.innerHTML = player2.getPiece();
            gameBoard.winTrack(player2.getPiece(), element.id);
            turnTracker++;
            if (gameBoard.winChecker(gameBoard.getWinTracker()) == 1) {
                player2.won();
                buttonList.forEach(element => element.innerHTML = "");
                gameBoard.reset();
                turnTracker = 0;
            }
        }
        if (turnTracker == 9) {
            buttonList.forEach(element => element.innerHTML = "");
            gameBoard.reset();
            turnTracker = 0;
        }
    }
    
    buttonList.forEach(element => element.addEventListener("click", function(){
        playRound(element)}));
    return {player1, player2};
})()