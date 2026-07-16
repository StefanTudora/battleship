import { BoardProxy } from "../game-entities/board-proxy.js";

/*
 * Base CPU strategy
 * Meant to be extended
 */
export default class BaseStrategy {

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
    execute() {
        const point = [Math.floor(Math.random() * this.rows), Math.floor(Math.random() * this.cols)];
        this.observableBoard.receiveAttack(point);
        return point;
    }
}