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
        this.visited = Array.from({ length: this.rows }, () => Array(this.cols).fill(false));
    }

    initPoints() {
        for (let row = 0; row < 10; ++row) {
            for (let col = 0; col < 10; ++col) {
                this.coordinates.push([row, col]);
            }
        }
    }

    shufflePoints() {
        /*
         * Use Fisher-Yates to shuffle the points
         */
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
        let point = [-1, -1];
        do {
            point = this.coordinates.pop();
        } while (visted[point[0]][point[1]] == true);
        return point;
    }

    /*
     * Pop from the randomly shuffled array the last entry and return for attack
     */
    execute() {
        const point = this.getBestPointToAttack();
        const [state, border] = this.observableBoard.receiveAttack(point);
        if (border !== null) {
            this.adapt(border);
        }
        return [point, state];
    }

    adapt(points) {
        /*
         *  Used to mark multiple points in the strategy in case a target was sunk
         */
        for (const point of points) {
            this.visited[point[0]][point[1]] = true;
        }
    }
}