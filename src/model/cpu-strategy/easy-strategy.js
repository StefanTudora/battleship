import BaseStrategy from './base-strategy.js'

/*
 * Naive CPU strategy used in Easy mode
 * Has no concept of the board state, randomly attacks cells
 */
export default class NaiveStrategy extends BaseStrategy {

    constructor(observableBoard) {
        super(observableBoard);
        this.coordinates = new Array();
        // Create array containing all coordinates found on board
        this.initPoints();
        this.shufflePoints();
    }

    initPoints() {
        for (let row = 0; row < 10; ++row) {
            for (let col = 0; col < 10; ++col) {
                this.coordinates.push([row, col]);
            }
        }
    }

    shufflePoints() {
        // Use Fisher-Yates to shuffle the points
        for (let idx = this.coordinates.length - 1; idx >= 0; --idx) {
            const swapIdx = Math.floor(Math.random() * (idx + 1));
            if (idx == swapIdx) {
                // Skip swapping with itself
                continue;
            }
            [ this.coordinates[idx], this.coordinates[swapIdx] ] = [ this.coordinates[swapIdx], this.coordinates[idx] ];
        }
    }

    getBestPointToAttack() {
        const point = this.coordinates.pop();
        return point;
    }

    /*
     * Pop from the randomly shuffled array the last entry and return for attack
     */
    execute() {
        const point = this.getBestPointToAttack();
        this.observableBoard.receiveAttack(point);
        return point;
    }
}