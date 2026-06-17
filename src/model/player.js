import { GameBoard } from './gameboard.js';

class Player {

    constructor(board) {
        this.board = board;
    }

    hasLost() {
        return board.allShipsSunk();
    }

    getBoard() {
        return this.board;
    }
}

export { Player };