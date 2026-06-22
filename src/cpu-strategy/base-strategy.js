import { BoardProxy } from "../model/board-proxy.js";

/*
 * Base CPU strategy
 * Meant to be extended
 */
class BaseStrategy {

    constructor(observableBoard) {
        this.observableBoard = observableBoard;
        const size           = observableBoard.getBoardSize();
        this.rows            = size[0];
        this.cols            = size[1];
    }

    /*
     * Inefficient base implementation, prone to missfire
     * Meant to be overriden
     */
    executeStrategy() {
        const point = [Math.floor(Math.random() * this.rows), Math.floor(Math.random() * this.cols)];
        this.observableBoard.receiveAttack(point);
    }
}

export { BaseStrategy };