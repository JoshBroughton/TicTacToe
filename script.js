//gameBoard object created with a module pattern, as we only
//want one gameBoard at an given time
const gameBoard = (() => {
    //e for empty, x, o
    const gameboard =['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e',];
    const setSquare = (gamePiece) => {
        switch (gamePiece, square) {
            case "x":
                gameboard[square] = "x";
                break;
            case "o":
                gameboard[square] = "o";
                break;
            default:
                gameboard[square] = "e";      
        }
    }
    const getSquare = (square) => {
        return gameboard[square];
    }
    const getBoard = () => {
        return gameboard;
    }
    const wonGame = () => {
        let gameWon = false;
        if 
    }
})();