import NaiveStrategy from './easy-strategy.js'

/*
 * Gunner CPU strategy used in Medium mode
 * Implements hunt and destroy 
 * Based on the Naive implementation + will investigate the search space of the hit
 */
export default class GunnerStrategy extends NaiveStrategy {

    constructor(observableBoard) {
        super(observableBoard);
        this.initStrategySpecific();
    }

    initStrategySpecific() {
        this.searchPoints = new Array();
    }

    getBestPointToAttack() {
        let point = [-1, -1];
        if (this.searchPoints.length !== 0) {
            /*
             * We have coordinates of a knwon enemy vessel
             */
            point = this.searchPoints.shift();
        } else {
            while (this.coordinates.length > 0) {
                point = this.coordinates.pop();
                if (this.wasPointVisited(point) == false) {
                    /*
                     * Skip all points that have been explored;
                     */
                    break;
                }
            }
        }
        return point;
    }

    execute() {
        const point = this.getBestPointToAttack();
        this.visitCell(point);
        const [status, border] = this.observableBoard.receiveAttack(point);
        switch (status) {
            case "Hit":
                this.calibrateTargetingSystem(point);
                break;
            case "Sunk":
                // The ship has been sunked, dispose of the search points
                this.clearTargetingSystem();
                this.adapt(border);
                break;
            case "Miss":
                // Nothing to do here
                break;
        }
        return [point, status];
    }

    calibrateTargetingSystem(attackCoord) {
        const diff = [-1, 0, 1, 0, -1];
        // Add the neighbouring points to the search
        for (let idx = 0; idx < 4; ++idx) {
            const dx = attackCoord[0] + diff[idx];
            const dy = attackCoord[1] + diff[idx + 1];
            if (Math.min(dx, dy) < 0 || dx >= this.rows || dy >= this.cols || this.wasPointVisited([dx, dy])) {
                // Skip point if out of bounds or already visited
                continue;
            }
            this.searchPoints.push([dx, dy]);
        }
    }

    clearTargetingSystem() {
        this.searchPoints = new Array();
    }

    wasPointVisited(point) {
        return this.visited[point[0]][point[1]];
    }

    visitCell(point) {
        if(point[0] == -1) {
            console.log("Found it!");
        }
        this.visited[point[0]][point[1]] = true;
    }
}