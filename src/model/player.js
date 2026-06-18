import { BoardProxy } from "./board-proxy.js";

class Player {

    constructor(board) {
        this.board = board;
    }

    hasWon() {
        // console.log(this.board.prettyPrintBoard());
        return this.board.allShipsSunk();
    }

    /** Meant to be overwritten */
    attackBoard() {
        // Intentionally left empty
    }

    printBoard() {
        this.board.prettyPrintBoard();
    }
}

export { Player };