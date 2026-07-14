import { GameBoard } from "./gameboard.js";

/*
 * Proxy container for the board.
 * Meant to hide the specific implementation of the enemy board
 * and give just the surface information needed.
 */
class BoardProxy {

    #gameBoard;

    constructor(gameBoard) {
        this.#gameBoard = gameBoard;
        this.visibleBoard = GameBoard.initBoard(...gameBoard.getBoardSize());
    }

    getBoardSize() {
        return this.#gameBoard.getBoardSize();
    }

    /*
     * Attack the current point. If ship is located at point, mark hit, else mark miss.
     * @point - to attack
     */
    receiveAttack(point) {
        const pointState = this.#gameBoard.receiveAttack(point);
        switch (pointState) {
            // Sunk and Hit will update the board in the same manner
            case "Sunk":
            case "Hit":
                this.visibleBoard[point[0]][point[1]] = 'X';
                break;
            case "Miss":
                this.visibleBoard[point[0]][point[1]] = 'O';
                break;
        }
        return pointState;
    }

    allShipsSunk() {
        return this.#gameBoard.allShipsSunk();
    }

    getStateOfPoint(point) {
        switch (this.board[point[0]][point[1]]) {
            case "X":
                return "Hit";
            case "0":
                return "Miss";
            default:
                return "Unexplored";
        }
    }
    /*
     * Pretty display of the public board (shows Hits, Misses, and empty cells)
     */
    prettyPrintBoard() {
        console.log('\n   ' + Array.from({ length: this.visibleBoard[0].length }, (_, i) => i).join(' '));
        console.log('  ' + Array.from({ length: 2 * this.visibleBoard[0].length }, () => '─').join('') + '─');
        for (let idx = 0; idx < this.visibleBoard.length; idx++) {
            console.log(idx + ' │' + this.visibleBoard[idx].map(cell => cell === 0 ? '~' : cell).join(' ') + '│');
        }
        console.log('  ' + Array.from({ length: 2 * this.visibleBoard[0].length }, () => '─').join('') + '─\n');
    }
}

export { BoardProxy };