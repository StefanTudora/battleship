import { BoardProxy } from "../model/board-proxy.js";

/*
 * Base CPU strategy
 * Meant to be extended
 */
class BaseStrategy {

    constructor(observableBoard) {
        this.observableBoard = observableBoard;
        const size           = observableBoard.getBoardSize();
        this.rowSize         = size[0];
        this.colSize         = size[1];
    }

    /*
     * Inneficient base implementation, prone to missfire
     * Meant to be overriden
     */
    getBestPointToAttack() {
        return [x = Math.floor(Math.random() * rowSize), y = Math.floor(Math.random() * colSize)];
    }
}

export { BaseStrategy };